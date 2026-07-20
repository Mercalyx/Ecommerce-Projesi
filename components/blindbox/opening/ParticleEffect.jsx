import { useMemo } from "react";

// Particle "look" per collection — plain characters, so this never needs new
// image assets and stays cheap to render (a handful of <span> elements).
const PARTICLE_SETS = {
  "hearts-lily": ["💗", "🌸", "🎵", "🪷"],
  "gold-tulip": ["✨", "🌷", "🔶", "💠"],
  "sea-treasures": ["🐚", "🫧", "💎", "🌊"],
  "geometric-gold": ["🔶", "⭐", "💧", "✨"],
};
const SECRET_BONUS_SHAPES = ["🐾", "👑"];

function ParticleEffect({ variant, phase, secret = false, reducedMotion = false }) {
  const active = phase === "opening" || phase === "revealing" || phase === "completed";

  const particles = useMemo(() => {
    if (!active) return [];
    const shapes = [...(PARTICLE_SETS[variant] || PARTICLE_SETS["hearts-lily"])];
    if (secret) shapes.push(...SECRET_BONUS_SHAPES);

    const baseCount = reducedMotion ? 6 : 16;
    const count = secret ? baseCount + 4 : baseCount;

    return Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * 360;
      const distance = 70 + Math.random() * 90;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance - 40;
      return {
        id: i,
        shape: shapes[i % shapes.length],
        left: `${50 + (Math.random() * 20 - 10)}%`,
        top: `${50 + (Math.random() * 20 - 10)}%`,
        x: `${x}px`,
        y: `${y}px`,
        duration: `${(reducedMotion ? 0.6 : 1.4) + Math.random() * 0.8}s`,
        delay: `${Math.random() * 0.3}s`,
        size: 14 + Math.random() * 12,
      };
    });
  }, [active, variant, secret, reducedMotion]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="bb-particle"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            "--bb-particle-x": p.x,
            "--bb-particle-y": p.y,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}

export default ParticleEffect;
