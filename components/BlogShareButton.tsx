'use client';

import { useCallback, useMemo, useState } from "react";

interface BlogShareButtonProps {
  title: string;
  url: string;
  className?: string;
}

type ShareStatus = "idle" | "copied" | "error";

export default function BlogShareButton({
  title,
  url,
  className,
}: BlogShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>("idle");
  const [isSharing, setIsSharing] = useState(false);

  const containerClassName = useMemo(() => {
    const base =
      "relative inline-flex w-full flex-col items-start gap-1 sm:w-auto sm:flex-row sm:items-center";
    return className ? `${className} ${base}` : base;
  }, [className]);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    setStatus("idle");

    const shareSupported =
      typeof navigator !== "undefined" && typeof navigator.share === "function";

    if (shareSupported) {
      try {
        setIsSharing(true);
        await navigator.share({
          title,
          text: title,
          url,
        });
        setIsSharing(false);
        return;
      } catch (error) {
        setIsSharing(false);

        if (
          error instanceof Error &&
          ("name" in error ? error.name === "AbortError" : false)
        ) {
          return;
        }
        // If sharing fails for another reason, fall back to copy flow.
      }
    }

    const canCopy =
      typeof navigator !== "undefined" &&
      typeof navigator.clipboard !== "undefined" &&
      typeof navigator.clipboard.writeText === "function";

    if (canCopy) {
      try {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
        window.setTimeout(() => {
          setStatus("idle");
        }, 2000);
        return;
      } catch {
        // Fall through to error status below.
      }
    }

    setStatus("error");
  }, [title, url]);

  return (
    <div className={containerClassName}>
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-blue-100 disabled:text-blue-300 sm:w-auto"
        aria-label="Share this blog"
        title="Share this blog"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51 15.42 17.49" />
          <path d="M15.41 6.51 8.59 10.49" />
        </svg>
        {isSharing ? "Sharing..." : "Share"}
      </button>
      <span className="text-xs font-medium text-green-600" aria-live="polite">
        {status === "copied" ? "Link copied!" : ""}
      </span>
      <span className="text-xs font-medium text-red-500" aria-live="polite">
        {status === "error"
          ? "Sharing is unavailable. Try copying the URL manually."
          : ""}
      </span>
    </div>
  );
}
