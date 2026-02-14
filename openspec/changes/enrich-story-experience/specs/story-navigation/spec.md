# Spec Delta: story-navigation

## MODIFIED Requirements

### Requirement: Scene progression supports variable scene counts per path

The navigation system SHALL handle expanded paths with variable scene counts (Path A: 8, Path B: 9, Path C: 7), supporting mid-journey content additions.

#### Scenario: User navigates through Path A (8 scenes)

- **Given**: User is progressing through Path A
- **When**: User completes each scene
- **Then**: Navigation correctly sequences through all 8 scenes
- **And**: Scene counter reflects progress accurately (scene X of 8)
- **And**: No scenes are skipped or duplicated

#### Scenario: User navigates through Path B (9 scenes)

- **Given**: User is progressing through Path B
- **When**: User completes each scene
- **Then**: Navigation correctly sequences through all 9 scenes
- **And**: Additional scene supports deeper relationship exploration
- **And**: Midpoint feedback may trigger at different percentage than Path A/C

### Requirement: Scene transitions include smooth animations under 300ms

Navigation between scenes SHALL include smooth animations (fade, slide) under 300ms to enhance perceived polish and provide visual continuity.

#### Scenario: User advances to next scene

- **Given**: User selects a choice in current scene
- **When**: Navigation triggers scene change
- **Then**: Current scene fades out and moves left (-20px) in under 300ms
- **And**: Next scene fades in and moves from right (20px) in under 300ms
- **And**: Animations use ease-in-out timing function
- **And**: Background gradient crossfades over 2s (independent of scene animation)

#### Scenario: User has reduced motion preference

- **Given**: User's system has `prefers-reduced-motion: reduce` enabled
- **When**: Navigation triggers scene change
- **Then**: Scene change is instant (no fade, no slide)
- **And**: Background gradient still transitions (accessible, non-vestibular)
- **And**: Particle effects are disabled/reduced entirely

### Requirement: Navigation state tracks current scene position for variable paths

The navigation system MUST maintain accurate scene position tracking for progress indication and midpoint detection across variable-length paths.

#### Scenario: User is at Scene 4 of Path A (8 scenes)

- **Given**: User has completed 3 scenes in Path A
- **When**: User enters Scene 4
- **Then**: Progress indicator shows 4/8 or 50% completion
- **And**: System correctly identifies 4 more scenes remaining

#### Scenario: User is at Scene 5 of Path B (9 scenes)

- **Given**: User has completed 4 scenes in Path B
- **When**: User enters Scene 5
- **Then**: Progress indicator shows 5/9 or ~56% completion
- **And**: System correctly identifies 4 more scenes remaining

#### Scenario: User is at final scene of Path C (7 scenes)

- **Given**: User has completed all scenes in Path C
- **When**: User enters final scene
- **Then**: Progress indicator shows 7/7 or 100% completion
- **And**: Next choice leads to ending evaluation (not another scene)
- **And**: System prepares ending transition

## ADDED Requirements

### Requirement: Background gradient transitions between scenes

When navigating between scenes, the system SHALL smoothly transition background gradients to match the new scene's emotional tone.

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

### Requirement: Audio continues without transitions during navigation

When navigating between scenes, the path-based audio theme SHALL continue playing without any crossfades or theme changes.

#### Scenario: Scene navigation with path-based audio

- **Given**: User is progressing through Path A with HOPEFUL theme playing
- **When**: User navigates to next scene
- **Then**: HOPEFUL theme continues playing (no crossfade)
- **And**: Audio loops seamlessly in background
- **And**: Only visual elements transition (background gradient, particles)
- **And**: No audio theme change occurs at any point in the journey

## Related Capabilities

- **narrative-engine**: Provides scene data with audio/visual theme metadata
- **audio-system**: Handles audio theme crossfading during transitions
- **visual-design**: Handles gradient transitions and particle crossfades
- **user-feedback**: Uses scene position for progress indication
