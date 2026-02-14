import React, { useMemo } from "react";

export type ParticleType = "hearts" | "sparkles" | "bubbles" | "none";

interface ParticleEffectProps {
  type: ParticleType;
}

interface Particle {
  id: number;
  left: string;
  delay: number;
  duration: number;
  drift: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ type }) => {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Disable particles if type is "none" or reduced motion is preferred
  if (type === "none" || prefersReducedMotion) {
    return null;
  }

  // Determine particle count based on screen size
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 12 : 18; // 10-15 mobile, 15-20 desktop

  // Generate particle data
  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4, // 8-12s
        drift: (Math.random() - 0.5) * 40, // -20px to +20px horizontal drift
      })),
    [particleCount],
  );

  // Render particle based on type
  const renderParticle = (particle: Particle) => {
    let shape;

    switch (type) {
      case "hearts":
        // Simple heart using unicode
        shape = <span className="text-pink-300/40 text-sm">♥</span>;
        break;
      case "sparkles":
        // Simple sparkle shape
        shape = (
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-amber-300/40">
            <path
              d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5 Z"
              fill="currentColor"
            />
          </svg>
        );
        break;
      case "bubbles":
        // Simple circular bubble
        shape = <div className="w-2 h-2 bg-blue-200/30 rounded-full" />;
        break;
      default:
        return null;
    }

    return (
      <div
        key={particle.id}
        className="particle absolute pointer-events-none"
        style={{
          left: particle.left,
          bottom: "-20px",
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          // @ts-ignore - CSS custom property
          "--drift": `${particle.drift}px`,
        }}
      >
        {shape}
      </div>
    );
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(renderParticle)}
      </div>

      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) translateX(var(--drift));
            opacity: 0;
          }
        }

        .particle {
          animation: particleFloat linear infinite;
          will-change: transform, opacity;
        }

        /* Disable particles on reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .particle {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
