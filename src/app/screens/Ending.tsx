import React, { useState } from "react";
import { motion } from "motion/react";
import { ResultCard } from "../components/ui/ResultCard";
import {
  trackFeedback,
  trackShareClicked,
  trackRestartClicked,
  trackCoffeeClicked,
} from "../../lib/analytics";

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
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedback, setShowFeedback] = useState(true);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [shareTextConsent, setShareTextConsent] = useState(false);

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      // Store feedback in localStorage (always store locally)
      const feedback = {
        endingId: resultMessage,
        feedback: feedbackText,
        timestamp: new Date().toISOString(),
        sharedWithAnalytics: shareTextConsent,
      };

      const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]");
      existingFeedback.push(feedback);
      localStorage.setItem("userFeedback", JSON.stringify(existingFeedback));

      // Track feedback submission (include text only if consent given)
      trackFeedback(
        resultMessage,
        feedbackText.length,
        shareTextConsent ? feedbackText : undefined,
      );

      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  };

  const handleSkipFeedback = () => {
    setShowFeedback(false);
  };

  const handleShare = () => {
    trackShareClicked(resultMessage);
    onShare();
  };

  const handleRestart = () => {
    trackRestartClicked(resultMessage);
    onRestart();
  };

  const handleCoffeeClick = () => {
    trackCoffeeClicked(resultMessage);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Ambient Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 via-transparent to-violet-100/40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="w-full text-lg h-12 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center justify-center gap-2">
              Share Your Heart
              <span className="text-xl">✨</span>
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRestart}
            className="w-full h-12 bg-white/40 hover:bg-white/60 backdrop-blur-md text-gray-700 hover:text-gray-900 font-medium rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Restart Journey
          </motion.button>
        </div>

        {/* User Feedback Section */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full mt-6 pt-6 border-t border-white/40 backdrop-blur-sm"
          >
            {!feedbackSubmitted ? (
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-700 mb-2">
                  How was your experience with this story?
                </p>
                <textarea
                  value={feedbackText}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setFeedbackText(e.target.value);
                    }
                  }}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 focus:bg-white/70 resize-none text-sm text-gray-700 min-h-[100px] shadow-sm transition-all duration-200"
                  maxLength={500}
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{feedbackText.length}/500</span>
                </div>
                {feedbackText.trim() && (
                  <motion.label
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={shareTextConsent}
                      onChange={(e) => setShareTextConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-pink-500 bg-white/50 border-gray-300 rounded focus:ring-pink-300 focus:ring-2"
                      title="Allow sharing feedback for content improvement"
                      placeholder="Allow sharing feedback for content improvement"
                    />
                    <span>
                      Allow sharing this feedback for content improvement (anonymous, first 100
                      characters only)
                    </span>
                  </motion.label>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackText.trim()}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Submit Feedback
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSkipFeedback}
                    className="flex-1 px-4 py-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-md text-gray-700 font-medium rounded-lg border border-white/60 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Skip
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <p className="text-green-600 font-medium">✓ Thank you for sharing!</p>
                <p className="text-sm text-gray-500 mt-1">Your feedback means a lot</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Buy Me a Coffee Support */}
        <div className="w-full mt-6 pt-6 border-t border-white/40 backdrop-blur-sm">
          <p className="text-center text-sm text-gray-700 mb-3">Thank you for being here ❤️</p>
          <motion.a
            href="https://buymeacoffee.com/iceeworld94"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCoffeeClick}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#FF5F5F] to-[#FF7676] hover:from-[#FF4545] hover:to-[#FF5F5F] text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <img
              src="https://media.giphy.com/media/TDQOtnWgsBx99cNoyH/giphy.gif"
              alt="Coffee cup"
              width="20"
              height="20"
              className="object-contain"
            />
            <span>Buy me a coffee</span>
          </motion.a>
          <p className="text-center text-xs text-gray-600 mt-3 px-4">
            When you tip, I'll add your name and a little heart on landing page at 21th Feb for the
            next 3 months ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};
