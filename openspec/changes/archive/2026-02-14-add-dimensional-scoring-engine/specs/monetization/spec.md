# Monetization Specification (Tip Button)

## ADDED Requirements

### Requirement: Optional Tip Button

The system SHALL provide an optional, non-intrusive way for users to support the creator via TrueMoney-powered tipping after completing the experience.

#### Scenario: Tip button appears after ending

- **WHEN** user reaches an ending and views the result card
- **THEN** tip button SHALL appear after feedback form interaction (or after delay if feedback skipped)
- **AND** button SHALL be visually distinct but not dominant
- **AND** button text SHALL be "Leave a tip ❤️" or similar warm phrasing

#### Scenario: Tip button placement on mobile

- **WHEN** tip button appears on mobile device
- **THEN** button SHALL be positioned alongside "Play Again" and "Share" options
- **AND** button SHALL have equal visual weight (not more prominent)
- **AND** button SHALL be easily tappable (minimum 44x44 touch target)

#### Scenario: Tip button placement on desktop

- **WHEN** tip button appears on desktop
- **THEN** button SHALL be positioned alongside other post-ending actions
- **AND** button SHALL include subtle heart icon
- **AND** hover state SHALL provide gentle visual feedback

### Requirement: Tip Amount Selection

Users SHALL be able to select from preset amounts or enter a custom tip amount.

#### Scenario: Display preset tip amounts

- **WHEN** user clicks tip button
- **THEN** modal or bottom sheet SHALL appear with tip options
- **AND** preset amounts SHALL be ฿14, ฿100, ฿300
- **AND** custom amount input SHALL be available
- **AND** "Maybe Later" dismiss option SHALL be clearly visible

#### Scenario: Select preset amount

- **WHEN** user clicks a preset amount (฿100, ฿150, or ฿300)
- **THEN** backend call SHALL create TrueMoney payment transaction
- **AND** QR code and payment URL SHALL be returned
- **AND** payment modal SHALL display QR code
- **AND** analytics SHALL track amount_selected event

#### Scenario: Enter custom amount

- **WHEN** user enters custom amount
- **THEN** input SHALL validate amount is ≥ ฿20
- **AND** invalid amounts SHALL show inline error: "Minimum tip is ฿20"
- **AND** valid amount SHALL enable "Pay with TrueMoney" button
- **AND** analytics SHALL track custom_amount_entered event

#### Scenario: Custom amount validation

- **WHEN** user enters amount less than ฿20
- **THEN** error message SHALL display immediately
- **AND** "Pay with TrueMoney" button SHALL remain disabled
- **WHEN** user enters amount ≥ ฿20
- **THEN** error SHALL clear
- **AND** button SHALL become enabled

### Requirement: TrueMoney Payment Integration

The system SHALL use TrueMoney Payment Gateway API for secure payment processing with QR code display and payment status polling.

#### Scenario: Create TrueMoney payment transaction

- **WHEN** user selects amount and proceeds to payment
- **THEN** frontend SHALL call backend API endpoint /api/truemoney/create-payment
- **AND** backend SHALL create payment via TrueMoney API
- **AND** backend SHALL return payment URL, QR code, and transaction ID
- **AND** payment modal SHALL display QR code to user
- **AND** "Open TrueMoney App" button SHALL be available on mobile

#### Scenario: Display TrueMoney QR code

- **WHEN** payment transaction is created successfully
- **THEN** QR code SHALL be displayed prominently in modal
- **AND** QR code SHALL be scannable by TrueMoney Wallet app
- **AND** instructions SHALL guide user to scan with TrueMoney app
- **AND** payment status polling SHALL begin immediately

#### Scenario: Open TrueMoney app via deep-link

- **WHEN** user clicks "Open TrueMoney App" button on mobile
- **THEN** TrueMoney app SHALL open via deep-link
- **AND** payment should be pre-selected in app
- **AND** user completes payment within TrueMoney app
- **AND** analytics SHALL track app_opened event

#### Scenario: Poll payment status

- **WHEN** QR code or payment URL is displayed
- **THEN** frontend SHALL poll backend API every 5 seconds
- **AND** backend SHALL check payment status from TrueMoney
- **AND** polling SHALL continue for maximum 5 minutes
- **AND** polling SHALL stop when payment succeeds or fails

#### Scenario: Payment success confirmation

- **WHEN** TrueMoney confirms payment success
- **THEN** backend webhook receives payment confirmation
- **AND** payment status changes to "success"
- **AND** frontend polling detects success status
- **AND** thank you message SHALL display immediately
- **AND** analytics SHALL track tip_completed event with amount
- **AND** payment modal SHALL close

#### Scenario: Payment timeout

- **WHEN** 5 minutes pass without payment completion
- **THEN** polling SHALL stop
- **AND** timeout message SHALL display: "Payment timed out. No charges were made."
- **AND** user SHALL be able to retry
- **AND** analytics SHALL track tip_timeout event

### Requirement: Thank You Confirmation

The system SHALL show genuine appreciation after successful tip without excessive fanfare.

#### Scenario: Display thank you message

- **WHEN** payment succeeds and user returns to app
- **THEN** thank you modal SHALL appear with warm message
- **AND** message SHALL say: "✨ Thank you! ✨ Your support means everything."
- **AND** message SHALL acknowledge the support genuinely
- **AND** message SHALL include amount if desired (optional)

#### Scenario: Thank you message auto-dismiss

- **WHEN** thank you message is displayed
- **THEN** message SHALL auto-dismiss after 5 seconds
- **OR** user can manually dismiss with button
- **AND** after dismissal, user proceeds to "Play Again" / "Share" options
- **AND** tip button SHALL be hidden (already tipped)

### Requirement: Analytics Tracking

All tip interactions SHALL be tracked in Google Analytics (if consent granted) for conversion analysis.

#### Scenario: Track tip button viewed

- **WHEN** tip button appears in UI and consent is granted
- **THEN** tip_button_viewed event SHALL be sent to GA4
- **AND** event SHALL include ending_id and path parameters

#### Scenario: Track tip modal opened

- **WHEN** user clicks tip button and consent is granted
- **THEN** tip_modal_opened event SHALL be sent to GA4
- **AND** event SHALL include ending_id and path parameters

#### Scenario: Track tip amount selected

- **WHEN** user selects preset amount and consent is granted
- **THEN** tip_amount_selected event SHALL be sent to GA4
- **AND** event SHALL include: amount, tip_type: 'preset', ending_id, path

#### Scenario: Track custom amount entered

- **WHEN** user enters custom amount and consent is granted
- **THEN** tip_custom_entered event SHALL be sent to GA4
- **AND** event SHALL include: amount, tip_type: 'custom', ending_id, path

#### Scenario: Track payment created

- **WHEN** TrueMoney payment transaction is created and consent is granted
- **THEN** tip_payment_created event SHALL be sent to GA4
- **AND** event SHALL include: amount, tip_type, ending_id, path

#### Scenario: Track QR code displayed

- **WHEN** TrueMoney QR code is displayed and consent is granted
- **THEN** tip_qr_displayed event SHALL be sent to GA4
- **AND** event SHALL include: amount, ending_id, path

#### Scenario: Track TrueMoney app opened

- **WHEN** user clicks "Open TrueMoney App" and consent is granted
- **THEN** tip_app_opened event SHALL be sent to GA4
- **AND** event SHALL include: amount, ending_id, path

#### Scenario: Track tip completed

- **WHEN** payment succeeds via TrueMoney and consent is granted
- **THEN** tip_completed event SHALL be sent to GA4
- **AND** event SHALL include: amount, currency: 'THB', tip_type, ending_id, path, payment_method: 'truemoney'
- **AND** this is the primary conversion event

#### Scenario: Track tip failed

- **WHEN** payment fails or times out and consent is granted
- **THEN** tip_failed event SHALL be sent to GA4
- **AND** event SHALL include: amount_attempted, reason: 'timeout' | 'error', ending_id, path

### Requirement: Mobile Responsiveness

Tip interface SHALL be optimized for mobile devices with touch-friendly interactions.

#### Scenario: Tip modal on mobile

- **WHEN** user opens tip modal on mobile (<640px width)
- **THEN** bottom sheet SHALL slide up from bottom
- **AND** backdrop SHALL dim background content
- **AND** "Maybe Later" SHALL close bottom sheet smoothly

#### Scenario: Preset amount buttons on mobile

- **WHEN** preset amounts are displayed on mobile
- **THEN** each button SHALL be at least 44x44 pixels
- **AND** buttons SHALL have adequate spacing between them
- **AND** tap response SHALL be immediate with visual feedback

#### Scenario: Custom amount input on mobile

- **WHEN** user taps custom amount input on mobile
- **THEN** numeric keyboard SHALL appear
- **AND** input field SHALL remain visible above keyboard
- **AND** layout SHALL not shift unexpectedly

#### Scenario: QR code display on mobile

- **WHEN** TrueMoney payment is created on mobile
- **THEN** QR code SHALL be displayed at readable size (minimum 200x200px)
- **AND** QR code SHALL be centered in modal
- **AND** "Open TrueMoney App" button SHALL appear prominently below QR
- **AND** deep-link SHALL open TrueMoney app directly

#### Scenario: Payment polling indicator on mobile

- **WHEN** user scans QR code on mobile
- **THEN** loading indicator SHALL show "Waiting for payment..."
- **AND** indicator SHALL update smoothly without layout shifts
- **AND** timeout countdown SHALL display remaining time
- **AND** "Cancel" button SHALL remain accessible

### Requirement: TrueMoney Configuration

The system SHALL integrate with TrueMoney Payment Gateway API with appropriate credentials.

#### Scenario: TrueMoney merchant account setup

- **WHEN** setting up TrueMoney integration
- **THEN** TrueMoney Business account SHALL be registered
- **AND** Merchant ID SHALL be obtained from TrueMoney
- **AND** API credentials (API Key, Secret Key) SHALL be generated
- **AND** Webhook URL SHALL be registered with TrueMoney

#### Scenario: TrueMoney sandbox mode during development

- **WHEN** running in development environment
- **THEN** TrueMoney sandbox credentials SHALL be used
- **AND** sandbox API endpoint SHALL be configured
- **AND** test payments SHALL be processable via sandbox
- **AND** visual indicator SHALL show "Test Mode (Sandbox)" clearly

#### Scenario: TrueMoney live mode in production

- **WHEN** deployed to production
- **THEN** TrueMoney production credentials SHALL be used
- **AND** production API endpoint SHALL be configured
- **AND** real payments SHALL be processed
- **AND** no test mode indicators SHALL be visible

### Requirement: Environment Configuration

TrueMoney API credentials SHALL be stored securely in environment variables.

#### Scenario: Load TrueMoney backend configuration

- **WHEN** backend server initializes
- **THEN** Merchant ID SHALL be loaded from TRUEMONEY_MERCHANT_ID
- **AND** API Key SHALL be loaded from TRUEMONEY_API_KEY
- **AND** Secret Key SHALL be loaded from TRUEMONEY_SECRET_KEY
- **AND** API URL SHALL be loaded from TRUEMONEY_API_URL
- **AND** missing configuration SHALL prevent server startup with clear error

#### Scenario: Load TrueMoney frontend configuration

- **WHEN** frontend application initializes
- **THEN** backend API URL SHALL be loaded from VITE_TRUEMONEY_BACKEND_URL
- **AND** missing configuration SHALL log error to console
- **AND** tip feature SHALL gracefully disable if configuration missing

#### Scenario: Environment variable structure

- **WHEN** configuring backend environment variables
- **THEN** TRUEMONEY_MERCHANT_ID SHALL contain merchant ID from TrueMoney
- **AND** TRUEMONEY_API_KEY SHALL contain API key from TrueMoney
- **AND** TRUEMONEY_SECRET_KEY SHALL contain secret key from TrueMoney
- **AND** TRUEMONEY_API_URL SHALL contain sandbox or production endpoint
- **AND** TRUEMONEY_WEBHOOK_SECRET SHALL contain webhook signature verification key

#### Scenario: Frontend environment variables

- **WHEN** configuring frontend environment variables
- **THEN** VITE_TRUEMONEY_BACKEND_URL SHALL contain backend API URL
- **AND** format SHALL be: https://[backend-domain]/api/truemoney

### Requirement: Error Handling

The system SHALL handle payment errors and service unavailability gracefully.

#### Scenario: TrueMoney API unavailable

- **WHEN** TrueMoney API request fails
- **THEN** error message SHALL display: "ระบบชำระเงินไม่พร้อมใช้งาน / Payment service temporarily unavailable"
- **AND** user SHALL be able to retry
- **AND** error SHALL not crash or break the app
- **AND** error SHALL be logged to console for debugging

#### Scenario: QR code generation failure

- **WHEN** QR code cannot be generated from payment URL
- **THEN** fallback link SHALL be displayed: "Open payment page"
- **AND** error SHALL be logged to console
- **AND** user can still complete payment via link

#### Scenario: Payment polling timeout

- **WHEN** 5-minute polling timeout is reached without payment
- **THEN** modal SHALL show: "เวลาหมดแล้ว กรุณาลองใหม่อีกครั้ง / Time expired, please try again"
- **AND** tip_timeout event SHALL be sent to GA4
- **AND** user SHALL be able to start new payment
- **AND** transaction ID SHALL be abandoned

#### Scenario: Backend configuration missing

- **WHEN** TrueMoney backend URL is not configured
- **THEN** tip button SHALL not appear
- **AND** error SHALL be logged to console
- **AND** no user-facing error SHALL be shown (feature just unavailable)

#### Scenario: Webhook signature verification failed

- **WHEN** webhook payload signature is invalid
- **THEN** backend SHALL reject webhook with 401 status
- **AND** payment status SHALL rely on polling instead
- **AND** security alert SHALL be logged

### Requirement: Security and Privacy

No sensitive payment data SHALL be stored or processed by the frontend; payment handling is delegated to TrueMoney backend and API.

#### Scenario: No payment data storage

- **WHEN** user makes a payment
- **THEN** no wallet credentials SHALL be stored or logged by frontend
- **AND** no payment tokens SHALL be persisted locally
- **AND** all payment processing SHALL occur via backend and TrueMoney API

#### Scenario: Backend security

- **WHEN** backend processes TrueMoney payments
- **THEN** API credentials SHALL be stored in environment variables only
- **AND** Secret Key SHALL never be exposed to frontend
- **AND** webhook signature verification SHALL validate all incoming webhooks
- **AND** HTTPS SHALL be enforced for all API endpoints

#### Scenario: Anonymous tipping

- **WHEN** user makes a tip
- **THEN** no email address SHALL be required
- **AND** no user account SHALL be created
- **AND** tipping SHALL be completely anonymous
- **AND** only amount and timestamp SHALL be tracked in analytics (if consent)

#### Scenario: Transaction ID security

- **WHEN** backend creates payment transaction
- **THEN** transaction ID SHALL be randomly generated UUID
- **AND** transaction ID SHALL not reveal merchant or user information
- **AND** expired transaction IDs SHALL be cleaned up after 24 hours

### Requirement: User Experience Principles

Tipping SHALL never feel pressured, transactional, or gate any content.

#### Scenario: No content gating

- **WHEN** user reaches ending
- **THEN** all content SHALL be accessible immediately
- **AND** tip button SHALL never block or delay content viewing
- **AND** declining to tip SHALL never show guilt-inducing messages

#### Scenario: Non-intrusive presentation

- **WHEN** tip button appears
- **THEN** visual prominence SHALL be equal to other action buttons
- **AND** copy SHALL be warm and optional: "Leave a tip ❤️"
- **AND** no countdown timers or urgency tactics SHALL be used

#### Scenario: Easy dismissal

- **WHEN** user opens tip modal
- **THEN** "Maybe Later" button SHALL be clear and easy to find
- **AND** tapping outside modal SHALL close it
- **AND** Escape key SHALL close modal on desktop
- **AND** no modal SHALL reappear if dismissed

#### Scenario: Gratitude without excess

- **WHEN** user completes a tip
- **THEN** thank you message SHALL be sincere but brief
- **AND** no upsell or "tip again" prompts SHALL appear
- **AND** user proceeds smoothly to next actions

### Requirement: Accessibility

Tip button and modal SHALL be fully accessible to all users.

#### Scenario: Keyboard navigation

- **WHEN** user navigates tip UI with keyboard
- **THEN** tip button SHALL be reachable via Tab key
- **AND** Enter or Space SHALL open tip modal
- **AND** all modal elements SHALL be keyboard-navigable
- **AND** Escape key SHALL close modal

#### Scenario: Screen reader support

- **WHEN** screen reader user encounters tip button
- **THEN** button SHALL announce: "Leave a tip, button"
- **AND** amount buttons SHALL announce amount and "button"
- **AND** custom input SHALL have proper label association
- **AND** error messages SHALL be announced when displayed

#### Scenario: Focus management

- **WHEN** tip modal opens
- **THEN** focus SHALL move to modal heading
- **AND** focus SHALL trap within modal (no tabbing to background)
- **WHEN** modal closes
- **THEN** focus SHALL return to tip button or next logical element

### Requirement: Performance

Tip functionality SHALL have minimal impact on application performance.

#### Scenario: Lazy load tip component

- **WHEN** application initially loads
- **THEN** tip button component SHALL be lazy-loaded
- **AND** initial bundle size SHALL not include tip code
- **AND** tip component SHALL load after ending screen renders

#### Scenario: Fast tip modal render

- **WHEN** user clicks tip button
- **THEN** modal SHALL render within 200ms
- **AND** animation SHALL complete smoothly
- **AND** no janky rendering SHALL occur

#### Scenario: QR code library optimization

- **WHEN** user opens tip modal
- **THEN** QR code generation library SHALL be lazy-loaded
- **AND** QR code SHALL generate within 500ms
- **AND** loading indicator SHALL show during generation

#### Scenario: Polling efficiency

- **WHEN** polling payment status
- **THEN** polling interval SHALL be 5 seconds (not more frequent)
- **AND** polling SHALL stop immediately on success/failure/timeout
- **AND** polling SHALL use exponential backoff on errors
- **AND** maximum 60 poll attempts (5 minutes) SHALL be enforced

### Requirement: Testing Support

The system SHALL support easy testing of tip flow in development.

#### Scenario: Dev mode access

- **WHEN** app runs with `?dev=payments` URL parameter
- **THEN** test mode indicator SHALL be visible on tip button
- **AND** TrueMoney sandbox credentials SHALL be used
- **AND** backend SHALL connect to TrueMoney sandbox API
- **AND** "Test Mode (Sandbox)" banner SHALL appear in tip modal

#### Scenario: Test all amounts

- **WHEN** testing tip functionality
- **THEN** all three preset amounts SHALL be testable
- **AND** custom amounts SHALL be testable
- **AND** success and timeout flows SHALL be testable
- **AND** thank you message SHALL display correctly in test mode

#### Scenario: Mock payment completion

- **WHEN** testing in local development without TrueMoney backend
- **THEN** mock mode SHALL allow simulating payment success
- **AND** mock mode SHALL allow simulating timeout scenarios
- **AND** mock QR codes SHALL be generated with test data
- **AND** "MOCK MODE" indicator SHALL be clearly visible

### Requirement: Conversion Optimization

Tip presentation SHALL be optimized for conversion without being pushy.

#### Scenario: Optimal timing

- **WHEN** determining when to show tip button
- **THEN** button SHALL appear after user has fully experienced ending
- **AND** button SHALL not interrupt feedback flow
- **AND** timing SHALL feel like natural conclusion moment

#### Scenario: Social proof (optional future)

- **WHEN** displaying tip button
- **THEN** optional message MAY indicate: "Join [X] supporters"
- **AND** message SHALL be subtle and optional
- **AND** no guilt-inducing copy SHALL be used

#### Scenario: Amount psychology

- **WHEN** presenting preset amounts
- **THEN** middle amount (฿150) SHALL be slightly more prominent (optional)
- **AND** amounts SHALL feel reasonable and accessible
- **AND** custom option SHALL support lower amounts (฿20-50) for accessibility

### Requirement: Future Enhancements

The system SHALL support easy addition of advanced tip features in future.

#### Scenario: Recurring support (Phase 2)

- **WHEN** considering recurring support
- **THEN** TrueMoney Subscription API can be added
- **AND** "Monthly support" option can be included
- **AND** existing one-time tip flow remains unchanged

#### Scenario: Supporter benefits (Phase 2)

- **WHEN** adding supporter perks
- **THEN** "Name in credits" option can be added
- **AND** early access to new experiences can be offered
- **AND** implementation SHALL require backend supporter database

#### Scenario: Multiple payment methods (Phase 2)

- **WHEN** expanding payment options for international users
- **THEN** Stripe, PayPal, or PromptPay can be added
- **AND** existing TrueMoney flow remains primary for Thai users
- **AND** additional methods appear as alternative options
- **AND** payment method selection SHALL be prominent in modal
