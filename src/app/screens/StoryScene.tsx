import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export type StorySceneVariant =
  | "story" // Standard: Illustration, Text, Choices
  | "tension" // Dark overlay 20%, fade-in text
  | "hesitation" // Dark overlay 40%, heartbeat glow, delayed choices
  | "crossroad"; // Spotlight, wide choices

interface Choice {
  label: string;
  onClick: () => void;
}

interface StorySceneProps {
  variant: StorySceneVariant;
  text: string;
  illustrationSrc?: string;
  choices: Choice[];
  isTransitioning?: boolean;
}

export const StoryScene: React.FC<StorySceneProps> = ({
  variant,
  text,
  illustrationSrc,
  choices,
  isTransitioning = false,
}) => {
  const [showChoices, setShowChoices] = useState(false);

  // Handle delayed appearance for hesitation
  useEffect(() => {
    if (variant === "hesitation") {
      const timer = setTimeout(() => setShowChoices(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowChoices(true);
    }
  }, [variant]);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.8,
        ease: "easeInOut",
      }}
      className="relative w-full min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-purple-50/30 flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/20 via-transparent to-violet-50/20 pointer-events-none" />

      {/* Floating particles for ambiance */}
      {variant === "story" && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-pink-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Background/Overlays */}
      {variant === "tension" && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
      )}
      {variant === "hesitation" && (
        <>
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
          {/* Heartbeat Glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full blur-[120px] pointer-events-none z-0"
          />
        </>
      )}
      {variant === "crossroad" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />
      )}

      {/* Content Container */}
      <div
        className={cn("relative z-20 flex flex-col items-center max-w-xl w-full text-center", {
          "mt-12": variant === "story" && illustrationSrc,
        })}
      >
        {/* Illustration (only for standard story) */}
        {variant === "story" && illustrationSrc && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg w-full max-w-sm mx-auto">
            <ImageWithFallback
              src={illustrationSrc}
              alt="Story Illustration"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : variant === "tension" ? 2 : 1.0,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className={cn(
            "text-gray-900 leading-relaxed mb-12",
            variant === "story" ? "text-lg md:text-xl font-normal" : "",
            variant === "tension" ? "text-xl md:text-2xl font-medium" : "",
            variant === "hesitation" ? "text-2xl md:text-3xl font-semibold text-white" : "",
            variant === "crossroad" ? "text-2xl md:text-3xl font-bold text-white" : "",
          )}
        >
          {text}
        </motion.p>

        {/* Choices */}
        <AnimatePresence>
          {showChoices && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.4,
              }}
              className={cn("flex flex-col w-full", {
                "gap-4": variant !== "crossroad",
                "gap-8": variant === "crossroad", // Wider gap for crossroad
              })}
            >
              {choices.map((choice, index) => (
                <motion.button
                  key={index}
                  onClick={choice.onClick}
                  disabled={isTransitioning}
                  whileHover={prefersReducedMotion || isTransitioning ? {} : { scale: 1.02, y: -2 }}
                  whileTap={prefersReducedMotion || isTransitioning ? {} : { scale: 0.98 }}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.5 + index * 0.15,
                    duration: prefersReducedMotion ? 0.2 : 0.4,
                  }}
                  className={cn(
                    "w-full px-6 py-4 rounded-xl font-medium text-base transition-all duration-300 shadow-md hover:shadow-xl",
                    {
                      "opacity-50 cursor-not-allowed": isTransitioning,
                      // Standard story variant
                      "bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border border-rose-200/50 text-gray-800 hover:text-gray-900":
                        variant === "story",
                      // Tension variant - more dramatic
                      "bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-red-200/60 text-gray-900 hover:text-red-900":
                        variant === "tension",
                      // Hesitation variant - glowing, prominent
                      "bg-white/90 hover:bg-white backdrop-blur-md border-2 border-pink-300/50 hover:border-pink-400 text-gray-900 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30":
                        variant === "hesitation",
                      // Crossroad variant - bold and wide
                      "bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 border-2 border-purple-300/60 hover:border-purple-400 text-gray-900 font-semibold text-lg py-5":
                        variant === "crossroad",
                    },
                  )}
                >
                  {choice.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
