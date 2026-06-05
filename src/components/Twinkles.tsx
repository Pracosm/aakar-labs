// Restrained — fewer, smaller, slower, white only.
const TWINKLES: Array<{
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}> = [
  // Top dark band
  { left: "12%", top: "7%",  size: 4, delay: 0.0, duration: 6.5 },
  { left: "26%", top: "11%", size: 5, delay: 2.4, duration: 7.0 },
  { left: "40%", top: "5%",  size: 4, delay: 1.1, duration: 6.0 },
  { left: "58%", top: "9%",  size: 5, delay: 3.0, duration: 7.5 },
  { left: "72%", top: "4%",  size: 4, delay: 0.6, duration: 6.2 },
  { left: "86%", top: "10%", size: 5, delay: 2.1, duration: 7.2 },

  // Side mid bands
  { left: "6%",  top: "44%", size: 4, delay: 1.8, duration: 6.8 },
  { left: "94%", top: "48%", size: 5, delay: 0.3, duration: 6.4 },

  // Around the silhouette / center-low
  { left: "47%", top: "62%", size: 4, delay: 2.7, duration: 7.0 },
  { left: "53%", top: "58%", size: 4, delay: 1.4, duration: 6.6 },
];

const SPARKLE_PATH =
  "M12 0 L13.4 10.6 L24 12 L13.4 13.4 L12 24 L10.6 13.4 L0 12 L10.6 10.6 Z";

export default function Twinkles() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      {TWINKLES.map((t, i) => (
        <svg
          key={i}
          className="twinkle"
          width={t.size}
          height={t.size}
          viewBox="0 0 24 24"
          style={
            {
              left: t.left,
              top: t.top,
              "--twk-delay": `${t.delay}s`,
              "--twk-dur": `${t.duration}s`,
            } as React.CSSProperties
          }
        >
          <path d={SPARKLE_PATH} fill="rgba(255,255,255,0.92)" />
        </svg>
      ))}
    </div>
  );
}
