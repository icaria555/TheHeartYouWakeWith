# story-navigation Spec Delta

## MODIFIED Requirements

### Requirement: Score-Based Scene Flow

The system SHALL determine story progression based on accumulated dimensional scores rather than fixed paths, **with deliberate pacing between transitions**.

#### Scenario: Navigate to next scene with transition delay

- **WHEN** user makes a choice in a non-ending scene
- **THEN** dimensional scores SHALL be updated with the choice's impacts
- **AND** a brief acknowledgment delay (300ms) SHALL occur before scene transition
- **AND** current scene SHALL fade out over 400-500ms
- **AND** the next scene SHALL be determined by the choice's nextSceneId
- **AND** new scene SHALL fade in over 500ms with staggered content reveal
- **AND** total transition time SHALL be 1.0-1.5 seconds from click to new scene fully visible
- **AND** scene navigation SHALL remain deterministic (same choice always leads to same scene)

#### Scenario: Transition timing respects reduced motion preference

- **WHEN** user has enabled `prefers-reduced-motion` in their operating system
- **THEN** scene transitions SHALL use minimal durations (150ms or instant)
- **AND** all fade animations SHALL be reduced or removed
- **AND** content SHALL still appear in correct order (no visual jumps)

#### Scenario: Prevent interaction during transition

- **WHEN** scene transition is in progress
- **THEN** choice buttons SHALL be disabled
- **AND** pointer events SHALL be blocked on interactive elements
- **AND** double-clicking a choice SHALL NOT trigger multiple transitions
- **AND** application state SHALL remain consistent

#### Scenario: Smooth exit animation

- **WHEN** user clicks a choice
- **THEN** current scene SHALL begin fading out
- **AND** fade-out SHALL complete before new scene begins appearing
- **AND** no content overlap SHALL occur between old and new scenes

#### Scenario: Staggered entry animation

- **WHEN** new scene appears
- **THEN** scene text SHALL fade in first (over 300ms)
- **AND** choice buttons SHALL appear 200ms after text begins
- **AND** all elements SHALL reach full opacity by 500ms
- **AND** stagger SHALL create sense of deliberate reveal

---

## Implementation Notes

### Animation Timing Breakdown

```
User clicks choice
  ↓ 0ms: Choice feedback (existing hover/press animation)
  ↓ 300ms: Begin scene fade-out
  ↓ 700ms: Scene fade-out complete, update state
  ↓ 700ms: Begin new scene fade-in
  ↓ 700-900ms: Text appears
  ↓ 900-1200ms: Choices appear staggered
  ↓ 1200ms: Transition complete, interaction enabled
```

### Code Patterns

- Use `setTimeout` in `handleSceneChoice` for initial delay
- Use Framer Motion `AnimatePresence` for exit animations
- Use `isTransitioning` flag to disable interactions during transitions
- Check `window.matchMedia('(prefers-reduced-motion: reduce)')` for accessibility

### Edge Cases

- Rapid clicking: Prevent with `isTransitioning` flag
- Browser back button: Not applicable (SPA with no routing)
- Network latency: Not applicable (all content is client-side)
- React strict mode double-mounting: Use cleanup in useEffect for setTimeout
