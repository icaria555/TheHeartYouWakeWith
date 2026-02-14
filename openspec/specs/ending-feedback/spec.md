# ending-feedback Specification

## Purpose
TBD - created by archiving change add-dimensional-scoring-engine. Update Purpose after archive.
## Requirements
### Requirement: Post-Ending Feedback Collection

The system SHALL collect optional user feedback after displaying the ending card to understand experience quality and ending resonance.

#### Scenario: Display feedback form after ending

- **WHEN** user reaches an ending and sees their result card
- **THEN** feedback form SHALL appear after 3-5 second delay
- **AND** delay allows user to read ending before being prompted
- **AND** form SHALL fade in smoothly without disrupting emotional moment

#### Scenario: Feedback form timing on mobile

- **WHEN** feedback form appears on mobile device
- **THEN** form SHALL appear below the ending card
- **AND** page SHALL scroll smoothly to show form
- **AND** ending card SHALL remain visible above

#### Scenario: Feedback form timing on desktop

- **WHEN** feedback form appears on desktop
- **THEN** form SHALL appear as overlay modal or side panel
- **AND** ending card SHALL remain visible in background
- **AND** modal SHALL be centered and not exceed 600px width

### Requirement: Five-Question Feedback Survey

The system SHALL present five optional questions to gather quantitative and qualitative feedback.

#### Scenario: Question 1 - Ending resonance

- **WHEN** feedback form is displayed
- **THEN** first question SHALL ask "How well did this ending resonate with you?"
- **AND** response SHALL be 5-point star rating (1-5)
- **AND** stars SHALL be interactive and visually clear
- **AND** rating SHALL be optional (can be left blank)

#### Scenario: Question 2 - Experience quality

- **WHEN** feedback form is displayed
- **THEN** second question SHALL ask "How would you rate this experience?"
- **AND** response SHALL be 5-point star rating (1-5)
- **AND** rating SHALL be optional (can be left blank)

#### Scenario: Question 3 - Recommendation likelihood

- **WHEN** feedback form is displayed
- **THEN** third question SHALL ask "Would you recommend this to a friend?"
- **AND** response SHALL be 0-10 scale (NPS-style)
- **AND** scale SHALL display emojis or labels (0=Not likely, 10=Very likely)
- **AND** rating SHALL be optional (can be left blank)

#### Scenario: Question 4 - Ending surprise

- **WHEN** feedback form is displayed
- **THEN** fourth question SHALL ask "Was this ending surprising?"
- **AND** response options SHALL be "Yes" / "No" / "Not sure"
- **AND** response SHALL be optional (can be left blank)

#### Scenario: Question 5 - Open text feedback

- **WHEN** feedback form is displayed
- **THEN** fifth question SHALL provide text area with prompt "Any thoughts or feelings you'd like to share?"
- **AND** text area SHALL have placeholder "This made me think about..."
- **AND** text area SHALL have 500 character limit
- **AND** character count SHALL be displayed (e.g., "0/500")
- **AND** text feedback SHALL be completely optional

### Requirement: Easy Skip Option

Users SHALL be able to easily skip feedback without feeling pressured to respond.

#### Scenario: Skip button visibility

- **WHEN** feedback form is displayed
- **THEN** a "Continue without feedback" button SHALL be clearly visible
- **AND** skip button SHALL be styled distinctly from submit button
- **AND** skip button SHALL be easily accessible on all device sizes

#### Scenario: Skip without any responses

- **WHEN** user clicks skip button without answering any questions
- **THEN** form SHALL close immediately
- **AND** no feedback data SHALL be saved or tracked
- **AND** user SHALL proceed to post-ending options (Play Again, Share)

#### Scenario: Partial feedback submission

- **WHEN** user answers some questions but not all
- **THEN** submit button SHALL be enabled
- **AND** only answered questions SHALL be tracked
- **AND** unanswered questions SHALL be recorded as null/undefined

### Requirement: Analytics Integration

Feedback SHALL be sent to Google Analytics if user has granted consent, otherwise stored locally only.

#### Scenario: Track feedback with analytics consent

- **WHEN** user submits feedback AND has granted analytics consent
- **THEN** feedback_submitted event SHALL be sent to Google Analytics
- **AND** event SHALL include: ending_id, path, resonance_score, experience_score, nps_score, ending_surprising
- **AND** event SHALL include has_text_feedback (boolean) but NOT the actual text
- **AND** text feedback SHALL be stored in localStorage only

#### Scenario: Store feedback without analytics consent

- **WHEN** user submits feedback AND has declined analytics consent
- **THEN** all feedback SHALL be stored in localStorage only
- **AND** no data SHALL be sent to Google Analytics
- **AND** local storage key SHALL be 'heartYouWakeWith_feedback'
- **AND** feedback SHALL be appended to existing array

#### Scenario: Text feedback privacy protection

- **WHEN** user provides text feedback
- **THEN** text SHALL NEVER be sent to Google Analytics
- **AND** text SHALL be stored in localStorage only
- **AND** text SHALL be included in developer export functionality
- **AND** GA4 event SHALL only indicate has_text_feedback: true

### Requirement: Local Feedback Storage

All feedback SHALL be stored locally in browser for privacy and developer access.

#### Scenario: Append feedback to localStorage

- **WHEN** user submits feedback
- **THEN** feedback object SHALL be appended to localStorage array
- **AND** localStorage key SHALL be 'heartYouWakeWith_feedback'
- **AND** each feedback SHALL include timestamp (ISO 8601 format)
- **AND** storage operation SHALL not fail if localStorage is full

#### Scenario: Retrieve stored feedback

- **WHEN** accessing stored feedback data
- **THEN** all feedback objects SHALL be retrievable as array
- **AND** feedback SHALL be ordered chronologically (oldest to newest)
- **AND** corrupted data SHALL be handled gracefully

#### Scenario: Export feedback as JSON

- **WHEN** developer or user requests feedback export
- **THEN** all stored feedback SHALL be exportable as JSON file
- **AND** export SHALL include text feedback
- **AND** export SHALL be downloadable via browser
- **AND** filename SHALL be 'feedback-export-[timestamp].json'

### Requirement: Mobile Responsiveness

Feedback form SHALL be optimized for mobile devices with touch-friendly interactions.

#### Scenario: Touch-friendly star ratings

- **WHEN** user interacts with star rating on mobile
- **THEN** touch targets SHALL be at least 44x44 pixels
- **AND** stars SHALL respond immediately to touch
- **AND** visual feedback SHALL confirm selection

#### Scenario: NPS scale on mobile

- **WHEN** user views NPS scale (0-10) on mobile
- **THEN** scale SHALL be displayed horizontally with adequate spacing
- **AND** each number SHALL be tappable with 44x44 minimum size
- **AND** scale SHALL scroll horizontally if needed to maintain touch targets

#### Scenario: Text area on mobile

- **WHEN** user focuses text area on mobile
- **THEN** keyboard SHALL appear without layout shifts
- **AND** text area SHALL remain visible above keyboard
- **AND** character count SHALL remain visible
- **AND** submit/skip buttons SHALL remain accessible

#### Scenario: Form layout on small screens

- **WHEN** feedback form is displayed on screens <640px width
- **THEN** questions SHALL stack vertically with adequate spacing
- **AND** form SHALL scroll independently within viewport
- **AND** ending card SHALL remain visible when scrolling to top

### Requirement: Accessibility

Feedback form SHALL be fully accessible to users with disabilities.

#### Scenario: Keyboard navigation

- **WHEN** user navigates feedback form with keyboard
- **THEN** all interactive elements SHALL be reachable via Tab key
- **AND** Tab order SHALL follow logical reading order
- **AND** focus indicators SHALL be clearly visible
- **AND** Enter or Space SHALL activate buttons and ratings

#### Scenario: Screen reader support

- **WHEN** screen reader user accesses feedback form
- **THEN** form heading SHALL announce "How was your journey?"
- **AND** each question SHALL have proper label association
- **AND** star ratings SHALL announce current selection and total
- **AND** submit/skip buttons SHALL announce their purpose
- **AND** character count SHALL announce remaining characters

#### Scenario: Focus management

- **WHEN** feedback form appears
- **THEN** focus SHALL move to form heading
- **AND** user SHALL be able to Tab through all elements
- **AND** Escape key SHALL close form (same as skip)
- **AND** after form closes, focus SHALL return to logical next element

### Requirement: Visual Design

Feedback form SHALL match the emotional tone and design aesthetic of the experience.

#### Scenario: Design consistency

- **WHEN** feedback form is displayed
- **THEN** colors SHALL match app color palette
- **AND** typography SHALL use app font stack
- **AND** spacing SHALL follow app design system
- **AND** border radius, shadows SHALL match app styling

#### Scenario: Emotional tone matching

- **WHEN** feedback form is displayed
- **THEN** copy SHALL be warm and appreciative
- **AND** tone SHALL acknowledge user's emotional journey
- **AND** form SHALL feel like natural conclusion, not intrusive survey
- **AND** visual styling SHALL maintain intimacy of the experience

#### Scenario: Submit button states

- **WHEN** user has not provided any feedback
- **THEN** submit button SHALL be disabled with visual indication
- **WHEN** user has provided at least one response
- **THEN** submit button SHALL be enabled and visually prominent
- **AND** hover state SHALL provide clear affordance

### Requirement: Performance

Feedback form SHALL load and interact smoothly without impacting performance.

#### Scenario: Fast form rendering

- **WHEN** feedback form is triggered to appear
- **THEN** form SHALL render within 200ms
- **AND** fade-in animation SHALL complete in 300-500ms
- **AND** rendering SHALL not block other UI operations

#### Scenario: Efficient feedback submission

- **WHEN** user submits feedback
- **THEN** localStorage write SHALL complete in <50ms
- **AND** GA4 event tracking SHALL complete in <100ms
- **AND** UI SHALL provide immediate confirmation
- **AND** form SHALL close smoothly

#### Scenario: No memory leaks

- **WHEN** feedback form is shown and closed multiple times
- **THEN** no memory leaks SHALL occur
- **AND** event listeners SHALL be properly cleaned up
- **AND** component state SHALL be reset for next use

### Requirement: Data Structure

Feedback data SHALL follow a consistent structure for storage and analysis.

#### Scenario: Feedback data schema

- **WHEN** storing or transmitting feedback
- **THEN** feedback object SHALL include:
  - `endingId` (string, required): E1-E16
  - `path` (string, required): 'A' | 'B' | 'C'
  - `resonanceScore` (number, optional): 1-5
  - `experienceScore` (number, optional): 1-5
  - `npsScore` (number, optional): 0-10
  - `endingSurprising` (boolean | null, optional): true/false/null
  - `textFeedback` (string, optional): max 500 chars
  - `timestamp` (string, required): ISO 8601 format

#### Scenario: Validate feedback data

- **WHEN** feedback is submitted
- **THEN** endingId SHALL be validated against E1-E16
- **AND** path SHALL be validated against A/B/C
- **AND** numeric scores SHALL be within valid ranges
- **AND** text feedback SHALL be trimmed and length-checked
- **AND** invalid data SHALL be rejected with console warning

### Requirement: User Expectations Management

Users SHALL understand feedback is optional and how it will be used.

#### Scenario: Clear optional messaging

- **WHEN** feedback form is displayed
- **THEN** subtitle SHALL state "Your feedback helps us create better experiences (completely optional)"
- **AND** all questions SHALL feel invitational, not demanding
- **AND** skip option SHALL be equally prominent as submit

#### Scenario: Privacy reassurance

- **WHEN** feedback form is displayed
- **THEN** form SHALL NOT request any personal information
- **AND** privacy note may state "Anonymous feedback only"
- **AND** if consent was declined, note SHALL clarify "Stored locally on your device only"

#### Scenario: Thank you confirmation

- **WHEN** user submits feedback
- **THEN** brief "Thank you!" message SHALL display for 1-2 seconds
- **AND** message SHALL express genuine appreciation
- **AND** form SHALL close automatically after confirmation
- **AND** user SHALL proceed to post-ending options

