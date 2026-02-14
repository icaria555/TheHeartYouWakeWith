export const GA_MEASUREMENT_ID = "G-0TL6RM3JRG";

export const ANALYTICS_CONFIG = {
  anonymize_ip: true,
  cookie_flags: "SameSite=None;Secure",
  send_page_view: false, // We'll manually track page views
  debug_mode: false, // Enable debug mode for GA4 DebugView
};

// Custom event names
export const ANALYTICS_EVENTS = {
  SESSION_START: "session_start",
  PATH_SELECTED: "path_selected",
  CHOICE_MADE: "choice_made",
  MIDPOINT_REACHED: "midpoint_reached",
  ENDING_REACHED: "ending_reached",
  FEEDBACK_SUBMITTED: "feedback_submitted",
  SHARE_CLICKED: "share_clicked",
  RESTART_CLICKED: "restart_clicked",
  COFFEE_CLICKED: "coffee_clicked",
} as const;
