# Spec Delta: narrative-engine

## MODIFIED Requirements

### Requirement: Scene count per path expanded with variable lengths

The narrative engine SHALL support variable scene counts per path (Path A: 8, Path B: 9, Path C: 7) to provide narrative flexibility while maintaining 7-10 minute experience.

#### Scenario: User completes Path A with 8 scenes

- **Given**: User selects "Relationship & Date" path
- **When**: User progresses through all scenes
- **Then**: System presents 8 scenes total before ending evaluation
- **And**: Scenes add mid-journey depth focusing on tension, hesitation, reflection
- **And**: Total journey time is 7-10 minutes (increased from 3-5 minutes)

#### Scenario: User completes Path B with 9 scenes (most complex)

- **Given**: User selects "Relationship, No Date" path
- **When**: User progresses through all scenes
- **Then**: System presents 9 scenes total before ending evaluation
- **And**: Additional scene supports deeper exploration of relationship without plans
- **And**: Journey remains within 7-10 minute target despite extra scene

#### Scenario: User completes Path C with 7 scenes (direct)

- **Given**: User selects "No Relationship" path
- **When**: User progresses through all scenes
- **Then**: System presents 7 scenes total before ending evaluation
- **And**: Fewer scenes support more direct single-perspective introspection
- **And**: Journey maintains consistent 7-10 minute experience across all paths

### Requirement: New mid-journey scenes contribute ±1 dimensional scores

New mid-journey scenes (added around path midpoint) MUST offer gentle dimensional score adjustments to deepen emotional exploration without destabilizing existing score balance.

#### Scenario: User makes choice in mid-journey scene (Path A Scene 4)

- **Given**: User is in newly added mid-journey scene
- **When**: User selects any choice
- **Then**: Choice applies ±1 score adjustment to 1-2 dimensions (e.g., `{ vulnerability: 1, hope: -1 }`)
- **And**: Score adjustment follows existing SCORE_ASSIGNMENT_STRATEGY.md guidelines
- **And**: Total accumulated scores remain within -6 to +6 range per dimension (existing ending thresholds)

#### Scenario: User makes choice in mid-journey scene (Path B Scene 5)

- **Given**: User is in newly added mid-journey scene
- **When**: User selects any choice
- **Then**: Choice applies ±1 score adjustment to 1-2 dimensions
- **And**: Choice explores tension, hesitation, or deeper reflection
- **And**: Score adjustment maintains balance within -6 to +6 range for existing endings

### Requirement: Scene data structure extended with visual metadata only

The Scene interface MUST include new properties for background theme and particle effects to support enhanced presentation layer. Audio theme is path-based, not per-scene.

#### Scenario: Scene defines background theme

- **Given**: Developer adds new scene to STORY_DATA
- **When**: Scene data includes `backgroundTheme: "warm"` property
- **Then**: Visual system applies corresponding animated gradient (pink/orange/gold)
- **And**: Gradient transitions smoothly from previous scene (2s crossfade)

#### Scenario: Scene defines particle type

- **Given**: Developer adds new scene to STORY_DATA
- **When**: Scene data includes `particleType: "hearts"` property
- **Then**: Visual system renders floating heart particles (10-20 count based on device)
- **And**: Particles respect reduced motion preference (disabled if `prefers-reduced-motion: reduce`)

## ADDED Requirements

### Requirement: Opening question reflects Valentine theme

The relationship selection screen SHALL present a more thematic and poetic question that aligns with "The Heart You Wake With" branding.

#### Scenario: User lands on relationship selection screen

- **Given**: User completes analytics consent dialog
- **When**: Relationship selection screen renders
- **Then**: Heading displays "What kind of Valentine's morning rises inside your heart today?"
- **And**: Card options maintain existing functionality (Path A/B/C selection)
- **And**: Background uses animated gradient (WARM theme) instead of plain gray

## Related Capabilities

- **story-navigation**: Handles scene progression and transition animations
- **audio-system**: Consumes `audioTheme` property for music selection
- **visual-design**: Consumes `backgroundTheme` and `particleType` for rendering
- **ending-determination**: Evaluates expanded score ranges (-9 to +9) for ending conditions
