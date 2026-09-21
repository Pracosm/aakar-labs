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

    // Start loading on the next task. Deferring this to idle time made the
    // poster look frozen on slower mobile devices.
    const timer = window.setTimeout(() => setLoadVideo(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    let disposed = false;
    let workVisible = false;
    const workSection = document.getElementById("work");

    const isWorkVisible = () => {
      if (!workSection) return false;
      const bounds = workSection.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    };

    const canPlay = () => !disposed && !document.hidden && !workVisible;
    const tryPlay = () => {
      if (!canPlay()) return;
      void video
        .play()
        .then(() => {
          // Autoplay can begin before the effect attaches its media event
          // listeners. The resolved play promise is still reliable in that
          // case, so do not leave the real video hidden behind the poster.
          if (canPlay()) setVideoReady(true);
        })
        .catch(() => {});
    };
    const onCanPlay = () => tryPlay();
    const onPlaying = () => {
      if (canPlay()) setVideoReady(true);
    };
    const onError = () => {
      setVideoError(true);
      setVideoReady(false);
    };
    const onPause = () => {
      // Keep the hero motion alive if the browser pauses an otherwise
      // visible autoplay video. The work section is the intentional stop.
      if (canPlay()) tryPlay();
    };
    const onVis = () => {
      if (document.hidden || workVisible) video.pause();
      else tryPlay();
    };

    const observer = workSection
      ? new IntersectionObserver(
          ([entry]) => {
            workVisible = entry.isIntersecting;
            if (workVisible) video.pause();
            else tryPlay();
          },
          { threshold: 0.01 },
        )
      : null;

    workVisible = isWorkVisible();
    if (workSection) observer?.observe(workSection);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVis);
    tryPlay();

    return () => {
      disposed = true;
      video.pause();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVis);
      observer?.disconnect();
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
