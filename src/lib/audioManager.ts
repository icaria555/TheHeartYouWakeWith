/**
 * Audio Manager Implementation
 *
 * Manages path-based background music with fade-in/fade-out transitions.
 * Supports progressive loading, localStorage persistence, and accessibility.
 */

import {
  AudioTheme,
  AudioPreference,
  AudioManager,
  AudioManagerConfig,
  AudioTrack,
} from "../types/audio";

const DEFAULT_VOLUME = 0.3; // 30% volume
const FADE_DURATION = 2000; // 2 seconds in milliseconds
const FADE_STEPS = 50; // Number of steps in fade animation

export class AudioManagerImpl implements AudioManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;

  private tracks: Map<AudioTheme, AudioTrack> = new Map();
  private currentTheme: AudioTheme | null = null;
  private currentVolume: number = DEFAULT_VOLUME;
  private isMutedState: boolean = false;
  private isInitialized: boolean = false;
  private fadeIntervalId: number | null = null;

  constructor(config: AudioManagerConfig) {
    config.tracks.forEach((track) => {
      this.tracks.set(track.theme, track);
    });

    if (config.defaultVolume !== undefined) {
      this.currentVolume = config.defaultVolume;
    }

    // Load saved preferences
    this.loadPreferences();
  }

  /**
   * Initialize the audio system
   * Must be called after user interaction (autoplay policy compliance)
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create AudioContext (Safari requires webkitAudioContext)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();

      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = this.isMutedState ? 0 : this.currentVolume;

      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize audio system:", error);
      throw new Error("Audio initialization failed. Your browser may not support Web Audio API.");
    }
  }

  /**
   * Play audio for a specific theme with fade-in
   */
  async play(theme: AudioTheme): Promise<void> {
    if (theme === "none") {
      this.stop();
      return;
    }

    const track = this.tracks.get(theme);
    if (!track) {
      console.warn(`No audio track found for theme: ${theme}`);
      return;
    }

    // If same theme is already playing, do nothing
    if (this.currentTheme === theme && this.audioElement && !this.audioElement.paused) {
      return;
    }

    // Stop current audio with fade-out before starting new one
    if (this.audioElement && !this.audioElement.paused) {
      await this.fadeOut();
      this.cleanup();
    }

    try {
      // Create new audio element
      this.audioElement = new Audio(track.src);
      this.audioElement.loop = true;
      this.audioElement.preload = "auto";

      // Connect to Web Audio API if initialized
      if (this.audioContext && this.gainNode && !this.sourceNode) {
        this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
        this.sourceNode.connect(this.gainNode);
      }

      // Start at zero volume for fade-in
      if (this.gainNode) {
        this.gainNode.gain.value = 0;
      }

      // Play audio
      await this.audioElement.play();
      this.currentTheme = theme;

      // Fade in
      await this.fadeIn();
    } catch (error) {
      console.error(`Failed to play audio for theme ${theme}:`, error);

      // Handle autoplay policy errors
      if (error instanceof Error && error.name === "NotAllowedError") {
        console.warn("Autoplay blocked. Audio will start after user interaction.");
      }
    }
  }

  /**
   * Pause current audio
   */
  pause(): void {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
  }

  /**
   * Stop current audio with fade-out
   */
  stop(): void {
    if (this.audioElement) {
      this.fadeOut().then(() => {
        if (this.audioElement) {
          this.audioElement.pause();
          this.audioElement.currentTime = 0;
        }
      });
    }
    this.currentTheme = null;
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    this.currentVolume = Math.max(0, Math.min(1, volume));

    if (this.gainNode && !this.isMutedState) {
      this.gainNode.gain.value = this.currentVolume;
    }

    this.savePreferences();
  }

  /**
   * Mute audio
   */
  mute(): void {
    this.isMutedState = true;

    if (this.gainNode) {
      this.gainNode.gain.value = 0;
    }

    this.savePreferences();
  }

  /**
   * Unmute audio
   */
  unmute(): void {
    this.isMutedState = false;

    if (this.gainNode) {
      this.gainNode.gain.value = this.currentVolume;
    }

    this.savePreferences();
  }

  /**
   * Check if audio is muted
   */
  isMuted(): boolean {
    return this.isMutedState;
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): AudioTheme | null {
    return this.currentTheme;
  }

  /**
   * Check if audio is currently playing
   */
  isPlaying(): boolean {
    return !!(this.audioElement && !this.audioElement.paused);
  }

  /**
   * Clean up audio resources
   */
  cleanup(): void {
    if (this.fadeIntervalId) {
      clearInterval(this.fadeIntervalId);
      this.fadeIntervalId = null;
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = "";
      this.audioElement = null;
    }
  }

  /**
   * Fade in audio over FADE_DURATION
   */
  private fadeIn(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.gainNode) {
        resolve();
        return;
      }

      const targetVolume = this.isMutedState ? 0 : this.currentVolume;
      const startVolume = 0;
      const stepSize = (targetVolume - startVolume) / FADE_STEPS;
      const stepDuration = FADE_DURATION / FADE_STEPS;

      let currentStep = 0;

      this.fadeIntervalId = window.setInterval(() => {
        if (!this.gainNode) {
          if (this.fadeIntervalId) clearInterval(this.fadeIntervalId);
          resolve();
          return;
        }

        currentStep++;
        const newVolume = startVolume + stepSize * currentStep;
        this.gainNode.gain.value = Math.min(newVolume, targetVolume);

        if (currentStep >= FADE_STEPS) {
          if (this.fadeIntervalId) clearInterval(this.fadeIntervalId);
          this.fadeIntervalId = null;
          resolve();
        }
      }, stepDuration);
    });
  }

  /**
   * Fade out audio over FADE_DURATION
   */
  private fadeOut(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.gainNode) {
        resolve();
        return;
      }

      const startVolume = this.gainNode.gain.value;
      const targetVolume = 0;
      const stepSize = (startVolume - targetVolume) / FADE_STEPS;
      const stepDuration = FADE_DURATION / FADE_STEPS;

      let currentStep = 0;

      this.fadeIntervalId = window.setInterval(() => {
        if (!this.gainNode) {
          if (this.fadeIntervalId) clearInterval(this.fadeIntervalId);
          resolve();
          return;
        }

        currentStep++;
        const newVolume = startVolume - stepSize * currentStep;
        this.gainNode.gain.value = Math.max(newVolume, targetVolume);

        if (currentStep >= FADE_STEPS) {
          if (this.fadeIntervalId) clearInterval(this.fadeIntervalId);
          this.fadeIntervalId = null;
          resolve();
        }
      }, stepDuration);
    });
  }

  /**
   * Load audio preferences from localStorage
   */
  private loadPreferences(): void {
    try {
      const volumeStr = localStorage.getItem("audioVolume");
      if (volumeStr) {
        this.currentVolume = parseFloat(volumeStr);
      }

      const mutedStr = localStorage.getItem("audioMuted");
      if (mutedStr) {
        this.isMutedState = mutedStr === "true";
      }
    } catch (error) {
      console.warn("Failed to load audio preferences:", error);
    }
  }

  /**
   * Save audio preferences to localStorage
   */
  private savePreferences(): void {
    try {
      localStorage.setItem("audioVolume", this.currentVolume.toString());
      localStorage.setItem("audioMuted", this.isMutedState.toString());
    } catch (error) {
      console.warn("Failed to save audio preferences:", error);
    }
  }
}

/**
 * Audio track configuration
 * Placeholder paths - replace with actual Epidemic Sound tracks after license
 */
export const AUDIO_TRACKS: AudioTrack[] = [
  {
    theme: "hopeful",
    src: "/audio/path-a-hopeful.mp3", // Path A: Relationship with plans
    title: "Hopeful Morning",
  },
  {
    theme: "reflective",
    src: "/audio/path-b-reflective.mp3", // Path B: Relationship without plans
    title: "Quiet Reflection",
  },
  {
    theme: "melancholic",
    src: "/audio/path-c-melancholic.mp3", // Path C: Single
    title: "Peaceful Solitude",
  },
];

/**
 * Factory function to create audio manager instance
 */
export function createAudioManager(): AudioManager {
  return new AudioManagerImpl({
    tracks: AUDIO_TRACKS,
    defaultVolume: DEFAULT_VOLUME,
    fadeDuration: FADE_DURATION,
  });
}
