# narrative-engine Specification

## Purpose
TBD - created by archiving change add-dimensional-scoring-engine. Update Purpose after archive.
## Requirements
### Requirement: Dimensional Scoring System

The system SHALL track user emotional patterns across six independent dimensions throughout the narrative experience.

#### Scenario: Initialize scores at experience start

- **WHEN** user begins a new experience
- **THEN** all six dimensions (honesty, vulnerability, hope, selfWorth, action, compassion) SHALL be initialized to integer values
- **AND** initial values MAY be set based on relationship selection
- **AND** all scores SHALL start at 0 if no initial values are specified

#### Scenario: Apply choice scores

- **WHEN** user makes a story choice
- **THEN** the system SHALL add the choice's dimensional score deltas to the running totals
- **AND** scores SHALL be accumulated additively (new = old + delta)
- **AND** neutral choices (no score impact) SHALL be supported

#### Scenario: Score calculation performance

- **WHEN** applying choice scores
- **THEN** calculation SHALL complete in under 10 milliseconds on average mobile devices
- **AND** no visual lag or delay SHALL be perceivable to users

### Requirement: Score Data Model

Choice data SHALL include optional dimensional score impacts.

#### Scenario: Choice with dimensional scores

- **WHEN** a choice has associated dimensional impacts
- **THEN** it SHALL specify integer values (positive, negative, or zero) for affected dimensions
- **AND** unspecified dimensions SHALL default to zero (no impact)
- **AND** score values SHALL typically range from -2 to +2

#### Scenario: Choice without scores

- **WHEN** a choice has no dimensional impacts
- **THEN** all dimensions SHALL remain unchanged
- **AND** the system SHALL treat it as neutral choice

### Requirement: Score State Management

The system SHALL maintain dimensional scores throughout the user session.

#### Scenario: Score persistence during session

- **WHEN** user navigates through story scenes
- **THEN** all dimensional scores SHALL be preserved in memory
- **AND** scores SHALL accumulate across all choices made

#### Scenario: Score reset on restart

- **WHEN** user restarts the experience
- **THEN** all dimensional scores SHALL be reset to initial values
- **AND** previous session scores SHALL NOT affect the new experience

### Requirement: Type Safety

All score-related data structures SHALL be strongly typed using TypeScript.

#### Scenario: Dimensional score types

- **WHEN** working with dimensional scores
- **THEN** score objects SHALL enforce the presence of all six dimensions
- **AND** TypeScript SHALL prevent dimensional name typos at compile time
- **AND** score values SHALL be typed as numbers

