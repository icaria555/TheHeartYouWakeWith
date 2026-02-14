import { GA_MEASUREMENT_ID, ANALYTICS_CONFIG, ANALYTICS_EVENTS } from "./analyticsConfig";
import type { DimensionScores } from "./scoringEngine";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Consent management
const CONSENT_KEY = "analytics_consent";

export const getAnalyticsConsent = (): boolean | null => {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === null) return null;
  return consent === "granted";
};

export const setAnalyticsConsent = (granted: boolean): void => {
  localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  console.log(`🔐 Analytics consent: ${granted ? "✅ GRANTED" : "❌ DENIED"}`);

  if (granted) {
    initializeAnalytics();
  } else {
    // Disable analytics
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }
};

export const revokeAnalyticsConsent = (): void => {
  localStorage.removeItem(CONSENT_KEY);
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
  });
};

// Initialize GA4
export const initializeAnalytics = (): void => {
  if (!window.gtag) {
    console.warn("❌ Google Analytics not loaded");
    return;
  }

  const consent = getAnalyticsConsent();
  if (consent !== true) {
    console.log("⏸️ Analytics not initialized - consent not granted");
    return;
  }

  console.log("✅ Initializing Google Analytics...");

  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });

  window.gtag("config", GA_MEASUREMENT_ID, ANALYTICS_CONFIG);

  console.log(`🔧 GA4 configured with ID: ${GA_MEASUREMENT_ID}`, ANALYTICS_CONFIG);
};

// Check if analytics is enabled
const isAnalyticsEnabled = (): boolean => {
  const enabled = getAnalyticsConsent() === true && typeof window.gtag === "function";
  if (!enabled && typeof window.gtag !== "function") {
    console.warn("⚠️ gtag not available");
  }
  return enabled;
};

// Track session start
export const trackSessionStart = (): void => {
  if (!isAnalyticsEnabled()) return;

  console.log("📊 Tracking: session_start");
  window.gtag("event", ANALYTICS_EVENTS.SESSION_START, {
    event_category: "engagement",
  });
};

// Track path selection
export const trackPathSelected = (path: string): void => {
  if (!isAnalyticsEnabled()) return;

  console.log(`📊 Tracking: path_selected - ${path}`);
  window.gtag("event", ANALYTICS_EVENTS.PATH_SELECTED, {
    event_category: "user_action",
    path_name: path,
  });
};

// Track choice made
export const trackChoice = (
  sceneId: string,
  choiceLabel: string,
  scores: Partial<DimensionScores>,
): void => {
  if (!isAnalyticsEnabled()) return;

  console.log(`📊 Tracking: choice_made - ${sceneId}: ${choiceLabel}`);
  window.gtag("event", ANALYTICS_EVENTS.CHOICE_MADE, {
    event_category: "user_action",
    scene_id: sceneId,
    choice_label: choiceLabel,
    honesty_delta: scores.honesty || 0,
    vulnerability_delta: scores.vulnerability || 0,
    hope_delta: scores.hope || 0,
    self_worth_delta: scores.selfWorth || 0,
    action_delta: scores.action || 0,
    compassion_delta: scores.compassion || 0,
  });
};

// Track midpoint feedback
export const trackMidpointReached = (
  path: string,
  dominantDimension: string,
  scores: DimensionScores,
): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("event", ANALYTICS_EVENTS.MIDPOINT_REACHED, {
    event_category: "milestone",
    path_name: path,
    dominant_dimension: dominantDimension,
    honesty_score: scores.honesty,
    vulnerability_score: scores.vulnerability,
    hope_score: scores.hope,
    self_worth_score: scores.selfWorth,
    action_score: scores.action,
    compassion_score: scores.compassion,
  });
};

// Track ending reached
export const trackEndingReached = (
  endingId: string,
  endingTitle: string,
  scores: DimensionScores,
  path: string,
): void => {
  if (!isAnalyticsEnabled()) return;

  console.log(`📊 Tracking: ending_reached - ${endingId}: ${endingTitle}`);
  window.gtag("event", ANALYTICS_EVENTS.ENDING_REACHED, {
    event_category: "completion",
    ending_id: endingId,
    ending_title: endingTitle,
    path_name: path,
    honesty_score: scores.honesty,
    vulnerability_score: scores.vulnerability,
    hope_score: scores.hope,
    self_worth_score: scores.selfWorth,
    action_score: scores.action,
    compassion_score: scores.compassion,
  });
};

// Track feedback submission
export const trackFeedback = (
  endingId: string,
  feedbackLength: number,
  feedbackText?: string,
): void => {
  if (!isAnalyticsEnabled()) return;

  const eventParams: Record<string, any> = {
    event_category: "user_feedback",
    ending_id: endingId,
    feedback_length: feedbackLength,
    has_text_feedback: !!feedbackText,
  };

  // Include truncated text if provided and user gave consent
  // GA4 event parameters are limited to 100 characters
  if (feedbackText) {
    eventParams.feedback_text = feedbackText.substring(0, 100);
    console.log(
      `📊 Tracking: feedback_submitted with text (${feedbackLength} chars, sent: ${eventParams.feedback_text.length})`,
    );
  } else {
    console.log(`📊 Tracking: feedback_submitted (${feedbackLength} chars, no text shared)`);
  }

  window.gtag("event", ANALYTICS_EVENTS.FEEDBACK_SUBMITTED, eventParams);
};

// Track share click
export const trackShareClicked = (endingId: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("event", ANALYTICS_EVENTS.SHARE_CLICKED, {
    event_category: "engagement",
    ending_id: endingId,
  });
};

// Track restart click
export const trackRestartClicked = (endingId: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("event", ANALYTICS_EVENTS.RESTART_CLICKED, {
    event_category: "engagement",
    ending_id: endingId,
  });
};

// Track Buy Me a Coffee click
export const trackCoffeeClicked = (endingId: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("event", ANALYTICS_EVENTS.COFFEE_CLICKED, {
    event_category: "monetization",
    ending_id: endingId,
  });
};
