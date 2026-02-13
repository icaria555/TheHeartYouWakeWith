import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { ResultCard } from "../components/ui/ResultCard";

interface EndingProps {
  onRestart: () => void;
  onShare: () => void;
  resultMessage?: string;
}

export const Ending: React.FC<EndingProps> = ({
  onRestart,
  onShare,
  resultMessage = "The Brave Heart",
}) => {
  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-white opacity-50 pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md"
      >
        <div className="w-full shadow-2xl rounded-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <ResultCard resultKey={resultMessage} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button variant="primary" onClick={onShare} className="w-full text-lg h-12">
            Share Your Heart
          </Button>
          <Button variant="ghost" onClick={onRestart} className="w-full text-gray-500 hover:text-gray-900">
            Restart Journey
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
