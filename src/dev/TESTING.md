# Score Balance Tool - Testing Guide

## Access the Tool

1. **Start dev server**: `npm run dev`
2. **Access URL**: `http://localhost:5174/?dev=scoring`
3. **Verify**: Tool should open as full-screen overlay with 4 tabs

## Test Plan

### 1. Interactive Builder Tab Testing

#### Path A (Relationship + Plans)

- [ ] Click "Path A" button
- [ ] Verify initial scores: hope +1, honesty +1
- [ ] Navigate through all scenes (A1 → A2 → A3 → A4 → A5...)
- [ ] Make different choices and observe score changes:
  - [ ] Positive scores show green bars
  - [ ] Negative scores show red bars
  - [ ] Neutral scores show gray bars
- [ ] Verify choice history displays correctly
- [ ] Reach an ending and verify ending ID/title appears
- [ ] Click "Reset" and verify path restarts from A1
- [ ] Click "Export" and verify JSON download

#### Path B (Relationship, No Plans)

- [ ] Select "Path B" button
- [ ] Verify initial scores: hope -1, selfWorth -1
- [ ] Navigate through scenes (B1 → B2 → B3 → B4 → B5)
- [ ] Test choices and verify score updates
- [ ] Reach different ending than Path A
- [ ] Verify export functionality

#### Path C (Single)

- [ ] Select "Path C" button
- [ ] Verify initial scores: selfWorth +1, action -1
- [ ] Navigate through scenes (C1 → C2 → C3 → C4 → C5)
- [ ] Test choices and verify score updates
- [ ] Reach different ending than Paths A & B
- [ ] Verify export functionality

#### Score Visualization

- [ ] All 6 dimensions visible: honesty, vulnerability, hope, selfWorth, action, compassion
- [ ] Bars update in real-time as choices are made
- [ ] Score values display correctly (e.g., +3, -2, 0)
- [ ] Bar width reflects score magnitude
- [ ] Center line (50%) visible in each bar

### 2. Ending Coverage Tab Testing

#### Run Analysis

- [ ] Click "Run Analysis" button
- [ ] Wait for analysis to complete (should be <10 seconds)
- [ ] Verify statistics dashboard shows:
  - [ ] Reachable Endings count (should be 16/16)
  - [ ] Most Common percentage (should be <30%)
  - [ ] Rare Endings count (<5% frequency)
  - [ ] Unreachable count (should be 0)

#### Ending Table

- [ ] All 16 endings listed (E1 through E16)
- [ ] Each ending shows:
  - [ ] Status: ✓ (reachable) or ✗ (unreachable)
  - [ ] Ending ID (E1-E16)
  - [ ] Ending title from RESULT_DATA
  - [ ] Frequency percentage
  - [ ] Visual bar showing distribution
- [ ] Color coding:
  - [ ] Green bar: <15% (good balance)
  - [ ] Yellow bar: 15-30% (acceptable)
  - [ ] Red bar: >30% (dominant, needs adjustment)

#### Expected Results

- [ ] All 16 endings should show ✓ (reachable)
- [ ] No ending should exceed 30% frequency
- [ ] Secret endings (E15, E16) should be <5%
- [ ] Distribution should be relatively even

### 3. Path Analysis Tab Testing

#### Score Ranges

- [ ] View current dimensional scores (if a path is active)
- [ ] Verify scores display correctly with +/- signs
- [ ] Color coding matches score values (green/red/gray)

#### Balance Warnings

- [ ] If any ending >30%: Warning should appear
- [ ] If any ending unreachable: Warning should appear
- [ ] If E15 or E16 >5%: Secret ending warning should appear
- [ ] If all balanced: Green "Balance Looks Good" message

#### Recommendations

- [ ] Four recommendation bullets visible
- [ ] Guidelines clear: <30% per ending, <5% secret, all reachable, -6 to +6 range

### 4. Analytics Tab Testing

#### Consent Status

- [ ] Open Settings in main app and set consent to "Enabled"
- [ ] Refresh tool page (?dev=scoring)
- [ ] Verify status shows "Enabled" with green checkmark ✓
- [ ] Open Settings and disable consent
- [ ] Refresh tool page
- [ ] Verify status shows "Disabled" with red ✗
- [ ] Open Settings and reset consent
- [ ] Refresh tool page
- [ ] Verify status shows "Not Set" with orange ?

#### Data Storage Section

- [ ] Google Analytics 4 mentioned
- [ ] Measurement ID shown: G-0TL6RM3JRG
- [ ] Privacy features listed (IP anonymization, no auto page views)
- [ ] Local storage key shown: analytics_consent

#### Tracked Events

- [ ] All 9 events listed:
  1. session_start
  2. path_selected
  3. choice_made
  4. midpoint_reached
  5. ending_reached
  6. feedback_submitted
  7. share_clicked
  8. restart_clicked
  9. coffee_clicked
- [ ] Each event shows description and parameters
- [ ] Event names use monospace font

#### Data Categories

- [ ] Four category cards visible:
  - [ ] User Journey Data (purple)
  - [ ] Dimensional Scores (blue)
  - [ ] Outcome Data (green)
  - [ ] User Feedback (orange)
- [ ] Each card lists relevant data points

#### Privacy & Compliance

- [ ] Six privacy checkmarks ✓ visible
- [ ] Consent, IP anonymization, PII, truncation mentioned
- [ ] All points factually accurate

#### Developer Notes

- [ ] GA4 dashboard access instructions
- [ ] Debug mode tip
- [ ] Testing guidance

### 5. UI/UX Testing

#### Layout & Styling

- [ ] Tool opens as full-screen overlay
- [ ] Purple gradient header with "Score Balance Tool" title
- [ ] Close button (X) in top-right of header
- [ ] Four tabs visible: Interactive Builder, Ending Coverage, Path Analysis, Analytics
- [ ] Active tab highlighted with purple underline
- [ ] Content area has minimum height (600px)
- [ ] Scrolling works if content exceeds viewport

#### Interactions

- [ ] Tab switching is instant and smooth
- [ ] Buttons have hover effects
- [ ] All buttons are clickable and responsive
- [ ] Modals/overlays close properly
- [ ] No console errors in browser DevTools

#### Responsive Design

- [ ] Test on desktop (1920x1080)
- [ ] Test on laptop (1366x768)
- [ ] Test on tablet (768x1024)
- [ ] Tool remains usable at all sizes
- [ ] Tables/grids adjust for smaller screens

### 6. Functional Testing

#### Export Functionality

- [ ] Click "Export" after completing a path
- [ ] Verify JSON file downloads with timestamp name
- [ ] Open JSON file and verify structure:
  ```json
  {
    "path": "A",
    "choices": [...],
    "scores": {...},
    "ending": "E1",
    "timestamp": "2026-02-14T..."
  }
  ```
- [ ] Verify all fields populated correctly

#### Path Simulation Accuracy

- [ ] Compare manual Interactive Builder results with analysis results
- [ ] Test same choice sequence multiple times - scores should be identical
- [ ] Verify ending evaluation matches expected conditions

#### Data Consistency

- [ ] Ending titles match RESULT_DATA
- [ ] Scene IDs match STORY_DATA
- [ ] Score deltas match choice definitions

### 7. Edge Cases & Error Handling

#### Empty States

- [ ] Open Coverage tab before running analysis - should show placeholder message
- [ ] Analysis tab without coverage data - should show appropriate UI

#### Rapid Interactions

- [ ] Click through scenes very quickly - no crashes
- [ ] Switch tabs rapidly - no rendering issues
- [ ] Run analysis multiple times in succession - results consistent

#### Close & Reopen

- [ ] Close tool (X button)
- [ ] Verify app returns to normal view
- [ ] Add ?dev=scoring back to URL
- [ ] Tool reopens cleanly

### 8. Integration Testing

#### Main App Interaction

- [ ] Open main app normally (without ?dev=scoring)
- [ ] Verify tool is NOT visible
- [ ] Complete a story path
- [ ] Add ?dev=scoring to URL
- [ ] Tool opens without affecting main app state

#### Analytics Integration

- [ ] Enable consent in Settings
- [ ] Open tool and verify Analytics tab shows "Enabled"
- [ ] Disable consent in Settings
- [ ] Refresh tool and verify status updated

#### Settings Dialog

- [ ] Open Settings from Landing page
- [ ] Modify consent status
- [ ] Open Score Balance Tool
- [ ] Verify Analytics tab reflects changes

## Acceptance Criteria

### ✅ All Tests Pass When:

1. All 16 endings are reachable (✓ in Coverage tab)
2. No ending exceeds 30% frequency
3. Secret endings (E15, E16) are <5% frequency
4. Interactive Builder accurately tracks scores
5. Export functionality produces valid JSON
6. Analytics tab correctly displays consent status
7. All tabs load without errors
8. UI is responsive and user-friendly
9. No console errors or warnings
10. Tool closes properly without affecting main app

### ⚠️ Known Limitations:

- Analysis uses sampling (16 combos per path), not full exhaustive (1,024)
- Cannot replay imported test cases (export-only currently)
- GA4 data not accessible from client-side tool
- Tool state resets on URL change

### 🐛 Report Issues:

If any test fails or unexpected behavior occurs:

1. Note the specific test case and steps to reproduce
2. Check browser console for errors
3. Verify STORY_DATA and scoringEngine are up to date
4. Consider updating choice scores or ending conditions
5. Re-run analysis after code changes

## Performance Benchmarks

- **Analysis Speed**: Should complete in 1-10 seconds
- **Tab Switching**: Instant (<100ms)
- **Path Simulation**: Real-time, no lag
- **File Export**: <1 second for JSON generation
- **Initial Load**: <2 seconds from URL access

## Browser Compatibility

Test in these browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Final Validation

Before merging Task 10:

- [ ] All acceptance criteria met
- [ ] No console errors
- [ ] All 16 endings confirmed reachable
- [ ] Documentation complete
- [ ] Code reviewed for best practices
- [ ] Build succeeds without warnings
