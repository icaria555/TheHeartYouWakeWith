# Design Document: Enrich Story Experience

## Overview

This change transforms "The Heart You Wake With" from a functional narrative experience into an immersive, emotionally resonant journey. We're expanding content depth (5→8 scenes per path), adding ambient audio, and creating visually rich environments through animated gradients and particle effects.

**Core Principle**: Enhance without overwhelming. All additions should deepen emotional impact while respecting user control and performance constraints.

## Architecture Decisions

### 1. Content Expansion Strategy

**Decision**: Add 3 scenes per path, distributed to improve pacing

**Pattern**:

- **Path A**: 5 current scenes → 8 total scenes (balanced relationship journey)
- **Path B**: 5 current scenes → 9 total scenes (most complex, needs deeper exploration)
- **Path C**: 5 current scenes → 7 total scenes (single perspective, more direct)

**Scene Structure** (example for Path A/8 scenes):

- **Scene 1-2**: Existing setup/story moments (keep)
- **Scene 2.5 (NEW)**: Deeper exploration of initial emotional state
- **Scene 3**: Existing tension moment (keep, remains midpoint)
- **Scene 3.5 (NEW)**: Reflection on tension aftermath
- **Scene 4**: Existing hesitation (keep)
- **Scene 4.5 (NEW)**: Consequence exploration
- **Scene 5**: Existing crossroad (keep as final scene)

**Path B** adds one additional scene (4.7) before final crossroad for complexity.
**Path C** omits scene 4.5 for more direct progression.

**Rationale**:

- Variable lengths fit narrative complexity while keeping 7-10 minute range
- Maintains existing 5 core scenes to preserve scoring balance
- New scenes add depth without restructuring dimensional logic
- Midpoint feedback at scene 3 (Path A: ~37%, Path B: ~33%, Path C: ~43%)
- Total journey: ~7-10 minutes (from current 3-5 minutes)

**Dimensional Score Impact**:

- New scenes offer ±1 score adjustments (gentle shifts)
- Existing pivotal scenes keep ±2 scores (major decisions)
- Total score ranges remain -6 to +6 (within validated ending thresholds)

### 2. Audio System Architecture

**Decision**: Client-side audio manager with lazy loading and crossfading

**Technology**:

- **HTML5 Audio API** via React hooks (no external library)
- **Howler.js** (optional enhancement for advanced crossfading)
- **localStorage** for audio preference persistence

**Music Themes**:

```typescript
enum AudioTheme {
  HOPEFUL = "hopeful", // Scenes with high hope/compassion scores
  REFLECTIVE = "reflective", // Neutral or introspective moments
  MELANCHOLIC = "melancholic", // Low hope/selfWorth, tension moments
}
```

**Audio Manager API**:

```typescript
interface AudioManager {
  init(): Promise<void>; // Load initial theme
  playTheme(theme: AudioTheme): void; // Crossfade to theme
  setVolume(level: number): void; // 0-1 volume control
  mute(): void; // Pause audio
  unmute(): void; // Resume audio
  getPreference(): AudioPreference; // Get user preference
  setPreference(pref: AudioPreference): void; // Update preference
}

interface AudioPreference {
  enabled: boolean; // User consent & active state
  volume: number; // 0-1
}
```

**Theme Selection Logic**:

- **Path-based**: Each path (A/B/C) has its own consistent musical theme
  - **Path A**: HOPEFUL (balanced relationship journey)
  - **Path B**: REFLECTIVE (complex, introspective journey)
  - **Path C**: MELANCHOLIC or PEACEFUL (single perspective, self-reflection)
- Theme plays throughout entire journey for that path
- No mid-journey transitions (simplest implementation, cohesive sonic identity)

**Crossfade Approach**:

- Path-based music: No crossfades needed (single theme per full journey)
- Smooth fade-in on journey start (volume 0 → user_volume over 2s)
- Smooth fade-out on journey end (volume user_volume → 0 over 2s)
- Audio loads after path selection, before first story scene begins

**Audio Assets**:

- 3 music tracks from **Epidemic Sound** (60-90 seconds each, seamless loops)
- Format: **MP3** (universal support) + **OGG** (fallback)
- File size: ~500KB-1MB per track (total ~2-3MB)
- Hosting: `/public/audio/` directory (Vite static asset)
- **License**: Requires active Epidemic Sound subscription before production deployment

**Consent & Controls**:

- Audio consent requested on Landing screen (after analytics consent)
- Default state: **Playing** (after user consents, audio starts automatically)
- Prominent mute toggle (easily accessible, top-right corner or floating button)
- Audio preference saved to localStorage: `audioPreference`
- Users can mute immediately if they prefer silence

### 3. Visual Enhancement Architecture

#### Animated Backgrounds

**Decision**: CSS-based animated gradients with React state management

**Technology**:

- **CSS `@keyframes`** for gradient animations (performance > Canvas)
- **Tailwind CSS** custom gradient utilities
- **CSS custom properties** for dynamic color injection

**Gradient Themes**:

```typescript
enum BackgroundTheme {
  WARM = "warm", // Romantic, hopeful scenes (pink/orange/gold)
  COOL = "cool", // Reflective, calm scenes (blue/purple/lavender)
  NEUTRAL = "neutral", // Tension, uncertain scenes (gray/beige/muted)
  VIBRANT = "vibrant", // Passionate, action scenes (red/magenta/pink)
}
```

**Implementation**:

```css
/* backgrounds.css */
@keyframes gradientShiftWarm {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-warm {
  background: linear-gradient(
    135deg,
    #ffdee9 0%,
    #ffafbd 25%,
    #ffc3a0 50%,
    #ffdee9 75%,
    #ffafbd 100%
  );
  background-size: 400% 400%;
  animation: gradientShiftWarm 20s ease infinite;
}
```

**Theme Selection**:

- Scene-specific: Each scene in `storyData.ts` has `backgroundTheme` property
- Transitions: Gradient crossfades via CSS transitions (2s ease-in-out)

#### Particle Effects

**Decision**: CSS-only particle system for performance (avoid Canvas complexity)

**Technology**:

- **CSS absolute positioning** with `transform` animations
- **React-Spring** or **Motion** for entrance/exit animations
- **Randomized delays** for organic movement

**Particle Types**:

- **Hearts**: Floating upward slowly (romantic scenes)
- **Sparkles**: Twinkling stars (hopeful scenes)
- **Bubbles**: Rising orbs (reflective scenes)
- **None**: No particles (intense tension moments)

**Performance Budget**:

- **Desktop**: 20-30 particles
- **Mobile**: 10-15 particles (detect via `window.innerWidth < 768`)
- **Reduced motion**: 0 particles (respect `prefers-reduced-motion`)

**Implementation Pattern**:

```tsx
<ParticleEffect type="hearts" count={isMobile ? 10 : 25} speed="slow" />
```

**Particle Animation**:

- Random starting positions: `left: ${Math.random() * 100}%`
- Vertical movement: `translateY(-100vh)` over 10-20s
- Horizontal drift: `translateX(±20px)` for natural sway
- Opacity fade: Start 0.3 → peak 0.8 → end 0

#### Micro-Animations

**Decision**: Motion-based transitions for choices and scene changes

**Animations**:

1. **Choice buttons**:
   - Hover: Scale 1.02, shadow increase
   - Press: Scale 0.98, slight color shift
   - Selection: Fade out non-selected choices, slide selected choice up

2. **Scene transitions**:
   - Exit: Current scene fades out + moves left (-20px)
   - Enter: New scene fades in + moves from right (20px)
   - Duration: 400ms ease-in-out

3. **Background transitions**:
   - Gradient: CSS transition 2s ease-in-out
   - Particles: Crossfade particle type over 1s

**Motion Accessibility**:

- Detect `prefers-reduced-motion: reduce`
- If true: Disable all animations, use instant cuts
- User override: Settings panel option "Enable animations"

### 4. Scene Content Design

**New Scene Writing Guidelines**:

1. **Scene 2.5 (Post-setup reflection)**:
   - Purpose: Deepen initial emotional state exploration
   - Tone: Introspective, gentle questioning
   - Example: "As you prepare for the day, what feeling sits heaviest in your chest?"
   - Scores: ±1 adjustments (vulnerability, hope, selfWorth)

2. **Scene 3.5 (Tension aftermath)**:
   - Purpose: Process the midpoint tension moment consequences
   - Tone: Uncertainty, second-guessing, or resolve
   - Example: "After that moment, do you feel closer to the truth or further from peace?"
   - Scores: ±1 adjustments (honesty, selfWorth, action)

3. **Scene 4.5 (Consequence exploration)**:
   - Purpose: Acknowledge impact of hesitation choice
   - Tone: Regret, acceptance, or anticipation
   - Example: "Looking back, was that choice honesty or self-preservation?"
   - Scores: ±1 adjustments (honesty, vulnerability, compassion)

**Dimensional Balance**:

- Maintain existing score ranges (-6 to +6)
- New scenes contribute 3 additional choices × ±1 score = ±3 max impact
- Total potential range: -9 to +9 (still within ending condition tolerances)
- **Validation**: Re-run Score Balance Tool after content addition

### 5. Performance Optimization

**Targets**:

- **Initial Load**: < 3 seconds on 4G connection
- **Scene Transition**: < 300ms for smooth UX
- **Frame Rate**: 60fps on desktop, 45fps+ on mobile
- **Audio Load**: Progressive/lazy loading (load audio for current path only, after user selection)

**Optimization Strategies**:

1. **Audio**:
   - Progressive/lazy loading: Load audio only after path selection
   - Only download the single music theme needed for chosen path
   - No preload on initial landing to optimize initial load time
   - Use compressed MP3 (128kbps sufficient for ambient music)

2. **Particles**:
   - CSS-only (no Canvas overhead)
   - Reduce particle count on mobile: `count={isMobile ? 10 : 25}`
   - Disable entirely if `prefers-reduced-motion`

3. **Gradients**:
   - CSS animations (GPU-accelerated)
   - Limit gradient stops to 4-5 colors (avoid complexity)
   - Use `will-change: background-position` for optimization hint

4. **Images**:
   - Keep existing Unsplash images (already optimized)
   - No additional image assets needed for this change

**Bundle Size Impact**:

- **Audio**: +2-3MB (3 music tracks)
- **Code**: +10-15KB (audio manager, particle components, gradient utilities)
- **Total**: ~3MB increase (acceptable for richer experience)

### 6. Testing Strategy

**Manual Testing**:

1. **Content validation**: Play through all 3 paths, verify score balance preserved
2. **Audio testing**: Test theme transitions, crossfades, mute/unmute, persistence
3. **Visual testing**: Check gradients on light/dark displays, verify particle performance
4. **Accessibility**: Test with screen reader, keyboard navigation, reduced motion preference
5. **Mobile testing**: verify iOS/Android performance, touch interactions, audio autoplay policies

**Score Balance Tool**:

- Re-validate all 16 endings after adding new scenes
- Check ending distribution remains balanced (no ending > 30%)
- Verify secret endings (E15, E16) still achievable

**Performance Testing**:

- Lighthouse audit: Target 90+ performance score
- Manual FPS monitoring: Chrome DevTools performance tab
- Mobile device testing: iPhone 12, Samsung Galaxy S21 (mid-range devices)

### 7. Migration Path

**Phase 1: Visual Enhancements** (Low risk)

- Add animated gradient backgrounds
- Add particle effects
- Add micro-animations
- Update opening question text
- **Validation**: Visual QA, performance testing

**Phase 2: Audio System** (Medium risk)

- Implement audio manager
- Add 3 music themes
- Add audio controls UI
- Add audio consent to Landing
- **Validation**: Audio playback testing, consent flow testing

**Phase 3: Content Expansion** (High risk - impacts scoring)

- Add 3 new scenes per path (9 scenes total)
- Write new scene narratives with ±1 scores
- Update scene progression logic
- **Validation**: Score Balance Tool, manual playthroughs, ending distribution

**Rollback Strategy**:

- Each phase independently deployable
- If Phase 3 breaks scoring: Rollback to Phase 2 (audio + visuals only)
- Feature flags: `FEATURE_AUDIO_ENABLED`, `FEATURE_EXPANDED_SCENES`

## Open Questions Resolution

### 1. Scene Count Per Path

**✅ RESOLVED**: Variable scene counts to fit narrative complexity

- **Path A**: 8 scenes (balanced relationship journey)
- **Path B**: 9 scenes (most complex emotional arc)
- **Path C**: 7 scenes (direct single-person introspection)
- **Rationale**: Narrative flexibility while maintaining 7-10 minute experience, allows each path's unique voice

### 2. Audio File Source

**✅ RESOLVED**: Epidemic Sound

- **Decision**: Use Epidemic Sound for high-quality royalty-free music library
- **Rationale**: Professional quality, wide selection for emotional theming, no attribution required
- **Action Required**: Secure Epidemic Sound license before production deployment

### 3. Particle Effect Complexity

**✅ RESOLVED**: Light (10-20 particles, simple shapes)

- **Decision**: Light implementation with 10-20 particles maximum, simple shapes (circles, hearts)
- **Rationale**: Prioritizes accessibility and performance across all devices, 60fps target
- **Future**: Implementation allows enhancement if performance budget permits

### 4. Gradient Animation Style

**✅ RESOLVED**: Subtle shifts (30-60 second gradients)

- **Decision**: Slow gradient transitions with calm, meditative aesthetic
- **Rationale**: Aligns with contemplative nature of "The Heart You Wake With" journey
- **Implementation**: Creates soothing backdrop that enhances reflection without distraction

### 5. Music Transition Strategy

**✅ RESOLVED**: Path-based (each path has consistent theme)

- **Decision**: Each path (A/B/C) has its own consistent musical theme throughout entire journey
- **Rationale**: Simplest implementation, most predictable for users, creates cohesive sonic identity
- **Implementation**: No mid-journey transitions, avoids jarring audio changes, allows thoughtful music selection per path

### 6. Content Expansion Strategy

**✅ RESOLVED**: Mid-journey focus (add scenes around midpoint)

- **Decision**: Add new scenes around midpoint of each path, focusing on tension/hesitation/reflection
- **Rationale**: Establishes foundation quickly, deepens emotional complexity where users are most engaged
- **Implementation**: Maintains strong opening and closing while enriching core contemplative space

### 7. Performance Budget

**✅ RESOLVED - Targets Confirmed**:

- Initial load: < 3 seconds on 4G connection
- Scene transitions: < 300ms for smooth UX
- Framerate: 60fps desktop, 45fps+ on mobile
- Audio: Progressive/lazy loading (load audio for current path only, after user selection)

### 8. Accessibility

**✅ RESOLVED - Decisions**:

- **Motion**: Respect `prefers-reduced-motion` CSS media query, disable/reduce animations for users who prefer reduced motion
- **Audio**: Default playing with easy mute toggle (respects audio consent from landing, provides immediate control)
- **Focus**: Ensure animations don't interfere with tab order, screen reader announcements, maintain proper ARIA labels
- **User override**: Settings panel with mute/unmute toggle, always easily accessible
