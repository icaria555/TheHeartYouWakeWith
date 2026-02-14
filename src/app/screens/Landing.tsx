import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Settings } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ConsentDialog } from "../components/ConsentDialog";
import { SettingsDialog } from "../components/SettingsDialog";
import { getAnalyticsConsent, setAnalyticsConsent, initializeAnalytics } from "../../lib/analytics";

interface LandingProps {
  onBegin: () => void;
  onConsentChange?: (consent: boolean) => void;
}

export const Landing: React.FC<LandingProps> = ({ onBegin, onConsentChange }) => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = getAnalyticsConsent();
    if (consent === null) {
      // Show consent dialog after a brief delay
      const timer = setTimeout(() => setShowConsentDialog(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === true) {
      // User previously accepted, initialize analytics
      initializeAnalytics();
    }
  }, []);

  const handleAcceptConsent = () => {
    setAnalyticsConsent(true);

    // Also grant audio consent by default
    try {
      localStorage.setItem("audioConsent", "true");
      onConsentChange?.(true); // Notify parent component
    } catch (error) {
      console.warn("Failed to save audio consent:", error);
    }

    setShowConsentDialog(false);
  };

  const handleDeclineConsent = () => {
    setAnalyticsConsent(false);

    // User can still have audio, but we'll ask separately later if needed
    // For now, opting out of analytics also opts out of audio
    try {
      localStorage.setItem("audioConsent", "false");
      onConsentChange?.(false); // Notify parent component
    } catch (error) {
      console.warn("Failed to save audio consent:", error);
    }

    setShowConsentDialog(false);
  };
  return (
    <div className="relative w-full h-full min-h-screen bg-linear-to-b from-pink-200 to-orange-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Settings Button - Top Right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setShowSettingsDialog(true)}
        className="absolute top-6 right-6 z-20 p-3 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Open settings"
      >
        <Settings
          size={20}
          className="text-gray-700 group-hover:text-gray-900 group-hover:rotate-45 transition-all duration-300"
        />
      </motion.button>

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

      {/* Consent Dialog */}
      <ConsentDialog
        isOpen={showConsentDialog}
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
        includeAudio={true}
      />

      {/* Settings Dialog */}
      <SettingsDialog isOpen={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} />
    </div>
  );
};
