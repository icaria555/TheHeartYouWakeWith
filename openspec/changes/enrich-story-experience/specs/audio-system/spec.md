# Spec Delta: audio-system

## ADDED Requirements

### Requirement: Audio manager initialization and lifecycle

The system SHALL provide an audio manager that initializes on user consent, loads path-specific music theme, and maintains playback state throughout the experience.

#### Scenario: User grants audio consent on Landing screen

- **Given**: User views audio consent option on Landing screen
- **When**: User checks "Enable ambient music" and selects a path
- **Then**: Audio manager initializes Audio API
- **And**: Path-specific audio theme loads after path selection (Path A: hopeful, Path B: reflective, Path C: melancholic)
- **And**: Music begins playing (default on) when first story scene renders
- **And**: Audio preference saved to localStorage (`audioPreference: { enabled: true, volume: 0.7 }`)

#### Scenario: User declines audio consent

- **Given**: User views audio consent option on Landing screen
- **When**: User leaves "Enable ambient music" unchecked
- **Then**: Audio manager does not initialize
- **And**: No audio files load (bandwidth savings)
- **And**: AudioControls UI adapts to show "Audio disabled" or is hidden
- **And**: Audio preference saved to localStorage (`audioPreference: { enabled: false }`)

#### Scenario: Returning user with audio consent

- **Given**: User has previously granted audio consent (localStorage has `audioPreference.enabled: true`)
- **When**: User returns to experience
- **Then**: Audio manager initializes automatically on Landing screen
- **And**: Audio begins playing when journey starts (no re-consent needed)
- **And**: Previous volume level restored from localStorage

### Requirement: Audio theme library with 3 path-specific themes from Epidemic Sound

The system SHALL provide 3 distinct music themes sourced from Epidemic Sound, each assigned to a specific journey path.

#### Scenario: System loads HOPEFUL theme for Path A

- **Given**: User selects Path A ("Relationship & Date")
- **When**: Audio manager loads path-specific theme
- **Then**: System loads `public/audio/path-a.mp3` from Epidemic Sound library (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features uplifting melody, major key, bright instrumentation
- **And**: File size approximately 500KB-1MB (compressed 128kbps)
- **And**: Epidemic Sound license required for production use

#### Scenario: System loads REFLECTIVE theme for Path B

- **Given**: User selects Path B ("Relationship, No Date")
- **When**: Audio manager loads path-specific theme
- **Then**: System loads `public/audio/path-b.mp3` from Epidemic Sound library (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features gentle melody, neutral key, soft instrumentation
- **And**: Mood supports introspection and thoughtfulness

#### Scenario: System loads MELANCHOLIC/PEACEFUL theme for Path C

- **Given**: User selects Path C ("No Relationship")
- **When**: Audio manager loads path-specific theme
- **Then**: System loads `public/audio/path-c.mp3` from Epidemic Sound library (or OGG fallback)
- **And**: Track is 60-90 seconds long, seamless loop
- **And**: Theme features somber or peaceful melody, minor/neutral key, understated instrumentation
- **And**: Mood supports single-perspective self-reflection

### Requirement: Path-based audio theme selection with fade in/out

The system SHALL select a single audio theme based on the user's path choice and play it consistently throughout the entire journey.

#### Scenario: Path A plays HOPEFUL theme throughout journey

- **Given**: User selects Path A ("Relationship & Date")
- **When**: First story scene renders
- **Then**: Audio manager plays HOPEFUL theme (path-a.mp3)
- **And**: Theme continues playing through all Path A scenes (no mid-journey changes)
- **And**: Theme loops seamlessly for entire 7-10 minute journey
- **And**: Same theme plays until user reaches ending

#### Scenario: Path B plays REFLECTIVE theme throughout journey

- **Given**: User selects Path B ("Relationship, No Date")
- **When**: First story scene renders
- **Then**: Audio manager plays REFLECTIVE theme (path-b.mp3)
- **And**: Theme continues playing through all Path B scenes
- **And**: No theme changes occur based on scenes or scores
- **And**: Creates cohesive sonic identity for Path B journey

#### Scenario: Path C plays MELANCHOLIC theme throughout journey

- **Given**: User selects Path C ("No Relationship")
- **When**: First story scene renders
- **Then**: Audio manager plays MELANCHOLIC/PEACEFUL theme (path-c.mp3)
- **And**: Theme continues playing through all Path C scenes
- **And**: Consistent musical atmosphere supports single-perspective journey

#### Scenario: Audio fades in at journey start

- **Given**: User has consented to audio and selected a path
- **When**: First story scene begins rendering
- **Then**: Path-specific theme fades in from volume 0 to user_volume over 2 seconds
- **And**: Fade-in provides smooth, non-jarring audio introduction
- **And**: User can immediately mute if they prefer silence

#### Scenario: Audio fades out at journey end

- **Given**: User completes final scene and reaches ending
- **When**: Ending screen begins rendering
- **Then**: Current theme fades out from user_volume to 0 over 2 seconds
- **And**: Fade-out provides graceful conclusion to audio experience
- **And**: No abrupt audio cuts

### Requirement: Progressive audio loading after path selection

The system SHALL optimize audio loading by downloading only the single theme needed for the user's chosen path, after path selection.

#### Scenario: Audio loads after path selection, not on initial page load

- **Given**: User lands on Landing screen and grants audio consent
- **When**: User selects a path (A, B, or C)
- **Then**: System begins loading only that path's audio theme
- **And**: No audio files load on initial landing (optimizes < 3s initial load target)
- **And**: Other paths' themes never download (bandwidth optimization)
- **And**: Loading happens asynchronously during path selection → first scene transition

#### Scenario: Single theme loads for Path A

- **Given**: User selects Path A and audio consent is granted
- **When**: System transitions from path selection to first story scene
- **Then**: Only path-a.mp3 (HOPEFUL theme) downloads
- **And**: path-b.mp3 and path-c.mp3 do not download
- **And**: ~500KB-1MB download happens in background
- **And**: By time first scene fully renders, audio is ready to fade in

#### Scenario: Audio plays immediately if already loaded

- **Given**: User revisits experience with same path choice
- **When**: Browser cache contains path-specific audio file
- **Then**: System uses cached audio buffer (no re-download)
- **And**: Theme begins playing immediately on first scene
- **And**: No loading delay or bandwidth usage

### Requirement: Audio controls for user control

The system SHALL provide persistent UI controls for muting, unmuting, and volume adjustment.

#### Scenario: User mutes audio via prominent toggle

- **Given**: Audio is currently playing (default state after consent)
- **When**: User clicks mute button in AudioControls component
- **Then**: Audio fades to volume 0 over 0.5 seconds
- **And**: Playback pauses (not stops - position preserved)
- **And**: Mute button icon changes to "unmute" state
- **And**: Preference saved to localStorage (`audioPreference.enabled: false`)
- **And**: Toggle is easily accessible (top-right or floating button)

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

### Requirement: Audio analytics integration

The system SHALL track audio-related user interactions for experience optimization.

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

#### Scenario: User starts journey with audio

- **Given**: User consents to audio and selects path
- **When**: First story scene begins
- **Then**: Analytics event fires: `audio_journey_started`
- **And**: Event includes: `path` (A | B | C), `theme` (hopeful | reflective | melancholic)

### Requirement: Audio error handling

The system SHALL gracefully handle audio loading failures and browser autoplay restrictions.

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

The system MUST ensure audio features are accessible to all users.

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
