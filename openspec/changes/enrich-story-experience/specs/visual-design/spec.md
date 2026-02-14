# Spec Delta: visual-design

## ADDED Requirements

### Requirement: Animated gradient backgrounds with subtle shifts for all scenes

The system SHALL render animated CSS gradient backgrounds that subtly shift colors over 30-60 seconds to create calm, meditative atmosphere and visual interest.

#### Scenario: Scene displays WARM gradient theme

- **Given**: Scene specifies `backgroundTheme: "warm"`
- **When**: Scene renders
- **Then**: Background displays pink/orange/gold gradient (135deg angle)
- **And**: Gradient animates smoothly over 30-60 seconds (slow, subtle shifts)
- **And**: Animation uses `background-position` for GPU acceleration
- **And**: Gradient covers full viewport (fixed positioning)
- **And**: Creates soothing, meditative backdrop

#### Scenario: Scene displays COOL gradient theme

- **Given**: Scene specifies `backgroundTheme: "cool"`
- **When**: Scene renders
- **Then**: Background displays blue/purple/lavender gradient (135deg angle)
- **And**: Gradient creates calm, reflective atmosphere
- **And**: Animation loop matches WARM theme (30-60s) for consistency
- **And**: Subtle shifts align with contemplative nature of journey

#### Scenario: Scene displays NEUTRAL gradient theme

- **Given**: Scene specifies `backgroundTheme: "neutral"`
- **When**: Scene renders
- **Then**: Background displays gray/beige/muted gradient (135deg angle)
- **And**: Gradient creates uncertain, tense atmosphere
- **And**: Colors remain subtle to avoid overwhelming narrative text

#### Scenario: Scene displays VIBRANT gradient theme

- **Given**: Scene specifies `backgroundTheme: "vibrant"`
- **When**: Scene renders
- **Then**: Background displays red/magenta/pink gradient (135deg angle)
- **And**: Gradient creates passionate, energetic atmosphere
- **And**: High saturation colors emphasize emotional intensity

### Requirement: Light particle effect system for ambient decoration

The system SHALL render CSS-animated particle effects with light implementation (15-20 particles desktop, 10-15 mobile) to enhance visual atmosphere while maintaining 60fps performance on all devices.

#### Scenario: Scene displays heart particles on desktop

- **Given**: Scene specifies `particleType: "hearts"`
- **When**: Scene renders on desktop browser (viewport > 768px)
- **Then**: 15-20 heart-shaped elements appear at random horizontal positions
- **And**: Hearts float upward (translateY -100vh) over 10-20 seconds
- **And**: Hearts drift horizontally (±20px) for natural movement
- **And**: Hearts fade in and out (opacity 0.3 → 0.8 → 0) during ascent
- **And**: Animation maintains 60fps on all devices

#### Scenario: Scene displays sparkle particles

- **Given**: Scene specifies `particleType: "sparkles"`
- **When**: Scene renders
- **Then**: 15-20 star-shaped elements appear with twinkling animation (desktop)
- **And**: Sparkles use opacity animation to simulate twinkling effect
- **And**: Sparkles move slowly upward with gentle horizontal drift
- **And**: Effect creates magical, hopeful atmosphere
- **And**: Maintains 60fps performance

#### Scenario: Scene displays bubble particles

- **Given**: Scene specifies `particleType: "bubbles"`
- **When**: Scene renders
- **Then**: 15-20 translucent circular elements rise like bubbles (desktop)
- **And**: Bubbles use subtle scale animation (0.8 → 1.2 → 0.8) for breathing effect
- **And**: Bubbles create calm, contemplative atmosphere
- **And**: Effect supports introspective reading experience
- **And**: Simple shapes ensure 60fps performance

#### Scenario: Scene displays no particles

- **Given**: Scene specifies `particleType: "none"`
- **When**: Scene renders
- **Then**: No particle elements appear
- **And**: Visual simplicity emphasizes narrative text importance
- **And**: CPU/GPU resources saved for other animations

### Requirement: Responsive particle count optimization for 60fps target

The particle system MUST adjust particle count based on device capabilities to maintain smooth 60fps performance on all devices.

#### Scenario: Desktop browser displays particles

- **Given**: Viewport width exceeds 768px (desktop)
- **When**: Scene with particles renders
- **Then**: System renders 15-20 particles (light implementation)
- **And**: Animation maintains 60fps on all devices (modern and older)
- **And**: No performance degradation during scene transitions

#### Scenario: Mobile browser displays particles

- **Given**: Viewport width is 768px or less (mobile/tablet)
- **When**: Scene with particles renders
- **Then**: System renders 10-15 particles (reduced for mobile)
- **And**: Animation maintains 60fps on mid-range devices (iPhone 12, Samsung S21)
- **And**: Reduced particle count improves battery efficiency
- **And**: Simple shapes (circles, hearts) ensure smooth performance

### Requirement: Choice button micro-animations

The system SHALL animate choice buttons to provide tactile feedback and enhance interactivity.

#### Scenario: User hovers over choice button (desktop)

- **Given**: User moves cursor over choice button
- **When**: Hover state activates
- **Then**: Button scales to 1.02 (2% larger)
- **And**: Box shadow increases (depth effect)
- **And**: Transition animates over 200ms (ease-out)
- **And**: Cursor changes to pointer

#### Scenario: User presses choice button

- **Given**: User clicks/taps choice button
- **When**: Active state triggers
- **Then**: Button scales to 0.98 (2% smaller)
- **And**: Background color shifts slightly darker
- **And**: Transition animates over 100ms (snappy feedback)

#### Scenario: User selects choice (post-click)

- **Given**: User has clicked choice button
- **When**: Selection animation plays
- **Then**: Selected button remains visible, slides up 20px
- **And**: Non-selected buttons fade opacity to 0 over 300ms
- **And**: Non-selected buttons scale down to 0.95
- **And**: Scene transition begins after 400ms delay

### Requirement: Scene transition animations under 300ms

The system SHALL animate scene changes under 300ms to provide visual continuity and professional polish while meeting smooth UX targets.

#### Scenario: Scene transitions to next scene

- **Given**: User has selected a choice
- **When**: Scene change animation begins
- **Then**: Current scene fades opacity from 1 to 0 in under 300ms
- **And**: Current scene translates left (-20px) during fade
- **And**: New scene fades opacity from 0 to 1 in under 300ms
- **And**: New scene translates from right (+20px to 0) during fade
- **And**: Animations use ease-in-out timing function
- **And**: Smooth UX target met (< 300ms for scene transitions)

#### Scenario: Background gradient transitions between scenes

- **Given**: New scene has different background theme
- **When**: Scene change occurs
- **Then**: Background gradient crossfades over 2 seconds
- **And**: Crossfade is independent of scene content animation (400ms)
- **And**: New gradient animation loop begins seamlessly
- **And**: Transition uses CSS transition (not animation)

### Requirement: Reduced motion accessibility

The system MUST respect user motion preferences and disable/reduce animations when requested.

#### Scenario: User has reduced motion preference enabled

- **Given**: Operating system setting `prefers-reduced-motion: reduce` is active
- **When**: Any animation would normally trigger
- **Then**: All CSS animations are disabled or significantly reduced (via media query)
- **And**: Scene transitions are instant or very brief (no extended fade, no slide)
- **And**: Particle effects do not render (0 particles)
- **And**: Choice buttons have minimal or no scale/movement effects
- **And**: Background gradients still display (color transitions accessible, non-vestibular)

#### Scenario: User manually disables animations in settings

- **Given**: User opens Settings dialog and toggles "Enable animations" off
- **When**: Setting is saved to localStorage
- **Then**: System adds `no-animations` class to root element
- **And**: CSS rules disable all transforms and opacity transitions
- **And**: Effect is equivalent to reduced motion preference
- **And**: Setting persists across page reloads

### Requirement: Performance optimization for smooth experience

The visual system SHALL maintain smooth frame rates (60fps on all devices) while displaying all enhancements.

#### Scenario: Desktop browser renders full experience

- **Given**: User on desktop device (Chrome, Firefox, Safari)
- **When**: Scene with full visual effects renders
- **Then**: Frame rate maintains 60fps consistently
- **And**: Gradient animation uses `will-change: background-position` hint
- **And**: Particle animations use `transform` (GPU-accelerated)
- **And**: Scene transitions complete within 300ms (smooth UX)
- **And**: Light particle count (15-20) ensures smooth performance

#### Scenario: Mobile browser renders optimized experience

- **Given**: User on mobile device (iPhone 12, Samsung S21, mid-range)
- **When**: Scene with visual effects renders
- **Then**: Frame rate maintains 60fps (target for all devices)
- **And**: Particle count reduced to 10-15 (light implementation)
- **And**: Gradient complexity maintained (minimal CPU impact)
- **And**: Scene transitions complete within 300ms
- **And**: Simple particle shapes (circles, hearts) optimize performance

## Related Capabilities

- **narrative-engine**: Provides background theme and particle type per scene
- **story-navigation**: Triggers visual transitions during scene changes
- **user-feedback**: Visual effects provide ambient emotional feedback
- **audio-system**: Visual and audio transitions are synchronized
