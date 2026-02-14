import React, { useState, useEffect } from "react";
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

// Step can be a SceneId or one of the special app states
type Step = "landing" | "relationship" | "ending" | SceneId;

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [showShare, setShowShare] = useState(false);
  const [result, setResult] = useState("A Heart of Love");
  const [scores, setScores] = useState<DimensionScores>(initializeScores());
  const [showMidpointFeedback, setShowMidpointFeedback] = useState(false);
  const [midpointPhrase, setMidpointPhrase] = useState("");
  const [dominantDimension, setDominantDimension] = useState<keyof DimensionScores>("hope");
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [showDevTool, setShowDevTool] = useState(false);

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
    if (midpointScenes.includes(step as string)) {
      const phrase = getMidpointFeedbackPhrase(scores);
      const dimension = getDominantDimension(scores);
      setMidpointPhrase(phrase);
      setDominantDimension(dimension);
      setShowMidpointFeedback(true);

      // Track midpoint reached
      trackMidpointReached(selectedPath, dimension, scores);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowMidpointFeedback(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [step, scores, selectedPath]);

  const handleRelationshipSelect = (selection: string) => {
    // Map the relationship selection to the starting scene of each path
    // and initialize dimensional scores
    let pathName = "A";
    if (selection === "pathA") {
      pathName = "A";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.A));
      setStep("A1");
    } else if (selection === "pathB") {
      pathName = "B";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.B));
      setStep("B1");
    } else if (selection === "pathC") {
      pathName = "C";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.C));
      setStep("C1");
    } else {
      // Fallback
      pathName = "A";
      setScores(applyChoiceScore(initializeScores(), PATH_INITIAL_SCORES.A));
      setStep("A1");
    }
    setSelectedPath(pathName);
    trackPathSelected(pathName);
  };

  const handleSceneChoice = (nextSceneId: SceneId, choiceIndex: number) => {
    // Get the current scene and apply the choice's dimensional scores
    const currentScene = STORY_DATA[step as SceneId];
    if (currentScene && currentScene.choices[choiceIndex]?.scores) {
      const choice = currentScene.choices[choiceIndex];
      const newScores = applyChoiceScore(scores, choice.scores!);
      setScores(newScores);

      // Track choice made
      trackChoice(step as string, choice.label, choice.scores!);

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
      } else {
        setStep(nextSceneId);
      }
    } else {
      // Fallback: no scores to apply, just navigate
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
      } else {
        setStep(nextSceneId);
      }
    }
  };

  const handleRestart = () => {
    setStep("landing");
    setShowShare(false);
    setScores(initializeScores());
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
      {step === "landing" && <Landing onBegin={() => setStep("relationship")} />}

      {step === "relationship" && <RelationshipSelection onSelect={handleRelationshipSelect} />}

      {/* Check if current step corresponds to a valid story scene */}
      {currentScene && step !== "ending" && step !== "landing" && step !== "relationship" && (
        <StoryScene
          variant={currentScene.variant}
          text={currentScene.text}
          illustrationSrc={currentScene.illustrationSrc}
          choices={currentScene.choices.map((choice, index) => ({
            label: choice.label,
            onClick: () => handleSceneChoice(choice.nextSceneId, index),
          }))}
        />
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
