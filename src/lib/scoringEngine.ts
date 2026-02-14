/**
 * Dimensional Scoring Engine
 *
 * Implements a six-dimensional psychological profiling system that evaluates user choices
 * across multiple emotional axes to determine personalized narrative endings.
 *
 * The six dimensions are:
 * - honesty: Willingness to be truthful vs. protective/avoidant
 * - vulnerability: Openness to emotional risk vs. self-protection
 * - hope: Optimism about the future vs. pessimism/resignation
 * - selfWorth: Self-value and confidence vs. self-doubt
 * - action: Proactiveness and agency vs. passivity/inertia
 * - compassion: Care for others vs. self-focus
 */

export interface DimensionScores {
  honesty: number;
  vulnerability: number;
  hope: number;
  selfWorth: number;
  action: number;
  compassion: number;
}

/**
 * Type for conditional rules used in ending evaluation
 */
export type ConditionRule =
  | { type: "gte"; dimension: keyof DimensionScores; value: number }
  | { type: "lte"; dimension: keyof DimensionScores; value: number }
  | { type: "range"; dimension: keyof DimensionScores; min: number; max: number }
  | { type: "and"; rules: ConditionRule[] }
  | { type: "or"; rules: ConditionRule[] }
  | { type: "allInRange"; min: number; max: number }
  | { type: "variance"; minVariance: number };

export interface EndingCondition {
  id: string;
  condition: ConditionRule;
}

/**
 * Initialize scores with all dimensions set to zero
 */
export function initializeScores(): DimensionScores {
  return {
    honesty: 0,
    vulnerability: 0,
    hope: 0,
    selfWorth: 0,
    action: 0,
    compassion: 0,
  };
}

/**
 * Apply a choice's dimensional score changes to current scores
 * @param current - Current dimensional scores
 * @param delta - Score changes from the choice (partial scores)
 * @returns New score object with changes applied
 */
export function applyChoiceScore(
  current: DimensionScores,
  delta: Partial<DimensionScores>,
): DimensionScores {
  return {
    honesty: current.honesty + (delta.honesty ?? 0),
    vulnerability: current.vulnerability + (delta.vulnerability ?? 0),
    hope: current.hope + (delta.hope ?? 0),
    selfWorth: current.selfWorth + (delta.selfWorth ?? 0),
    action: current.action + (delta.action ?? 0),
    compassion: current.compassion + (delta.compassion ?? 0),
  };
}

/**
 * Check if a condition rule is satisfied by the given scores
 * @param scores - Current dimensional scores
 * @param rule - Condition rule to check
 * @returns true if condition is met, false otherwise
 */
export function checkCondition(scores: DimensionScores, rule: ConditionRule): boolean {
  switch (rule.type) {
    case "gte":
      return scores[rule.dimension] >= rule.value;

    case "lte":
      return scores[rule.dimension] <= rule.value;

    case "range":
      return scores[rule.dimension] >= rule.min && scores[rule.dimension] <= rule.max;

    case "and":
      return rule.rules.every((r) => checkCondition(scores, r));

    case "or":
      return rule.rules.some((r) => checkCondition(scores, r));

    case "allInRange":
      // Check if ALL dimensions are within the specified range
      return Object.values(scores).every((value) => value >= rule.min && value <= rule.max);

    case "variance":
      // Calculate variance: check if there's high contrast (at least minVariance spread)
      const values = Object.values(scores);
      const max = Math.max(...values);
      const min = Math.min(...values);
      return max - min >= rule.minVariance;

    default:
      return false;
  }
}

/**
 * Ending condition definitions in priority order
 * Priority order: E15, E16, E1, E6, E9, E4, E12, E11, E10, E13, E2, E7, E3, E8, E5, E14
 */
export const ENDING_CONDITIONS: EndingCondition[] = [
  // E15 - The Unnamed Heart (Secret: All dimensions balanced near zero)
  {
    id: "E15",
    condition: { type: "allInRange", min: -1, max: 1 },
  },

  // E16 - The Heart Between Worlds (Secret: High contrast/variance)
  {
    id: "E16",
    condition: {
      type: "and",
      rules: [
        { type: "variance", minVariance: 6 }, // At least 6-point spread between highest and lowest
        {
          type: "or",
          rules: [
            // No dimension in the neutral range [-1, 1]
            {
              type: "or",
              rules: [
                { type: "gte", dimension: "honesty", value: 2 },
                { type: "lte", dimension: "honesty", value: -2 },
              ],
            },
            {
              type: "or",
              rules: [
                { type: "gte", dimension: "vulnerability", value: 2 },
                { type: "lte", dimension: "vulnerability", value: -2 },
              ],
            },
            {
              type: "or",
              rules: [
                { type: "gte", dimension: "hope", value: 2 },
                { type: "lte", dimension: "hope", value: -2 },
              ],
            },
          ],
        },
      ],
    },
  },

  // E1 - The Brave Heart (Path A: High honesty and vulnerability)
  {
    id: "E1",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "honesty", value: 3 },
        { type: "gte", dimension: "vulnerability", value: 2 },
      ],
    },
  },

  // E6 - The Open Heart (Path C: High selfWorth and hope)
  {
    id: "E6",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "selfWorth", value: 3 },
        { type: "gte", dimension: "hope", value: 2 },
      ],
    },
  },

  // E9 - The Growing Soul (Cross-path: High action and compassion)
  // Lowered action requirement to 1 to allow Path C to reach it
  {
    id: "E9",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "action", value: 1 },
        { type: "gte", dimension: "compassion", value: 2 },
      ],
    },
  },

  // E4 - The Hopeful Believer (Path B: High hope, recovered from low start)
  // Requires action < 2 to avoid intercepting E9 (Growing Soul)
  {
    id: "E4",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "hope", value: 2 },
        { type: "gte", dimension: "compassion", value: 1 },
        { type: "lte", dimension: "action", value: 1 },
      ],
    },
  },

  // E12 - The Passionate Wanderer (Path B: High action, low vulnerability)
  {
    id: "E12",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "action", value: 2 },
        { type: "lte", dimension: "vulnerability", value: -1 },
      ],
    },
  },

  // E11 - The Forgiver (Cross-path: High compassion, balanced)
  {
    id: "E11",
    condition: {
      type: "and",
      rules: [{ type: "gte", dimension: "compassion", value: 3 }],
    },
  },

  // E10 - The Mirror Seeker (Cross-path: High vulnerability and honesty)
  {
    id: "E10",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "vulnerability", value: 2 },
        { type: "gte", dimension: "honesty", value: 2 },
      ],
    },
  },

  // E13 - The Peaceful One (Cross-path: High selfWorth, moderate hope)
  {
    id: "E13",
    condition: {
      type: "and",
      rules: [
        { type: "gte", dimension: "selfWorth", value: 2 },
        { type: "gte", dimension: "hope", value: 0 },
      ],
    },
  },

  // E2 - The Quiet Protector (Path A: Low honesty, positive compassion)
  {
    id: "E2",
    condition: {
      type: "and",
      rules: [
        { type: "lte", dimension: "honesty", value: 0 },
        { type: "gte", dimension: "compassion", value: 1 },
      ],
    },
  },

  // E7 - The Guarded Soul (Cross-path: Low vulnerability and honesty)
  {
    id: "E7",
    condition: {
      type: "and",
      rules: [
        { type: "lte", dimension: "vulnerability", value: -1 },
        { type: "lte", dimension: "honesty", value: 0 },
      ],
    },
  },

  // E3 - The Heart That Waits (Path A: Low action, positive hope)
  {
    id: "E3",
    condition: {
      type: "and",
      rules: [
        { type: "lte", dimension: "action", value: 0 },
        { type: "gte", dimension: "hope", value: 1 },
      ],
    },
  },

  // E8 - The Quiet Dreamer (Cross-path: Low action, positive compassion)
  {
    id: "E8",
    condition: {
      type: "and",
      rules: [
        { type: "lte", dimension: "action", value: -1 },
        { type: "gte", dimension: "compassion", value: 0 },
      ],
    },
  },

  // E5 - The Lonely Companion (Path B: Low hope and selfWorth)
  {
    id: "E5",
    condition: {
      type: "and",
      rules: [
        { type: "lte", dimension: "hope", value: -2 },
        { type: "lte", dimension: "selfWorth", value: -1 },
      ],
    },
  },

  // E14 - The Shadow Holder (Fallback: Predominantly negative scores)
  // This is checked last as the fallback ending
  // Requires at least 3 dimensions to be negative (value <= -1)
  {
    id: "E14",
    condition: {
      type: "or",
      rules: [
        // Pattern 1: At least 3 core negative dimensions
        {
          type: "and",
          rules: [
            { type: "lte", dimension: "hope", value: -1 },
            { type: "lte", dimension: "vulnerability", value: -1 },
            { type: "lte", dimension: "honesty", value: -1 },
          ],
        },
        // Pattern 2: Severe negativity in hope + 1 other
        {
          type: "and",
          rules: [
            { type: "lte", dimension: "hope", value: -2 },
            {
              type: "or",
              rules: [
                { type: "lte", dimension: "selfWorth", value: -1 },
                { type: "lte", dimension: "action", value: -2 },
              ],
            },
          ],
        },
      ],
    },
  },
];

/**
 * Evaluate which ending the user should receive based on their dimensional scores
 * Uses priority-based matching: returns the first ending whose condition is satisfied
 *
 * @param scores - Final dimensional scores after all choices
 * @returns Ending ID (E1-E16)
 */
export function evaluateEnding(scores: DimensionScores): string {
  // Check each ending condition in priority order
  for (const ending of ENDING_CONDITIONS) {
    if (checkCondition(scores, ending.condition)) {
      return ending.id;
    }
  }

  // Fallback (should never reach here due to E14's broad condition)
  return "E14";
}

/**
 * Get the dominant dimension (highest absolute value) for midpoint feedback
 * Used to determine which evocative phrase to show the user
 *
 * @param scores - Current dimensional scores
 * @returns The dimension with the highest absolute value
 */
export function getDominantDimension(scores: DimensionScores): keyof DimensionScores {
  let maxDimension: keyof DimensionScores = "hope";
  let maxAbsoluteValue = 0;

  for (const [dimension, value] of Object.entries(scores) as [keyof DimensionScores, number][]) {
    const absValue = Math.abs(value);
    if (absValue > maxAbsoluteValue) {
      maxAbsoluteValue = absValue;
      maxDimension = dimension;
    }
  }

  return maxDimension;
}

/**
 * Get evocative text phrase based on dominant dimension and its direction
 * Used for subtle midpoint feedback (displayed at scene 3)
 *
 * @param scores - Current dimensional scores
 * @returns Evocative phrase reflecting the dominant emotional tendency
 */
export function getMidpointFeedbackPhrase(scores: DimensionScores): string {
  const dominant = getDominantDimension(scores);
  const value = scores[dominant];

  // Phrases for each dimension (positive and negative)
  const phrases: Record<keyof DimensionScores, { positive: string; negative: string }> = {
    honesty: {
      positive: "Your heart leans toward truth...",
      negative: "You guard what's inside carefully...",
    },
    vulnerability: {
      positive: "You're learning to open up...",
      negative: "Your walls feel safer than risk...",
    },
    hope: {
      positive: "Hope guides your path...",
      negative: "Shadows color your view...",
    },
    selfWorth: {
      positive: "You're learning your own value...",
      negative: "You question what you deserve...",
    },
    action: {
      positive: "You move forward with purpose...",
      negative: "You wait, watching from stillness...",
    },
    compassion: {
      positive: "Your heart reaches toward others...",
      negative: "You turn inward, protecting yourself...",
    },
  };

  return value >= 0 ? phrases[dominant].positive : phrases[dominant].negative;
}
