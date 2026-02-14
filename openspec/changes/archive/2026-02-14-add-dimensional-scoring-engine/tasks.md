# Implementation Tasks

## 1. Foundation - Scoring Engine (Core Logic)

- [x] 1.1 Create `src/lib/scoringEngine.ts` with TypeScript interfaces for dimensions and rules
- [x] 1.2 Implement `initializeScores()` function returning initial score object
- [x] 1.3 Implement `applyChoiceScore()` function to accumulate dimensional scores
- [x] 1.4 Implement `evaluateEnding()` function with priority-based condition matching
- [x] 1.5 Add helper `checkCondition()` to evaluate individual ending rules
- [x] 1.6 Add special logic for secret ending conditions (E15, E16)
- [x] 1.7 Add fallback to E14 if no ending matches
- [x] 1.8 Write unit tests for scoring engine (all conditions, edge cases)

## 2. Data Structure Updates

- [x] 2.1 Update `Choice` interface in `storyData.ts` to include `scores?: DimensionScores`
- [x] 2.2 Apply score values to Path A choices (see design.md Score Assignment Table)
- [x] 2.3 Apply score values to Path B choices (see design.md Score Assignment Table)
- [x] 2.4 Apply score values to Path C choices (see design.md Score Assignment Table)
- [x] 2.5 Remove `END_*` scene entries from `STORY_DATA`
- [x] 2.6 Define initial scores: Path A `{hope:+1, honesty:+1}`, Path B `{hope:-1, selfWorth:-1}`, Path C `{selfWorth:+1, action:-1}`

## 3. New Ending Definitions

- [x] 3.1 Add E9 "The Growing Soul" to `resultData.ts`
- [x] 3.2 Add E10 "The Mirror Seeker" to `resultData.ts`
- [x] 3.3 Add E11 "The Forgiver" to `resultData.ts`
- [x] 3.4 Add E12 "The Passionate Wanderer" to `resultData.ts`
- [x] 3.5 Add E13 "The Peaceful One" to `resultData.ts`
- [x] 3.6 Add E14 "The Shadow Holder" to `resultData.ts`
- [x] 3.7 Add E15 "The Unnamed Heart" (secret) to `resultData.ts`
- [x] 3.8 Add E16 "The Heart Between Worlds" (secret) to `resultData.ts`
- [x] 3.9 Update existing ending keys (E1-E8) to match new IDs if needed

## 4. App Integration

- [x] 4.1 Add dimensional score state to `App.tsx`
- [x] 4.2 Initialize scores in `handleRelationshipSelect()` based on path
- [x] 4.3 Update `handleSceneChoice()` to apply choice scores using scoring engine
- [x] 4.4 Replace ending detection logic with `evaluateEnding()` call
- [x] 4.5 Update ending flow to use computed ending ID instead of scene result
- [x] 4.6 Ensure restart flow resets scores properly

## 5. Subtle Score Feedback UI

- [x] 5.1 Create text phrase mappings for each dimension (6 phrases for positive/negative leanings)
- [x] 5.2 Implement midpoint detection in `App.tsx` (when entering scene 3)
- [x] 5.3 Add logic to determine dominant dimension from current scores
- [x] 5.4 Create feedback overlay component for displaying text phrase
- [x] 5.5 Add 3-5 second display with gentle fade animation
- [x] 5.6 Test feedback appears correctly at scene 3 for all paths
- [x] 5.7 Ensure feedback doesn't interfere with scene content
- [ ] 5.8 Test across different screen sizes and devices

## 6. Validation & Testing

- [ ] 6.1 Verify Path A reaches: E1, E2, E3, E9, E10, E11, E13, E15
- [ ] 6.2 Verify Path B reaches: E4, E5, E7, E8, E10, E11, E12, E14, E15
- [ ] 6.3 Verify Path C reaches: E6, E7, E8, E9, E11, E13, E14, E15
- [ ] 6.4 Test secret ending E15 (all dimensions ∈[-1,1]) with balanced choices
- [ ] 6.5 Test secret ending E16 (high contrast) with polarized choice pattern
- [ ] 6.6 Confirm fallback to E14 works if no condition matches (edge case testing)
- [x] 6.7 Test restart flow completely resets dimensional scores
- [x] 6.8 Verify no TypeScript errors or warnings
- [x] 6.9 Performance test - ensure scoring calculations complete in <10ms
- [ ] 6.10 Cross-browser testing (Chrome, Safari, Firefox)
- [ ] 6.11 Mobile device testing (iOS Safari, Android Chrome)

## 7. Analytics Implementation (Google Analytics)

- [x] 7.1 Set up Google Analytics 4 property and obtain Measurement ID
- [x] 7.2 Create `src/lib/analytics.ts` with GA4 integration
- [x] 7.3 Implement gtag.js initialization with anonymize_ip
- [x] 7.4 Create `src/lib/analyticsConfig.ts` with GA4 configuration
- [x] 7.5 Implement event tracking methods (session, choice, ending events)
- [x] 7.6 Configure custom dimensions in GA4 for dimensional scores
- [x] 7.7 Create `src/app/components/ConsentDialog.tsx` component
- [x] 7.8 Add consent dialog to Landing screen (before Begin button)
- [x] 7.9 Implement consent grant/deny with localStorage persistence
- [x] 7.10 Add analytics calls to App.tsx (session start, ending reached)
- [x] 7.11 Add analytics calls to choice handling (track each choice made)
- [x] 7.12 Test analytics with GA4 DebugView
- [x] 7.13 Verify consent flow works correctly (accept/decline scenarios)
- [x] 7.14 Add settings option to revoke consent after initial choice

## 8. User Feedback Collection

- [x] 8.1 Create simple feedback section in `Ending.tsx` component
- [x] 8.2 Add single text area for overall experience feedback (500-character limit)
- [x] 8.3 Add placeholder text: "How was your experience with this story?"
- [x] 8.4 Add "Submit Feedback" and "Skip" buttons
- [x] 8.5 Style feedback section to match app aesthetic with emotional tone
- [x] 8.6 Position feedback section between ending card and Buy Me a Coffee button
- [x] 8.7 Add `trackFeedback()` method to analytics.ts for GA4 integration (with optional text parameter)
- [x] 8.8 Store feedback in localStorage with timestamp and ending ID
- [x] 8.9 Handle feedback submission with explicit text consent (Option 2 implemented)
- [x] 8.10 Add success message after feedback submission
- [ ] 8.11 Verify feedback is accessible (keyboard nav, screen readers)
- [ ] 8.12 Test feedback flow on all endings (E1-E16)
- [ ] 8.13 Test skip functionality - ensure users can easily bypass

## 9. Buy Me a Coffee Widget Integration

- [x] 9.1 Add Buy Me a Coffee button to Ending.tsx screen
- [x] 9.2 Style button with brand color (#FF5F5F) and coffee icon
- [x] 9.3 Add supportive message about adding names to recognition list
- [x] 9.4 Position after Share/Restart buttons with visual separator
- [x] 9.5 Test button appears correctly on all screens (desktop and mobile)
- [x] 9.6 Verify button doesn't interfere with ending card content
- [x] 9.7 Test button functionality (clicking opens Buy Me a Coffee page in new tab)
- [x] 9.8 Add analytics tracking for button clicks (trackCoffeeClicked implemented)
- [x] 9.9 Test across different browsers (Chrome, Safari, Firefox)
- [x] 9.10 Verify button is accessible (keyboard nav, screen readers)on is accessible (keyboard nav, screen readers)

## 10. Score Balance Tool (Development)

- [x] 10.1 Create `src/dev/ScoreBalanceTool.tsx` component skeleton
- [x] 10.2 Implement interactive path builder UI
- [x] 10.3 Add real-time score visualization (bar chart or radar chart)
- [x] 10.4 Build ending coverage report with checkboxes
- [x] 10.5 Implement exhaustive path analysis algorithm
- [x] 10.6 Add export/import functionality for test cases
- [x] 10.7 Create dev mode access via URL flag `?dev=scoring`
- [x] 10.8 Style tool with Tailwind to match app aesthetic
- [x] 10.9 Add Analytics tab showing aggregated metrics from localStorage
- [x] 10.10 Test tool with all paths and verify ending reachability
- [x] 10.11 Document tool usage in code comments

## 11. Documentation

- [x] 11.1 Document scoring engine API in code comments
- [x] 11.2 Update project.md with new scoring system and analytics details
- [x] 11.3 Create score assignment strategy document for future content updates
- [x] 11.4 Add README section on ending distribution and mechanics
- [x] 11.5 Document Score Balance Tool usage for future developers
- [x] 11.6 Document analytics privacy approach and data collected
- [x] 11.7 Add analytics opt-out instructions to user-facing documentation
- [x] 11.8 Document user feedback collection and privacy handling
- [x] 11.9 Document Buy Me a Coffee widget setup and customization

## Dependencies

- Task 2 depends on Task 1 (need interfaces defined)
- Task 4 depends on Tasks 1, 2, 3 (need engine and data ready)
- Task 5 can be done in parallel with Task 4.1-4.4
- Task 6 depends on all previous tasks
- Task 7 (Analytics) can be done in parallel with Tasks 1-5
- Task 7 integrates with Task 4 (App.tsx) for event tracking
- Task 8 (User Feedback) depends on Task 7 (analytics integration)
- Task 8 integrates with Ending.tsx and analytics.ts
- Task 9 (Buy Me a Coffee Widget) is independent and can be added anytime
- Task 9 requires no backend setup (uses third-party widget)
- Task 10 (Score Balance Tool) depends on Tasks 1, 2, 7 (need engine, data, and analytics)
- Task 10 can be done in parallel with Tasks 4-5
- Task 11 (Documentation) depends on all previous tasks

## Notes

- **Score Balancing**: After implementing, may need iteration to ensure all endings are achievable and distributed reasonably
- **Content Auth**: Original story text and scenes remain unchanged; only choice metadata changes
- **Visual Design**: UI hints should match existing design system (Tailwind classes, color palette)
