import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ConsentDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const ConsentDialog: React.FC<ConsentDialogProps> = ({ isOpen, onAccept, onDecline }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Privacy Matters</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                We'd like to use analytics to understand how people experience this story and
                improve it over time. We'll collect anonymous data about your choices and journey,
                but never any personal information.
              </p>
              <p className="text-xs text-gray-600 mb-6">
                You can change your preference anytime from the settings.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAccept}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Accept
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onDecline}
                  className="flex-1 px-4 py-2.5 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Decline
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
