# Proposal: Improve Scene Transition Pacing

## Problem

Currently, when users click a choice answer, the next scene appears immediately with no transition delay. This creates a rushed experience where:

- Users don't have time to process their choice
- The narrative flow feels abrupt and hurried
- There's no visual/temporal breathing room between scenes
- The instant transition reduces the impact of meaningful choices

User feedback: "when user click answer and the next question show is too quick I want to slow it down a little bit"

## Solution

Introduce deliberate pacing to scene transitions by adding:

1. **Choice feedback delay** - Brief pause (300-500ms) after clicking to acknowledge the selection
2. **Scene exit animation** - Fade-out current scene (400-600ms)
3. **Scene entry animation** - Fade-in new scene (400-600ms) with staggered content reveal
4. **Total transition time** - ~1-1.5 seconds between click and new scene fully visible

This creates a more contemplative, intentional narrative rhythm while staying under 2 seconds (avoiding feeling slow/laggy).

## Scope

### In Scope

- Add configurable transition timing to scene navigation flow
- Implement fade-out animation for current scene after choice selection
- Implement fade-in animation for incoming scene
- Stagger animation of new scene elements (text, then choices)
- Respect `prefers-reduced-motion` for accessibility (instant or minimal transitions)

### Out of Scope

- Changing existing animation durations for individual UI elements (buttons, particles, backgrounds)
- Adding complex transition effects (slide, zoom, etc.) - keeping it simple with fades
- Modifying midpoint feedback timing
- Adding loading states or progress indicators
- User-customizable transition speeds

## Impact

### User Experience

- **Positive**: More thoughtful, reflective pacing that matches the emotional tone
- **Positive**: Users have time to process their choices
- **Positive**: Creates a more polished, intentional feeling
- **Potential Concern**: Could feel slightly slower for users who read very quickly
  - **Mitigation**: Keep total transition under 1.5s to avoid feeling sluggish

### Technical

- **Low complexity**: Adds setTimeout delay to handleSceneChoice and enhances existing Framer Motion animations
- **No breaking changes**: Pure enhancement to existing navigation system
- **Performance**: Negligible impact - just adding short delays and animations

### Content

- **No impact**: No changes to story data, scenes, or choices

## Dependencies

- Requires: Framer Motion (already integrated)
- Relates to: `story-navigation` spec (scene transition behavior)
- Relates to: `enrich-story-experience` change (visual enhancements)

## Alternatives Considered

### 1. User-configurable speed

- **Pros**: Users could choose their preferred pacing
- **Cons**: Adds UI complexity, most users won't change defaults, overkill for the problem
- **Decision**: Rejected - Pick one good default timing

### 2. Slide transitions instead of fades

- **Pros**: More dynamic visual effect
- **Cons**: Directional movement implies navigation metaphor (forward/back), doesn't fit contemplative tone
- **Decision**: Rejected - Fades are more gentle and meditative

### 3. Longer transitions (2-3s)

- **Pros**: Even more reflective pacing
- **Cons**: Crosses into "slow" territory, could annoy users on repeated playthroughs
- **Decision**: Rejected - 1-1.5s hits the sweet spot

## Success Criteria

- Total transition time from click to new scene visible: 1-1.5 seconds
- Transition feels smooth and intentional, not laggy
- No jarring visual jumps
- Animations respect `prefers-reduced-motion`
- User feedback confirms improved pacing without feeling slow

## Open Questions

None - straightforward UX enhancement with clear implementation path.
