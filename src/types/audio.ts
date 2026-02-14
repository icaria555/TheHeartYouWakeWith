/**
 * Audio System Types
 *
 * Defines types for the path-based audio theme system.
 * Each path (A, B, C) has a unique audio theme that plays throughout the journey.
 */

export type AudioTheme = "hopeful" | "reflective" | "melancholic" | "none";

export type AudioPreference = "enabled" | "disabled";

export interface AudioTrack {
  theme: AudioTheme;
  src: string;
  title: string;
}

export interface AudioManagerConfig {
  tracks: AudioTrack[];
  defaultVolume?: number;
  fadeDuration?: number;
}

export interface AudioManager {
  // Initialization
  initialize(): Promise<void>;

  // Playback control
  play(theme: AudioTheme): Promise<void>;
  pause(): void;
  stop(): void;

  // Volume control
  setVolume(volume: number): void;
  mute(): void;
  unmute(): void;
  isMuted(): boolean;

  // State
  getCurrentTheme(): AudioTheme | null;
  isPlaying(): boolean;

  // Cleanup
  cleanup(): void;
}
