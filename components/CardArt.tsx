"use client";

export type ArtVariant = "mesh" | "rings" | "wave" | "grid";

/**
 * Generative, code-only cover art for feature cards. No images —
 * every visual is CSS/canvas motion.
 */
export default function CardArt({ variant }: { variant: ArtVariant }) {
  if (variant === "mesh") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-coal">
        <div
          className="absolute -inset-[25%] opacity-80"
          style={{
            background:
              "radial-gradient(42% 42% at 32% 30%, rgba(204,255,0,0.5), transparent 70%), radial-gradient(46% 46% at 68% 62%, rgba(110,80,255,0.5), transparent 70%), radial-gradient(50% 50% at 50% 92%, rgba(255,96,40,0.35), transparent 70%)",
            animation: "drift-a 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -inset-[25%] opacity-60"
          style={{
            background:
              "radial-gradient(40% 40% at 70% 25%, rgba(255,96,40,0.4), transparent 70%), radial-gradient(44% 44% at 28% 72%, rgba(204,255,0,0.35), transparent 70%)",
            animation: "drift-b 14s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  if (variant === "rings") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-coal">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-volt/50"
            style={{
              width: `${(i + 1) * 22}%`,
              aspectRatio: "1",
              animation: `ring-pulse 3.2s ease-out ${i * 0.55}s infinite`,
            }}
          />
        ))}
        <div className="h-4 w-4 rounded-full bg-volt" />
      </div>
    );
  }

  if (variant === "wave") {
    const bars = 56;
    return (
      <div className="relative flex h-full w-full items-center justify-center gap-[6px] overflow-hidden bg-coal px-8">
        {Array.from({ length: bars }, (_, i) => {
          const hgt = 18 + ((i * 37 + 11) % 78);
          return (
            <div
              key={i}
              className="w-[5px] origin-center rounded-full bg-volt/85"
              style={{
                height: `${hgt}%`,
                animation: `eq-bar 1.7s ease-in-out ${(i % 14) * 0.11}s infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  // grid
  return (
    <div className="relative h-full w-full overflow-hidden bg-coal">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(204,255,0,0.55) 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
          animation: "grid-sweep 6s linear infinite",
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 50%, black, transparent)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/25"
        style={{ animation: "spin-slow 12s linear infinite" }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-volt" />
      </div>
    </div>
  );
}
