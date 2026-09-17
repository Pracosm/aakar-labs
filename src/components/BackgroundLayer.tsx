"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BackgroundLayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );

    if (reduce || saveData) return;

    const probe = document.createElement("video");
    if (!probe.canPlayType("video/mp4")) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadVideo(true);
    };
    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 900));
    const id = idle(start);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(id as number);
      } else {
        window.clearTimeout(id as number);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    let disposed = false;
    const tryPlay = () => {
      if (disposed || document.hidden) return;
      void video.play().catch(() => {});
    };
    const onCanPlay = () => tryPlay();
    const onPlaying = () => setVideoReady(true);
    const onError = () => {
      setVideoError(true);
      setVideoReady(false);
    };
    const onVis = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVis);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) tryPlay();

    return () => {
      disposed = true;
      video.pause();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [loadVideo]);

  return (
    <div
      className="bg-video-fixed fixed inset-x-0 top-0 z-0 overflow-hidden"
      style={{ background: "#050509" }}
      aria-hidden
    >
      <Image
        src="/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {loadVideo && !videoError && (
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        />
      )}
    </div>
  );
}
