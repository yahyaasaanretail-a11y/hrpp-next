"use client";

import { useEffect, useRef } from "react";

const ADSENSE_BASE_SCRIPT =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
const ADSENSE_CLIENT_ID = "ca-pub-3826573131304099";

type InArticleAdProps = {
  slotId?: string;
  className?: string;
};

const SCRIPT_LOADED_ATTR = "data-adsbygoogle-loaded";

const InArticleAd = ({ slotId = "8015069158", className }: InArticleAdProps) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const hasRequestedAdRef = useRef(false);

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const clearRetryTimeout = () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };

    const scheduleRetry = (delay = 400) => {
      clearRetryTimeout();
      retryTimeoutRef.current = window.setTimeout(() => {
        requestAd();
      }, delay);
    };

    const requestAd = () => {
      if (hasRequestedAdRef.current || !adRef.current) {
        return;
      }

      const width = adRef.current.offsetWidth;

      if (width === 0) {
        scheduleRetry();
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasRequestedAdRef.current = true;
      } catch (error) {
        console.error("AdSense push error:", error);
        scheduleRetry(1000);
      }
    };

    const handleScriptLoad = () => {
      if (!scriptElement) {
        return;
      }

      scriptElement.setAttribute(SCRIPT_LOADED_ATTR, "true");
      requestAd();
    };

    scriptElement = document.querySelector<HTMLScriptElement>(
      `script[src^="${ADSENSE_BASE_SCRIPT}"]`,
    );

    if (scriptElement) {
      const isLoaded =
        scriptElement.getAttribute(SCRIPT_LOADED_ATTR) === "true" ||
        typeof window.adsbygoogle !== "undefined";

      if (isLoaded) {
        scheduleRetry(100);
      } else {
        scriptElement.addEventListener("load", handleScriptLoad, {
          once: true,
        });
      }
    } else {
      scriptElement = document.createElement("script");
      scriptElement.src = `${ADSENSE_BASE_SCRIPT}?client=${ADSENSE_CLIENT_ID}`;
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      scriptElement.addEventListener("load", handleScriptLoad, { once: true });
      document.head.appendChild(scriptElement);
    }

    scheduleRetry(150);

    const handleResize = () => {
      if (!hasRequestedAdRef.current) {
        scheduleRetry(200);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearRetryTimeout();
      window.removeEventListener("resize", handleResize);
      scriptElement?.removeEventListener("load", handleScriptLoad);
    };
  }, []);

  const wrapperClassName = ["flex justify-center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
      />
    </div>
  );
};

export default InArticleAd;
