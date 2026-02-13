import React, { useState } from "react";
import { Landing } from "./screens/Landing";
import { RelationshipSelection } from "./screens/RelationshipSelection";
import { StoryScene } from "./screens/StoryScene";
import { Ending } from "./screens/Ending";
import { ShareCard } from "./screens/ShareCard";
import { STORY_DATA, SceneId } from "./data/storyData";

// Step can be a SceneId or one of the special app states
type Step = "landing" | "relationship" | "ending" | SceneId;

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [showShare, setShowShare] = useState(false);
  const [result, setResult] = useState("A Heart of Love");

  const handleRelationshipSelect = (selection: string) => {
    // Map the relationship selection to the starting scene of each path
    if (selection === "pathA") {
      setStep("A1");
    } else if (selection === "pathB") {
      setStep("B1");
    } else if (selection === "pathC") {
      setStep("C1");
    } else {
      // Fallback
      setStep("A1");
    }
  };

  const handleSceneChoice = (nextSceneId: SceneId) => {
    // Check if the next scene is an ending
    if (nextSceneId.startsWith("END_")) {
      const endingScene = STORY_DATA[nextSceneId];
      if (endingScene && endingScene.result) {
        setResult(endingScene.result);
      }
      setStep("ending");
    } else {
      setStep(nextSceneId);
    }
  };

  const handleRestart = () => {
    setStep("landing");
    setShowShare(false);
  };

  const currentScene = STORY_DATA[step as SceneId];

  return (
    <div className="font-sans text-gray-900 antialiased">
      {step === "landing" && <Landing onBegin={() => setStep("relationship")} />}

      {step === "relationship" && (
        <RelationshipSelection onSelect={handleRelationshipSelect} />
      )}

      {/* Check if current step corresponds to a valid story scene */}
      {currentScene && step !== "ending" && step !== "landing" && step !== "relationship" && (
        <StoryScene
          variant={currentScene.variant}
          text={currentScene.text}
          illustrationSrc={currentScene.illustrationSrc}
          choices={currentScene.choices.map((choice) => ({
            label: choice.label,
            onClick: () => handleSceneChoice(choice.nextSceneId),
          }))}
        />
      )}

      {step === "ending" && (
        <Ending
          onRestart={handleRestart}
          onShare={() => setShowShare(true)}
          resultMessage={result}
        />
      )}

      {showShare && (
        <ShareCard
          onClose={() => setShowShare(false)}
          resultMessage={result}
        />
      )}
    </div>
  );
}
