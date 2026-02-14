# Spec Delta: user-feedback

## MODIFIED Requirements

### Requirement: Midpoint feedback timing adjusted for variable scene counts

The midpoint feedback system SHALL trigger at an appropriate midpoint for each path's variable scene count, providing dimensional feedback during the journey.

#### Scenario: User reaches midpoint in Path A (8 scenes)

- **Given**: User has completed approximately 4 scenes in Path A
- **When**: User enters a midpoint scene
- **Then**: System displays midpoint feedback phrase based on dominant dimension
- **And**: Feedback appears at ~50% journey progress
- **And**: Feedback logic unchanged (uses `getDominantDimension()` and `getMidpointFeedbackPhrase()`)

#### Scenario: User reaches midpoint in Path B (9 scenes)

- **Given**: User has completed approximately 4-5 scenes in Path B
- **When**: User enters a midpoint scene
- **Then**: System displays midpoint feedback phrase
- **And**: Feedback appears at ~50% journey progress (adjusted for 9-scene path)

#### Scenario: User reaches midpoint in Path C (7 scenes)

- **Given**: User has completed approximately 3-4 scenes in Path C
- **When**: User enters a midpoint scene
- **Then**: System displays midpoint feedback phrase
- **And**: Feedback appears at ~50% journey progress (adjusted for 7-scene path)

## ADDED Requirements

### Requirement: Audio enhances emotional feedback through path-based theme

The audio system SHALL provide ambient feedback through a consistent path-based theme that reinforces the overall emotional tone of each relationship journey type.

#### Scenario: User experiences Path A with HOPEFUL theme

- **Given**: User selects Path A ("Relationship & Date")
- **When**: User progresses through journey
- **Then**: HOPEFUL audio theme plays consistently throughout all scenes
- **And**: Theme reinforces balanced relationship journey atmosphere
- **And**: User experiences cohesive sonic identity for Path A

#### Scenario: User experiences Path B with REFLECTIVE theme

- **Given**: User selects Path B ("Relationship, No Date")
- **When**: User progresses through journey
- **Then**: REFLECTIVE audio theme plays consistently throughout all scenes
- **And**: Theme supports introspective, complex emotional exploration
- **And**: User experiences contemplative atmosphere for relationship without plans

#### Scenario: User experiences Path C with MELANCHOLIC theme

- **Given**: User selects Path C ("No Relationship")
- **When**: User progresses through journey
- **Then**: MELANCHOLIC/PEACEFUL audio theme plays consistently throughout all scenes
- **And**: Theme supports single-perspective self-reflection
- **And**: User experiences appropriate emotional atmosphere for solo journey

### Requirement: Visual feedback through background themes

The visual system SHALL provide ambient feedback through background gradient colors that reflect scene emotional tone.

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

The visual system SHALL render particle effects that subtly reinforce the emotional tone of scenes.

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
