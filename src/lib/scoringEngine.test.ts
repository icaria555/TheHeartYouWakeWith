/**
 * Unit tests for the dimensional scoring engine
 */

import { describe, it, expect } from "vitest";
import {
  initializeScores,
  applyChoiceScore,
  checkCondition,
  evaluateEnding,
  getDominantDimension,
  getMidpointFeedbackPhrase,
  type DimensionScores,
  type ConditionRule,
} from "./scoringEngine";

describe("scoringEngine", () => {
  describe("initializeScores", () => {
    it("should return all dimensions set to zero", () => {
      const scores = initializeScores();
      expect(scores).toEqual({
        honesty: 0,
        vulnerability: 0,
        hope: 0,
        selfWorth: 0,
        action: 0,
        compassion: 0,
      });
    });
  });

  describe("applyChoiceScore", () => {
    it("should add positive scores correctly", () => {
      const current: DimensionScores = {
        honesty: 1,
        vulnerability: 0,
        hope: 2,
        selfWorth: 0,
        action: 1,
        compassion: 0,
      };
      const delta = { honesty: 2, vulnerability: 1, hope: 1 };
      const result = applyChoiceScore(current, delta);

      expect(result).toEqual({
        honesty: 3,
        vulnerability: 1,
        hope: 3,
        selfWorth: 0,
        action: 1,
        compassion: 0,
      });
    });

    it("should add negative scores correctly", () => {
      const current: DimensionScores = {
        honesty: 1,
        vulnerability: 2,
        hope: 0,
        selfWorth: 1,
        action: 0,
        compassion: 1,
      };
      const delta = { honesty: -1, hope: -2, action: -1 };
      const result = applyChoiceScore(current, delta);

      expect(result).toEqual({
        honesty: 0,
        vulnerability: 2,
        hope: -2,
        selfWorth: 1,
        action: -1,
        compassion: 1,
      });
    });

    it("should handle partial deltas", () => {
      const current = initializeScores();
      const delta = { hope: 1 };
      const result = applyChoiceScore(current, delta);

      expect(result).toEqual({
        honesty: 0,
        vulnerability: 0,
        hope: 1,
        selfWorth: 0,
        action: 0,
        compassion: 0,
      });
    });

    it("should not mutate the current scores object", () => {
      const current: DimensionScores = { ...initializeScores(), hope: 1 };
      const original = { ...current };
      applyChoiceScore(current, { hope: 2 });

      expect(current).toEqual(original);
    });
  });

  describe("checkCondition", () => {
    const testScores: DimensionScores = {
      honesty: 3,
      vulnerability: 1,
      hope: -2,
      selfWorth: 0,
      action: 2,
      compassion: -1,
    };

    it("should check gte conditions", () => {
      const rule: ConditionRule = { type: "gte", dimension: "honesty", value: 3 };
      expect(checkCondition(testScores, rule)).toBe(true);

      const rule2: ConditionRule = { type: "gte", dimension: "honesty", value: 4 };
      expect(checkCondition(testScores, rule2)).toBe(false);
    });

    it("should check lte conditions", () => {
      const rule: ConditionRule = { type: "lte", dimension: "hope", value: -2 };
      expect(checkCondition(testScores, rule)).toBe(true);

      const rule2: ConditionRule = { type: "lte", dimension: "hope", value: -3 };
      expect(checkCondition(testScores, rule2)).toBe(false);
    });

    it("should check range conditions", () => {
      const rule: ConditionRule = { type: "range", dimension: "selfWorth", min: -1, max: 1 };
      expect(checkCondition(testScores, rule)).toBe(true);

      const rule2: ConditionRule = { type: "range", dimension: "honesty", min: -1, max: 1 };
      expect(checkCondition(testScores, rule2)).toBe(false);
    });

    it("should check and conditions", () => {
      const rule: ConditionRule = {
        type: "and",
        rules: [
          { type: "gte", dimension: "honesty", value: 3 },
          { type: "gte", dimension: "action", value: 2 },
        ],
      };
      expect(checkCondition(testScores, rule)).toBe(true);

      const rule2: ConditionRule = {
        type: "and",
        rules: [
          { type: "gte", dimension: "honesty", value: 3 },
          { type: "gte", dimension: "hope", value: 0 },
        ],
      };
      expect(checkCondition(testScores, rule2)).toBe(false);
    });

    it("should check or conditions", () => {
      const rule: ConditionRule = {
        type: "or",
        rules: [
          { type: "gte", dimension: "hope", value: 2 },
          { type: "gte", dimension: "action", value: 2 },
        ],
      };
      expect(checkCondition(testScores, rule)).toBe(true);

      const rule2: ConditionRule = {
        type: "or",
        rules: [
          { type: "gte", dimension: "hope", value: 2 },
          { type: "lte", dimension: "compassion", value: -2 },
        ],
      };
      expect(checkCondition(testScores, rule2)).toBe(false);
    });

    it("should check allInRange conditions for E15", () => {
      const balancedScores: DimensionScores = {
        honesty: 0,
        vulnerability: 1,
        hope: -1,
        selfWorth: 1,
        action: 0,
        compassion: -1,
      };
      const rule: ConditionRule = { type: "allInRange", min: -1, max: 1 };
      expect(checkCondition(balancedScores, rule)).toBe(true);

      expect(checkCondition(testScores, rule)).toBe(false);
    });

    it("should check variance conditions for E16", () => {
      const polarizedScores: DimensionScores = {
        honesty: 4,
        vulnerability: -3,
        hope: 3,
        selfWorth: -2,
        action: 2,
        compassion: -4,
      };
      const rule: ConditionRule = { type: "variance", minVariance: 6 };
      expect(checkCondition(polarizedScores, rule)).toBe(true); // max 4, min -4 = 8 variance

      const lowVarianceScores = initializeScores();
      expect(checkCondition(lowVarianceScores, rule)).toBe(false);
    });
  });

  describe("evaluateEnding", () => {
    it("should return E15 for balanced scores", () => {
      const scores: DimensionScores = {
        honesty: 0,
        vulnerability: 1,
        hope: -1,
        selfWorth: 1,
        action: 0,
        compassion: -1,
      };
      expect(evaluateEnding(scores)).toBe("E15");
    });

    it("should return E16 for high contrast scores", () => {
      const scores: DimensionScores = {
        honesty: 4,
        vulnerability: -3,
        hope: 3,
        selfWorth: -2,
        action: 2,
        compassion: -4,
      };
      expect(evaluateEnding(scores)).toBe("E16");
    });

    it("should return E1 for high honesty and vulnerability", () => {
      const scores: DimensionScores = {
        honesty: 3,
        vulnerability: 2,
        hope: 1,
        selfWorth: 0,
        action: 0,
        compassion: 1,
      };
      expect(evaluateEnding(scores)).toBe("E1");
    });

    it("should return E6 for high selfWorth and hope", () => {
      const scores: DimensionScores = {
        honesty: 1,
        vulnerability: 0,
        hope: 3,
        selfWorth: 3,
        action: 1,
        compassion: 1,
      };
      expect(evaluateEnding(scores)).toBe("E6");
    });

    it("should return E4 for high hope and compassion", () => {
      const scores: DimensionScores = {
        honesty: 0,
        vulnerability: -1,
        hope: 2,
        selfWorth: 0,
        action: 0,
        compassion: 1,
      };
      expect(evaluateEnding(scores)).toBe("E4");
    });

    it("should return E7 for low honesty and vulnerability", () => {
      const scores: DimensionScores = {
        honesty: -2,
        vulnerability: -2,
        hope: -2,
        selfWorth: -1,
        action: -1,
        compassion: -1,
      };
      // E7 is checked before E14 in priority and matches (vulnerability <= -1, honesty <= 0)
      expect(evaluateEnding(scores)).toBe("E7");
    });

    it("should prioritize E15 over other endings", () => {
      const scores: DimensionScores = {
        honesty: 1,
        vulnerability: 1,
        hope: 0,
        selfWorth: -1,
        action: 0,
        compassion: 1,
      };
      expect(evaluateEnding(scores)).toBe("E15");
    });
  });

  describe("getDominantDimension", () => {
    it("should return dimension with highest absolute value", () => {
      const scores: DimensionScores = {
        honesty: 1,
        vulnerability: -3,
        hope: 2,
        selfWorth: 0,
        action: -2,
        compassion: 1,
      };
      expect(getDominantDimension(scores)).toBe("vulnerability");
    });

    it("should handle positive dominant dimension", () => {
      const scores: DimensionScores = {
        honesty: 4,
        vulnerability: 1,
        hope: -2,
        selfWorth: 0,
        action: 1,
        compassion: -1,
      };
      expect(getDominantDimension(scores)).toBe("honesty");
    });

    it("should return first dimension when all are zero", () => {
      const scores = initializeScores();
      expect(getDominantDimension(scores)).toBe("hope");
    });
  });

  describe("getMidpointFeedbackPhrase", () => {
    it("should return positive phrase for positive dominant dimension", () => {
      const scores: DimensionScores = {
        honesty: 3,
        vulnerability: 1,
        hope: 0,
        selfWorth: 0,
        action: 1,
        compassion: 0,
      };
      const phrase = getMidpointFeedbackPhrase(scores);
      expect(phrase).toBe("Your heart leans toward truth...");
    });

    it("should return negative phrase for negative dominant dimension", () => {
      const scores: DimensionScores = {
        honesty: 0,
        vulnerability: 1,
        hope: -3,
        selfWorth: 0,
        action: 0,
        compassion: 1,
      };
      const phrase = getMidpointFeedbackPhrase(scores);
      expect(phrase).toBe("Shadows color your view...");
    });

    it("should handle each dimension correctly", () => {
      const dimensions: (keyof DimensionScores)[] = [
        "honesty",
        "vulnerability",
        "hope",
        "selfWorth",
        "action",
        "compassion",
      ];

      dimensions.forEach((dim) => {
        const positiveScores = { ...initializeScores(), [dim]: 3 };
        const positivePhrase = getMidpointFeedbackPhrase(positiveScores);
        expect(positivePhrase).toBeTruthy();
        expect(typeof positivePhrase).toBe("string");

        const negativeScores = { ...initializeScores(), [dim]: -3 };
        const negativePhrase = getMidpointFeedbackPhrase(negativeScores);
        expect(negativePhrase).toBeTruthy();
        expect(typeof negativePhrase).toBe("string");
        expect(negativePhrase).not.toBe(positivePhrase);
      });
    });
  });

  describe("Complex scoring scenarios", () => {
    it("should handle Path A journey to E1", () => {
      let scores = initializeScores();
      // Initial: Path A
      scores = applyChoiceScore(scores, { hope: 1, honesty: 1 });
      // A1: "Smile and feel grateful"
      scores = applyChoiceScore(scores, { hope: 1, compassion: 1 });
      // A2: "Tell them something honest"
      scores = applyChoiceScore(scores, { honesty: 1, vulnerability: 1 });
      // A3: "Bring it up tonight"
      scores = applyChoiceScore(scores, { honesty: 1, action: 1 });
      // A4: "Yes, honesty"
      scores = applyChoiceScore(scores, { honesty: 2, vulnerability: 1 });
      // A5_Honesty: "Yes"
      scores = applyChoiceScore(scores, { vulnerability: 2, selfWorth: 1 });

      expect(scores.honesty).toBe(5); // 1 + 1 + 1 + 2 = 5
      expect(scores.vulnerability).toBe(4); // 1 + 1 + 2 = 4
      expect(evaluateEnding(scores)).toBe("E1");
    });

    it("should handle Path B journey to E7 (guarded)", () => {
      let scores = initializeScores();
      // Initial: Path B
      scores = applyChoiceScore(scores, { hope: -1, selfWorth: -1 });
      // B1: "Tell yourself it's fine"
      scores = applyChoiceScore(scores, { honesty: -1, selfWorth: -1 });
      // B2: "Wait for them to text"
      scores = applyChoiceScore(scores, { action: -1, selfWorth: -1 });
      // B3: "Push it down"
      scores = applyChoiceScore(scores, { honesty: -1, vulnerability: -1 });
      // B4: "Stay silent"
      scores = applyChoiceScore(scores, { honesty: -1, vulnerability: -1 });
      // B5_Silent: "I'm afraid of being alone"
      scores = applyChoiceScore(scores, { hope: -2, vulnerability: -2 });

      expect(scores.hope).toBe(-3); // -1 - 2 = -3
      expect(scores.selfWorth).toBe(-3); // -1 - 1 - 1 = -3
      expect(scores.vulnerability).toBe(-4); // -1 - 1 - 2 = -4
      expect(scores.honesty).toBe(-3); // -1 - 1 - 1 = -3
      // E7 matches (vulnerability <= -1, honesty <= 0) and is checked before E5
      expect(evaluateEnding(scores)).toBe("E7");
    });

    it("should handle Path C journey to E6", () => {
      let scores = initializeScores();
      // Initial: Path C
      scores = applyChoiceScore(scores, { selfWorth: 1, action: -1 });
      // C1: "Enjoy the quiet"
      scores = applyChoiceScore(scores, { selfWorth: 1, compassion: 1 });
      // C2: "Smile for them"
      scores = applyChoiceScore(scores, { compassion: 2, hope: 1 });
      // C3: "Reach out"
      scores = applyChoiceScore(scores, { action: 2, vulnerability: 1 });
      // C4: "Admit it"
      scores = applyChoiceScore(scores, { honesty: 1, vulnerability: 2 });
      // C5_Admit: "I deserve love"
      scores = applyChoiceScore(scores, { selfWorth: 2, hope: 2 });

      expect(scores.selfWorth).toBe(4); // 1 + 1 + 2 = 4
      expect(scores.hope).toBe(3); // 1 + 2 = 3
      expect(evaluateEnding(scores)).toBe("E6");
    });
  });
});
