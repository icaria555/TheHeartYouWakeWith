import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface AudioControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isPlaying: boolean;
  className?: string;
}

/**
 * AudioControls Component
 *
 * Provides a prominent, accessible control for muting/unmuting background music.
 * Positioned in top-right corner, always visible, respects reduced motion preferences.
 */
export const AudioControls: React.FC<AudioControlsProps> = ({
  isMuted,
  onToggleMute,
  isPlaying,
  className,
}) => {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isPlaying) return null;

  return (
    <motion.button
      onClick={onToggleMute}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      className={cn(
        "fixed top-6 right-6 z-50",
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-white/90 hover:bg-white",
        "shadow-lg hover:shadow-xl",
        "border border-gray-200/50",
        "text-gray-700 hover:text-gray-900",
        "transition-all duration-200",
        "backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2",
        className,
      )}
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      title={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Volume2 className="w-5 h-5" aria-hidden="true" />
      )}

      {/* Visual indicator for sound waves when playing */}
      {!isMuted && (
        <motion.span
          className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};
