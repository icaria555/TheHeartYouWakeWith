# Story Navigation Specification

## ADDED Requirements

### Requirement: Score-Based Scene Flow

The system SHALL determine story progression based on accumulated dimensional scores rather than fixed paths.

#### Scenario: Navigate to next scene

- **WHEN** user makes a choice in a non-ending scene
- **THEN** dimensional scores SHALL be updated with the choice's impacts
- **AND** the next scene SHALL be determined by the choice's nextSceneId
- **AND** scene navigation SHALL remain deterministic (same choice always leads to same scene)

#### Scenario: Detect ending condition

- **WHEN** user makes a choice that leads to an ending
- **THEN** the system SHALL recognize the scene as terminal (no further choices)
- **AND** dimensional scores SHALL be finalized
- **AND** ending evaluation SHALL be triggered

### Requirement: Relationship Selection Integration

The initial relationship selection SHALL set starting dimensional scores.

#### Scenario: Select relationship path

- **WHEN** user selects a relationship status (Path A, B, or C)
- **THEN** initial dimensional scores SHALL be set according to the path
- **AND** the starting scene SHALL be determined by the path
- **AND** initial scores SHALL influence but not predetermine the final ending

#### Scenario: Path A initialization

- **WHEN** user selects Path A (in relationship with Valentine's plans)
- **THEN** initial scores SHALL reflect optimistic relationship state
- **AND** user SHALL start at scene A1

#### Scenario: Path B initialization

- **WHEN** user selects Path B (in relationship without plans)
- **THEN** initial scores SHALL reflect uncertain or stagnant relationship state
- **AND** user SHALL start at scene B1

#### Scenario: Path C initialization

- **WHEN** user selects Path C (single/not in relationship)
- **THEN** initial scores SHALL reflect independent self-focused state
- **AND** user SHALL start at scene C1

### Requirement: Score Tracking Transparency

Users SHALL have awareness of dimensional themes without seeing exact numeric scores.

#### Scenario: Hidden score calculation

- **WHEN** dimensional scores are updated
- **THEN** exact numeric values SHALL NOT be displayed to users
- **AND** score calculation SHALL happen silently in the background
- **AND** users SHALL receive only subtle thematic feedback (covered in user-feedback spec)

### Requirement: Navigation State Integrity

The navigation system SHALL maintain consistent state throughout the experience.

#### Scenario: Maintain navigation history

- **WHEN** user progresses through scenes
- **THEN** the current scene identifier SHALL be tracked
- **AND** previous scenes SHALL NOT be revisitable (forward-only progression)

#### Scenario: Prevent invalid transitions

- **WHEN** attempting to navigate to a scene
- **THEN** only valid scene transitions SHALL be allowed
- **AND** invalid scene IDs SHALL result in error handling
- **AND** application SHALL NOT crash on navigation errors
