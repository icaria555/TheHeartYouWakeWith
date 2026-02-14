# Implementation Tasks: Enrich Story Experience

## Task 1: Foundation - Audio System Infrastructure (11 tasks)

- [ ] 1.1: Create `src/lib/audioManager.ts` with AudioManager interface and implementation
- [ ] 1.2: Implement lazy loading for audio themes using HTML5 Audio API
- [ ] 1.3: Add crossfade logic (2-second fade-out/fade-in between themes)
- [ ] 1.4: Implement localStorage persistence for audio preferences (`audioPreference`)
- [ ] 1.5: Create AudioContext initialization with error handling (Safari, autoplay policies)
- [ ] 1.6: Add volume control methods (setVolume, mute, unmute)
- [ ] 1.7: Implement theme preloading strategy (load next theme during current scene)
- [ ] 1.8: Create `src/types/audio.ts` with AudioTheme, AudioPreference, AudioManager interfaces
- [ ] 1.9: Add audio state to App.tsx (currentTheme, audioPreference, audioManager instance)
- [ ] 1.10: Implement theme selection logic (scene-based default + score-driven overrides)
- [ ] 1.11: Add error handling for audio loading failures (network issues, unsupported formats)

## Task 2: Audio Assets & Controls UI (6 tasks)

- [ ] 2.1: Source 3 Creative Commons music tracks from Free Music Archive (hopeful, reflective, melancholic)
- [ ] 2.2: Optimize audio files (compress to 128kbps MP3, create OGG fallback)
- [ ] 2.3: Add audio files to `public/audio/` directory with naming convention
- [ ] 2.4: Create `src/app/components/AudioControls.tsx` component (mute/unmute toggle)
- [ ] 2.5: Style AudioControls component (floating button, top-right corner, icon + tooltip)
- [ ] 2.6: Integrate AudioControls into App.tsx layout (persistent across scenes)

## Task 3: Audio Consent & Analytics Integration (4 tasks)

- [ ] 3.1: Add audio consent option to Landing screen (checkbox + description)
- [ ] 3.2: Update consent dialog to include audio permission alongside analytics
- [ ] 3.3: Store audio consent in localStorage (`audioConsent`)
- [ ] 3.4: Add analytics event tracking for audio interactions (audio_enabled, audio_muted, audio_unmuted, theme_changed)

## Task 4: Visual Enhancement - Animated Backgrounds (8 tasks)

- [ ] 4.1: Create `src/styles/backgrounds.css` with gradient animation keyframes
- [ ] 4.2: Define 4 background themes (WARM, COOL, NEUTRAL, VIBRANT) with color palettes
- [ ] 4.3: Implement CSS gradient animations (20-30s loop, 400% background-size)
- [ ] 4.4: Create Tailwind CSS utilities for gradient themes (bg-gradient-warm, etc.)
- [ ] 4.5: Add `backgroundTheme` property to Scene interface in storyData.ts
- [ ] 4.6: Assign background themes to all existing 15 scenes (5 scenes × 3 paths)
- [ ] 4.7: Update StoryScene.tsx to apply dynamic background theme based on scene data
- [ ] 4.8: Add CSS transition for gradient changes between scenes (2s ease-in-out)

## Task 5: Visual Enhancement - Particle Effects (7 tasks)

- [ ] 5.1: Create `src/app/components/ParticleEffect.tsx` component
- [ ] 5.2: Implement 4 particle types (hearts, sparkles, bubbles, none)
- [ ] 5.3: Add CSS animations for particle movement (translateY, opacity fade, horizontal drift)
- [ ] 5.4: Implement responsive particle count (10-15 mobile, 20-30 desktop)
- [ ] 5.5: Add `prefers-reduced-motion` detection (disable particles if true)
- [ ] 5.6: Integrate ParticleEffect into StoryScene.tsx with type selection per scene
- [ ] 5.7: Add `particleType` property to Scene interface in storyData.ts

## Task 6: Visual Enhancement - Micro-Animations (6 tasks)

- [ ] 6.1: Update choice button hover effects in StoryScene.tsx (scale 1.02, shadow increase)
- [ ] 6.2: Add choice button press animation (scale 0.98, color shift)
- [ ] 6.3: Implement choice selection animation (fade out non-selected, slide selected up)
- [ ] 6.4: Add scene transition animations (exit left, enter right, 400ms)
- [ ] 6.5: Implement background crossfade during scene transitions (gradient opacity transition)
- [ ] 6.6: Add motion accessibility check (disable animations if prefers-reduced-motion)

## Task 7: Content Expansion - New Scene Writing (9 tasks)

- [ ] 7.1: Write Scene A2.5 (Path A post-setup reflection) with 2 choices, ±1 scores
- [ ] 7.2: Write Scene A3.5 (Path A tension aftermath) with 2 choices, ±1 scores
- [ ] 7.3: Write Scene A4.5 (Path A consequence exploration) with 2 choices, ±1 scores
- [ ] 7.4: Write Scene B2.5 (Path B post-setup reflection) with 2 choices, ±1 scores
- [ ] 7.5: Write Scene B3.5 (Path B tension aftermath) with 2 choices, ±1 scores
- [ ] 7.6: Write Scene B4.5 (Path B consequence exploration) with 2 choices, ±1 scores
- [ ] 7.7: Write Scene C2.5 (Path C post-setup reflection) with 2 choices, ±1 scores
- [ ] 7.8: Write Scene C3.5 (Path C tension aftermath) with 2 choices, ±1 scores
- [ ] 7.9: Write Scene C4.5 (Path C consequence exploration) with 2 choices, ±1 scores

## Task 8: Content Expansion - Scene Integration (9 tasks)

- [ ] 8.1: Add new scenes to STORY_DATA in storyData.ts with proper IDs
- [ ] 8.2: Update scene navigation logic (A2 → A2.5 → A3, etc.)
- [ ] 8.3: Assign background themes to all 9 new scenes
- [ ] 8.4: Assign particle types to all 9 new scenes  
- [ ] 8.5: Assign audio themes to all 9 new scenes (hopeful/reflective/melancholic)
- [ ] 8.6: Add Unsplash illustration URLs for new scenes (9 images)
- [ ] 8.7: Verify dimensional score balance (total range still -9 to +9 max)
- [ ] 8.8: Update scene progression logic in App.tsx to handle 8 scenes per path
- [ ] 8.9: Update midpoint feedback logic (ensure still triggers at scene 3, ~37% progress)

## Task 9: Opening Question Redesign (4 tasks)

- [ ] 9.1: Update RelationshipSelection.tsx heading text to "What kind of Valentine's morning rises inside your heart today?"
- [ ] 9.2: Update RelationshipSelection background from bg-gray-50 to animated gradient (WARM theme)
- [ ] 9.3: Enhance card option styling with subtle hover animations
- [ ] 9.4: Update card option microcopy to better match thematic tone

## Task 10: Testing & Validation (12 tasks)

- [ ] 10.1: Manual playthrough of all 3 paths (A, B, C) with new scenes
- [ ] 10.2: Verify audio theme transitions work correctly (hopeful ↔ reflective ↔ melancholic)
- [ ] 10.3: Test audio controls (mute/unmute, volume, persistence across scenes)
- [ ] 10.4: Test audio consent flow (opt-in, opt-out, localStorage persistence)
- [ ] 10.5: Validate animated backgrounds display correctly on various screen sizes
- [ ] 10.6: Test particle effects on desktop and mobile (count, performance, animations)
- [ ] 10.7: Verify micro-animations (choice hover, selection, scene transitions)
- [ ] 10.8: Test reduced motion preference (all animations disabled when enabled)
- [ ] 10.9: Run Score Balance Tool to validate ending reachability with new scenes
- [ ] 10.10: Verify ending distribution remains balanced (no ending > 30%)
- [ ] 10.11: Test secret endings (E15, E16) still achievable with expanded scoring  
- [ ] 10.12: Performance testing: Lighthouse audit (target 90+ score), FPS monitoring

## Task 11: Accessibility & Mobile Testing (8 tasks)

- [ ] 11.1: Test with screen reader (VoiceOver/NVDA) - verify audio controls announced
- [ ] 11.2: Test keyboard navigation (Tab, Enter, Space) through all interactions
- [ ] 11.3: Verify focus indicators visible for audio controls and choice buttons
- [ ] 11.4: Test `prefers-reduced-motion` behavior (animations disabled, instant cuts)
- [ ] 11.5: Test audio on iOS Safari (autoplay policy, user interaction requirement)
- [ ] 11.6: Test audio on Android Chrome (compatibility, performance)
- [ ] 11.7: Verify mobile particle count reduction (10-15 vs 20-30 desktop)
- [ ] 11.8: Test mobile gradient performance (60fps on iPhone 12, Samsung S21)

## Task 12: Documentation (6 tasks)

- [ ] 12.1: Update README.md with new scene count (8 scenes per path, ~7-10 minutes)
- [ ] 12.2: Document audio system in code comments (audioManager.ts)
- [ ] 12.3: Update openspec/project.md with audio system, visual enhancements
- [ ] 12.4: Add audio asset attribution to README or ATTRIBUTIONS.md (Free Music Archive)
- [ ] 12.5: Update SCORE_ASSIGNMENT_STRATEGY.md with new scene guidelines
- [ ] 12.6: Update PRIVACY.md with audio data collection details (if any analytics events)

## Summary

- **Total Tasks**: 90
- **Estimated Effort**: 3-4 weeks for full implementation
- **Critical Path**: Task 1 → Task 2 → Task 3 → Task 7 → Task 8 (audio + content expansion)
- **Parallelizable**: Tasks 4, 5, 6 (visual enhancements) can run parallel to Task 1-3
- **High Risk**: Task 8 (scene integration impacts scoring system)
- **Validation Gate**: Task 10 must pass before deployment

## Dependencies

- **Task 2** depends on Task 1 (audio manager must exist before controls)
- **Task 3** depends on Task 1, 2 (consent requires audio system)
- **Task 8** depends on Task 7 (can't integrate unwritten scenes)
- **Task 10** depends on all previous tasks (validation happens last)
- **Task 11** can run parallel to Task 10 (separate testing tracks)
- **Task 12** depends on completed implementation (document what exists)
