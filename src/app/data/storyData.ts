import { StorySceneVariant } from "../screens/StoryScene";
import { DimensionScores } from "../../lib/scoringEngine";
import { ParticleType } from "../components/ParticleEffect";

export type SceneId = string;

export type BackgroundTheme = "warm" | "cool" | "neutral" | "vibrant";

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
  backgroundTheme?: BackgroundTheme;
  particleType?: ParticleType;
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
    backgroundTheme: "warm",
    particleType: "hearts",
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
    backgroundTheme: "warm",
    choices: [
      {
        label: "I want to tell them something honest",
        nextSceneId: "A2_5",
        scores: { honesty: 1, vulnerability: 1 },
      },
      {
        label: "I want tonight to be perfect, no heavy talk",
        nextSceneId: "A2_5",
        scores: { honesty: -1, action: -1 },
      },
    ],
  },
  A2_5: {
    id: "A2_5",
    variant: "story",
    text: "As you get ready, you catch yourself rehearsing the words. Why does expressing love feel so vulnerable?",
    illustrationSrc:
      "https://images.unsplash.com/photo-1585504198199-20277593b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXR0aW5nJTIwcmVhZHklMjBtaXJyb3IlMjByZWZsZWN0aW9uJTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDk5NDQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "warm",
    particleType: "sparkles",
    choices: [
      {
        label: "Because they might not feel the same way",
        nextSceneId: "A3",
        scores: { vulnerability: 1, hope: -1 },
      },
      {
        label: "Because love means risking everything",
        nextSceneId: "A3",
        scores: { vulnerability: 2, hope: 1 },
      },
    ],
  },
  A3: {
    id: "A3",
    variant: "tension",
    text: "A memory surfaces — a moment recently when you felt unseen.",
    backgroundTheme: "neutral",
    choices: [
      {
        label: "Bring it up tonight",
        nextSceneId: "A3_5",
        scores: { honesty: 1, action: 1 },
      },
      {
        label: "Keep it to yourself",
        nextSceneId: "A3_5",
        scores: { vulnerability: -1, compassion: 1 },
      },
    ],
  },
  A3_5: {
    id: "A3_5",
    variant: "story",
    text: "You arrive at the restaurant. They smile when they see you, and for a moment, nothing else matters.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGNhbmRsZXMlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "warm",
    particleType: "hearts",
    choices: [
      {
        label: "Let yourself be fully present",
        nextSceneId: "A4",
        scores: { compassion: 1, hope: 1 },
      },
      {
        label: "Notice the things left unsaid",
        nextSceneId: "A4",
        scores: { honesty: 1, vulnerability: 1 },
      },
    ],
  },
  A4: {
    id: "A4",
    variant: "hesitation",
    text: "Do you tell them the truth about what you’ve been needing lately, even if it might start a difficult conversation?",
    backgroundTheme: "vibrant",
    choices: [
      {
        label: "Yes, honesty",
        nextSceneId: "A4_5",
        scores: { honesty: 2, vulnerability: 1 },
      },
      {
        label: "No, protect the moment",
        nextSceneId: "A4_5",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  A4_5: {
    id: "A4_5",
    variant: "tension",
    text: "They reach across the table and hold your hand. You feel the weight of everything you've built together.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1581590409936-ce0ec8bd2b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xkaW5nJTIwaGFuZHMlMjBjb3VwbGUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "warm",
    choices: [
      {
        label: "This is worth fighting for",
        nextSceneId: "A5_Honesty",
        scores: { hope: 2, action: 1, compassion: 1 },
      },
      {
        label: "I'm terrified of losing this",
        nextSceneId: "A5_Protect",
        scores: { vulnerability: 1, hope: -1 },
      },
    ],
  },
  A5_Honesty: {
    id: "A5_Honesty",
    variant: "crossroad",
    text: "Do you let them see the part of you you're most afraid to show?",
    backgroundTheme: "vibrant",
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
    backgroundTheme: "neutral",
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
    backgroundTheme: "cool",
    choices: [
      {
        label: "Tell yourself it's fine",
        nextSceneId: "B1_5",
        scores: { honesty: -1, selfWorth: -1 },
      },
      {
        label: "Feel a quiet ache",
        nextSceneId: "B1_5",
        scores: { vulnerability: 1, hope: -1 },
      },
    ],
  },
  B1_5: {
    id: "B1_5",
    variant: "story",
    text: "You scroll through old photos of the two of you. When did those smiles become so rare?",
    illustrationSrc:
      "https://images.unsplash.com/photo-1525770041010-2a1233dd8152?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundTheme: "cool",
    particleType: "bubbles",
    choices: [
      {
        label: "Delete the photos",
        nextSceneId: "B2",
        scores: { action: 1, hope: -1 },
      },
      {
        label: "Keep looking at them",
        nextSceneId: "B2",
        scores: { vulnerability: 1, compassion: 1 },
      },
    ],
  },
  B2: {
    id: "B2",
    variant: "story",
    text: "You think of reasons: They’re busy. They forgot. They don’t care as much anymore.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1751630991322-f935847f16c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9jayUyMHdhaXRpbmclMjBhbnhpZXR5JTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDk5NDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "cool",
    choices: [
      {
        label: "Reach out first",
        nextSceneId: "B2_5",
        scores: { action: 2, hope: 1 },
      },
      {
        label: "Wait for them to text",
        nextSceneId: "B2_5",
        scores: { action: -1, selfWorth: -1 },
      },
    ],
  },
  B2_5: {
    id: "B2_5",
    variant: "tension",
    text: "Hours pass. You wonder if they're thinking of you at all.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1516442719524-a603408c90cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWl0aW5nJTIwYWxvbmUlMjB3aW5kb3clMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwOTk0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "neutral",
    choices: [
      {
        label: "They'll come around eventually",
        nextSceneId: "B3",
        scores: { hope: 1, selfWorth: -1 },
      },
      {
        label: "I deserve better than this",
        nextSceneId: "B3",
        scores: { selfWorth: 2, honesty: 1 },
      },
    ],
  },
  B3: {
    id: "B3",
    variant: "tension",
    text: "You remember the last time you felt neglected.",
    backgroundTheme: "cool",
    choices: [
      {
        label: "Confront the feeling",
        nextSceneId: "B3_5",
        scores: { honesty: 1, vulnerability: 1 },
      },
      {
        label: "Push it down",
        nextSceneId: "B3_5",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  B3_5: {
    id: "B3_5",
    variant: "hesitation",
    text: "A friend calls. They can hear it in your voice — something's wrong. Do you tell them the truth?",
    illustrationSrc:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhbGwlMjBkYXJrJTIwcm9vbSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzA5OTQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "neutral",
    choices: [
      {
        label: "Open up to them",
        nextSceneId: "B4",
        scores: { vulnerability: 2, compassion: 1 },
      },
      {
        label: "Pretend everything's fine",
        nextSceneId: "B4",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  B4: {
    id: "B4",
    variant: "hesitation",
    text: "Do you tell them you feel forgotten, or do you convince yourself it’s not a big deal?",
    backgroundTheme: "vibrant",
    choices: [
      {
        label: "Tell them",
        nextSceneId: "B4_5",
        scores: { honesty: 2, action: 1 },
      },
      {
        label: "Stay silent",
        nextSceneId: "B4_5",
        scores: { honesty: -1, vulnerability: -1 },
      },
    ],
  },
  B4_5: {
    id: "B4_5",
    variant: "story",
    text: "They finally text back: 'Sorry, been swamped. Let's talk soon.' The words feel empty.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1720069004713-f72d26684a87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundTheme: "cool",
    choices: [
      {
        label: "Accept that this is how it is",
        nextSceneId: "B5_Silent",
        scores: { hope: -1, action: -1 },
      },
      {
        label: "Demand more from this relationship",
        nextSceneId: "B5_Tell",
        scores: { selfWorth: 2, action: 1 },
      },
    ],
  },
  B5_Tell: {
    id: "B5_Tell",
    variant: "crossroad",
    text: "Do you stay because you’re afraid of being alone, or because you still believe in this love?",
    backgroundTheme: "vibrant",
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
    backgroundTheme: "neutral",
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
    backgroundTheme: "neutral",
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
    backgroundTheme: "cool",
    choices: [
      {
        label: "Smile for them",
        nextSceneId: "C2_5",
        scores: { compassion: 2, hope: 1 },
      },
      {
        label: "Feel a sting",
        nextSceneId: "C2_5",
        scores: { selfWorth: -1, compassion: -1 },
      },
    ],
  },
  C2_5: {
    id: "C2_5",
    variant: "story",
    text: "You make yourself breakfast. Just for you. There's something bittersweet about caring for yourself on this day.",
    illustrationSrc:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBhbG9uZSUyMGNvZmZlZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzA5OTQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "neutral",
    particleType: "sparkles",
    choices: [
      {
        label: "This is enough for now",
        nextSceneId: "C3",
        scores: { selfWorth: 2, compassion: 1 },
      },
      {
        label: "Wish someone else were here",
        nextSceneId: "C3",
        scores: { hope: -1, vulnerability: 1 },
      },
    ],
  },
  C3: {
    id: "C3",
    variant: "tension",
    text: "You think of someone from your past.",
    backgroundTheme: "cool",
    choices: [
      {
        label: "Reach out",
        nextSceneId: "C3_5",
        scores: { action: 2, vulnerability: 1 },
      },
      {
        label: "Don't reopen old wounds",
        nextSceneId: "C3_5",
        scores: { action: -1, vulnerability: -1 },
      },
    ],
  },
  C3_5: {
    id: "C3_5",
    variant: "hesitation",
    text: "You look in the mirror and ask: Am I choosing solitude, or am I just afraid?",
    illustrationSrc:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXJyb3IlMjByZWZsZWN0aW9uJTIwc2VsZiUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzA5OTQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    backgroundTheme: "neutral",
    choices: [
      {
        label: "I'm choosing myself",
        nextSceneId: "C4",
        scores: { selfWorth: 2, honesty: 1 },
      },
      {
        label: "I'm afraid to be hurt again",
        nextSceneId: "C4",
        scores: { vulnerability: 2, hope: -1 },
      },
    ],
  },
  C4: {
    id: "C4",
    variant: "hesitation",
    text: "Do you admit to yourself that you’re lonely, or do you bury the feeling under distractions?",
    backgroundTheme: "vibrant",
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
    backgroundTheme: "neutral",
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
    backgroundTheme: "cool",
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
