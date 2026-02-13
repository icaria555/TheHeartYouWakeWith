import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/Button";

interface LandingProps {
  onBegin: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onBegin }) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-linear-to-b from-pink-200 to-orange-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Floating Heart Animation */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <Heart size={400} fill="currentColor" className="text-pink-400" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight"
        >
          The Heart You
          <br />
          Wake Up With
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-xl text-gray-700 font-normal"
        >
          An emotional journey for Valentine’s Day
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <Button onClick={onBegin} size="lg">
            Begin
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
