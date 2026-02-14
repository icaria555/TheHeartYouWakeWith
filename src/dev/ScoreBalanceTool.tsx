/**
 * Score Balance Tool - Development utility for testing the scoring system
 *
 * PURPOSE:
 * This tool helps developers validate the dimensional scoring system and ensure all 16
 * endings are reachable with balanced distribution. It simulates user journeys through
 * the interactive story and analyzes ending reachability patterns.
 *
 * ACCESS:
 * Add URL parameter: ?dev=scoring
 * Example: http://localhost:5174/?dev=scoring
 *
 * FEATURES:
 * 1. Interactive Builder Tab
 *    - Manual path simulation: Select path (A/B/C) and step through scenes
 *    - Real-time score tracking: See all 6 dimensional scores update with each choice
 *    - Visual feedback: Color-coded bars show positive/negative score changes
 *    - Choice history: Track decisions made throughout the path
 *    - Export test cases: Save choice sequences as JSON for regression testing
 *
 * 2. Ending Coverage Tab
 *    - Run exhaustive analysis across all paths (A, B, C)
 *    - Check reachability: Verify all 16 endings can be reached
 *    - Frequency distribution: See percentage breakdown of endings
 *    - Balance validation: Identify dominant (>30%) or unreachable endings
 *    - Statistics dashboard: Quick metrics on reachable/rare/unreachable endings
 *
 * 3. Path Analysis Tab
 *    - Score range inspection: View current dimensional scores
 *    - Balance warnings: Detect distribution issues automatically
 *    - Recommendations: Guidelines for ending balance (all reachable, <30% each, <5% secret)
 *
 * 4. Analytics Tab
 *    - Consent status: Check if user has granted analytics consent
 *    - Event catalog: List all 9 tracked GA4 events with parameters
 *    - Data categories: Overview of collected data (journey, scores, outcomes, feedback)
 *    - Privacy features: IP anonymization, consent management, text truncation
 *    - Developer notes: GA4 dashboard access, debug mode, testing tips
 *
 * TESTING WORKFLOW:
 * 1. Access tool via ?dev=scoring
 * 2. Use Interactive Builder to manually test specific paths
 * 3. Run Ending Coverage analysis to check reachability
 * 4. Review Path Analysis for balance warnings
 * 5. Check Analytics tab for tracking status
 * 6. Export test cases for regression testing
 *
 * SUCCESS CRITERIA:
 * - All 16 endings reachable: ✓ No ending shows ✗ (unreachable)
 * - Balanced distribution: No ending >30% frequency
 * - Secret endings rare: E15 and E16 <5% frequency
 * - Fast analysis: Exhaustive analysis completes in <10 seconds
 *
 * TECHNICAL DETAILS:
 * - Path Analysis: Tests 16+ combinations per path (sampling strategy)
 * - Full Exhaustive: Would be 2^10 = 1,024 combinations per path (not implemented)
 * - Score Range: -6 to +6 per dimension (typical)
 * - Dimensions: honesty, vulnerability, hope, selfWorth, action, compassion
 * - Paths: A (relationship+plans), B (relationship, no plans), C (single)
 *
 * DATA SOURCES:
 * - STORY_DATA: Scene and choice structure (storyData.ts)
 * - scoringEngine: Score calculation and ending evaluation (scoringEngine.ts)
 * - ENDING_CONDITIONS: 16 ending definitions with conditional logic
 * - RESULT_DATA: Ending titles and descriptions
 * - analytics: Consent status and event tracking configuration
 *
 * MAINTENANCE:
 * - Update when adding new endings or changing score thresholds
 * - Re-run analysis after modifying choice scores
 * - Keep sampling strategy balanced (currently 16 combos per path)
 * - Verify all paths after major story structure changes
 *
 * @module ScoreBalanceTool
 * @category Development
 * @access Developer-only (requires ?dev=scoring URL parameter)
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, RotateCcw, Download, Upload, BarChart3, List, Play, Activity } from "lucide-react";
import {
  type DimensionScores,
  initializeScores,
  applyChoiceScore,
  evaluateEnding,
  ENDING_CONDITIONS,
} from "../lib/scoringEngine";
import { STORY_DATA, type SceneId, type Scene } from "../app/data/storyData";
import { RESULT_DATA } from "../app/data/resultData";
import { getAnalyticsConsent } from "../lib/analytics";
import { ANALYTICS_EVENTS } from "../lib/analyticsConfig";

interface PathState {
  path: "A" | "B" | "C" | null;
  currentScene: SceneId | null;
  scores: DimensionScores;
  choiceHistory: Array<{ sceneId: SceneId; choiceIndex: number; label: string }>;
}

interface EndingReachability {
  endingId: string;
  title: string;
  reached: boolean;
  examplePath?: string;
  percentage: number;
}

type TabType = "interactive" | "coverage" | "analysis" | "analytics";

// Map ending IDs to result titles
const ENDING_TITLE_MAP: Record<string, string> = {
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

export const ScoreBalanceTool: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>("interactive");
  const [pathState, setPathState] = useState<PathState>({
    path: null,
    currentScene: null,
    scores: initializeScores(),
    choiceHistory: [],
  });
  const [endingCoverage, setEndingCoverage] = useState<EndingReachability[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize path
  const handleSelectPath = (selectedPath: "A" | "B" | "C") => {
    let initialScores = initializeScores();

    // Apply initial scores based on path
    switch (selectedPath) {
      case "A":
        initialScores = { ...initialScores, hope: 1, honesty: 1 };
        break;
      case "B":
        initialScores = { ...initialScores, hope: -1, selfWorth: -1 };
        break;
      case "C":
        initialScores = { ...initialScores, selfWorth: 1, action: -1 };
        break;
    }

    setPathState({
      path: selectedPath,
      currentScene: `${selectedPath}1`,
      scores: initialScores,
      choiceHistory: [],
    });
  };

  // Make a choice
  const handleChoice = (choiceIndex: number) => {
    if (!pathState.currentScene) return;

    const scene = STORY_DATA[pathState.currentScene];
    if (!scene || !scene.choices) return;

    const choice = scene.choices[choiceIndex];
    const newScores = applyChoiceScore(pathState.scores, choice.scores || {});

    setPathState({
      ...pathState,
      currentScene: choice.nextSceneId === "ENDING" ? null : choice.nextSceneId,
      scores: newScores,
      choiceHistory: [
        ...pathState.choiceHistory,
        { sceneId: pathState.currentScene, choiceIndex, label: choice.label },
      ],
    });
  };

  // Reset path
  const handleReset = () => {
    if (pathState.path) {
      handleSelectPath(pathState.path);
    }
  };

  // Run exhaustive analysis
  const analyzeAllPaths = async () => {
    setIsAnalyzing(true);

    // Simulate async analysis
    await new Promise((resolve) => setTimeout(resolve, 100));

    const paths: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const allEndingResults: { [key: string]: number } = {};
    let totalSimulations = 0;

    // For each path, enumerate all possible choice combinations
    paths.forEach((path) => {
      const scenes = Object.keys(STORY_DATA).filter((id) => id.startsWith(path));
      const reachableScenes = scenes.filter((id) => STORY_DATA[id].choices).sort();

      // Simplified: test key combinations rather than exhaustive (would be 2^10 per path)
      const testCombinations = generateTestCombinations(path);

      testCombinations.forEach((choices) => {
        const result = simulateChoicePath(path, choices);
        if (result.ending) {
          allEndingResults[result.ending] = (allEndingResults[result.ending] || 0) + 1;
          totalSimulations++;
        }
      });
    });

    // Calculate ending reachability
    const coverage: EndingReachability[] = ENDING_CONDITIONS.map((condition) => {
      const count = allEndingResults[condition.id] || 0;
      const percentage = totalSimulations > 0 ? (count / totalSimulations) * 100 : 0;
      const endingTitle = ENDING_TITLE_MAP[condition.id] || condition.id;

      return {
        endingId: condition.id,
        title: RESULT_DATA[endingTitle]?.title || endingTitle,
        reached: count > 0,
        percentage,
      };
    });

    setEndingCoverage(coverage.sort((a, b) => b.percentage - a.percentage));
    setIsAnalyzing(false);
  };

  // Generate test combinations (sampling strategy)
  const generateTestCombinations = (path: "A" | "B" | "C"): number[][] => {
    const combinations: number[][] = [];

    // All zeros (always choose first option)
    combinations.push([0, 0, 0, 0, 0]);

    // All ones (always choose second option)
    combinations.push([1, 1, 1, 1, 1]);

    // Alternating patterns
    combinations.push([0, 1, 0, 1, 0]);
    combinations.push([1, 0, 1, 0, 1]);

    // Weighted towards first/second
    combinations.push([0, 0, 0, 1, 1]);
    combinations.push([1, 1, 1, 0, 0]);
    combinations.push([0, 0, 1, 1, 1]);
    combinations.push([1, 1, 0, 0, 0]);

    // Random sampling
    for (let i = 0; i < 8; i++) {
      combinations.push([
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
        Math.random() > 0.5 ? 1 : 0,
      ]);
    }

    return combinations;
  };

  // Simulate a choice path
  const simulateChoicePath = (path: "A" | "B" | "C", choices: number[]) => {
    let scores = initializeScores();

    // Apply initial scores
    switch (path) {
      case "A":
        scores = { ...scores, hope: 1, honesty: 1 };
        break;
      case "B":
        scores = { ...scores, hope: -1, selfWorth: -1 };
        break;
      case "C":
        scores = { ...scores, selfWorth: 1, action: -1 };
        break;
    }

    let currentScene: SceneId = `${path}1`;
    let choiceIndex = 0;

    // Follow the choice path
    while (currentScene !== "ENDING" && choiceIndex < choices.length) {
      const scene = STORY_DATA[currentScene];
      if (!scene || !scene.choices) break;

      const choice = scene.choices[choices[choiceIndex] % scene.choices.length];
      scores = applyChoiceScore(scores, choice.scores || {});
      currentScene = choice.nextSceneId;
      choiceIndex++;
    }

    const ending = evaluateEnding(scores);
    return { ending, scores };
  };

  // Export test case
  const exportTestCase = () => {
    const data = {
      path: pathState.path,
      choices: pathState.choiceHistory,
      scores: pathState.scores,
      ending: pathState.currentScene === null ? evaluateEnding(pathState.scores) : null,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `score-test-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate current ending
  const currentEnding = pathState.currentScene === null ? evaluateEnding(pathState.scores) : null;
  const currentScene = pathState.currentScene ? STORY_DATA[pathState.currentScene] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="min-h-screen p-4 md:p-8"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BarChart3 size={28} />
                  Score Balance Tool
                </h2>
                <p className="text-violet-100 text-sm mt-1">Development Testing Utility</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close tool"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex gap-1 px-6">
                {[
                  { id: "interactive" as TabType, label: "Interactive Builder", icon: Play },
                  { id: "coverage" as TabType, label: "Ending Coverage", icon: List },
                  { id: "analysis" as TabType, label: "Path Analysis", icon: BarChart3 },
                  { id: "analytics" as TabType, label: "Analytics", icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 ${
                      activeTab === tab.id
                        ? "border-violet-500 text-violet-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 min-h-[600px]">
              {activeTab === "interactive" && (
                <InteractiveBuilderTab
                  pathState={pathState}
                  currentScene={currentScene}
                  currentEnding={currentEnding}
                  onSelectPath={handleSelectPath}
                  onChoice={handleChoice}
                  onReset={handleReset}
                  onExport={exportTestCase}
                />
              )}

              {activeTab === "coverage" && (
                <EndingCoverageTab
                  coverage={endingCoverage}
                  isAnalyzing={isAnalyzing}
                  onAnalyze={analyzeAllPaths}
                />
              )}

              {activeTab === "analysis" && (
                <PathAnalysisTab coverage={endingCoverage} pathState={pathState} />
              )}

              {activeTab === "analytics" && <AnalyticsTab />}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Interactive Builder Tab Component
const InteractiveBuilderTab: React.FC<{
  pathState: PathState;
  currentScene: Scene | null;
  currentEnding: string | null;
  onSelectPath: (path: "A" | "B" | "C") => void;
  onChoice: (index: number) => void;
  onReset: () => void;
  onExport: () => void;
}> = ({ pathState, currentScene, currentEnding, onSelectPath, onChoice, onReset, onExport }) => {
  return (
    <div className="space-y-6">
      {/* Path Selection */}
      {!pathState.path && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Starting Path</h3>
          <div className="grid grid-cols-3 gap-4">
            {(["A", "B", "C"] as const).map((path) => (
              <button
                key={path}
                onClick={() => onSelectPath(path)}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all"
              >
                <div className="text-2xl font-bold text-violet-600 mb-2">Path {path}</div>
                <div className="text-sm text-gray-600">
                  {path === "A" && "Relationship + Plans"}
                  {path === "B" && "Relationship, No Plans"}
                  {path === "C" && "Single"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Path */}
      {pathState.path && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-600">Current Path:</span>
              <span className="ml-2 text-lg font-bold text-violet-600">Path {pathState.path}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onReset}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={onExport}
                className="px-3 py-2 text-sm bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Score Visualization */}
          <ScoreVisualization scores={pathState.scores} />

          {/* Current Scene */}
          {currentScene && (
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scene: {pathState.currentScene}</h4>
              <p className="text-gray-700 mb-4">{currentScene.text}</p>

              <div className="space-y-2">
                {currentScene.choices?.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoice(index)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-violet-400 hover:bg-violet-50 transition-all group"
                  >
                    <div className="font-medium text-gray-900 group-hover:text-violet-700">
                      {choice.label}
                    </div>
                    {choice.scores && Object.keys(choice.scores).length > 0 && (
                      <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
                        {Object.entries(choice.scores).map(([dim, val]) => (
                          <span
                            key={dim}
                            className={`px-2 py-0.5 rounded ${
                              val > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {dim}: {val > 0 ? "+" : ""}
                            {val}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ending Result */}
          {currentEnding && (
            <div className="border-2 border-violet-300 bg-violet-50 rounded-xl p-4">
              <h4 className="font-semibold text-violet-900 mb-2">🎯 Ending Reached</h4>
              <div className="text-lg font-bold text-violet-700">{currentEnding}</div>
              <div className="text-sm text-violet-600 mt-1">
                {RESULT_DATA[ENDING_TITLE_MAP[currentEnding]]?.title ||
                  ENDING_TITLE_MAP[currentEnding] ||
                  "Unknown Ending"}
              </div>
            </div>
          )}

          {/* Choice History */}
          {pathState.choiceHistory.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Choice History</h4>
              <div className="space-y-2">
                {pathState.choiceHistory.map((choice, index) => (
                  <div key={index} className="text-sm flex items-start gap-2">
                    <span className="font-mono text-gray-500">{index + 1}.</span>
                    <span className="text-gray-700">{choice.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Score Visualization Component
const ScoreVisualization: React.FC<{ scores: DimensionScores }> = ({ scores }) => {
  const dimensions: Array<{ key: keyof DimensionScores; label: string }> = [
    { key: "honesty", label: "Honesty" },
    { key: "vulnerability", label: "Vulnerability" },
    { key: "hope", label: "Hope" },
    { key: "selfWorth", label: "Self-Worth" },
    { key: "action", label: "Action" },
    { key: "compassion", label: "Compassion" },
  ];

  const maxScore = 6;

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <h4 className="font-semibold text-gray-900 mb-4">Dimensional Scores</h4>
      <div className="space-y-3">
        {dimensions.map(({ key, label }) => {
          const value = scores[key];
          const percentage = ((value + maxScore) / (maxScore * 2)) * 100;
          const isPositive = value > 0;
          const isNegative = value < 0;

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span
                  className={`text-sm font-bold ${
                    isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {value > 0 ? "+" : ""}
                  {value}
                </span>
              </div>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 ${
                    isPositive
                      ? "bg-gradient-to-r from-green-400 to-green-500"
                      : isNegative
                        ? "bg-gradient-to-r from-red-400 to-red-500"
                        : "bg-gray-300"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-px h-full bg-gray-400" style={{ marginLeft: "50%" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Ending Coverage Tab Component
const EndingCoverageTab: React.FC<{
  coverage: EndingReachability[];
  isAnalyzing: boolean;
  onAnalyze: () => void;
}> = ({ coverage, isAnalyzing, onAnalyze }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Ending Reachability Analysis</h3>
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          {isAnalyzing ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {coverage.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-violet-600">
                {coverage.filter((e) => e.reached).length}/16
              </div>
              <div className="text-sm text-gray-600">Reachable Endings</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...coverage.map((e) => e.percentage)).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Most Common</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">
                {coverage.filter((e) => e.reached && e.percentage < 5).length}
              </div>
              <div className="text-sm text-gray-600">Rare Endings (&lt;5%)</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">
                {coverage.filter((e) => !e.reached).length}
              </div>
              <div className="text-sm text-gray-600">Unreachable</div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Ending
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coverage.map((ending) => (
                  <tr key={ending.endingId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {ending.reached ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-red-600 text-xl">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-900">{ending.endingId}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{ending.title}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              ending.percentage > 30
                                ? "bg-red-500"
                                : ending.percentage > 15
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(ending.percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12 text-right">
                          {ending.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {coverage.length === 0 && !isAnalyzing && (
        <div className="text-center py-12 text-gray-500">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
          <p>Click "Run Analysis" to analyze ending distribution</p>
        </div>
      )}
    </div>
  );
};

// Path Analysis Tab Component
const PathAnalysisTab: React.FC<{
  coverage: EndingReachability[];
  pathState: PathState;
}> = ({ coverage, pathState }) => {
  const warnings: string[] = [];

  // Check for dominant endings
  const dominantEndings = coverage.filter((e) => e.percentage > 30);
  if (dominantEndings.length > 0) {
    warnings.push(
      `⚠️ Dominant endings detected: ${dominantEndings.map((e) => `${e.endingId} (${e.percentage.toFixed(1)}%)`).join(", ")}`,
    );
  }

  // Check for unreachable endings
  const unreachable = coverage.filter((e) => !e.reached);
  if (unreachable.length > 0) {
    warnings.push(`❌ Unreachable endings: ${unreachable.map((e) => e.endingId).join(", ")}`);
  }

  // Check secret ending frequency
  const secretEndings = coverage.filter((e) => ["E15", "E16"].includes(e.endingId));
  const tooCommonSecret = secretEndings.filter((e) => e.percentage > 5);
  if (tooCommonSecret.length > 0) {
    warnings.push(
      `⚠️ Secret endings too common: ${tooCommonSecret.map((e) => `${e.endingId} (${e.percentage.toFixed(1)}%)`).join(", ")}`,
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Path Analysis</h3>

      {/* Score Ranges */}
      {pathState.path && (
        <div className="border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Current Score Ranges</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(pathState.scores).map(([dim, value]) => (
              <div key={dim} className="text-sm">
                <span className="font-medium text-gray-700">{dim}:</span>
                <span
                  className={`ml-2 font-bold ${
                    value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {value > 0 ? "+" : ""}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="border-2 border-orange-300 bg-orange-50 rounded-xl p-4">
          <h4 className="font-semibold text-orange-900 mb-3">Balance Warnings</h4>
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <div key={index} className="text-sm text-orange-800">
                {warning}
              </div>
            ))}
          </div>
        </div>
      )}

      {coverage.length > 0 && warnings.length === 0 && (
        <div className="border-2 border-green-300 bg-green-50 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 mb-2">✓ Balance Looks Good</h4>
          <p className="text-sm text-green-800">
            No major issues detected. Endings are well-distributed and all reachable.
          </p>
        </div>
      )}

      {/* Recommendations */}
      <div className="border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Endings should be &lt;30% frequency for good variety</li>
          <li>• Secret endings (E15, E16) should be &lt;5% for rarity</li>
          <li>• All 16 endings should be reachable through valid paths</li>
          <li>• Dimension scores typically range from -6 to +6</li>
        </ul>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab: React.FC = () => {
  const consentStatus = getAnalyticsConsent();

  const getConsentStatusInfo = () => {
    if (consentStatus === true) {
      return {
        label: "Enabled",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "✓",
      };
    } else if (consentStatus === false) {
      return {
        label: "Disabled",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "✗",
      };
    } else {
      return {
        label: "Not Set",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: "?",
      };
    }
  };

  const statusInfo = getConsentStatusInfo();

  const trackedEvents = [
    {
      name: ANALYTICS_EVENTS.SESSION_START,
      description: "User starts a new story session",
      params: ["event_category: engagement"],
    },
    {
      name: ANALYTICS_EVENTS.PATH_SELECTED,
      description: "User selects a relationship path (A, B, or C)",
      params: ["event_category: user_action", "path_name: A|B|C"],
    },
    {
      name: ANALYTICS_EVENTS.CHOICE_MADE,
      description: "User makes a choice in a scene",
      params: [
        "event_category: user_action",
        "scene_id: string",
        "choice_label: string",
        "6 dimension deltas (honesty, vulnerability, hope, selfWorth, action, compassion)",
      ],
    },
    {
      name: ANALYTICS_EVENTS.MIDPOINT_REACHED,
      description: "User reaches scene 3 (midpoint) in any path",
      params: [
        "event_category: milestone",
        "path_name: string",
        "dominant_dimension: string",
        "6 dimension scores",
      ],
    },
    {
      name: ANALYTICS_EVENTS.ENDING_REACHED,
      description: "User completes the story and sees an ending",
      params: [
        "event_category: completion",
        "ending_id: E1-E16",
        "ending_title: string",
        "path_name: string",
        "6 dimension scores",
      ],
    },
    {
      name: ANALYTICS_EVENTS.FEEDBACK_SUBMITTED,
      description: "User submits feedback on Ending screen",
      params: [
        "event_category: user_feedback",
        "ending_id: string",
        "feedback_length: number",
        "has_text_feedback: boolean",
        "feedback_text: string (first 100 chars, if consent given)",
      ],
    },
    {
      name: ANALYTICS_EVENTS.SHARE_CLICKED,
      description: "User clicks Share button",
      params: ["event_category: engagement", "ending_id: string"],
    },
    {
      name: ANALYTICS_EVENTS.RESTART_CLICKED,
      description: "User clicks Restart button",
      params: ["event_category: engagement", "ending_id: string"],
    },
    {
      name: ANALYTICS_EVENTS.COFFEE_CLICKED,
      description: "User clicks Buy Me a Coffee widget",
      params: ["event_category: monetization", "ending_id: string"],
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics System Overview</h3>

      {/* Consent Status */}
      <div className={`border-2 ${statusInfo.border} ${statusInfo.bg} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">User Consent Status</h4>
          <div
            className={`px-3 py-1 rounded-full font-bold ${statusInfo.color} flex items-center gap-2`}
          >
            <span className="text-lg">{statusInfo.icon}</span>
            {statusInfo.label}
          </div>
        </div>
        <p className="text-sm text-gray-700">
          {consentStatus === true
            ? "Analytics tracking is active. User data is being sent to Google Analytics."
            : consentStatus === false
              ? "Analytics tracking is disabled. No user data is being collected."
              : "User has not yet set analytics preferences. Analytics will not track until consent is granted."}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Consent is stored in localStorage key:{" "}
          <code className="bg-gray-200 px-1 rounded">analytics_consent</code>
        </p>
      </div>

      {/* Data Storage */}
      <div className="border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Data Storage</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-violet-600">•</span>
            <div>
              <strong>Google Analytics 4 (GA4)</strong> - All event data is sent to Google's servers
              when consent is granted
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-600">•</span>
            <div>
              <strong>Measurement ID:</strong>{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">G-0TL6RM3JRG</code>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-600">•</span>
            <div>
              <strong>Privacy:</strong> IP anonymization enabled, no page views tracked
              automatically
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-violet-600">•</span>
            <div>
              <strong>Local Storage:</strong> Only stores consent preference (granted/denied)
            </div>
          </div>
        </div>
      </div>

      {/* Tracked Events */}
      <div className="border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Tracked Events ({trackedEvents.length})
        </h4>
        <div className="space-y-3">
          {trackedEvents.map((event, index) => (
            <div key={index} className="border-l-2 border-violet-300 pl-3 py-1">
              <div className="font-mono text-sm text-violet-700 font-semibold">{event.name}</div>
              <div className="text-sm text-gray-700 mt-1">{event.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                <strong>Parameters:</strong> {event.params.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collected Data Categories */}
      <div className="border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Data Categories Collected</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-violet-50 rounded-lg p-3">
            <h5 className="font-semibold text-violet-900 text-sm mb-1">User Journey Data</h5>
            <ul className="text-xs text-violet-700 space-y-1">
              <li>• Path selections (A/B/C)</li>
              <li>• Choice decisions and labels</li>
              <li>• Scene progressions</li>
              <li>• Completion status</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-semibold text-blue-900 text-sm mb-1">Dimensional Scores</h5>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• All 6 dimension values at key moments</li>
              <li>• Score deltas per choice</li>
              <li>• Final scores at ending</li>
              <li>• Dominant dimension at midpoint</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <h5 className="font-semibold text-green-900 text-sm mb-1">Outcome Data</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Ending IDs (E1-E16)</li>
              <li>• Ending titles reached</li>
              <li>• Associated path for each ending</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <h5 className="font-semibold text-orange-900 text-sm mb-1">User Feedback</h5>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Feedback text (first 100 chars, with consent)</li>
              <li>• Feedback length</li>
              <li>• Ending context for feedback</li>
              <li>• Whether text was shared</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy Notes */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Privacy & Compliance</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Consent is requested before any tracking begins</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Users can enable, disable, or revoke consent via Settings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>IP addresses are anonymized by GA4</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>No personally identifiable information (PII) is collected</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Feedback text is truncated to 100 characters before sending</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Users explicitly opt-in to share feedback text</span>
          </li>
        </ul>
      </div>

      {/* Developer Notes */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
        <h4 className="font-semibold text-violet-900 mb-3">Developer Notes</h4>
        <div className="text-sm text-violet-800 space-y-2">
          <p>
            <strong>Access GA4 Dashboard:</strong> Sign in to Google Analytics with the account
            linked to measurement ID{" "}
            <code className="bg-violet-200 px-1 rounded">G-0TL6RM3JRG</code>
          </p>
          <p>
            <strong>Debug Mode:</strong> Enable debug_mode in analyticsConfig.ts to see events in
            GA4 DebugView
          </p>
          <p>
            <strong>Testing:</strong> Use this Score Balance Tool to simulate paths and monitor
            console logs for gtag events
          </p>
        </div>
      </div>
    </div>
  );
};
