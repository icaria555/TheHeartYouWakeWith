# Ending Determination Specification

## ADDED Requirements

### Requirement: Priority-Based Ending Evaluation

The system SHALL evaluate ending conditions in a defined priority order and return the first matching ending.

#### Scenario: Evaluate ending with priority

- **WHEN** user reaches an ending trigger point
- **THEN** the system SHALL check ending conditions in priority order: E15, E16, E1, E6, E9, E4, E12, E11, E10, E13, E2, E7, E3, E8, E5, E14
- **AND** the first ending whose conditions are satisfied SHALL be selected
- **AND** remaining endings SHALL NOT be evaluated after a match

#### Scenario: No ending matches

- **WHEN** no ending conditions are satisfied
- **THEN** the system SHALL fall back to ending E14 (Shadow Holder)
- **AND** a warning SHALL be logged for debugging purposes

### Requirement: Rule-Based Condition Matching

Each ending SHALL specify dimensional score conditions that must be satisfied.

#### Scenario: Evaluate dimensional range conditions

- **WHEN** an ending specifies a dimension with min and/or max values
- **THEN** the user's score in that dimension SHALL be compared against the range
- **AND** score SHALL be >= min (if specified) AND <= max (if specified)
- **AND** unspecified bounds SHALL not constrain the match

#### Scenario: Evaluate multiple dimension conditions

- **WHEN** an ending requires multiple dimensions to match
- **THEN** ALL specified dimensional conditions SHALL be satisfied
- **AND** conditions are implicitly combined with logical AND

#### Scenario: Match ending E1 (Brave Heart)

- **WHEN** evaluating ending E1
- **THEN** honesty score SHALL be >= 2
- **AND** vulnerability score SHALL be >= 2

#### Scenario: Match ending E7 (Guarded Soul)

- **WHEN** evaluating ending E7
- **THEN** vulnerability score SHALL be <= -2

### Requirement: Secret Ending Conditions

Secret endings (E15, E16) SHALL have special mathematical conditions checked with highest priority.

#### Scenario: Match secret ending E15 (Unnamed Heart)

- **WHEN** evaluating ending E15
- **THEN** ALL six dimensions SHALL have scores between -1 and +1 (inclusive)
- **AND** this represents a balanced/neutral emotional state across all dimensions

#### Scenario: Match secret ending E16 (Heart Between Worlds)

- **WHEN** evaluating ending E16
- **THEN** at least 2 dimensions SHALL have scores >= 2
- **AND** at least 2 different dimensions SHALL have scores <= -2
- **AND** no dimension SHALL be between -1 and +1 (inclusive)
- **AND** this represents high contrast/polarization in emotional patterns

### Requirement: Ending Metadata

Each ending SHALL be associated with rich metadata for display.

#### Scenario: Retrieve ending data

- **WHEN** an ending ID is determined
- **THEN** the system SHALL retrieve associated metadata (title, reflection, closing, visual styling)
- **AND** metadata SHALL include title, reflection text, closing text, gradient class, text color class, and decoration type
- **AND** missing ending metadata SHALL result in error handling

### Requirement: Deterministic Outcomes

Given identical choice sequences, the system SHALL always produce the same ending.

#### Scenario: Reproducible endings

- **WHEN** two users make identical choices in identical order
- **THEN** both SHALL receive the same ending
- **AND** ending determination SHALL be deterministic with no randomness

### Requirement: Complete Coverage

The ending ruleset SHALL ensure all possible score combinations map to valid endings.

#### Scenario: Wide condition coverage

- **WHEN** evaluating the complete set of ending rules
- **THEN** at least one ending SHALL match for any valid score combination
- **AND** the fallback ending (E14) SHALL catch edge cases
- **AND** every user SHALL receive exactly one ending

### Requirement: Ending Distribution

The ending conditions SHALL be balanced to provide variety across user experiences.

#### Scenario: Diverse outcomes

- **WHEN** users play through the experience multiple times with varied choices
- **THEN** multiple different endings SHALL be achievable
- **AND** no single ending SHALL dominate (>40% of outcomes)
- **AND** secret endings SHALL be rare but discoverable (<5% without specific intent)
