# User Feedback Specification

## ADDED Requirements

### Requirement: Subtle Dimensional Hints

The system SHALL provide textual hints about dimensional themes at the midpoint of the experience.

#### Scenario: Display thematic feedback at midpoint

- **WHEN** user reaches scene 3 (halfway point) of any path
- **THEN** a brief evocative text phrase SHALL appear
- **AND** phrase SHALL reference dimensional themes without revealing scores
- **AND** hints SHALL be non-intrusive and poetic in nature
- **AND** phrase SHALL be displayed for 3-5 seconds with gentle fade animation

#### Scenario: Hide exact scores

- **WHEN** displaying dimensional feedback
- **THEN** exact numeric scores SHALL NOT be shown
- **AND** no progress bars or gauges SHALL display dimensional levels
- **AND** feedback SHALL maintain emotional tone rather than gamified feel

### Requirement: Text-Based Feedback Mechanism

Feedback SHALL use brief text phrases aligned with the existing aesthetic.

#### Scenario: Text phrases reflect dominant dimension

- **WHEN** displaying feedback at midpoint
- **THEN** text phrase SHALL reflect the user's strongest dimensional leaning
- **AND** phrases SHALL be evocative (e.g., "Your heart leans toward honesty..." / "Hope guides your path...")
- **AND** phrases SHALL be poetic and thematic
- **AND** phrases SHALL reference dimensional themes without using technical dimension names

### Requirement: Feedback Timing

Feedback SHALL appear at appropriate moments without breaking narrative flow.

#### Scenario: Show feedback on choice interaction

- **WHEN** user interacts with a choice (hover, focus, or tap)
- **THEN** feedback MAY appear immediately
- **AND** feedback SHALL fade or disappear after selection
- **AND** feedback SHALL NOT delay scene transitions

#### Scenario: No feedback during reading

- **WHEN** user is reading scene narrative text
- **THEN** dimensional feedback SHALL NOT appear
- **AND** focus SHALL remthe midpoint without breaking narrative flow.

#### Scenario: Show feedback at scene 3 transition

- **WHEN** user completes scene 2 and enters scene 3
- **THEN** a brief text phrase SHALL appear
- **AND** phrase SHALL reflect current dimensional leanings based on choices made
- **AND** display SHALL last 3-5 seconds before fading

#### Scenario: Single feedback moment per session

- **WHEN** user progresses through the experience
- **THEN** feedback SHALL appear only once at the midpoint (scene 3)
- **AND** no additional hints SHALL appear in later scenes
- **AND** focus SHALL remain on story content throughout the rest of the journey

### Requirement: Accessibility

Dimensional hints SHALL remain accessible across devices and user preferences.

#### Scenario: Responsive feedback display

- **WHEN** displaying feedback on different screen sizes
- **THEN** feedback SHALL scale appropriately for mobile and desktop
- **AND** touch interactions SHALL receive same feedback quality as mouse interactions

#### Scenario: Optional feedback reduction

- **WHEN** user prefers reduced motion or minimal UI
- **THEN** visual feedback MAY be minimized or disabled
- **AND** core experience SHALL remain functional without feedback

### Requirement: Feedback Consistency

Dimensional themes SHALL have consistent visual/textual representations throughout the experience.

#### Scenario: Consistent theme mapping

- **WHEN** representing a specific dimension across multiple scenes
- **THEN** the same visual/textual style SHALL be used
- **AND** users SHALL learn to recognize patterns intuitively
- **AND** inconsistent mapping SHALL be avoided

### Requirement: Non-Disclosure of Mechanics

Feedback SHALL not reveal the scoring system's mechanics or make outcomes predictable.

#### Scenario: Avoid score spoilers

- **WHEN** providing dimensional hints
- **THEN** users SHALL NOT be able to calculate exact scores
- **AND** hints SHALL NOT reference specific ending conditions
- **AND** the mystery of outcome determination SHALL be preserved

#### Scenario: Prevent min-maxing

- **WHEN** users attempt to optimize for specific endings
- **THEN** lack of numeric feedback SHALL discourage gaming the system
- **AND** users SHALL be encouraged to make authentic choices rather than strategic ones
