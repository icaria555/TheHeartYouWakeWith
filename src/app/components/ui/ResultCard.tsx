import React from "react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { RESULT_DATA } from "../../data/resultData";

interface ResultCardProps {
  resultKey: string;
  className?: string;
  showBranding?: boolean;
}

const FloatingParticle = ({ type, delay, colorClass }: { type: "petals" | "sparkles" | "cloud"; delay: number; colorClass: string }) => {
  const isSparkle = type === "sparkles";
  const isCloud = type === "cloud";
  
  return (
    <motion.div
      initial={{ 
        y: "120%", 
        opacity: 0, 
        rotate: 0,
        scale: isCloud ? 0.8 : 0.5 
      }}
      animate={{
        y: "-20%",
        opacity: [0, 1, 1, 0],
        rotate: isCloud ? 0 : [0, 180],
        x: [0, Math.random() * 40 - 20, 0],
      }}
      transition={{
        duration: isCloud ? 10 + Math.random() * 5 : 5 + Math.random() * 5,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        "absolute pointer-events-none opacity-60",
        isSparkle ? "w-2 h-2 rounded-full" : isCloud ? "w-16 h-10 rounded-full blur-xl" : "w-4 h-4 rounded-tr-xl rounded-bl-xl",
        colorClass
      )}
      style={{
        left: `${Math.random() * 100}%`,
        backgroundColor: "currentColor"
      }}
    />
  );
};

export const ResultCard: React.FC<ResultCardProps> = ({ resultKey, className, showBranding = true }) => {
  const data = RESULT_DATA[resultKey] || RESULT_DATA["The Brave Heart"]; // Fallback

  // Determine particle color based on text color mostly, or specific override
  const particleColor = data.textColorClass.includes("white") ? "text-white/40" : "text-pink-300";

  return (
    <div className={cn(
      "relative overflow-hidden flex flex-col items-center justify-center text-center select-none shadow-2xl",
      "aspect-[4/5] w-full max-w-[400px]", // Constrain width for desktop, keep aspect ratio
      data.gradientClass,
      className
    )}>
      {/* Decorative Particles */}
      {data.decorationType !== "none" && Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle 
            key={i} 
            type={data.decorationType as any} 
            delay={i * 0.8} 
            colorClass={particleColor} 
        />
      ))}

      {/* Content Container - AutoLayout Vertical */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12 md:px-12 md:py-16 gap-6 md:gap-8">
        
        {/* Title */}
        <h1 className={cn("text-3xl md:text-4xl font-semibold uppercase tracking-wider", data.textColorClass)}>
          {data.title}
        </h1>

        {/* Reflection */}
        <p className={cn("text-lg md:text-xl font-normal leading-relaxed opacity-90", data.textColorClass)}>
          “{data.reflection}”
        </p>

        {/* Divider (Optional - using opacity separator) */}
        <div className={cn("w-12 h-1 rounded-full opacity-40 my-2", data.textColorClass.includes("white") ? "bg-white" : "bg-black")} />

        {/* Closing Line */}
        <p className={cn("text-base md:text-lg font-medium tracking-wide opacity-80", data.textColorClass)}>
          {data.closing}
        </p>

        {/* Branding Footer */}
        {showBranding && (
          <div className={cn("absolute bottom-6 text-xs uppercase tracking-widest opacity-50", data.textColorClass)}>
            The Heart You Wake Up With
          </div>
        )}
      </div>
    </div>
  );
};
