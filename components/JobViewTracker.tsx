"use client";

import { useEffect, useRef, useState } from "react";

const API_BASE_URL = "https://admin.hrpostingpartner.com/api";
const VIEWER_ID_STORAGE_KEY = "hrrp_viewer_id";
const BOT_REGEX = /bot|crawler|spider|preview|fetch/i;
const VIEW_FETCH_TIMEOUT_MS = 4000;

type JobViewTrackerProps = {
  jobId: number | string;
  className?: string;
};

function getOrCreateViewerId() {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.localStorage.getItem(VIEWER_ID_STORAGE_KEY);
    if (existing) return existing;

    const freshId =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem(VIEWER_ID_STORAGE_KEY, freshId);
    return freshId;
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export default function JobViewTracker({
  jobId,
  className = "text-sm text-gray-500",
}: JobViewTrackerProps) {
  const [views, setViews] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [shouldSkipTracking, setShouldSkipTracking] = useState(true);
  const hasRecordedViewRef = useRef(false);
  const viewerIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsClient(true);
    const ua = window.navigator?.userAgent ?? "";
    setShouldSkipTracking(BOT_REGEX.test(ua));
  }, []);

  useEffect(() => {
    if (!isClient || shouldSkipTracking) return undefined;

    hasRecordedViewRef.current = false;

    let isCancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const resolvedJobId = String(jobId);
    viewerIdRef.current = getOrCreateViewerId();

    const viewCountUrl = `${API_BASE_URL}/jobs/${resolvedJobId}/views`;
    const recordViewUrl = `${API_BASE_URL}/jobs/${resolvedJobId}/view`;

    const fetchViews = async (attempt = 1) => {
      const controller = new AbortController();
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      try {
        timeoutId = window.setTimeout(
          () => controller.abort(),
          VIEW_FETCH_TIMEOUT_MS
        );

        const response = await fetch(viewCountUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const data = (await response.json()) as { views?: number };

        if (!isCancelled) {
          setViews(typeof data?.views === "number" ? data.views : null);
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError" &&
          attempt < 3 &&
          !isCancelled
        ) {
          // Immediately retry on timeout without additional delay.
          fetchViews(attempt + 1);
          return;
        }

        if (attempt < 3 && !isCancelled) {
          retryTimer = setTimeout(() => fetchViews(attempt + 1), 300 * attempt);
        }
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        controller.abort();
      }
    };

    const sendView = () => {
      if (hasRecordedViewRef.current || isCancelled) return;
      hasRecordedViewRef.current = true;

      const viewerId = viewerIdRef.current ?? getOrCreateViewerId();
      const payload = JSON.stringify({ viewerId });

      console.log("[JobViewTracker] Sending view payload", {
        jobId: resolvedJobId,
        payload,
      });

      if (
        typeof navigator.sendBeacon === "function" &&
        navigator.sendBeacon(
          recordViewUrl,
          new Blob([payload], { type: "application/json" })
        )
      ) {
        console.log("[JobViewTracker] View recorded via sendBeacon", {
          jobId: resolvedJobId,
        });
        return;
      }

      fetch(recordViewUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        cache: "no-store",
        keepalive: true,
      })
        .then(async (response) => {
          let body: string | null = null;
          try {
            body = await response.clone().text();
          } catch {
            body = null;
          }

          console.log("[JobViewTracker] View POST response", {
            jobId: resolvedJobId,
            status: response.status,
            ok: response.ok,
            body,
          });

          if (response.ok && !isCancelled) {
            fetchViews();
          }
        })
        .catch(() => {
          // Intentionally ignore errors for fire-and-forget semantics.
        });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendView();
      }
    };

    const handleBeforeUnload = () => {
      sendView();
    };

    fetchViews();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      isCancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sendView();
    };
  }, [jobId, isClient, shouldSkipTracking]);

  if (!isClient || shouldSkipTracking) {
    return null;
  }

  return (
    <span className={className}>
      <span className="font-semibold text-gray-700">Views:</span>{" "}
      {views === null ? "--" : views.toLocaleString()}
    </span>
  );
}
