# Tasks: Improve Scene Transition Pacing

## Implementation Tasks

### Task 1: Add Transition Delay to Choice Handler (2 tasks)

- [ ] 1.1: Add state flag `isTransitioning` to App.tsx to prevent double-clicks during transition
- [ ] 1.2: Modify `handleSceneChoice` to add 300ms delay before updating `step` state using setTimeout

**Validation**: Click a choice, verify 300ms pause before scene changes

---

### Task 2: Enhance StoryScene Exit Animation (3 tasks)

- [ ] 2.1: Wrap StoryScene component with AnimatePresence in App.tsx
- [ ] 2.2: Add exit animations to StoryScene: fade opacity from 1→0 over 400ms
- [ ] 2.3: Add exit animations for scene content container with slight translateY (0→-10px)

**Validation**: Observe smooth fade-out when transitioning between scenes

---

### Task 3: Enhance StoryScene Entry Animation (3 tasks)

- [ ] 3.1: Update StoryScene initial animation: start opacity at 0, translateY at 10px
- [ ] 3.2: Animate to opacity 1, translateY 0 over 500ms with easeOut
- [ ] 3.3: Stagger text and choice animations: text appears first, choices 200ms later

**Validation**: New scenes fade in smoothly with staggered content reveal

---

### Task 4: Accessibility - Reduced Motion Support (2 tasks)

- [ ] 4.1: Check `prefers-reduced-motion` in App.tsx transition logic
- [ ] 4.2: When reduced motion enabled: reduce all transition durations to 150ms or instant

**Validation**: Enable reduced motion in OS, verify transitions are minimal/instant

---

### Task 5: Prevent Interaction During Transition (2 tasks)

- [ ] 5.1: Disable choice buttons when `isTransitioning` is true
- [ ] 5.2: Add `pointer-events-none` class to choices during transition

**Validation**: Rapid clicking on choices doesn't cause multiple transitions

---

### Task 6: Testing & Validation (4 tasks)

- [ ] 6.1: Manual test: Play through all 3 paths, verify transition timing feels right
- [ ] 6.2: Test on mobile: Ensure transitions work smoothly on iOS Safari and Android Chrome
- [ ] 6.3: Test reduced motion: Verify accessibility compliance
- [ ] 6.4: Performance check: Verify no animation jank, stable 60fps during transitions

**Validation**: Smooth experience across devices and accessibility settings

---

## Summary

- **Total Tasks**: 16
- **Estimated Effort**: 3-4 hours
- **Risk Level**: Low (pure enhancement, no breaking changes)
- **Dependencies**: None (uses existing Framer Motion integration)
- **Validation Gate**: Manual testing must confirm improved pacing without feeling slow
