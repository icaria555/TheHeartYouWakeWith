import { StorySceneVariant } from "../screens/StoryScene";
import { DimensionScores } from "../../lib/scoringEngine";

export type SceneId = string;

export interface Choice {
  label: string;
  nextSceneId: SceneId;
  scores?: Partial<DimensionScores>;
}

export interface Scene {
  id: SceneId;
  variant: StorySceneVariant;
  text: string;
  choices: Choice[];
  illustrationSrc?: string;
}

/**
 * Initial dimension scores for each relationship path
 */
export const PATH_INITIAL_SCORES: Record<string, Partial<DimensionScores>> = {
  A: { hope: 1, honesty: 1 }, // Relationship with Valentine's plans
  B: { hope: -1, selfWorth: -1 }, // Relationship without plans
  C: { selfWorth: 1, action: -1 }, // Single/not in relationship
};

export const STORY_DATA: Record<SceneId, Scene> = {
  // PATH A - Relationship + Date
  A1: {
    id: "A1",
    variant: "story",
    text: "You check your phone. Your partner sent a sweet message confirming tonight’s date.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1613395804277-ff52684350ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwc3VubGlnaHQlMjBiZWQlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "Smile and feel grateful",
        nextSceneId: "A2",
        scores: { hope: 1, compassion: 1 },
      },
      {
        label: "Feel nervous — something feels important today",
        nextSceneId: "A2",
        scores: { vulnerability: 1, hope: -1 },
      },
    ],
  },
  A2: {
    id: "A2",
    variant: "story",
    text: "You think about what you want to say tonight.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1767714875101-74fd5d58a0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZsZWN0aW9uJTIwaW4lMjBtaXJyb3IlMjB0aG91Z2h0ZnVsJTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDk5NDQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "I want to tell them something honest",
        nextSceneId: "A3",
        scores: { honesty: 1, vulnerability: 1 },
      },
      {
        label: "I want tonight to be perfect, no heavy talk",
        nextSceneId: "A3",
        scores: { honesty: -1, action: -1 },
      },
    ],
  },
  A3: {
    id: "A3",
    variant: "tension",
    text: "A memory surfaces — a moment recently when you felt unseen.",
    choices: [
      {
        label: "Bring it up tonight",
        nextSceneId: "A4",
        scores: { honesty: 1, action: 1 },
      },
      {
        label: "Keep it to yourself",
        nextSceneId: "A4",
        scores: { vulnerability: -1, compassion: 1 },
      },
    ],
  },
  A4: {
    id: "A4",
    variant: "hesitation",
    text: "Do you tell them the truth about what you’ve been needing lately, even if it might start a difficult conversation?",
    choices: [
      {
        label: "Yes, honesty",
        nextSceneId: "A5_Honesty",
        scores: { honesty: 2, vulnerability: 1 },
      },
      {
        label: "No, protect the moment",
        nextSceneId: "A5_Protect",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  A5_Honesty: {
    id: "A5_Honesty",
    variant: "crossroad",
    text: "Do you let them see the part of you you're most afraid to show?",
    choices: [
      {
        label: "Yes",
        nextSceneId: "ENDING",
        scores: { vulnerability: 2, selfWorth: 1 },
      },
      {
        label: "Not yet",
        nextSceneId: "ENDING",
        scores: { action: -1, hope: 1 },
      },
    ],
  },
  A5_Protect: {
    id: "A5_Protect",
    variant: "crossroad",
    text: "Do you let them see the part of you you're most afraid to show?",
    choices: [
      {
        label: "Yes",
        nextSceneId: "ENDING",
        scores: { vulnerability: 1, selfWorth: 1 },
      },
      {
        label: "Not yet",
        nextSceneId: "ENDING",
        scores: { vulnerability: -2, compassion: 1 },
      },
    ],
  },

  // PATH B - Relationship + No Date
  B1: {
    id: "B1",
    variant: "story",
    text: "You check your phone. No message. No plan.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1707683460791-bd3e5faeaffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25lbHklMjBlbXB0eSUyMHJvb20lMjB3aW5kb3clMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "Tell yourself it's fine",
        nextSceneId: "B2",
        scores: { honesty: -1, selfWorth: -1 },
      },
      {
        label: "Feel a quiet ache",
        nextSceneId: "B2",
        scores: { vulnerability: 1, hope: -1 },
      },
    ],
  },
  B2: {
    id: "B2",
    variant: "story",
    text: "You think of reasons: They’re busy. They forgot. They don’t care as much anymore.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1751630991322-f935847f16c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9jayUyMHdhaXRpbmclMjBhbnhpZXR5JTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDk5NDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "Reach out first",
        nextSceneId: "B3",
        scores: { action: 2, hope: 1 },
      },
      {
        label: "Wait for them to text",
        nextSceneId: "B3",
        scores: { action: -1, selfWorth: -1 },
      },
    ],
  },
  B3: {
    id: "B3",
    variant: "tension",
    text: "You remember the last time you felt neglected.",
    choices: [
      {
        label: "Confront the feeling",
        nextSceneId: "B4",
        scores: { honesty: 1, vulnerability: 1 },
      },
      {
        label: "Push it down",
        nextSceneId: "B4",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  B4: {
    id: "B4",
    variant: "hesitation",
    text: "Do you tell them you feel forgotten, or do you convince yourself it’s not a big deal?",
    choices: [
      {
        label: "Tell them",
        nextSceneId: "B5_Tell",
        scores: { honesty: 2, action: 1 },
      },
      {
        label: "Stay silent",
        nextSceneId: "B5_Silent",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  B5_Tell: {
    id: "B5_Tell",
    variant: "crossroad",
    text: "Do you stay because you’re afraid of being alone, or because you still believe in this love?",
    choices: [
      {
        label: "I believe in us",
        nextSceneId: "ENDING",
        scores: { hope: 2, compassion: 1 },
      },
      {
        label: "I'm afraid of being alone",
        nextSceneId: "ENDING",
        scores: { hope: -1, selfWorth: -1, action: -1 },
      },
    ],
  },
  B5_Silent: {
    id: "B5_Silent",
    variant: "crossroad",
    text: "Do you stay because you're afraid of being alone, or because you still believe in this love?",
    choices: [
      {
        label: "I believe in us",
        nextSceneId: "ENDING",
        scores: { hope: 1, compassion: 2 },
      },
      {
        label: "I'm afraid of being alone",
        nextSceneId: "ENDING",
        scores: { hope: -2, vulnerability: -2 },
      },
    ],
  },

  // PATH C - No Relationship + No Date
  C1: {
    id: "C1",
    variant: "story",
    text: "You wake up to silence. Maybe peaceful. Maybe heavy.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1707683460791-bd3e5faeaffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25lbHklMjBlbXB0eSUyMHJvb20lMjB3aW5kb3clMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "Enjoy the quiet",
        nextSceneId: "C2",
        scores: { selfWorth: 1, compassion: 1 },
      },
      {
        label: "Feel the loneliness",
        nextSceneId: "C2",
        scores: { hope: -1, selfWorth: -1 },
      },
    ],
  },
  C2: {
    id: "C2",
    variant: "story",
    text: "You see couples posting on social media.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1575655273633-6ac40769c587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwc29jaWFsJTIwbWVkaWElMjBibHVyJTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDk5NDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    choices: [
      {
        label: "Smile for them",
        nextSceneId: "C3",
        scores: { compassion: 2, hope: 1 },
      },
      {
        label: "Feel a sting",
        nextSceneId: "C3",
        scores: { selfWorth: -1, compassion: -1 },
      },
    ],
  },
  C3: {
    id: "C3",
    variant: "tension",
    text: "You think of someone from your past.",
    choices: [
      {
        label: "Reach out",
        nextSceneId: "C4",
        scores: { action: 2, vulnerability: 1 },
      },
      {
        label: "Don't reopen old wounds",
        nextSceneId: "C4",
        scores: { action: -1, vulnerability: -1 },
      },
    ],
  },
  C4: {
    id: "C4",
    variant: "hesitation",
    text: "Do you admit to yourself that you’re lonely, or do you bury the feeling under distractions?",
    choices: [
      {
        label: "Admit it",
        nextSceneId: "C5_Admit",
        scores: { honesty: 1, vulnerability: 2 },
      },
      {
        label: "Bury it",
        nextSceneId: "C5_Bury",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  C5_Admit: {
    id: "C5_Admit",
    variant: "crossroad",
    text: "Do you believe you deserve love, or do you tell yourself it’s safer not to hope?",
    choices: [
      {
        label: "I deserve love",
        nextSceneId: "ENDING",
        scores: { selfWorth: 2, hope: 2 },
      },
      {
        label: "It's safer not to hope",
        nextSceneId: "ENDING",
        scores: { hope: -1, action: -1 },
      },
    ],
  },
  C5_Bury: {
    id: "C5_Bury",
    variant: "crossroad",
    text: "Do you believe you deserve love, or do you tell yourself it’s safer not to hope?",
    choices: [
      {
        label: "I deserve love",
        nextSceneId: "ENDING",
        scores: { selfWorth: 1, hope: 1 },
      },
      {
        label: "It's safer not to hope",
        nextSceneId: "ENDING",
        scores: { vulnerability: -2, hope: -2 },
      },
    ],
  },
};
