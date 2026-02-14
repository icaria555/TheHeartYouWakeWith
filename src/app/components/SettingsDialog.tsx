import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  revokeAnalyticsConsent,
  initializeAnalytics,
} from "../../lib/analytics";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const [currentConsent, setCurrentConsent] = useState<boolean | null>(getAnalyticsConsent());

  const handleConsentChange = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setCurrentConsent(granted);
    if (granted) {
      initializeAnalytics();
    }
  };

  const handleRevokeConsent = () => {
    revokeAnalyticsConsent();
    setCurrentConsent(null);
  };

  const getConsentStatus = () => {
    if (currentConsent === true) return "Analytics Enabled";
    if (currentConsent === false) return "Analytics Disabled";
    return "Not Set";
  };

  const getConsentColor = () => {
    if (currentConsent === true) return "text-green-600";
    if (currentConsent === false) return "text-gray-600";
    return "text-orange-600";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Privacy Settings</h3>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close settings"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Current Status */}
              <div className="mb-6 p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <p className="text-sm text-gray-700 mb-1">Current Status</p>
                <p className={`text-lg font-semibold ${getConsentColor()}`}>{getConsentStatus()}</p>
              </div>

              {/* Analytics Information */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">What we collect:</h4>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>Your story choices and paths taken</li>
                  <li>Ending reached and dimensional scores</li>
                  <li>Session duration and completion rate</li>
                  <li>Anonymous feedback (if you choose to share)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">
                  ✅ We never collect names, emails, or personal information
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {currentConsent !== true && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleConsentChange(true)}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Enable Analytics
                  </motion.button>
                )}

                {currentConsent !== false && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleConsentChange(false)}
                    className="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Disable Analytics
                  </motion.button>
                )}

                {currentConsent !== null && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRevokeConsent}
                    className="w-full px-4 py-2.5 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 text-sm"
                  >
                    Reset to Ask Again
                  </motion.button>
                )}
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Changes take effect immediately
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
