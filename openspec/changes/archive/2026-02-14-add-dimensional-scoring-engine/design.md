# Design Document: Dimensional Scoring Engine

## Context

The current system uses a branching narrative structure where users follow one of three paths (A, B, or C) based on their relationship status, and each path has hardcoded endings determined by specific scene choices. This creates 9 possible outcomes that are relatively predictable after the first playthrough.

The goal is to add depth, replayability, and more nuanced emotional profiling without changing the core story content. The dimensional scoring system is inspired by personality assessment tools that evaluate multiple axes simultaneously rather than following a single path.

**Stakeholders**: End users seeking emotional insight, content creators wanting to analyze ending distribution

**Constraints**:

- Client-side only (no backend persistence)
- Must maintain existing story content and visuals
- Performance must remain fast (no lag during choice application)
- Mobile-first design for score feedback

## Goals / Non-Goals

### Goals

- Replace binary path-following with multi-dimensional psychological profiling
- Enable 16 unique endings (14 standard + 2 secret) for greater variety
- Create replayability through non-obvious outcome mechanics
- Provide subtle emotional feedback without being heavy-handed
- Maintain existing story immersion and pacing

### Non-Goals

- Not creating new story scenes or narrative content (reusing existing scenes)
- Not adding backend persistence or user accounts
- Not gamifying with points/leaderboards (this is reflective, not competitive)
- Not showing exact score numbers (maintaining emotional tone, not quantitative)
- Not changing visual design system or UI components significantly

## Decisions

### Decision 1: Six-Dimensional Scoring Model

**Choice**: Use 6 dimensions: `honesty`, `vulnerability`, `hope`, `selfWorth`, `action`, `compassion`

**Rationale**:

- These dimensions map naturally to the existing story themes (love, self-reflection, relationships)
- Six dimensions provide enough nuance without overwhelming complexity
- Each can be scored with simple +/- integers, keeping calculation fast
- Dimensions are orthogonal (independent) - users can score high in some, low in others

**Alternatives considered**:

- 3-4 dimensions: Too simplistic, wouldn't support 16 distinct endings
- 8+ dimensions: Over-engineering, hard to balance, confusing for score assignment
- Categorical tagging: Less flexible, can't express degree/intensity

### Decision 2: Priority-Based Ending Evaluation

**Choice**: Check endings in a predefined priority order (E15, E16, E1, E6...) and return first match

**Rationale**:

- Secret endings (E15, E16) checked first to ensure they're rare but discoverable
- More specific/narrow conditions checked before broad ones
- Prevents ambiguity when multiple conditions match
- Deterministic - same scores always yield same ending

**Alternatives considered**:

- Best-fit scoring: Complex, subjective, could feel arbitrary
- Random selection from matches: Non-deterministic, breaks replayability analysis
- Weighted probability: Overly complex for client-side, unpredictable

**Priority Order** (from spec):

```
E15, E16, E1, E6, E9, E4, E12, E11, E10, E13, E2, E7, E3, E8, E5, E14
```

### Decision 3: Additive Score Accumulation

**Choice**: Each choice adds/subtracts values to running totals: `newScore = oldScore + choiceScores`

**Rationale**:

- Simple to implement and reason about
- Allows choices to have varying intensity (±1 vs ±2)
- Neutral choices possible (score of 0 on some dimensions)
- Final scores naturally represent cumulative emotional patterns

**Alternatives considered**:

- Multiplicative: Complex, exponential growth issues
- Averaging: Early choices matter less, doesn't show patterns
- Boolean flags: Not granular enough for 16 endings

### Decision 4: Text Phrases at Midpoint (Not Exact Scores)

**Choice**: Show evocative text phrase at the halfway point (scene 3) - not numbers, colors, or continuous feedback

**Rationale**:

- Maintains emotional/reflective tone (not a quiz or game)
- Gives users moment of reflection at natural story midpoint
- Prevents min-maxing behavior (trying to "win")
- Single feedback moment preserves immersion and flow
- Midpoint is narratively appropriate for self-reflection

**Implementation approach**:

- Display brief evocative phrase when entering scene 3 (after 2 scenes of choices)
- Example phrases: "Your heart leans toward honesty..." / "You guard yourself carefully..." / "Hope guides your path..."
- Phrase reflects dominant dimensional tendency (highest absolute score)
- Appears for 3-5 seconds with gentle fade animation
- Positioned as overlay or integrated into scene presentation

**Alternatives considered**:

- Continuous feedback on every choice: Too distracting, breaks narrative flow
- Color temperature shifts: Too subtle, users wouldn't understand
- Score bars: Too gamified, breaks immersion
- No feedback: Users feel disconnected from choices
- Explicit labels: "You gained +2 Honesty" - too mechanical

### Decision 5: TypeScript-First Scoring Engine

**Choice**: Create `src/lib/scoringEngine.ts` with typed interfaces, pure functions

**Rationale**:

- Separation of concerns: logic separated from React components
- Testable: Pure functions easy to unit test
- Type-safe: Dimensional scores and conditions checked at compile time
- Reusable: Could be used by analytics or admin tools later

**Structure**:

```typescript
export interface DimensionScores {
  honesty: number;
  vulnerability: number;
  hope: number;
  selfWorth: number;
  action: number;
  compassion: number;
}

export interface EndingCondition {
  id: string;
  condition: ConditionRule;
}

export function evaluateEnding(scores: DimensionScores): string;
export function applyChoiceScore(
  current: DimensionScores,
  delta: Partial<DimensionScores>,
): DimensionScores;
```

### Decision 6: Relationship Selection as Score Initializer

**Choice**: Keep the relationship selection screen but use it to set initial dimensional scores

**Rationale**:

- Maintains existing onboarding flow (users expect to choose at start)
- Provides thematic starting point (e.g., "in relationship with plans" might start with higher hope)
- Avoids complete rewrite of navigation structure
- Allows for path-aware content without hardcoded outcomes

**Initial Score Mapping**:

- Path A (relationship + plans): `{ hope: +1, honesty: +1 }` - optimistic starting point
- Path B (relationship, no plans): `{ hope: -1, selfWorth: -1 }` - stagnant/uncertain state
- Path C (single): `{ selfWorth: +1, action: -1 }` - independent but less proactive

## Risks / Trade-offs

### Risk 1: Score Assignment Complexity

**Risk**: Assigning scores to 30+ choices (3 paths × ~10 choices each) is subjective and time-consuming

**Mitigation**:

- Start with draft assignments based on thematic fit
- Iterate based on playtesting to ensure all endings reachable
- Document rationale for score assignments for future content updates
- Consider automated testing to verify ending distribution

### Risk 2: Ending Distribution Imbalance

**Risk**: Some endings might be very rare or very common, reducing variety

**Mitigation**:

- Use broad condition ranges (checking min/max rather than exact values)
- Prioritize specific endings before generic ones
- Playtesting with diverse choice patterns
- Analytics (if added) to monitor distribution in production

### Risk 3: Secret Endings Too Obscure

**Risk**: E15/E16 have complex mathematical conditions that may never trigger

**Mitigation**:

- Mathematical conditions designed to be achievable (neutral pattern, high contrast pattern)
- E15 triggers when all dimensions near zero (indecision/balance)
- E16 triggers on high variance (strong contrasts in dimensions)
- Internal testing to confirm reachability

### Risk 4: Performance on Low-End Devices

**Risk**: Scoring engine adds computation overhead on every choice

**Mitigation**:

- Pure functions with no side effects (fast execution)
- Ending evaluation only runs once at end, not on every choice
- Dimensional objects are small (6 integers)
- Modern JS engines optimize this type of arithmetic heavily

### Trade-off 1: Complexity vs. Depth

**Accept**: System is more complex than simple branching
**Gain**: Much greater emotional depth and replayability

### Trade-off 2: Predictability vs. Mystery

**Accept**: Outcomes less predictable (users can't "see the path")
**Gain**: Discoveries feel personal, less like following a script

## Migration Plan

### Phase 1: Engine Implementation (Non-Breaking)

1. Create `scoringEngine.ts` (new file, no impact)
2. Add score fields to data structures (optional fields initially)
3. Test engine in isolation with unit tests

### Phase 2: Data Population

1. Add scores to all choices in `storyData.ts`
2. Remove END\_\* scenes (breaking change to data structure)
3. Add new endings to `resultData.ts`

### Phase 3: App Integration

1. Add score state to App.tsx
2. Wire up scoring on choices
3. Replace ending logic with evaluateEnding()
4. Update relationship selection

### Phase 4: UI Polish

1. Add subtle visual feedback
2. Refine based on playtesting
3. Adjust score assignments if needed

### Rollback Strategy

If critical issues found:

- Keep old code in git history
- Fallback: Force all users to E1 (Brave Heart) and collect feedback
- Could temporarily disable score calculation and use random ending

## Score Assignment Table

### Path A - Relationship with Valentine's Plans

**Initial:** `{ hope: +1, honesty: +1 }`

| Scene      | Choice                       | Scores Applied                          |
| ---------- | ---------------------------- | --------------------------------------- |
| A1         | "Smile and feel grateful"    | `{ hope: +1, compassion: +1 }`          |
| A1         | "Feel nervous..."            | `{ vulnerability: +1, hope: -1 }`       |
| A2         | "Tell them something honest" | `{ honesty: +1, vulnerability: +1 }`    |
| A2         | "Perfect, no heavy talk"     | `{ honesty: -1, action: -1 }`           |
| A3         | "Bring it up tonight"        | `{ honesty: +1, action: +1 }`           |
| A3         | "Keep it to yourself"        | `{ vulnerability: -1, compassion: +1 }` |
| A4         | "Yes, honesty"               | `{ honesty: +2, vulnerability: +1 }`    |
| A4         | "No, protect the moment"     | `{ honesty: -1, vulnerability: -1 }`    |
| A5_Honesty | "Yes"                        | `{ vulnerability: +2, selfWorth: +1 }`  |
| A5_Honesty | "Not yet"                    | `{ action: -1, hope: +1 }`              |
| A5_Protect | "Yes"                        | `{ vulnerability: +1, selfWorth: +1 }`  |
| A5_Protect | "Not yet"                    | `{ vulnerability: -2, compassion: +1 }` |

**Achievable Endings:** E1 (Brave Heart), E2 (Quiet Protector), E3 (Heart That Waits), E9 (Growing Soul), E10 (Mirror Seeker), E11 (Forgiver), E13 (Peaceful One), E15 (Unnamed Heart)

### Path B - Relationship without Plans

**Initial:** `{ hope: -1, selfWorth: -1 }`

| Scene     | Choice                      | Scores Applied                            |
| --------- | --------------------------- | ----------------------------------------- |
| B1        | "Tell yourself it's fine"   | `{ honesty: -1, selfWorth: -1 }`          |
| B1        | "Feel a quiet ache"         | `{ vulnerability: +1, hope: -1 }`         |
| B2        | "Reach out first"           | `{ action: +2, hope: +1 }`                |
| B2        | "Wait for them to text"     | `{ action: -1, selfWorth: -1 }`           |
| B3        | "Confront the feeling"      | `{ honesty: +1, vulnerability: +1 }`      |
| B3        | "Push it down"              | `{ honesty: -1, vulnerability: -1 }`      |
| B4        | "Tell them"                 | `{ honesty: +2, action: +1 }`             |
| B4        | "Stay silent"               | `{ honesty: -1, vulnerability: -1 }`      |
| B5_Tell   | "I believe in us"           | `{ hope: +2, compassion: +1 }`            |
| B5_Tell   | "I'm afraid of being alone" | `{ hope: -1, selfWorth: -1, action: -1 }` |
| B5_Silent | "I believe in us"           | `{ hope: +1, compassion: +2 }`            |
| B5_Silent | "I'm afraid of being alone" | `{ hope: -2, vulnerability: -2 }`         |

**Achievable Endings:** E4 (Hopeful Believer), E5 (Lonely Companion), E7 (Guarded Soul), E8 (Quiet Dreamer), E10 (Mirror Seeker), E11 (Forgiver), E12 (Passionate Wanderer), E14 (Shadow Holder), E15 (Unnamed Heart)

### Path C - Single/Not in Relationship

**Initial:** `{ selfWorth: +1, action: -1 }`

| Scene    | Choice                    | Scores Applied                       |
| -------- | ------------------------- | ------------------------------------ |
| C1       | "Enjoy the quiet"         | `{ selfWorth: +1, compassion: +1 }`  |
| C1       | "Feel the loneliness"     | `{ hope: -1, selfWorth: -1 }`        |
| C2       | "Smile for them"          | `{ compassion: +2, hope: +1 }`       |
| C2       | "Feel a sting"            | `{ selfWorth: -1, compassion: -1 }`  |
| C3       | "Reach out"               | `{ action: +2, vulnerability: +1 }`  |
| C3       | "Don't reopen old wounds" | `{ action: -1, vulnerability: -1 }`  |
| C4       | "Admit it"                | `{ honesty: +1, vulnerability: +2 }` |
| C4       | "Bury it"                 | `{ honesty: -1, vulnerability: -1 }` |
| C5_Admit | "I deserve love"          | `{ selfWorth: +2, hope: +2 }`        |
| C5_Admit | "It's safer not to hope"  | `{ hope: -1, action: -1 }`           |
| C5_Bury  | "I deserve love"          | `{ selfWorth: +1, hope: +1 }`        |
| C5_Bury  | "It's safer not to hope"  | `{ vulnerability: -2, hope: -2 }`    |

**Achievable Endings:** E6 (Open Heart), E7 (Guarded Soul), E8 (Quiet Dreamer), E9 (Growing Soul), E11 (Forgiver), E13 (Peaceful One), E14 (Shadow Holder), E15 (Unnamed Heart)

### Secret Endings Achievability

**E15 (Unnamed Heart)** - All dimensions ∈ [-1, 1]:

- Achievable by making balanced, neutral choices across any path
- Example (Path A): Alternate positive/negative choices to stay balanced
- Example (Path C): Choose "Enjoy quiet" (+selfWorth), "Smile for them" (+compassion/+hope), "Don't reopen" (-action/-vulnerability), "Bury it" (-honesty/-vulnerability), "I deserve love" (+selfWorth/+hope) → Results in narrow ranges across all dimensions

**E16 (Heart Between Worlds)** - High contrast (≥2 dims ≥2, ≥2 dims ≤-2, no dim ∈[-1,1]):

- Achievable by maximizing opposite dimensions deliberately
- Example (Path B): Choose "Wait for text" (-action/-selfWorth), "Push down" (-honesty/-vulnerability), "Stay silent" (-honesty/-vulnerability), "Afraid of alone" (-hope/-selfWorth/-action), but also "Reach out first" (+action/+hope) → Creates polarization
- Requires strategic play to achieve extreme scores in opposite directions

### Score Range Validation

After 5 decision points (10 total choice opportunities), with scores ranging ±2 per choice:

- **Theoretical maximum per dimension**: +10 (all +2 choices)
- **Theoretical minimum per dimension**: -10 (all -2 choices)
- **Practical range per dimension**: -6 to +6 (typical play)
- **Target range for endings**: -3 to +4 (most endings require ≥2 or ≤-2)

This ensures:
✅ All 14 standard endings reachable with natural play  
✅ Secret endings rare but achievable with specific patterns  
✅ No dominant ending (spread across score ranges)  
✅ E14 serves as fallback (extreme negative)  
✅ Score impacts feel meaningful (+2 for pivotal moments, ±1 for moderate)

## Open Questions

1. ~~**Score Values**: Should choices typically be ±1, or use ±2 for stronger moments?~~
   - ✅ **Resolved**: Use ±1 as default, ±2 for pivotal crossroads (scenes 4 & 5)

2. ~~**Neutral Ending**: Should there be a default/neutral ending if all scores near zero?~~
   - ✅ **Resolved**: Covered by E15 "The Unnamed Heart"

3. **Testing Framework**: Should we add automated testing for ending reachability?
   - _Defer to post-MVP; manual testing sufficient initially_

4. **Analytics Hook**: If we add analytics, what should we track?
   - _Defer; not in scope for this change_

5. ~~**Score Balance Tool**: Should we create a dev tool to visualize score distributions?~~
   - ✅ **Resolved**: Included in implementation scope (see "Score Balance Tool" section below)

## Analytics

### Purpose

Track user behavior and ending distribution to validate score balance, identify issues, and inform future content decisions. Analytics helps ensure all endings are reachable in practice and that the scoring system creates meaningful variety.

### Privacy-First Approach with Google Analytics

- **Explicit consent**: Request user permission via dialog before tracking begins
- **No PII**: Never collect names, emails, or identifying information (Google Analytics configured with anonymizeIP)
- **Google Analytics 4**: Modern GA4 with privacy-focused configuration
- **Optional**: Users can decline at journey start or opt-out later in settings
- **Transparent**: Clear disclosure of what's tracked and why
- **Compliance**: GDPR/CCPA compliant with proper consent flow

### Events to Track

#### 1. Session Events

```typescript
// Session Start
{
  event: 'session_start',
  timestamp: '2026-02-14T10:30:00Z',
  path: 'A' | 'B' | 'C',
  sessionId: 'random-uuid' // generated client-side, not stored
}

// Session Complete
{
  event: 'session_complete',
  timestamp: '2026-02-14T10:35:00Z',
  path: 'A' | 'B' | 'C',
  endingId: 'E1',
  finalScores: { honesty: 3, vulnerability: 2, ... },
  duration: 300, // seconds
  sessionId: 'random-uuid'
}

// Session Abandoned
{
  event: 'session_abandoned',
  timestamp: '2026-02-14T10:32:00Z',
  path: 'A' | 'B' | 'C',
  lastScene: 'A3',
  duration: 120, // seconds
  sessionId: 'random-uuid'
}
```

#### 2. Choice Events

```typescript
{
  event: 'choice_made',
  timestamp: '2026-02-14T10:31:00Z',
  sceneId: 'A2',
  choiceIndex: 0,
  choiceLabel: 'I want to tell them something honest',
  scoreImpact: { honesty: +1, vulnerability: +1 },
  sessionId: 'random-uuid'
}
```

#### 3. Ending Events

```typescript
{
  event: 'ending_reached',
  timestamp: '2026-02-14T10:35:00Z',
  endingId: 'E1',
  endingTitle: 'The Brave Heart',
  path: 'A',
  finalScores: {
    honesty: 3,
    vulnerability: 2,
    hope: 2,
    selfWorth: 1,
    action: 0,
    compassion: 1
  },
  sessionId: 'random-uuid'
}
```

#### 4. Secret Ending Discovery

```typescript
{
  event: 'secret_ending_discovered',
  timestamp: '2026-02-14T10:35:00Z',
  endingId: 'E15' | 'E16',
  path: 'B',
  finalScores: { ... },
  sessionId: 'random-uuid'
}
```

#### 5. Restart Events

```typescript
{
  event: 'experience_restarted',
  timestamp: '2026-02-14T10:40:00Z',
  previousEnding: 'E1',
  sessionId: 'random-uuid' // new UUID for new session
}
```

### Metrics to Calculate

**Ending Distribution**

- Percentage of sessions reaching each ending
- Most/least common endings
- Secret ending discovery rate

**Path Balance**

- Distribution of path selections (A/B/C)
- Ending variety per path
- Average scores per path

**Dimensional Scores**

- Average final scores per dimension
- Score ranges observed in practice
- Correlation between dimensions

**User Engagement**

- Completion rate (sessions completed vs abandoned)
- Average session duration
- Abandonment points (which scenes users leave)
- Restart rate (users playing multiple times)

**Choice Patterns**

- Most/least selected choices per scene
- Choice diversity across sessions
- Patterns leading to specific endings

### Implementation Architecture: Google Analytics 4

**Selected Approach: Google Analytics 4 with Consent Management**

**Why Google Analytics:**

- Industry-standard analytics platform with robust reporting
- GA4 privacy features (anonymizeIP, data retention controls)
- Free tier sufficient for expected traffic
- Rich event tracking and custom dimensions
- Real-time dashboard and historical analysis
- No backend infrastructure required

**Consent Flow:**

1. User arrives at Landing screen
2. Before "Begin" button activates, consent dialog appears
3. Dialog explains: "We'd like to track your journey to improve the experience. No personal information is collected."
4. Options: "Accept" / "Decline"
5. Choice stored in localStorage
6. Analytics only initialized if user accepts
7. Settings option available to change preference later

**GA4 Configuration:**

- Use `gtag.js` with consent mode
- Set `anonymize_ip: true`
- Configure custom dimensions for: path, endingId, dimensional scores
- Set data retention to 2 months (minimum)
- Disable Google Signals (no cross-device tracking)
- Use event-based tracking (no pageviews)

### Technical Implementation

```typescript
// src/lib/analytics.ts
export interface AnalyticsEvent {
  event_name: string;
  event_params: Record<string, any>;
}

export class Analytics {
  private sessionId: string;
  private enabled: boolean;
  private gaInitialized: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.enabled = this.checkConsent();
    if (this.enabled) {
      this.initializeGA();
    }
  }

  private initializeGA(): void {
    // Load gtag.js script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
      send_page_view: false, // We'll send custom events only
    });

    this.gaInitialized = true;
  }

  track(eventName: string, params?: Record<string, any>): void {
    if (!this.enabled || !this.gaInitialized) return;

    // Send to Google Analytics
    gtag("event", eventName, {
      session_id: this.sessionId,
      ...params,
    });
  }

  trackSessionStart(path: "A" | "B" | "C"): void {
    this.track("session_start", { path });
  }

  trackChoice(sceneId: string, choiceIndex: number, scoreImpact: any): void {
    this.track("choice_made", {
      scene_id: sceneId,
      choice_index: choiceIndex,
      score_impact: JSON.stringify(scoreImpact),
    });
  }

  trackEnding(endingId: string, path: string, finalScores: any): void {
    this.track("ending_reached", {
      ending_id: endingId,
      path,
      honesty: finalScores.honesty,
      vulnerability: finalScores.vulnerability,
      hope: finalScores.hope,
      self_worth: finalScores.selfWorth,
      action: finalScores.action,
      compassion: finalScores.compassion,
    });
  }

  grantConsent(): void {
    localStorage.setItem("analytics_consent", "granted");
    this.enabled = true;
    this.initializeGA();
  }

  denyConsent(): void {
    localStorage.setItem("analytics_consent", "denied");
    this.enabled = false;
  }

  private checkConsent(): boolean {
    return localStorage.getItem("analytics_consent") === "granted";
  }
}
```

### Display in Score Balance Tool

- Add "Analytics" tab to dev tool
- Embed Google Analytics dashboard or link to GA4 console
- Show recent events from GA4 real-time view
- Note: Detailed analysis should be done in GA4 console for comprehensive reporting

### Privacy Compliance

- Explicit consent required before any tracking
- Consent dialog shown at journey start
- Google Analytics configured with `anonymize_ip: true`
- User can decline or revoke consent at any time
- Consent choice stored in localStorage
- GDPR/CCPA compliant with proper consent mechanism
- Privacy policy link provided in consent dialog

### Success Metrics for Analytics System

- Analytics overhead adds <10ms to choice handling
- GA4 script loads asynchronously without blocking UI
- Consent dialog appears within 500ms of landing page load
- All 16 endings appear in GA4 data within first week of launch
- No ending exceeds 35% in real user distribution
- Secret endings discovered by <8% of users
- > 60% consent rate (industry standard for optional analytics)

## Score Balance Tool

### Purpose

A development-only tool to visualize dimensional score distributions, test choice paths, and validate that all 16 endings are reachable with the current score assignments.

### Features

**1. Interactive Path Builder**

- Select a starting path (A/B/C)
- Step through each scene and make choices
- Display running dimensional scores in real-time
- Show which ending would be reached with current scores
- Reset and try different combinations

**2. Score Distribution Graph**

- Visualize final score distributions across all six dimensions
- Bar chart or radar chart showing current scores vs ending thresholds
- Highlight which ending conditions are currently satisfied
- Color-code dimensions (e.g., positive=green, negative=red, neutral=gray)

**3. Ending Coverage Report**

- List all 16 endings with checkboxes
- Show reachability status (✓ reached, ○ not yet reached, ✗ unreachable)
- Display example choice paths for each ending
- Calculate theoretical min/max score ranges per dimension

**4. Path Analysis**

- Generate all possible choice combinations (2^10 per path = 1,024 combos)
- Calculate ending distribution percentages
- Identify unreachable endings or dominant endings (>40%)
- Warn if secret endings are too common or impossible

**5. Export/Import Test Cases**

- Save specific choice sequences as test cases
- Export as JSON for automated testing
- Import test cases to replay and verify

### Implementation Approach

**Option 1: Dev-Only React Component** (Recommended)

- Create `src/dev/ScoreBalanceTool.tsx`
- Accessible via URL flag: `?dev=scoring`
- Full-screen overlay with tabs for different views
- Uses existing scoring engine and story data
- Styled with Tailwind (matches main app)

**Option 2: Separate CLI Tool**

- Node.js script: `scripts/analyze-scores.js`
- Run with: `npm run analyze-scores`
- Outputs text-based reports to terminal
- Generates JSON/CSV files for analysis

**Recommendation**: Option 1 provides better UX for iterative testing and visual feedback.

### Technical Specifications

```typescript
// src/dev/ScoreBalanceTool.tsx
interface PathState {
  path: "A" | "B" | "C";
  currentScene: SceneId;
  scores: DimensionScores;
  choiceHistory: Array<{ sceneId: SceneId; choiceIndex: number }>;
}

interface EndingReachability {
  endingId: string;
  reached: boolean;
  examplePath?: string[];
  percentage?: number; // from exhaustive analysis
}

function analyzeAllPaths(path: "A" | "B" | "C"): EndingReachability[];
function simulateChoicePath(choices: number[]): { ending: string; scores: DimensionScores };
function visualizeScores(scores: DimensionScores, thresholds: EndingCondition[]): ReactElement;
```

### UI Layout

```
┌─────────────────────────────────────────────┐
│  Score Balance Tool (DEV)            [Close] │
├─────────────────────────────────────────────┤
│ [Interactive] [Distribution] [Coverage]      │
├─────────────────────────────────────────────┤
│                                              │
│  Path: [A] [B] [C]         Reset Path       │
│                                              │
│  Current Scene: A3                          │
│  "A memory surfaces..."                     │
│                                              │
│  Choices:                                   │
│  ○ Bring it up tonight    [+honesty +action]│
│  ○ Keep it to yourself    [-vuln +compass]  │
│                                              │
│  ┌────────────────────────────────────┐    │
│  │ Dimensional Scores:                 │    │
│  │ honesty:        ████░░░░ +3         │    │
│  │ vulnerability:  ██░░░░░░ +1         │    │
│  │ hope:           █████░░░ +2         │    │
│  │ selfWorth:      ░░░░░░░░  0         │    │
│  │ action:         ░░░░░░░░  0         │    │
│  │ compassion:     ░░░░░░░░  0         │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Current Ending Match: E1 (Brave Heart)     │
│                                              │
└─────────────────────────────────────────────┘
```

### Success Metrics

- Tool successfully identifies all 16 endings as reachable
- No ending exceeds 30% in exhaustive path analysis
- Secret endings (E15, E16) remain under 5% probability
- All dimensions can reach theoretical ranges (-6 to +6)
- Tool executes exhaustive analysis in under 10 seconds

## User Feedback Collection

### Purpose

Collect qualitative feedback after users reach their ending to understand:

- How well endings resonate with users
- Experience quality and emotional impact
- Areas for improvement
- Likelihood to recommend

### Feedback Form Design

**Placement**: Appears after the ending card is displayed, giving users time to read their result first.

**Timing**:

1. User sees their ending card with full result
2. Brief pause (3-5 seconds) to let them absorb the ending
3. Feedback form fades in below the card or as overlay

**Current Implementation** (Simplified with Explicit Text Consent):

**Single Text Area** (simplicity-focused):

- "How was your experience with this story?"
- Free-text area (500 character max)
- Placeholder: "Share your thoughts..."
- Character counter: "X/500"

**Explicit Text Consent** (when user types feedback):

- Checkbox appears dynamically when text is entered
- "☐ Allow sharing this feedback for content improvement (anonymous, first 100 characters only)"
- Clear indication that:
  - Sharing is optional (unchecked by default)
  - Only first 100 chars sent to GA4 (technical limit)
  - Feedback is anonymous
  - Full text always stored locally

**Action Buttons**:

- "Submit Feedback" (enabled when text entered)
- "Skip" (dismisses feedback form)

**UI Design Principles**:

- Minimal and non-intrusive
- Matches the emotional tone of the experience
- Easy to skip ("Skip" button)
- Mobile-friendly (large touch targets)
- Accessible (keyboard navigation, screen reader support)
- Transparent consent (user chooses text sharing)

### Data Handling

**Implementation: Option 2 - Explicit Text Consent**

**When User Submits Feedback**:

1. **Always store locally** (full text, 500 chars max):

   ```typescript
   {
     endingId: "E1",
     feedback: "Full user feedback text...",
     timestamp: "2026-02-14T10:35:00Z",
     sharedWithAnalytics: true/false
   }
   ```

2. **If analytics consent AND text consent granted**:
   - Send to GA4 event: `feedback_submitted`
   - Parameters:
     - `ending_id`: Which ending triggered feedback
     - `feedback_length`: Number of characters
     - `feedback_text`: **Truncated to 100 chars** (GA4 parameter limit)
     - `has_text_feedback`: true

3. **If analytics consent but NO text consent**:
   - Send to GA4 event: `feedback_submitted`
   - Parameters:
     - `ending_id`: Which ending triggered feedback
     - `feedback_length`: Number of characters (metadata only)
     - `has_text_feedback`: false
     - ❌ NO `feedback_text` parameter

4. **If NO analytics consent**:
   - Only store locally in localStorage
   - No GA4 tracking at all

**Privacy Safeguards**:

- Text consent checkbox is **unchecked by default** (opt-in)
- Checkbox only appears when user has typed feedback (not shown for empty text)
- Clear explanation: "first 100 characters only"
- Full text always preserved locally for user/developer access
- Text is anonymous (no user identification)
- User controls both analytics consent AND text sharing separately

### Implementation Details

```typescript
// src/lib/analytics.ts
export const trackFeedback = (
  endingId: string,
  feedbackLength: number,
  feedbackText?: string, // Optional - only provided when user grants text consent
): void => {
  if (!isAnalyticsEnabled()) return;

  const eventParams: Record<string, any> = {
    event_category: "user_feedback",
    ending_id: endingId,
    feedback_length: feedbackLength,
    has_text_feedback: !!feedbackText,
  };

  // Include truncated text if provided and user gave consent
  // GA4 event parameters are limited to 100 characters
  if (feedbackText) {
    eventParams.feedback_text = feedbackText.substring(0, 100);
  }

  window.gtag("event", ANALYTICS_EVENTS.FEEDBACK_SUBMITTED, eventParams);
};
```

```typescript
// src/app/screens/Ending.tsx
export const Ending: React.FC<EndingProps> = ({ onRestart, onShare, resultMessage }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [shareTextConsent, setShareTextConsent] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      // Store feedback locally (always, with full text)
      const feedback = {
        endingId: resultMessage,
        feedback: feedbackText,
        timestamp: new Date().toISOString(),
        sharedWithAnalytics: shareTextConsent,
      };

      const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]");
      existingFeedback.push(feedback);
      localStorage.setItem("userFeedback", JSON.stringify(existingFeedback));

      // Track with GA4 (include text only if consent checkbox checked)
      trackFeedback(
        resultMessage,
        feedbackText.length,
        shareTextConsent ? feedbackText : undefined
      );

      setFeedbackSubmitted(true);
    }
  };

  return (
    <div>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Share your thoughts..."
        maxLength={500}
      />

      {/* Consent checkbox - only shown when user has typed text */}
      {feedbackText.trim() && (
        <label>
          <input
            type="checkbox"
            checked={shareTextConsent}
            onChange={(e) => setShareTextConsent(e.target.checked)}
          />
          Allow sharing this feedback for content improvement
          (anonymous, first 100 characters only)
        </label>
      )}

      <button onClick={handleSubmitFeedback} disabled={!feedbackText.trim()}>
        Submit Feedback
      </button>
      <button onClick={handleSkipFeedback}>Skip</button>
    </div>
  );
};
```

### Privacy Considerations

**Two-Layer Consent System**:

1. **Analytics Consent** (at journey start via ConsentDialog):
   - Controls all GA4 tracking
   - If declined: no events sent, feedback stays local only

2. **Text Feedback Consent** (at feedback submission, optional):
   - **Independent** from analytics consent
   - Only shown when user has typed feedback
   - **Opt-in** (unchecked by default)
   - User explicitly chooses to share their words

**Data Flow**:

- **No PII**: Never ask for name, email, or identifying information
- **Anonymous**: Feedback cannot be linked to individual users
- **Local First**: Full feedback text (500 chars) always stored in localStorage
- **Truncated Sharing**: Only first 100 characters sent to GA4 (technical limit)
- **User Control**: User decides on each submission whether to share text
- **Transparent**: Clear explanation of what's shared and character limit
- **Exportable**: Users/developers can export data from localStorage

**Consent Flow**:

```
Journey Start → Analytics Consent Dialog
  ↓ (Accept)
Journey → ... → Ending Screen → Feedback Form
  ↓ (User types feedback)
Text Consent Checkbox Appears (unchecked)
  ↓ (User checks box)
Submit → GA4 receives: ending_id, length, text[0:100]
  ↓ (User does NOT check box)
Submit → GA4 receives: ending_id, length, has_text_feedback: false
```

**GA4 Parameters (when text consent given)**:

- `ending_id`: "E1"
- `feedback_length`: 245 (full length for analysis)
- `feedback_text`: "This made me think about..." (truncated to 100 chars)
- `has_text_feedback`: true

**GA4 Parameters (when text consent NOT given)**:

- `ending_id`: "E1"
- `feedback_length`: 245 (metadata only)
- `has_text_feedback`: false
- ❌ No `feedback_text` parameter

### Success Metrics

- > 40% of users provide at least one rating (completion rate)
- <5% of users skip immediately without viewing questions
- Average feedback submission time: 20-40 seconds
- Text feedback provided by >15% of users who submit ratings
- Feedback form appears within 500ms of ending display

### Integration with Ending Screen

**Flow**:

1. User makes final choice → Scores calculated → Ending determined
2. Ending screen displays with result card
3. User reads their ending (3-5 second delay)
4. Feedback form fades in smoothly below or overlays
5. User submits feedback OR skips
6. Analytics tracks feedback submission (if consent granted)
7. "Play Again" / "Share" options appear

**Responsive Design**:

- Mobile: Feedback form appears below card, scrollable
- Desktop: Feedback form can appear as modal or side panel
- Tablet: Similar to desktop with appropriate scaling

## Tip Button with Buy Me a Coffee Integration

### Purpose

Provide an optional way for users to support the creator after experiencing the journey. The tip button should feel like a natural, non-intrusive expression of gratitude rather than a transaction.

### Placement and Timing

**Placement**: Appears after the ending card and feedback form (or alongside feedback form if user skips).

**Flow**:

1. User sees ending card
2. Feedback form appears (optional)
3. After feedback submission or skip, tip button fades in
4. Button text: "Leave a tip ❤️" or "Support this work"
5. Positioned alongside "Play Again" / "Share" buttons

**Alternative Flow** (if preferred):

- Tip button visible from the start but subtle
- Becomes more prominent after feedback interaction
- Never blocks or gates content

### Buy Me a Coffee Integration

**Why Buy Me a Coffee:**

- No backend infrastructure required (client-side only)
- Simple widget/button integration
- Supports multiple payment methods (PayPal, Stripe, etc.)
- Worldwide payment support (not region-locked)
- Built-in supporter management
- Free tier sufficient for most creators
- Mobile-optimized payment flow

**Setup** (One-time):

1. Create account at buymeacoffee.com
2. Get your unique username/page URL
3. Customize button appearance and default amounts
4. No API keys or backend configuration needed

**User Flow**:

1. User clicks "Buy me a coffee ☕" button
2. Opens Buy Me a Coffee page in new tab (or embedded widget)
3. User selects amount ($3, $5, $10, or custom)
4. User completes payment via Buy Me a Coffee's secure checkout
5. Buy Me a Coffee handles all payment processing
6. User is thanked and redirected back (optional)
7. Analytics tracks button click event

### UI Design

**Button Styling**:

- Subtle, warm design with coffee emoji
- Text: "Buy me a coffee ☕" or "Support this work ❤️"
- Secondary visual prominence (not as bold as "Play Again")
- Hover state: Gentle color shift or scale animation
- Matches the emotional tone of the ending screen

**Implementation Options**:

**Option 1: Direct Link Button** (Simplest)

```html
<a href="https://buymeacoffee.com/yourusername" target="_blank">
  <img
    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
    alt="Buy Me A Coffee"
    style="height: 60px !important;width: 217px !important;"
  />
</a>
```

**Option 2: Custom Button with Tracking**

```typescript
const handleCoffeeClick = () => {
  analytics.trackCoffeeClicked(endingId, path);
  window.open('https://buymeacoffee.com/yourusername', '_blank');
};

<motion.button
  onClick={handleCoffeeClick}
  whileHover={{ scale: 1.05 }}
  className="coffee-button"
>
  Buy me a coffee ☕
</motion.button>
```

**Option 3: Embedded Widget** (More integrated)

```html
<script
  data-name="BMC-Widget"
  data-cfasync="false"
  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
  data-id="yourusername"
  data-description="Support me on Buy me a coffee!"
  data-message=""
  data-color="#FF5F5F"
  data-position="Right"
  data-x_margin="18"
  data-y_margin="18"
></script>
```

**Recommended**: Option 2 (Custom Button) for better analytics tracking and visual consistency with the app design.

### Technical Implementation

**No Backend Required**: Buy Me a Coffee handles all payment processing, so no server-side code needed.

**Environment Configuration**:

```typescript
// .env or config
VITE_BUYMEACOFFEE_USERNAME = yourusername;
```

**Component Implementation**:

```typescript
// src/app/components/CoffeeButton.tsx
import { motion } from 'framer-motion';
import { trackCoffeeClicked } from '@/lib/analytics';

interface CoffeeButtonProps {
  endingId: string;
  path: string;
}

export function CoffeeButton({ endingId, path }: CoffeeButtonProps) {
  const handleClick = () => {
    trackCoffeeClicked({ endingId, path });
    window.open(
      `https://buymeacoffee.com/${import.meta.env.VITE_BUYMEACOFFEE_USERNAME}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="coffee-button"
    >
      <img
        src="https://media.giphy.com/media/TDQOtnWgsBx99cNoyH/giphy.gif"
        alt="Coffee"
        className="w-5 h-5"
      />
      Buy me a coffee
    </motion.button>
  );
}
```

### Analytics Integration

**Events to Track**:

- `coffee_button_clicked`: When user clicks the Buy Me a Coffee button
- `coffee_button_viewed`: When button appears on ending screen (optional)

**GA4 Event Implementation**:

```typescript
// src/lib/analytics.ts
export function trackCoffeeClicked(params: { endingId: string; path: string }): void {
  if (!isAnalyticsEnabled()) return;

  console.log("☕ Tracking: coffee_clicked");

  gtag("event", "coffee_clicked", {
    ending_id: params.endingId,
    path: params.path,
    timestamp: new Date().toISOString(),
  });
}
```

**Note**: We cannot track actual payment completion since Buy Me a Coffee handles payments externally. We can only track button clicks.

### Privacy and Security

**No Payment Data in App**:

- All payment processing happens on Buy Me a Coffee's secure platform
- No sensitive payment info stored or transmitted by the app
- No backend infrastructure needed
- Buy Me a Coffee is PCI-DSS compliant

**User Privacy**:

- Only track button clicks (not payment amounts or success)
- No linking to user identity
- Anonymous support (supporter can choose to be anonymous on Buy Me a Coffee)
- No personal information collected by the app

**GDPR/Privacy Compliance**:

- Support is completely optional
- Opens in new tab (clear separation from main experience)
- Buy Me a Coffee handles payment data per their privacy policy
- No cookies or tracking beyond GA4 button click event

### Error Handling

Since Buy Me a Coffee handles all payment processing externally, error handling is minimal:

1. **Pop-up blocker**: Inform user if new tab was blocked
2. **Invalid username**: Validate configuration in development
3. **Network issues**: Browser will handle connection errors

**Simple fallback**:

```typescript
const openCoffee = () => {
  const coffeeWindow = window.open(coffeeUrl, "_blank", "noopener,noreferrer");

  if (!coffeeWindow) {
    alert("Please allow pop-ups to support this project!");
  }
};
```

### Configuration

**Environment Variables**:

```bash
# .env
VITE_BUYMEACOFFEE_USERNAME=yourusername
```

**Usage**:

```typescript
const COFFEE_URL = `https://buymeacoffee.com/${import.meta.env.VITE_BUYMEACOFFEE_USERNAME}`;
```

### Performance Considerations

**Minimal Impact**:

- No backend dependency (fully client-side)
- No additional scripts to load (unless using widget)
- Simple link click - instant response
- Button component lazy-loaded after ending screen renders
- No polling, webhooks, or payment status checks needed

### User Experience Priorities

1. **Never Intrusive**: Support button is 100% optional, never blocks content
2. **No Pressure**: Casual, warm tone without obligation
3. **Grateful Acknowledgment**: Simple "Thank you for your support" messaging
4. **Clear External Link**: Opens in new tab, users know they're leaving the app
5. **Mobile Optimized**: Buy Me a Coffee page is mobile-responsive

### Success Metrics

- Button appears within 500ms of ending screen render
- <5% of users report feeling pressured (via feedback)
- > 1-2% click-through rate considered success
- Button click tracked in analytics
- No payment failures to handle (external processing)
- Zero performance impact on main experience

### Future Enhancements

**Phase 2 (Optional)**:

- Membership tiers on Buy Me a Coffee (recurring support)
- Exclusive content for supporters
- Early access to new experiences
- Supporter shout-outs or acknowledgment page
- Alternative platforms: Ko-fi, Patreon, GitHub Sponsors

## Success Criteria

- All 16 endings are reachable through valid choice combinations (validated by Score Balance Tool)
- No TypeScript errors or runtime exceptions
- Ending evaluation completes in <10ms on average mobile device
- Subtle UI feedback enhances rather than distracts from narrative
- Users report endings feel personalized and meaningful (subjective, post-launch)
- 90%+ of playthroughs result in endings E1-E14 (not fallback E14 due to bugs)
- Score Balance Tool confirms balanced ending distribution (<30% any single ending)
