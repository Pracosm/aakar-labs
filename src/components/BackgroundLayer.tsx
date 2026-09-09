"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BackgroundLayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );

    if (reduce || narrow || saveData) return;

    const start = () => setLoadVideo(true);
    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 900));
    const id = idle(start);

    return () => {
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

    const onVis = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", onVis);
    void video.play().catch(() => {});

    return () => document.removeEventListener("visibilitychange", onVis);
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
      {loadVideo && (
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        />
      )}
    </div>
  );
}
