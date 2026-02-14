# Spec Delta: user-feedback

## MODIFIED Requirements

### Requirement: Midpoint feedback timing adjusted for 8-scene structure

The midpoint feedback system must continue to trigger at Scene 3, which is now approximately 37% through the journey (scene 3 of 8) instead of 60% (scene 3 of 5).

#### Scenario: User reaches Scene 3 in 8-scene path
- **Given**: User has completed scenes 1, 2, and 2.5
- **When**: User enters Scene 3 (tension moment)
- **Then**: System displays midpoint feedback phrase based on dominant dimension
- **And**: Feedback appears at ~37% journey progress (earlier than before)
- **And**: Feedback logic unchanged (uses `getDominantDimension()` and `getMidpointFeedbackPhrase()`)

## ADDED Requirements

### Requirement: Audio enhances emotional feedback

The audio system provides ambient feedback that reinforces the emotional tone of the user's journey through theme selection.

#### Scenario: User's choices lead to high hope scores
- **Given**: User's accumulated `hope` score exceeds +2
- **When**: User navigates to next scene
- **Then**: Audio system transitions to "hopeful" theme (uplifting melody)
- **And**: Theme reinforces positive emotional feedback without explicit score display
- **And**: User experiences emotional resonance through music

#### Scenario: User's choices lead to low self-worth scores
- **Given**: User's accumulated `selfWorth` score falls below -2
- **When**: User navigates to next scene
- **Then**: Audio system transitions to "melancholic" theme (somber melody)
- **And**: Theme provides subtle feedback about emotional trajectory
- **And**: User may reflect on choices without explicit judgment

### Requirement: Visual feedback through background themes

The visual system provides ambient feedback through background gradient colors that reflect scene emotional tone.

#### Scenario: User experiences hopeful romantic scene
- **Given**: Scene narrative explores hope and connection
- **When**: Scene renders with WARM background theme
- **Then**: Pink/orange/gold gradients create warm, optimistic atmosphere
- **And**: Visual feedback reinforces hopeful emotional content
- **And**: User perceives subtle encouragement through color psychology

#### Scenario: User experiences tense uncertain scene
- **Given**: Scene narrative explores conflict or doubt
- **When**: Scene renders with NEUTRAL background theme
- **Then**: Gray/beige/muted gradients create uncertain atmosphere
- **And**: Visual feedback reinforces tension without overwhelming text
- **And**: User experiences environmental mood shift

### Requirement: Particle effects provide emotional ambiance

The visual system renders particle effects that subtly reinforce the emotional tone of scenes.

#### Scenario: Scene has romantic hopeful tone
- **Given**: Scene explores love, connection, or optimism
- **When**: Scene specifies "hearts" particle type
- **Then**: 10-30 heart shapes float upward slowly across screen
- **And**: Particles enhance romantic Valentine's Day atmosphere
- **And**: Effect is decorative, not distracting from narrative text

#### Scenario: Scene has reflective introspective tone
- **Given**: Scene explores self-reflection or contemplation
- **When**: Scene specifies "bubbles" particle type
- **Then**: 10-30 translucent bubbles rise gently across screen
- **And**: Particles create calm, thoughtful atmosphere
- **And**: Effect supports meditative reading experience

#### Scenario: Scene has intense emotional moment
- **Given**: Scene narrative is emotionally heavy or conflicted
- **When**: Scene specifies "none" particle type
- **Then**: No particles render on screen
- **And**: Visual simplicity allows focus on narrative text
- **And**: Absence of decoration emphasizes scene weight

## Related Capabilities

- **audio-system**: Provides theme-based emotional feedback
- **visual-design**: Renders background gradients and particle effects
- **narrative-engine**: Defines per-scene visual and audio themes
- **story-navigation**: Triggers feedback updates during scene transitions
