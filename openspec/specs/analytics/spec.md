# analytics Specification

## Purpose
TBD - created by archiving change add-dimensional-scoring-engine. Update Purpose after archive.
## Requirements
### Requirement: Privacy-First Event Tracking with Google Analytics

The system SHALL collect anonymous usage metrics using Google Analytics 4 while respecting user privacy, requiring explicit consent, and never collecting personally identifiable information.

#### Scenario: Explicit consent required

- **WHEN** user first loads the application
- **THEN** a consent dialog SHALL be displayed before any tracking begins
- **AND** dialog SHALL explain what data will be collected
- **AND** user MUST explicitly accept or decline analytics
- **AND** no tracking SHALL occur without user consent

#### Scenario: Consent dialog content

- **WHEN** consent dialog is displayed
- **THEN** it SHALL include clear explanation of analytics purpose
- **AND** it SHALL state "No personal information is collected"
- **AND** it SHALL provide "Accept" and "Decline" options
- **AND** it SHALL include a link to privacy policy
- **AND** dialog SHALL block access to story until decision is made

#### Scenario: Consent grant

- **WHEN** user clicks "Accept" on consent dialog
- **THEN** consent SHALL be stored in localStorage as 'granted'
- **AND** Google Analytics SHALL be initialized immediately
- **AND** user SHALL proceed to story experience
- **AND** all subsequent events SHALL be tracked

#### Scenario: Consent decline

- **WHEN** user clicks "Decline" on consent dialog
- **THEN** consent SHALL be stored in localStorage as 'denied'
- **AND** Google Analytics SHALL NOT be initialized
- **AND** user SHALL proceed to story experience
- **AND** no events SHALL be tracked throughout the session

### Requirement: Google Analytics 4 Event Tracking

The system SHALL send events to Google Analytics 4 using the gtag.js API.

#### Scenario: Track session start to GA4

- **WHEN** user selects a relationship path (A/B/C) and consent is granted
- **THEN** a session_start event SHALL be sent to Google Analytics
- **AND** event SHALL include path parameter
- **AND** session_id SHALL be included automatically by gtag

#### Scenario: Track session completion to GA4

- **WHEN** user reaches an ending and consent is granted
- **THEN** a session_complete event SHALL be sent to Google Analytics
- **AND** event SHALL include ending_id, path, and all dimensional scores as custom parameters
- **AND** session duration SHALL be calculated by GA4 automatically

#### Scenario: Track session abandonment to GA4

- **WHEN** user leaves before reaching an ending and consent is granted
- **THEN** a session_abandoned event SHALL be sent to Google Analytics
- **AND** event SHALL include last_scene parameter
- **AND** abandonment detection SHALL trigger on window unload

#### Scenario: Track restart to GA4

- **WHEN** user restarts the experience from an ending and consent is granted
- **THEN** an experience_restarted event SHALL be sent to Google Analytics
- **AND** event SHALL include previous_ending parameter
- **AND** GA4 will automatically start a new session

### Requirement: Google Analytics Custom Dimensions

The system SHALL configure custom dimensions in GA4 for dimensional scores and story-specific parameters.

#### Scenario: Configure custom dimensions

- **WHEN** setting up Google Analytics property
- **THEN** custom dimensions SHALL be configured for: honesty, vulnerability, hope, self_worth, action, compassion
- **AND** custom dimensions SHALL be configured for: path, ending_id, scene_id
- **AND** each dimensional score SHALL be sent as integer value

#### Scenario: Track choice selection to GA4

- **WHEN** user selects a choice and consent is granted
- **THEN** a choice_made event SHALL be sent to Google Analytics
- **AND** event SHALL include scene_id, choice_index, and score_impact (as JSON string) parameters

### Requirement: Ending Event Tracking in GA4

The system SHALL track which endings users reach using Google Analytics event tracking.

#### Scenario: Track ending reached to GA4

- **WHEN** user reaches any ending (E1-E16) and consent is granted
- **THEN** an ending_reached event SHALL be sent to Google Analytics
- **AND** event SHALL include ending_id, path, and all six dimensional scores as custom parameters
- **AND** dimensional scores SHALL be sent as separate parameters for GA4 analysis

#### Scenario: Track secret ending discovery to GA4

- **WHEN** user reaches a secret ending (E15 or E16) and consent is granted
- **THEN** an ending_reached event SHALL be sent with is_secret: true parameter
- **AND** GA4 filters can be used to analyze secret ending discovery separately

### Requirement: Google Analytics Dashboard Access

Analytics data SHALL be accessible via Google Analytics 4 console for comprehensive reporting.

#### Scenario: Access GA4 dashboard

- **WHEN** developer or stakeholder needs analytics insights
- **THEN** they SHALL access the GA4 console via web browser
- **AND** real-time view SHALL show current active users and events
- **AND** custom reports SHALL be created for ending distribution, dimensional scores, and completion rates

#### Scenario: GA4 data retention

- **WHEN** configuring Google Analytics property
- **THEN** data retention SHALL be set to 2 months minimum
- **AND** older data SHALL be automatically deleted per GA4 settings
- **AND** retention policy SHALL be disclosed in privacy policy

### Requirement: Google Analytics Reporting

The system SHALL leverage GA4's built-in reporting for metrics aggregation.

#### Scenario: View ending distribution in GA4

- **WHEN** viewing analytics in GA4 console
- **THEN** ending distribution SHALL be viewable via custom report
- **AND** percentage of sessions reaching each ending SHALL be calculated by GA4
- **AND** most and least common endings SHALL be identifiable

#### Scenario: View dimensional score averages in GA4

- **WHEN** analyzing final scores in GA4
- **THEN** average score SHALL be calculated automatically for each custom dimension
- **AND** score ranges (min/max) SHALL be identifiable via GA4 reports
- **AND** averages SHALL be segmented by ending_id or path

#### Scenario: View completion rates in GA4

- **WHEN** analyzing session data in GA4
- **THEN** session completion rate SHALL be calculated via event comparisons
- **AND** average session duration SHALL be viewable in GA4 reports
- **AND** abandonment events SHALL be tracked separately

#### Scenario: View choice frequencies in GA4

- **WHEN** analyzing choice data in GA4
- **THEN** frequency of each choice SHALL be viewable via event parameters
- **AND** most and least popular choices SHALL be identifiable
- **AND** custom reports SHALL segment choices by scene_id

### Requirement: Performance

Analytics tracking SHALL have minimal impact on user experience with Google Analytics loading asynchronously.

#### Scenario: Async GA4 loading

- **WHEN** user grants consent
- **THEN** gtag.js script SHALL load asynchronously
- **AND** script loading SHALL not block UI rendering
- **AND** story SHALL be interactive immediately without waiting for GA4

#### Scenario: Low overhead event tracking

- **WHEN** sending an event to Google Analytics
- **THEN** gtag call SHALL complete in under 10ms
- **AND** UI SHALL not block during event transmission
- **AND** failed requests SHALL not affect user experience

### Requirement: Privacy Transparency and Consent

Users SHALL be fully informed about data collection via consent dialog and have complete control over tracking.

#### Scenario: Consent dialog on first load

- **WHEN** user first loads the application
- **THEN** a consent dialog SHALL appear before story begins
- **AND** dialog SHALL explain analytics purpose clearly
- **AND** dialog SHALL state "No personal information is collected"
- **AND** dialog SHALL link to privacy policy
- **AND** user MUST choose Accept or Decline to proceed

#### Scenario: Consent persistence

- **WHEN** user makes consent choice
- **THEN** choice SHALL be stored in localStorage
- **AND** consent dialog SHALL not appear again on subsequent visits
- **AND** user can change preference in settings at any time

#### Scenario: Settings-based consent management

- **WHEN** user accesses settings or preferences
- **THEN** an option to manage analytics consent SHALL be visible
- **AND** current consent status SHALL be displayed
- **AND** user SHALL be able to revoke consent with one click
- **AND** revoking consent SHALL stop all future tracking immediately
- **AND** user SHALL be informed that past data cannot be deleted from GA4

### Requirement: Development Integration with GA4

Analytics data SHALL be accessible in the Score Balance Tool via Google Analytics dashboards.

#### Scenario: Link to GA4 console from dev tool

- **WHEN** viewing the Score Balance Tool
- **THEN** an Analytics tab SHALL provide link to GA4 console
- **AND** real-time GA4 view SHALL be embeddable or linked
- **AND** explanation of how to access key reports SHALL be provided

#### Scenario: GA4 DebugView for development

- **WHEN** dev tool is active with `?dev=analytics` flag
- **THEN** GA4 debug mode SHALL be enabled
- **AND** DebugView in GA4 console SHALL show real-time events
- **AND** each tracked event SHALL be visible with all parameters
- **AND** validation errors SHALL be visible in GA4 DebugView

### Requirement: Google Analytics Configuration

GA4 SHALL be configured to maximize privacy while providing useful analytics.

#### Scenario: Privacy-focused GA4 configuration

- **WHEN** initializing Google Analytics
- **THEN** anonymize_ip SHALL be set to true
- **AND** Google Signals SHALL be disabled
- **AND** send_page_view SHALL be set to false (event-only tracking)
- **AND** cookie_flags SHALL be set to 'SameSite=None;Secure'
- **AND** data retention SHALL be set to minimum (2 months)

#### Scenario: Event parameter validation

- **WHEN** sending events to GA4
- **THEN** event names SHALL follow GA4 naming conventions (lowercase, underscores)
- **AND** parameter names SHALL follow GA4 parameter naming rules
- **AND** parameter values SHALL be of appropriate types (string, number)
- **AND** invalid events SHALL be logged to console in development mode

