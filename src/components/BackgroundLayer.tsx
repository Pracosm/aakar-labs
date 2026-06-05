export default function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 z-0 w-full h-full overflow-hidden"
      style={{ background: "#050509" }}
      aria-hidden
    >
      <video
        src="/hero-video.mp4"
        className="w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
