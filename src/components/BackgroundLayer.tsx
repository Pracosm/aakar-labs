export default function BackgroundLayer() {
  return (
    <div
      className="bg-video-fixed fixed inset-x-0 top-0 z-0 overflow-hidden"
      style={{ background: "#050509" }}
      aria-hidden
    >
      <video
        src="/hero-video.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
