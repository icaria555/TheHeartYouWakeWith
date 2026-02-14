# Implementation Tasks: Enrich Story Experience

## Task 1: Foundation - Audio System Infrastructure (10 tasks)

- [x] 1.1: Create `src/lib/audioManager.ts` with AudioManager interface and implementation
- [x] 1.2: Implement progressive/lazy loading for audio (loads only after path selection, before first story scene)
- [x] 1.3: Add fade-in/fade-out logic (2-second fade at journey start/end, no mid-journey crossfades)
- [x] 1.4: Implement localStorage persistence for audio preferences (`audioPreference`)
- [x] 1.5: Create AudioContext initialization with error handling (Safari, autoplay policies)
- [x] 1.6: Add volume control methods (setVolume, mute, unmute)
- [x] 1.7: Create `src/types/audio.ts` with AudioTheme, AudioPreference, AudioManager interfaces
- [x] 1.8: Add audio state to App.tsx (currentTheme, audioPreference, audioManager instance)
- [x] 1.9: Implement path-based theme selection (Path A: HOPEFUL, Path B: REFLECTIVE, Path C: MELANCHOLIC/PEACEFUL)
- [x] 1.10: Add error handling for audio loading failures (network issues, unsupported formats)

## Task 2: Audio Assets & Controls UI (7 tasks)

- [x] 2.1: Secure Epidemic Sound license (required before production deployment) ✅ COMPLETE (2026-02-14)
- [x] 2.2: Source 3 music tracks from Epidemic Sound (hopeful for Path A, reflective for Path B, melancholic/peaceful for Path C) ✅ COMPLETE (2026-02-14)
- [x] 2.3: Optimize audio files (compress to 128kbps MP3, create OGG fallback, ensure seamless loops at 60-90s) ✅ COMPLETE (2026-02-14)
- [x] 2.4: Add audio files to `public/audio/` directory with naming convention (path-a.mp3, path-b.mp3, path-c.mp3) ✅ COMPLETE (2026-02-14)
- [x] 2.5: Create `src/app/components/AudioControls.tsx` component (prominent mute/unmute toggle)
- [x] 2.6: Style AudioControls component (easily accessible, top-right corner or floating button, clear icon + tooltip)
- [x] 2.7: Integrate AudioControls into App.tsx layout (persistent across scenes, always visible)

## Task 3: Audio Consent & Analytics Integration (4 tasks)

- [x] 3.1: Add audio consent option to Landing screen (checkbox + description)
- [x] 3.2: Update consent dialog to include audio permission alongside analytics
- [x] 3.3: Store audio consent in localStorage (`audioConsent`) - default playing behavior after consent
- [x] 3.4: Add analytics event tracking for audio interactions (audio_enabled, audio_muted, audio_unmuted)

## Task 4: Visual Enhancement - Animated Backgrounds (8 tasks)

- [x] 4.1: Create `src/styles/backgrounds.css` with gradient animation keyframes for subtle shifts
- [x] 4.2: Define 4 background themes (WARM, COOL, NEUTRAL, VIBRANT) with color palettes
- [x] 4.3: Implement CSS gradient animations (30-60s slow loop, 400% background-size, calm meditative aesthetic)
- [x] 4.4: Create Tailwind CSS utilities for gradient themes (bg-gradient-warm, etc.)
- [x] 4.5: Add `backgroundTheme` property to Scene interface in storyData.ts
- [x] 4.6: Assign background themes to all existing 15 scenes (5 scenes × 3 paths)
- [x] 4.7: Update StoryScene.tsx to apply dynamic background theme based on scene data
- [x] 4.8: Add CSS transition for gradient changes between scenes (2s ease-in-out)

## Task 5: Visual Enhancement - Particle Effects (7 tasks)

- [x] 5.1: Create `src/app/components/ParticleEffect.tsx` component (CSS-only, light implementation)
- [x] 5.2: Implement 4 particle types (hearts, sparkles, bubbles, none) - simple shapes only
- [x] 5.3: Add CSS animations for particle movement (translateY, opacity fade, horizontal drift)
- [x] 5.4: Implement responsive particle count (10-15 mobile, 15-20 desktop) - target 60fps on all devices
- [x] 5.5: Add `prefers-reduced-motion` detection (disable particles if true)
- [x] 5.6: Integrate ParticleEffect into StoryScene.tsx with type selection per scene
- [x] 5.7: Add `particleType` property to Scene interface in storyData.ts

## Task 6: Visual Enhancement - Micro-Animations (6 tasks)

- [x] 6.1: Update choice button hover effects in StoryScene.tsx (scale 1.02, shadow increase)
- [x] 6.2: Add choice button press animation (scale 0.98, color shift)
- [x] 6.3: Implement choice selection animation (fade out non-selected, slide selected up)
- [x] 6.4: Add scene transition animations (exit left, enter right, < 300ms for smooth UX)
- [x] 6.5: Implement background crossfade during scene transitions (gradient opacity transition)
- [x] 6.6: Add motion accessibility check (disable/reduce animations if prefers-reduced-motion)

## Task 7: Content Expansion - New Scene Writing (9 tasks - Mid-Journey Focus)

- [x] 7.1: Write Scene A2_5 (mid-journey, vulnerability focus) with 2 choices, ±1 scores [Path A: 8 scenes]
- [x] 7.2: Write Scene A3_5 (mid-journey, deeper reflection) with 2 choices, ±1 scores
- [x] 7.3: Write Scene A4_5 (mid-journey, consequence exploration) with 2 choices, ±1 scores
- [x] 7.4: Write Scene B1_5 (mid-journey, nostalgia focus) with 2 choices, ±1 scores [Path B: 9 scenes]
- [x] 7.5: Write Scene B2_5 (mid-journey, deeper reflection) with 2 choices, ±1 scores
- [x] 7.6: Write Scene B3_5 (mid-journey, friend perspective) with 2 choices, ±1 scores
- [x] 7.7: Write Scene B4_5 (mid-journey, text response) with 2 choices, ±1 scores
- [x] 7.8: Write Scene C2_5 (mid-journey, self-care focus) with 2 choices, ±1 scores [Path C: 7 scenes]
- [x] 7.9: Write Scene C3_5 (mid-journey, mirror reflection) with 2 choices, ±1 scores

## Task 8: Content Expansion - Scene Integration (8 tasks)

- [x] 8.1: Add new scenes to STORY_DATA in storyData.ts with proper IDs (8 scenes Path A, 9 Path B, 7 Path C = 24 total scenes)
- [x] 8.2: Update scene navigation logic to support variable scene counts per path
- [x] 8.3: Assign background themes to all 9 new mid-journey scenes (3 Path A, 4 Path B, 2 Path C)
- [x] 8.4: Assign particle types to all 9 new scenes (hearts/sparkles/bubbles based on emotional tone)
- [x] 8.5: Add Unsplash illustration URLs for new scenes (9 images matching emotional themes)
- [x] 8.6: Verify dimensional score balance remains within -6 to +6 range (existing ending thresholds)
- [x] 8.7: Update scene progression logic in App.tsx to handle variable scene counts (7-9 per path)
- [x] 8.8: Link path-based audio theme to each path (no per-scene audio assignment needed)

## Task 9: Landing & Opening Question Enhancement (4 tasks)

- [x] 9.1: Update RelationshipSelection.tsx heading text to "What kind of Valentine's morning rises inside your heart today?"
- [x] 9.2: Update RelationshipSelection background from bg-gray-50 to animated gradient (WARM theme with subtle 30-60s shift)
- [x] 9.3: Enhance card option styling with subtle hover animations (scale 1.02, respecting prefers-reduced-motion)
- [x] 9.4: Update card option microcopy to better match thematic tone and Valentine's Day context

## Task 10: Testing & Validation (12 tasks)

- [ ] 10.1: Manual playthrough of all 3 paths (A: 8 scenes, B: 9 scenes, C: 7 scenes)
- [ ] 10.2: Verify path-based audio works correctly (Path A: hopeful, Path B: reflective, Path C: melancholic)
- [ ] 10.3: Test audio controls (mute/unmute, volume, persistence across scenes, default playing behavior)
- [ ] 10.4: Test audio consent flow (opt-in, default playing after consent, localStorage persistence)
- [ ] 10.5: Validate animated backgrounds display correctly on various screen sizes (30-60s subtle gradients)
- [ ] 10.6: Test particle effects on desktop and mobile (10-20 particles max, 60fps target)
- [ ] 10.7: Verify micro-animations (choice hover, selection, scene transitions < 300ms)
- [ ] 10.8: Test reduced motion preference (animations disabled/reduced when enabled)
- [ ] 10.9: Run Score Balance Tool to validate ending reachability with new scenes
- [ ] 10.10: Verify ending distribution remains balanced (no ending > 30%)
- [ ] 10.11: Test secret endings (E15, E16) still achievable with expanded scoring
- [ ] 10.12: Performance testing: Lighthouse audit (target 90+ score), FPS monitoring, < 3s initial load on 4G

## Task 11: Accessibility & Mobile Testing (8 tasks)

- [ ] 11.1: Test with screen reader (VoiceOver/NVDA) - verify audio controls announced, proper ARIA labels
- [ ] 11.2: Test keyboard navigation (Tab, Enter, Space) through all interactions
- [ ] 11.3: Verify focus indicators visible for audio controls and choice buttons (no animation interference)
- [ ] 11.4: Test `prefers-reduced-motion` behavior (animations disabled/reduced, instant cuts)
- [ ] 11.5: Test audio on iOS Safari (autoplay policy after consent, default playing behavior)
- [ ] 11.6: Test audio on Android Chrome (compatibility, performance, default playing)
- [ ] 11.7: Verify mobile particle count reduction (10-15 mobile vs 15-20 desktop, 60fps target)
- [ ] 11.8: Test mobile gradient performance (45fps+ on mid-range devices, 60fps on modern devices)

## Task 12: Documentation (6 tasks)

- [x] 12.1: Update README.md with new scene counts (Path A: 8, Path B: 9, Path C: 7, ~7-10 minutes)
- [x] 12.2: Document audio system in code comments (audioManager.ts, path-based theme selection)
- [x] 12.3: Update openspec/project.md with audio system, visual enhancements
- [x] 12.4: Add Epidemic Sound license info to README or ATTRIBUTIONS.md (licensing required)
- [x] 12.5: Update SCORE_ASSIGNMENT_STRATEGY.md with scoring adjustments (E10, E14, E9 fixes)
- [x] 12.6: Update PRIVACY.md with audio data collection details (if any analytics events)

## Summary

- **Total Tasks**: 90
- **Completed**: 75 tasks (83%) (Tasks 1-9, 12 fully complete - all implementation and documentation done!)
- **Current Phase**: Testing & Validation (Tasks 10-11)
- **Remaining**: 15 tasks (Task 10: 12 tasks, Task 11: 8 tasks - Testing only)
- **Estimated Effort**: 4-6 hours for comprehensive testing
- **Scene Counts**: Path A (8 scenes), Path B (9 scenes), Path C (7 scenes) = 24 total scenes ✅
- **Audio Strategy**: Path-based (one theme per journey) ✅ COMPLETE - all tracks deployed
- **Visual Strategy**: Subtle gradient shifts (30-60s), light particles (10-20 max), < 300ms transitions ✅ COMPLETE
- **Critical Path**: Tasks 1-9 ✅ COMPLETE → Task 12 ✅ COMPLETE → Task 10 & 11 📋 TESTING PHASE
- **Parallelizable**: Tasks 4, 5, 6 (visual enhancements) ✅ COMPLETE
- **High Risk**: Task 8 (scene integration impacts scoring system) ✅ COMPLETE
- **Validation Gate**: Task 10 & 11 must pass before deployment

## Additional Work Completed

- **Audio System - FULLY COMPLETE!** (21/21 tasks ✅):
  - ✅ AudioManager with fade-in/fade-out, Web Audio API integration
  - ✅ AudioControls component with mute/unmute toggle
  - ✅ Path-based theme mapping (A: hopeful, B: reflective, C: melancholic)
  - ✅ Progressive loading after path selection
  - ✅ localStorage persistence for audio preferences
  - ✅ Audio consent flow integrated with analytics
  - ✅ Analytics tracking for audio interactions
  - ✅ Epidemic Sound license secured (2026-02-14)
  - ✅ 3 audio tracks sourced, optimized, and deployed (2026-02-14)
  - 🎵 Files: path-a-hopeful.mp3, path-b-reflective.mp3, path-c-melancholic.mp3
- **Scoring Engine Adjustments**:
  - E10 (Mirror Seeker): Increased honesty requirement from >= 1 to >= 2 to reduce Path A frequency
  - E14 (Shadow Holder): Enhanced to require 3+ negative dimensions instead of just hope <= -1
  - E9 (Growing Soul): Lowered action requirement to >= 1 and adjusted E4 to prevent interception
  - Added compassion boost to Path A scene A4_5 for better E9 reachability
- **ShareCard Enhancement**:
  - Implemented html2canvas save-as-image functionality with foreignObjectRendering
  - Added download button with automatic PNG generation
  - Fixed oklch color parsing issues

## Dependencies

- **Task 2** depends on Task 1 (audio manager must exist before controls, Epidemic Sound license secured)
- **Task 3** depends on Task 1, 2 (consent requires audio system)
- **Task 8** depends on Task 7 (can't integrate unwritten scenes)
- **Task 9** can run parallel to Tasks 4-6 (visual enhancement tasks)
- **Task 10** depends on all previous tasks (validation happens last)
- **Task 11** can run parallel to Task 10 (separate testing tracks)
- **Task 12** depends on completed implementation (document what exists)
- **Note**: Task 2.1 (securing Epidemic Sound license) is a prerequisite for production deployment
