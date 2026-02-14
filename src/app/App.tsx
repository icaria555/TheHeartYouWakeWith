import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { Landing } from "./screens/Landing";
import { RelationshipSelection } from "./screens/RelationshipSelection";
import { StoryScene } from "./screens/StoryScene";
import { Ending } from "./screens/Ending";
import { ShareCard } from "./screens/ShareCard";
import { STORY_DATA, SceneId, PATH_INITIAL_SCORES } from "./data/storyData";
import {
  DimensionScores,
  initializeScores,
  applyChoiceScore,
  evaluateEnding,
  getMidpointFeedbackPhrase,
  getDominantDimension,
} from "../lib/scoringEngine";
import {
  trackSessionStart,
  trackPathSelected,
  trackChoice,
  trackMidpointReached,
  trackEndingReached,
} from "../lib/analytics";
import { ScoreBalanceTool } from "../dev/ScoreBalanceTool";
import { AudioControls } from "./components/AudioControls";
import { createAudioManager } from "../lib/audioManager";
import { AudioManager, AudioTheme } from "../types/audio";
import { trackAudioEnabled, trackAudioMuted, trackAudioUnmuted } from "../lib/analytics";

// Step can be a SceneId or one of the special app states
type Step = "landing" | "relationship" | "ending" | SceneId;

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [showShare, setShowShare] = useState(false);
  const [result, setResult] = useState("A Heart of Love");
  const [scores, setScores] = useState<DimensionScores>(initializeScores());
  const [showMidpointFeedback, setShowMidpointFeedback] = useState(false);
  const [midpointPhrase, setMidpointPhrase] = useState("");
  const [midpointShown, setMidpointShown] = useState(false);
  const [dominantDimension, setDominantDimension] = useState<keyof DimensionScores>("hope");
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showDevTool, setShowDevTool] = useState(false);

  // Audio state
  const audioManagerRef = useRef<AudioManager | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioConsent, setAudioConsent] = useState<boolean | null>(null);

  // Initialize audio manager
  useEffect(() => {
    audioManagerRef.current = createAudioManager();

    // Check if audio consent was previously given
    try {
      const savedConsent = localStorage.getItem("audioConsent");
      if (savedConsent !== null) {
        setAudioConsent(savedConsent === "true");
      }
    } catch (error) {
      console.warn("Failed to load audio consent:", error);
    }

    return () => {
      if (audioManagerRef.current) {
        audioManagerRef.current.cleanup();
      }
      // Clear any pending transition timeouts
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Check for dev mode access (?dev=scoring)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setShowDevTool(searchParams.get("dev") === "scoring");
  }, []);

  // Track session start when moving from landing to relationship selection
  useEffect(() => {
    if (step === "relationship") {
      trackSessionStart();
    }
  }, [step]);

  // Check if we're at scene 3 (midpoint) and show feedback
  useEffect(() => {
    const midpointScenes = ["A3", "B3", "C3"];
    if (midpointScenes.includes(step as string) && !midpointShown) {
      const phrase = getMidpointFeedbackPhrase(scores);
      const dimension = getDominantDimension(scores);
      setMidpointPhrase(phrase);
      setDominantDimension(dimension);

      // if (!midpointShown) {
      //   console.log("open");
      //   setShowMidpointFeedback(true);
      // }

      // setMidpointShown(true);

      // Track midpoint reached
      trackMidpointReached(selectedPath, dimension, scores);

      // Auto-hide after 5 seconds
      // const timer = setTimeout(() => {
      //   setShowMidpointFeedback(false);
      // }, 4000);

      // return () => clearTimeout(timer);
    }
  }, [step, scores, selectedPath, midpointShown]);

  const handleRelationshipSelect = async (selection: string) => {
    // Map the relationship selection to the starting scene of each path
    // and initialize dimensional scores
    let pathName = "A";
    let audioTheme: AudioTheme = "hopeful";

    // Reset midpoint feedback flag for new journey
    setMidpointShown(false);

    if (selection === "pathA") {
      pathName = "A";
      audioTheme = "hopeful";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.A));
      setStep("A1");
    } else if (selection === "pathB") {
      pathName = "B";
      audioTheme = "reflective";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.B));
      setStep("B1");
    } else if (selection === "pathC") {
      pathName = "C";
      audioTheme = "melancholic";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.C));
      setStep("C1");
    } else {
      // Fallback
      pathName = "A";
      audioTheme = "hopeful";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.A));
      setStep("A1");
    }
    setSelectedPath(pathName);
    trackPathSelected(pathName);

    // Start audio if consent was given
    if (audioConsent && audioManagerRef.current) {
      try {
        if (!audioInitialized) {
          console.log("🎵 Initializing audio system...");
          await audioManagerRef.current.initialize();
          setAudioInitialized(true);
          console.log("🎵 Audio system initialized");
        }

        console.log(`🎵 Starting audio theme: ${audioTheme}`);
        await audioManagerRef.current.play(audioTheme);
        setIsAudioPlaying(true);
        trackAudioEnabled(pathName, audioTheme);
        console.log("🎵 Audio playback started");
      } catch (error) {
        console.error("Failed to initialize or play audio:", error);
      }
    }
  };

  const handleSceneChoice = (nextSceneId: SceneId, choiceIndex: number) => {
    // Prevent double-clicks during transition
    if (isTransitioning) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Get the current scene and apply the choice's dimensional scores
    const currentScene = STORY_DATA[step as SceneId];
    if (currentScene && currentScene.choices[choiceIndex]?.scores) {
      const choice = currentScene.choices[choiceIndex];
      const newScores = applyChoiceScore(scores, choice.scores!);
      setScores(newScores);

      // Track choice made
      trackChoice(step as string, choice.label, choice.scores!);

      // Set transitioning state
      setIsTransitioning(true);

      // Apply transition delay (300ms for acknowledgment, reduced motion: instant)
      const transitionDelay = prefersReducedMotion ? 0 : 300;

      transitionTimeoutRef.current = setTimeout(() => {
        // Check if the next scene is the dynamic ending
        if (nextSceneId === "ENDING") {
          // Evaluate which ending the user should receive based on their dimensional scores
          const endingId = evaluateEnding(newScores);

          // Map ending ID to result title
          const endingTitleMap: Record<string, string> = {
            E1: "The Brave Heart",
            E2: "The Quiet Protector",
            E3: "The Heart That Waits",
            E4: "The Hopeful Believer",
            E5: "The Lonely Companion",
            E6: "The Open Heart",
            E7: "The Guarded Soul",
            E8: "The Quiet Dreamer",
            E9: "The Growing Soul",
            E10: "The Mirror Seeker",
            E11: "The Forgiver",
            E12: "The Passionate Wanderer",
            E13: "The Peaceful One",
            E14: "The Shadow Holder",
            E15: "The Unnamed Heart",
            E16: "The Heart Between Worlds",
          };

          const endingTitle = endingTitleMap[endingId] || "The Brave Heart";
          setResult(endingTitle);

          // Track ending reached
          trackEndingReached(endingId, endingTitle, newScores, selectedPath);

          setStep("ending");
          setIsTransitioning(false);
        } else {
          setStep(nextSceneId);
          setIsTransitioning(false);
        }
      }, transitionDelay);
    } else {
      // Fallback: no scores to apply, just navigate
      // Set transitioning state
      setIsTransitioning(true);

      // Apply transition delay (600ms for acknowledgment, reduced motion: instant)
      const transitionDelay = prefersReducedMotion ? 0 : 600;

      transitionTimeoutRef.current = setTimeout(() => {
        if (nextSceneId === "ENDING") {
          const endingId = evaluateEnding(scores);
          const endingTitleMap: Record<string, string> = {
            E1: "The Brave Heart",
            E2: "The Quiet Protector",
            E3: "The Heart That Waits",
            E4: "The Hopeful Believer",
            E5: "The Lonely Companion",
            E6: "The Open Heart",
            E7: "The Guarded Soul",
            E8: "The Quiet Dreamer",
            E9: "The Growing Soul",
            E10: "The Mirror Seeker",
            E11: "The Forgiver",
            E12: "The Passionate Wanderer",
            E13: "The Peaceful One",
            E14: "The Shadow Holder",
            E15: "The Unnamed Heart",
            E16: "The Heart Between Worlds",
          };
          const endingTitle = endingTitleMap[endingId] || "The Brave Heart";
          setResult(endingTitle);

          // Track ending reached
          trackEndingReached(endingId, endingTitle, scores, selectedPath);

          setStep("ending");
          setIsTransitioning(false);
        } else {
          setStep(nextSceneId);
          setIsTransitioning(false);
        }
      }, transitionDelay);
    }
  };

  const handleRestart = () => {
    // Clear any pending transitions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    setIsTransitioning(false);

    setStep("landing");
    setShowShare(false);
    setScores(initializeScores());
    setMidpointShown(false);
  };

  const handleBeginJourney = async () => {
    // Reload audio consent from localStorage in case it was just set
    try {
      const savedConsent = localStorage.getItem("audioConsent");
      if (savedConsent !== null) {
        const consentValue = savedConsent === "true";
        setAudioConsent(consentValue);
        console.log("🎵 Audio consent loaded:", consentValue);
      }
    } catch (error) {
      console.warn("Failed to reload audio consent:", error);
    }

    setStep("relationship");
  };

  const handleToggleAudio = () => {
    if (!audioManagerRef.current) return;

    if (audioManagerRef.current.isMuted()) {
      audioManagerRef.current.unmute();
      setIsAudioMuted(false);
      trackAudioUnmuted(selectedPath);
    } else {
      audioManagerRef.current.mute();
      setIsAudioMuted(true);
      trackAudioMuted(selectedPath);
    }

    console.log(
      "🎵 Audio toggled. Muted:",
      audioManagerRef.current.isMuted(),
      "Playing:",
      !!audioManagerRef.current,
    );
  };

  const currentScene = STORY_DATA[step as SceneId];

  // Get dimension-based colors for midpoint feedback modal
  const getDimensionColors = (dimension: keyof DimensionScores) => {
    const colorMap: Record<keyof DimensionScores, { bg: string; text: string }> = {
      honesty: { bg: "from-cyan-400 to-blue-500", text: "text-white" },
      vulnerability: { bg: "from-rose-300 to-pink-500", text: "text-white" },
      hope: { bg: "from-amber-300 to-yellow-400", text: "text-amber-900" },
      selfWorth: { bg: "from-purple-400 to-violet-600", text: "text-white" },
      action: { bg: "from-orange-400 to-red-500", text: "text-white" },
      compassion: { bg: "from-emerald-300 to-green-500", text: "text-white" },
    };
    return colorMap[dimension];
  };

  const dimensionColors = getDimensionColors(dominantDimension);

  // Render dev tool if accessed via ?dev=scoring
  if (showDevTool) {
    return <ScoreBalanceTool onClose={() => setShowDevTool(false)} />;
  }

  return (
    <div className="font-sans text-gray-900 antialiased relative">
      {/* Audio Controls */}
      <AudioControls
        isMuted={isAudioMuted}
        onToggleMute={handleToggleAudio}
        isPlaying={isAudioPlaying}
      />

      {step === "landing" && (
        <Landing
          onBegin={handleBeginJourney}
          onConsentChange={(consent) => {
            setAudioConsent(consent);
            console.log("🎵 Audio consent changed:", consent);
          }}
        />
      )}

      {step === "relationship" && <RelationshipSelection onSelect={handleRelationshipSelect} />}

      {/* Check if current step corresponds to a valid story scene */}
      {currentScene && step !== "ending" && step !== "landing" && step !== "relationship" && (
        <AnimatePresence mode="wait">
          <StoryScene
            key={step}
            isTransitioning={isTransitioning}
            variant={currentScene.variant}
            text={currentScene.text}
            illustrationSrc={currentScene.illustrationSrc}
            choices={currentScene.choices.map((choice, index) => ({
              label: choice.label,
              onClick: () => handleSceneChoice(choice.nextSceneId, index),
            }))}
          />
        </AnimatePresence>
      )}

      {/* Midpoint feedback overlay */}
      {showMidpointFeedback && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 midpoint-feedback" />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none midpoint-feedback">
            <div
              className={`bg-gradient-to-br ${dimensionColors.bg} px-10 py-8 rounded-2xl shadow-2xl max-w-lg mx-4 pointer-events-auto`}
            >
              <p
                className={`text-2xl ${dimensionColors.text} italic font-serif leading-relaxed text-center`}
              >
                {midpointPhrase}
              </p>
            </div>
          </div>
        </>
      )}

      {step === "ending" && (
        <Ending
          onRestart={handleRestart}
          onShare={() => setShowShare(true)}
          resultMessage={result}
        />
      )}

      {showShare && <ShareCard onClose={() => setShowShare(false)} resultMessage={result} />}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .midpoint-feedback {
          animation: fadeInOut 5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
