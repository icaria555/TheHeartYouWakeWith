# Spec Delta: narrative-engine

## MODIFIED Requirements

### Requirement: The narrative engine SHALL support 8 scenes per path

The narrative engine must support 8 scenes per path (up from 5) to provide deeper emotional exploration and improved pacing for the Valentine's Day journey.

#### Scenario: User completes Path A with expanded content
- **Given**: User selects "Relationship & Date" path
- **When**: User progresses through all scenes
- **Then**: System presents 8 scenes total (A1, A2, A2.5, A3, A3.5, A4, A4.5, A5) before ending evaluation
- **And**: Midpoint feedback still triggers at scene 3 (approximately 37% progress)
- **And**: Total journey time is 7-10 minutes (increased from 3-5 minutes)

#### Scenario: User completes Path B with expanded content
- **Given**: User selects "Relationship, No Date" path
- **When**: User progresses through all scenes
- **Then**: System presents 8 scenes total (B1, B2, B2.5, B3, B3.5, B4, B4.5, B5) before ending evaluation
- **And**: Scene count matches Path A for consistent user experience

#### Scenario: User completes Path C with expanded content
- **Given**: User selects "No Relationship" path
- **When**: User progresses through all scenes
- **Then**: System presents 8 scenes total (C1, C2, C2.5, C3, C3.5, C4, C4.5, C5) before ending evaluation
- **And**: Scene count matches Paths A and B for consistent user experience

### Requirement: New intermediate scenes MUST contribute ±1 dimensional scores

New intermediate scenes (2.5, 3.5, 4.5) must offer gentle dimensional score adjustments to deepen emotional exploration without destabilizing the existing score balance.

#### Scenario: User makes choice in Scene A2.5 (post-setup reflection)
- **Given**: User is in newly added Scene A2.5
- **When**: User selects any choice
- **Then**: Choice applies ±1 score adjustment to 1-2 dimensions (e.g., `{ vulnerability: 1, hope: -1 }`)
- **And**: Score adjustment follows existing SCORE_ASSIGNMENT_STRATEGY.md guidelines
- **And**: Total accumulated scores remain within -9 to +9 range per dimension

#### Scenario: User makes choice in Scene B3.5 (tension aftermath)
- **Given**: User is in newly added Scene B3.5  
- **When**: User selects any choice
- **Then**: Choice applies ±1 score adjustment to 1-2 dimensions
- **And**: Choice explores consequences of midpoint tension decision
- **And**: Score adjustment is consistent with emotional narrative arc

### Requirement: Scene data structure MUST include audio and visual metadata

Scene interface must include new properties for audio theme, background theme, and particle effects to support enhanced presentation layer.

#### Scenario: Scene defines audio theme
- **Given**: Developer adds new scene to STORY_DATA
- **When**: Scene data includes `audioTheme: "reflective"` property
- **Then**: Audio system uses this theme as default for scene playback
- **And**: Score-driven theme overrides still apply if dimensional thresholds crossed

#### Scenario: Scene defines background theme
- **Given**: Developer adds new scene to STORY_DATA
- **When**: Scene data includes `backgroundTheme: "warm"` property
- **Then**: Visual system applies corresponding animated gradient (pink/orange/gold)
- **And**: Gradient transitions smoothly from previous scene (2s crossfade)

#### Scenario: Scene defines particle type
- **Given**: Developer adds new scene to STORY_DATA
- **When**: Scene data includes `particleType: "hearts"` property
- **Then**: Visual system renders floating heart particles (10-30 count based on device)
- **And**: Particles respect reduced motion preference (disabled if `prefers-reduced-motion: reduce`)

## ADDED Requirements

### Requirement: The relationship selection screen MUST present a thematic opening question

The relationship selection screen must present a more thematic and poetic question that aligns with "The Heart You Wake With" branding.

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
