# Spec Delta: audio-system

## ADDED Requirements

### Requirement: Audio manager initialization and lifecycle

The system must provide an audio manager that initializes on user consent, loads music themes, and maintains playback state throughout the experience.

#### Scenario: User grants audio consent on Landing screen
- **Given**: User views audio consent option on Landing screen
- **When**: User checks "Enable ambient music" and starts journey
- **Then**: Audio manager initializes Audio API
- **And**: First audio theme (based on Path selection) preloads
- **And**: Music begins playing when first scene renders (after user interaction)
- **And**: Audio preference saved to localStorage (`audioPreference: { enabled: true, volume: 0.7 }`)

#### Scenario: User declines audio consent
- **Given**: User views audio consent option on Landing screen
- **When**: User leaves "Enable ambient music" unchecked
- **Then**: Audio manager does not initialize
- **And**: No audio files load (bandwidth savings)
- **And**: Audio controls UI remains visible but displays "Audio disabled" state
- **And**: Audio preference saved to localStorage (`audioPreference: { enabled: false }`)

#### Scenario: Returning user with audio consent
- **Given**: User has previously granted audio consent (localStorage has `audioPreference.enabled: true`)
- **When**: User returns to experience
- **Then**: Audio manager initializes automatically on Landing screen
- **And**: Audio begins playing when journey starts (no re-consent needed)
- **And**: Previous volume level restored from localStorage

### Requirement: Audio theme library with 3 emotional themes

The system must provide 3 distinct music themes that match different emotional tones in the narrative.

#### Scenario: System loads HOPEFUL theme
- **Given**: Audio manager is initialized
- **When**: Scene requires "hopeful" audio theme
- **Then**: System loads `public/audio/hopeful.mp3` (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features uplifting melody, major key, bright instrumentation
- **And**: File size approximately 500KB-1MB (compressed 128kbps)

#### Scenario: System loads REFLECTIVE theme
- **Given**: Audio manager is initialized
- **When**: Scene requires "reflective" audio theme
- **Then**: System loads `public/audio/reflective.mp3` (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features gentle melody, neutral key, soft instrumentation
- **And**: Mood supports introspection and thoughtfulness

#### Scenario: System loads MELANCHOLIC theme
- **Given**: Audio manager is initialized
- **When**: Scene requires "melancholic" audio theme
- **Then**: System loads `public/audio/melancholic.mp3` (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features somber melody, minor key, understated instrumentation
- **And**: Mood supports sadness, longing, or emotional weight

### Requirement: Audio theme selection and crossfading

The system must intelligently select audio themes based on scene defaults and dimensional score overrides, with smooth crossfades between themes.

#### Scenario: Scene specifies default audio theme
- **Given**: User enters Scene A2 with `audioTheme: "reflective"`
- **When**: Scene renders and no score overrides apply
- **Then**: Audio manager transitions to "reflective" theme
- **And**: If already playing different theme, 2-second crossfade begins
- **And**: If already playing same theme, no transition occurs (continues playing)

#### Scenario: Dimensional scores override audio theme to HOPEFUL
- **Given**: User's accumulated `hope` score exceeds +2
- **When**: User navigates to any scene (regardless of scene's default theme)
- **Then**: Audio manager overrides to "hopeful" theme
- **And**: Crossfade to hopeful theme over 2 seconds
- **And**: Override persists until `hope` score drops below +2

#### Scenario: Dimensional scores override audio theme to MELANCHOLIC
- **Given**: User's accumulated `hope` OR `selfWorth` score falls below -2
- **When**: User navigates to any scene
- **Then**: Audio manager overrides to "melancholic" theme
- **And**: Crossfade to melancholic theme over 2 seconds
- **And**: Override persists until both scores rise above -2

#### Scenario: Audio crossfade between themes
- **Given**: Audio is playing "reflective" theme at volume 0.7
- **When**: System requests transition to "melancholic" theme
- **Then**: "Reflective" theme fades out (0.7 → 0) over 2 seconds
- **And**: "Melancholic" theme fades in (0 → 0.7) over 2 seconds
- **And**: Both tracks play simultaneously during crossfade
- **And**: Old theme stops and unloads after fade completes

### Requirement: Lazy loading and preloading strategy

The system must optimize audio loading to minimize initial load time while ensuring seamless transitions.

#### Scenario: Initial audio theme loads on consent
- **Given**: User grants audio consent on Landing screen
- **When**: Audio manager initializes
- **Then**: First theme (based on Path A default) preloads immediately
- **And**: Other themes do not load yet (bandwidth optimization)
- **And**: Loading happens asynchronously (non-blocking)

#### Scenario: Next theme preloads during current scene
- **Given**: User is in Scene A2 with "reflective" theme playing
- **When**: System detects next scene (A3) uses "melancholic" theme
- **Then**: "Melancholic" theme begins loading in background
- **And**: Preload happens during scene reading time (~30-60 seconds)
- **And**: By time user makes choice, next theme is ready for instant crossfade

#### Scenario: Theme already loaded when requested
- **Given**: User previously heard "hopeful" theme in Scene A1
- **When**: User returns to scene requiring "hopeful" theme later
- **Then**: System reuses cached audio buffer (no re-download)
- **And**: Theme begins playing immediately (no loading delay)

### Requirement: Audio controls for user control

The system must provide persistent UI controls for muting, unmuting, and volume adjustment.

#### Scenario: User mutes audio via controls
- **Given**: Audio is currently playing
- **When**: User clicks mute button in AudioControls component
- **Then**: Audio fades to volume 0 over 0.5 seconds
- **And**: Playback pauses (not stops - position preserved)
- **And**: Mute button icon changes to "unmute" state
- **And**: Preference saved to localStorage (`audioPreference.enabled: false`)

#### Scenario: User unmutes audio via controls
- **Given**: Audio is currently muted
- **When**: User clicks unmute button in AudioControls component
- **Then**: Playback resumes from paused position
- **And**: Audio fades from 0 to previous volume over 0.5 seconds
- **And**: Mute button icon changes to "mute" state
- **And**: Preference saved to localStorage (`audioPreference.enabled: true`)

#### Scenario: User adjusts volume (future enhancement)
- **Given**: Audio is playing at volume 0.7
- **When**: User drags volume slider to 0.4
- **Then**: Audio volume changes smoothly to 0.4
- **And**: New volume preference saved to localStorage
- **And**: Volume persists across page reloads

### Requirement: Audio Analytics Integration

The system must track audio-related user interactions for experience optimization.

#### Scenario: User enables audio
- **Given**: User checks audio consent checkbox
- **When**: Audio manager initializes
- **Then**: Analytics event fires: `audio_enabled`
- **And**: Event includes no PII (timestamp only)

#### Scenario: User mutes audio
- **Given**: Audio is playing
- **When**: User clicks mute button
- **Then**: Analytics event fires: `audio_muted`
- **And**: Event includes scene_id (understand where users mute)

#### Scenario: User unmutes audio
- **Given**: Audio is muted
- **When**: User clicks unmute button
- **Then**: Analytics event fires: `audio_unmuted`
- **And**: Event includes scene_id (understand engagement patterns)

#### Scenario: Audio theme changes
- **Given**: Audio system transitions between themes
- **When**: Crossfade begins
- **Then**: Analytics event fires: `audio_theme_changed`
- **And**: Event includes: `previous_theme`, `new_theme`, `trigger` (scene_default | score_override)

### Requirement: Audio error handling

The system must gracefully handle audio loading failures and browser autoplay restrictions.

#### Scenario: Audio file fails to load
- **Given**: User has audio enabled
- **When**: Audio file request returns 404 or network error
- **Then**: Audio manager logs error to console (non-blocking)
- **And**: Experience continues without audio (no crash)
- **And**: AudioControls UI shows "Audio unavailable" state
- **And**: User can continue journey without music

#### Scenario: Browser blocks autoplay
- **Given**: User is on Safari iOS (strict autoplay policy)
- **When**: Audio manager attempts to play theme
- **Then**: Audio manager detects autoplay prevention
- **And**: Audio remains paused until user interacts (clicks button)
- **And**: After first interaction, audio plays normally
- **And**: No error shown to user (expected browser behavior)

#### Scenario: Unsupported audio format
- **Given**: User's browser does not support MP3
- **When**: Audio manager loads theme
- **Then**: System attempts OGG fallback
- **And**: If OGG also fails, audio disabled gracefully
- **And**: Experience continues without audio

### Requirement: Audio accessibility

The system must ensure audio features are accessible to all users.

#### Scenario: Screen reader announces audio controls
- **Given**: User navigates with screen reader
- **When**: Focus moves to audio controls button
- **Then**: Screen reader announces "Mute audio" or "Unmute audio"
- **And**: Button has proper ARIA label and role
- **And**: Button state changes are announced to screen reader

#### Scenario: Keyboard navigation for audio controls
- **Given**: User navigates with keyboard only
- **When**: User tabs to audio controls
- **Then**: Focus indicator visibly highlights button
- **And**: User can toggle mute/unmute with Space or Enter key
- **And**: Focus management works correctly across all scenes

## Related Capabilities

- **narrative-engine**: Provides audio theme metadata per scene
- **story-navigation**: Triggers audio theme changes during transitions
- **user-feedback**: Audio provides ambient emotional feedback
- **analytics**: Tracks audio engagement metrics
- **ending-feedback**: Audio continues through ending screen
