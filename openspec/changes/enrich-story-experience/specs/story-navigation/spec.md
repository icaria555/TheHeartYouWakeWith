# Spec Delta: story-navigation

## MODIFIED Requirements

### Requirement: The navigation system SHALL support 8-scene path progression

The navigation system must handle expanded paths with 8 scenes each, including proper sequencing of intermediate scenes (2.5, 3.5, 4.5).

#### Scenario: User navigates from Scene 2 to Scene 2.5
- **Given**: User completes choice in Scene A2
- **When**: System determines next scene
- **Then**: Navigation moves to Scene A2.5 (new intermediate scene)
- **And**: Scene counter reflects progress accurately (scene 3 of 8)
- **And**: Audio and visual themes transition appropriately

#### Scenario: User navigates through all interpolated scenes
- **Given**: User is progressing through Path B
- **When**: User completes scenes B2 → B2.5 → B3 → B3.5 → B4 → B4.5 → B5
- **Then**: Navigation correctly sequences all scenes in order
- **And**: No scenes are skipped or duplicated
- **And**: Midpoint feedback triggers only at B3 (not B2.5 or B3.5)

### Requirement: Scene transitions MUST include smooth animations

Navigation between scenes must include smooth animations (fade, slide) to enhance perceived polish and provide visual continuity.

#### Scenario: User advances to next scene
- **Given**: User selects a choice in current scene
- **When**: Navigation triggers scene change
- **Then**: Current scene fades out and moves left (-20px) over 400ms
- **And**: Next scene fades in and moves from right (20px) over 400ms
- **And**: Animations use ease-in-out timing function
- **And**: Background gradient crossfades over 2s (independent of scene animation)

#### Scenario: User has reduced motion preference
- **Given**: User's system has `prefers-reduced-motion: reduce` enabled
- **When**: Navigation triggers scene change
- **Then**: Scene change is instant (no fade, no slide)
- **And**: Background gradient still transitions (accessible, non-vestibular)
- **And**: Particle effects are disabled entirely

### Requirement: The navigation system MUST track current scene position accurately

The navigation system must maintain accurate scene position tracking for progress indication and midpoint detection.

#### Scenario: User is at Scene 3 of 8
- **Given**: User has completed scenes 1, 2, 2.5
- **When**: User enters Scene 3
- **Then**: Progress indicator shows 3/8 or ~37% completion
- **And**: Midpoint feedback system detects this as midpoint trigger
- **And**: System correctly identifies 5 more scenes remaining

#### Scenario: User is at final scene (Scene 5)
- **Given**: User has completed all intermediate scenes
- **When**: User enters Scene 5 (crossroad)
- **Then**: Progress indicator shows 8/8 or 100% completion
- **And**: Next choice leads to ending evaluation (not another scene)
- **And**: System prepares ending transition animations

## ADDED Requirements

### Requirement: The system MUST transition background gradients smoothly between scenes

When navigating between scenes, the system must smoothly transition background gradients to match the new scene's emotional tone.

#### Scenario: Scene changes from WARM to COOL background
- **Given**: User is in Scene A2 with WARM background (pink/orange)
- **When**: User navigates to Scene A3 with COOL background (blue/purple)
- **Then**: CSS transition animates gradient over 2 seconds
- **And**: Transition uses ease-in-out for smooth color shift
- **And**: Gradient animation loop continues uninterrupted after transition

#### Scenario: Scene changes particle type
- **Given**: User is in scene with "hearts" particles
- **When**: User navigates to scene with "sparkles" particles
- **Then**: Hearts fade out over 1 second
- **And**: Sparkles fade in over 1 second
- **And**: Particle count adjusts for device capabilities (mobile vs desktop)

### Requirement: Audio themes MUST transition during scene navigation

When navigating between scenes, the audio system must transition music themes if the new scene specifies a different theme or if score thresholds trigger a change.

#### Scenario: Scene change triggers audio theme transition
- **Given**: User is in scene with "reflective" audio theme playing
- **When**: User navigates to scene with "melancholic" audio theme
- **Then**: Current theme fades out (volume 1 → 0) over 2 seconds
- **And**: New theme fades in (volume 0 → user_volume) over 2 seconds
- **And**: Crossfade starts immediately on scene transition (simultaneous with visual transition)

#### Scenario: Score-driven theme override during scene change
- **Given**: User's accumulated `hope` score drops below -2
- **When**: User navigates to next scene (regardless of scene's default theme)
- **Then**: Audio system overrides to "melancholic" theme
- **And**: Theme transition uses same 2-second crossfade
- **And**: Override persists until scores return above threshold

## Related Capabilities

- **narrative-engine**: Provides scene data with audio/visual theme metadata
- **audio-system**: Handles audio theme crossfading during transitions
- **visual-design**: Handles gradient transitions and particle crossfades
- **user-feedback**: Uses scene position for progress indication
