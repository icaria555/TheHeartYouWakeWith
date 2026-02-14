# Change: Add Dimensional Scoring Engine with 16 Endings

## Why

The current branching narrative with 9 hardcoded endings limits the depth and personalization of the emotional journey. Users follow predetermined paths (A/B/C) that lead to predictable outcomes based on simple binary choices.

A dimensional scoring system enables:

- More nuanced emotional profiling across 6 dimensions (honesty, vulnerability, hope, selfWorth, action, compassion)
- 16 unique endings (14 standard + 2 secret) that better reflect the complexity of human emotions
- Replayability through non-obvious outcome determination
- Subtle user agency where every choice contributes meaningfully to the final result

This change transforms the experience from a "choose your path" branching story into a psychological profile generator where the cumulative weight of choices reveals the user's emotional patterns.

## What Changes

- **Replace hardcoded path-based endings** with a priority-based ending matcher that evaluates dimensional score conditions
- **Add scoring engine** that accumulates dimensional scores (+/- values) from choices throughout the journey
- **Expand from 9 to 16 endings** including:
  - 7 new standard endings (E9-E14)
  - 2 secret endings (E15-E16) with special mathematical conditions
- **Modify choice data structure** to include dimensional score impacts (e.g., `{ honesty: +2, vulnerability: +1 }`)
- **Add subtle score feedback UI** showing dimensional hints without exact numbers
- **Update relationship selection** to set initial dimensional scores rather than determine path
- **Create ending evaluation algorithm** that checks conditions in priority order
- **Build score balance tool** for development/debugging to visualize score distributions and validate ending reachability
- **Implement analytics tracking** using Google Analytics to capture ending distribution, score patterns, choice frequencies, and completion metrics
- **Add consent dialog** at the beginning of the journey to request analytics permission before tracking begins
- **Add user feedback collection** at the ending card with a simple text area and explicit text-sharing consent checkbox to gather open-ended feedback (text sent to GA4 only with user permission, truncated to 100 chars for GA4 limits)
- **Add Buy Me a Coffee button** to allow users to support the creator (simple external link, no backend required)

### Score Balance Summary

✅ **All 16 endings validated as achievable**

- Path A can reach: 8 endings (E1, E2, E3, E9, E10, E11, E13, E15)
- Path B can reach: 9 endings (E4, E5, E7, E8, E10, E11, E12, E14, E15)
- Path C can reach: 8 endings (E6, E7, E8, E9, E11, E13, E14, E15)
- Secret endings (E15, E16) achievable with specific choice patterns
- Score ranges: -6 to +6 per dimension (typical play)
- Pivotal moments use ±2, moderate choices use ±1

See [design.md](design.md) "Score Assignment Table" section for complete mappings.

### Breaking Changes

- **BREAKING**: `Choice` interface changes from `{ label, nextSceneId }` to `{ label, nextSceneId, scores }`
- **BREAKING**: Scene navigation logic changes from linear path-following to score-based ending determination
- **BREAKING**: Ending IDs change from descriptive names (e.g., "The Brave Heart") to code-based IDs (E1-E16)
- **BREAKING**: `STORY_DATA` structure changes - ending scenes no longer contain `result` field; results determined dynamically

## Impact

### Affected Capabilities

- `narrative-engine` (new) - Dimensional scoring system
- `story-navigation` (modified) - From path-based to score-based
- `ending-determination` (modified) - From hardcoded to rule-based evaluation
- `user-feedback` (new) - Subtle dimensional hints UI
- `ending-feedback` (new) - Post-experience feedback collection
- `monetization` (new) - Optional donation via Buy Me a Coffee widget
- `dev-tools` (new) - Score Balance Tool for development and testing
- `analytics` (new) - Event tracking and metrics collection

### Affected Code

- `src/app/App.tsx` - Add score state, scoring logic, ending evaluation, analytics tracking
- `src/app/data/storyData.ts` - Add scores to all choices, restructure ending data
- `src/app/data/resultData.ts` - Add 7 new ending definitions
- `src/lib/scoringEngine.ts` (new) - Scoring calculation and ending matcher
- `src/app/screens/StoryScene.tsx` (modified) - Enhanced choice buttons with animations
- `src/app/screens/RelationshipSelection.tsx` (possible) - Map selections to initial scores
- `src/dev/ScoreBalanceTool.tsx` (new) - Development tool for score visualization and validation
- `src/lib/analytics.ts` (new) - Google Analytics integration and event tracking
- `src/lib/analyticsConfig.ts` (new) - Google Analytics configuration and privacy settings
- `src/app/components/ConsentDialog.tsx` (new) - Consent dialog component for analytics permission
- `src/app/screens/Landing.tsx` (modified) - Add consent dialog on first visit
- `src/app/screens/Ending.tsx` (modified) - Add simple feedback text area, Buy Me a Coffee button, analytics tracking
- `index.html` (modified) - Add Google Analytics gtag.js script with measurement ID G-0TL6RM3JRG

### Migration Path

1. Existing `STORY_DATA` must be updated with score values for every choice
2. New endings (E9-E16) require result data (title, reflection, closing, visual styling)
3. Ending IDs in `RESULT_DATA` must align with new E1-E16 naming scheme
4. Remove hardcoded `END_*` scene IDs; endings become computed results

### User-Visible Changes

- Same story content and visuals initially
- Subtle visual/textual hints showing dimensional themes during choices
- Different ending distribution (more variety, less predictable outcomes)
- Potential for discovering secret endings on replay

## Open Questions

1. ~~**Score Assignment Strategy**: What should be the score values for each existing choice?~~
   - ✅ **RESOLVED**: Detailed score assignments defined in `design.md` with balanced distribution
   - See "Score Assignment Table" section for complete mappings
   - Uses ±1 for moderate choices, ±2 for pivotal moments
   - All 16 endings validated as achievable

2. ~~**Score Visibility Design**: How to show "subtle hints" - color accents? Icons? Text phrases?~~
   - ✅ **RESOLVED**: Text phrases only, appearing at the halfway point in the journey
   - Brief evocative phrases that reflect dimensional themes
   - Displayed after scene 3 (midpoint) to give users reflection without spoiling early choices

3. ~~**Initial Score Calibration**: What scores should each relationship path (A/B/C) start with?~~
   - ✅ **RESOLVED**:
     - Path A: `{ hope: +1, honesty: +1 }` (optimistic)
     - Path B: `{ hope: -1, selfWorth: -1 }` (uncertain)
     - Path C: `{ selfWorth: +1, action: -1 }` (independent)

4. ~~**Testing Coverage**: How to ensure all 16 endings are reachable and balanced?~~
   - ✅ **RESOLVED**: Score ranges validated in design.md
   - Manual testing paths documented per ending
   - Automated testing deferred to post-MVP

5. ~~**Score Balance Tool**: Should we create a dev tool to visualize score distributions?~~
   - ✅ **RESOLVED**: Yes, included in implementation scope
   - Development-only tool for testing and validation
   - See design.md "Score Balance Tool" section

6. ~~**Analytics**: Should we track which endings users reach for balance tuning?~~
   - ✅ **RESOLVED**: Yes, included in implementation scope
   - Client-side event tracking with privacy-first approach
   - See design.md "Analytics" section for details
