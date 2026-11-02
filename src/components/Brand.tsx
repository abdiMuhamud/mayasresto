import Image from "next/image";

/**
 * The real Maya's Resto logo (navy disc, sage leaves, apricot script).
 * A dotted apricot ring turns around it, and the disc spins once on hover
 * of the nearest `group` parent.
 */
export function Logo({
  size = 48,
  ring = true,
  priority = false,
  className = "",
}: {
  size?: number;
  ring?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${className}`} style={{ width: size, height: size }}>
      {ring && (
        <svg viewBox="0 0 100 100" aria-hidden className="logo-ring absolute -inset-[14%] size-[128%]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-apricot)" strokeWidth="1.2" strokeDasharray="0.5 4.2" strokeLinecap="round" />
        </svg>
      )}
      <Image
        src="/brand/logo.webp"
        alt="Maya's Resto"
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="logo-disc size-full rounded-full shadow-[0_6px_20px_-8px_rgb(6_20_58/0.6)]"
      />
    </span>
  );
}

/** A sage leaf sprig, echoing the branches in the logo. */
export function LeafSprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves = [
    { x: 18, y: 44, r: -40 },
    { x: 30, y: 30, r: 30 },
    { x: 44, y: 40, r: -30 },
    { x: 56, y: 24, r: 25 },
    { x: 70, y: 34, r: -25 },
    { x: 82, y: 18, r: 20 },
    { x: 96, y: 26, r: -15 },
  ];
  return (
    <svg
      viewBox="0 0 120 60"
      aria-hidden
      className={`leaf-sway ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id="leaf-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9e1cf" />
          <stop offset="1" stopColor="#8fb89b" />
        </linearGradient>
      </defs>
      <path d="M4 54 C 30 44, 60 34, 116 16" fill="none" stroke="#8fb89b" strokeWidth="1.3" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="7.5"
          ry="3.6"
          fill="url(#leaf-fill)"
          opacity={0.92}
          transform={`rotate(${l.r} ${l.x} ${l.y})`}
        />
      ))}
    </svg>
  );
}
