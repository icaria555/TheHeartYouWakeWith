import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
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
}

export const StoryScene: React.FC<StorySceneProps> = ({
  variant,
  text,
  illustrationSrc,
  choices,
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

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
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
      <div className={cn("relative z-20 flex flex-col items-center max-w-xl w-full text-center", {
          "mt-12": variant === "story" && illustrationSrc
      })}>
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
          transition={{ duration: variant === "tension" ? 2 : 0.8 }}
          className={cn(
            "text-gray-900 leading-relaxed mb-12",
            variant === "story" ? "text-lg md:text-xl font-normal" : "",
            variant === "tension" ? "text-xl md:text-2xl font-medium" : "",
            variant === "hesitation" ? "text-2xl md:text-3xl font-semibold text-white" : "",
            variant === "crossroad" ? "text-2xl md:text-3xl font-bold text-white" : ""
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
              transition={{ duration: 0.5 }}
              className={cn("flex flex-col w-full", {
                "gap-4": variant !== "crossroad",
                "gap-8": variant === "crossroad", // Wider gap for crossroad
              })}
            >
              {choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="choice"
                  onClick={choice.onClick}
                  className={cn({
                     // Adjust button styles for dark backgrounds
                     "bg-white/90 hover:bg-white text-black border-none": variant === "hesitation" || variant === "crossroad"
                  })}
                >
                  {choice.label}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
