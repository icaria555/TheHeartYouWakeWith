# Score Assignment Strategy

## Purpose

This document provides guidelines for assigning dimensional scores to story choices in "The Heart You Wake With". Following these principles ensures:

- Consistent emotional profiling across paths
- Balanced ending distribution (all 16 endings reachable)
- Meaningful correlation between choices and outcomes
- Intuitive player experience

## The Six Dimensions

### 1. **honesty**

**Core Question**: Does this choice involve being truthful or protective/avoidant?

**Positive (+)**: Choosing truth, self-disclosure, admitting feelings, being direct

- +1: Minor truth-telling
- +2: Significant vulnerability through honesty
- +3: Major confrontation with truth (rare)

**Negative (-)**: Choosing protection, deflection, withholding, lying

- -1: Small omission or deflection
- -2: Significant avoidance or dishonesty
- -3: Major deception or self-denial (rare)

**Examples**:

- _"Tell them how you really feel"_ → +2 honesty
- _"Change the subject"_ → -1 honesty
- _"Say you're fine when you're not"_ → -2 honesty

### 2. **vulnerability**

**Core Question**: Does this choice involve emotional risk or self-protection?

**Positive (+)**: Opening up, taking emotional risks, showing softness

- +1: Minor emotional openness
- +2: Significant emotional exposure
- +3: Profound vulnerability (rare)

**Negative (-)**: Closing off, guarding feelings, emotional withdrawal

- -1: Slight guardedness
- -2: Strong self-protection
- -3: Complete emotional shutdown (rare)

**Examples**:

- _"Share your fears"_ → +2 vulnerability
- _"Keep your feelings to yourself"_ → -2 vulnerability
- _"Build walls to stay safe"_ → -3 vulnerability

### 3. **hope**

**Core Question**: Does this choice reflect optimism or pessimism about the future?

**Positive (+)**: Faith in possibilities, believing in positive outcomes

- +1: Small optimistic gesture
- +2: Strong belief in better future
- +3: Profound hope despite adversity (rare)

**Negative (-)**: Resignation, cynicism, giving up

- -1: Mild pessimism
- -2: Strong resignation or cynicism
- -3: Complete hopelessness (rare)

**Examples**:

- _"Things will get better"_ → +2 hope
- _"There's no point trying"_ → -2 hope
- _"Maybe tomorrow will be different"_ → +1 hope

### 4. **selfWorth**

**Core Question**: Does this choice reflect self-value or self-doubt?

**Positive (+)**: Self-confidence, knowing one's worth, setting boundaries

- +1: Small self-affirming choice
- +2: Strong self-worth demonstration
- +3: Profound self-acceptance (rare)

**Negative (-)**: Self-doubt, feeling undeserving, self-sabotage

- -1: Mild self-questioning
- -2: Strong feelings of unworthiness
- -3: Deep self-rejection (rare)

**Examples**:

- _"I deserve to be treated well"_ → +2 selfWorth
- _"I'm not good enough for this"_ → -2 selfWorth
- _"Set a boundary"_ → +2 selfWorth

### 5. **action**

**Core Question**: Does this choice involve taking initiative or remaining passive?

**Positive (+)**: Proactiveness, agency, taking steps forward

- +1: Small initiative
- +2: Significant action toward goals
- +3: Major transformative action (rare)

**Negative (-)**: Passivity, inertia, waiting for others

- -1: Slight passivity
- -2: Strong inaction or avoidance
- -3: Complete paralysis (rare)

**Examples**:

- _"Make the first move"_ → +2 action
- _"Wait and see what happens"_ → -1 action
- _"Start the conversation yourself"_ → +2 action

### 6. **compassion**

**Core Question**: Does this choice involve care for others or self-focus?

**Positive (+)**: Empathy, kindness, considering others' needs

- +1: Small considerate gesture
- +2: Significant empathic action
- +3: Profound selfless compassion (rare)

**Negative (-)**: Self-centeredness, disregard for others, coldness

- -1: Mild self-focus
- -2: Strong disregard for others
- -3: Complete lack of empathy (rare, use carefully)

**Examples**:

- _"Ask how they're feeling"_ → +2 compassion
- _"Focus only on your own needs"_ → -1 compassion
- _"Show understanding"_ → +1 compassion

## Score Assignment Principles

### 1. **Magnitude Guidelines**

**\u00b11 Point**: Subtle choice, minor emotional gesture

- Common for everyday decisions
- Build gradual score accumulation
- Should be ~40% of all score assignments

**\u00b12 Points**: Significant choice, clear emotional direction

- Major decisions with clear emotional stakes
- Should be ~50% of all score assignments
- Creates meaningful score differentiation

**\u00b13 Points**: Rare, profound moment

- Should be <10% of all assignments
- Reserved for climactic choices
- Use sparingly (0-2 per path maximum)

### 2. **Multi-Dimensional Choices**

Most real choices affect multiple dimensions. Assign 1-3 dimensions per choice:

**Single Dimension (0-30% of choices)**:

```typescript
{
  label: "Tell the truth",
  scores: { honesty: +2 },
  nextSceneId: "A2"
}
```

**Two Dimensions (50-60% of choices)**:

```typescript
{
  label: "Share your fears with them",
  scores: { vulnerability: +2, honesty: +1 },
  nextSceneId: "A3"
}
```

**Three Dimensions (10-20% of choices)**:

```typescript
{
  label: "Confront them with compassion",
  scores: { honesty: +2, vulnerability: +1, compassion: +2 },
  nextSceneId: "A4"
}
```

### 3. **Contrasting Choices**

Each scene's choices should offer emotional contrasts:

**Good Contrast** (Different dimensions):

- Choice A: `{ honesty: +2, vulnerability: +1 }`
- Choice B: `{ action: +2, selfWorth: +1 }`

**Better Contrast** (Opposite directions):

- Choice A: `{ vulnerability: +2, hope: +1 }`
- Choice B: `{ vulnerability: -2, action: +1 }`

**Best Contrast** (Distinct emotional profiles):

- Choice A: `{ honesty: +2, vulnerability: +2 }` (brave openness)
- Choice B: `{ selfWorth: +2, action: -1 }` (confident waiting)

### 4. **Path Balance**

Each path should allow for varied endings:

**Target Score Ranges** (after all 5 scenes):

- Balanced: -3 to +3 in most dimensions
- Extreme: -6 to +6 in 1-2 dimensions
- Requires deliberate choices in one direction

**Distribution Goals**:

- 30-40% of playthroughs: Balanced scores
- 40-50% of playthroughs: 1-2 dominant dimensions
- 10-20% of playthroughs: Extreme/secret endings
- All 16 endings reachable from any path

### 5. **Scene Progression**

**Scenes 1-2** (Setup):

- Lower magnitude scores (\u00b11 mostly)
- Establish baseline patterns
- Introduce dimensional contrasts

**Scene 3** (Midpoint):

- Mix of \u00b11 and \u00b12 scores
- Midpoint feedback displayed based on dominant dimension
- Begin emotional differentiation

**Scenes 4-5** (Resolution):

- Higher magnitude scores (\u00b12 primarily, occasional \u00b13)
- Create clear pathways to different endings
- Scene 5 may branch conditionally

## Validation Process

### During Development

1. **Use Score Balance Tool** (`?dev=scoring`):
   - Interactive Builder: Test specific choice sequences
   - Ending Coverage: Run exhaustive analysis
   - Path Analysis: Check for warnings

2. **Check Distribution**:
   - All 16 endings must be reachable (✓)
   - No ending should exceed 30% frequency
   - Secret endings (E15, E16) should be <5%
   - E14 (fallback) should be rare (<10%)

3. **Test Emotional Coherence**:
   - Does the ending match the emotional journey?
   - Are extreme scores (±6) achievable intentionally?
   - Do similar score profiles lead to semantically related endings?

### Before Merging

1. Run full analysis with Score Balance Tool
2. Export test cases for regression testing
3. Verify all acceptance criteria in `tasks.md`
4. Document any intentional imbalances or edge cases

## Common Pitfalls

### ❌ **Too Many Neutral Choices**

```typescript
// BAD: No emotional impact
{
  label: "Think about it",
  scores: {},  // Empty!
  nextSceneId: "A2"
}
```

**Fix**: Every choice should affect at least ONE dimension.

### ❌ **Inconsistent Magnitudes**

```typescript
// BAD: Magnitudes don't match emotional weight
{
  label: "Pour your heart out completely",  // Major moment
  scores: { vulnerability: +1 },  // Tiny score!
  nextSceneId: "A3"
}
```

**Fix**: Match score magnitude to narrative weight.

### ❌ **All Choices Point Same Direction**

```typescript
// BAD: No real choice
choices: [
  { label: "Be honest", scores: { honesty: +2 } },
  { label: "Tell the truth", scores: { honesty: +1 } }, // Same dimension!
];
```

**Fix**: Offer emotional contrasts (honesty vs. vulnerability, hope vs. action, etc.).

### ❌ **Overusing ±3 Scores**

```typescript
// BAD: Too many maximum scores
{
  label: "Say hello",
  scores: { compassion: +3 },  // Way too strong!
  nextSceneId: "A2"
}
```

**Fix**: Reserve ±3 for profound, climactic moments.

### ❌ **Forgetting About Balance**

- Not testing with Score Balance Tool
- Assuming certain endings are "unreachable"
- Ignoring secret ending frequency targets

## Example: Well-Balanced Scene

```typescript
{
  id: "A3",
  variant: "tension",
  text: "Your partner looks hurt. They're waiting for you to say something.",
  choices: [
    {
      label: "Tell them exactly how you feel, even if it's hard",
      scores: {
        honesty: +2,
        vulnerability: +2
      },
      nextSceneId: "A4"
    },
    {
      label: "Change the subject and suggest doing something fun instead",
      scores: {
        honesty: -1,
        action: +2,
        hope: +1
      },
      nextSceneId: "A4"
    }
  ],
  illustrationSrc: "..."
}
```

**Why This Works**:

- ✅ Clear emotional contrast (brave honesty vs. deflective action)
- ✅ Both choices offer positive traits (no "wrong" answer)
- ✅ Appropriate magnitude (±2 for significant moment)
- ✅ Multi-dimensional (2-3 dimensions each)
- ✅ Narratively coherent (both responses make sense)

## Ending Reference

Use this quick reference when designing choices:

| Ending                    | Key Dimensions             | Target Pattern                  |
| ------------------------- | -------------------------- | ------------------------------- |
| E1: Brave Heart           | honesty +, vulnerability + | High both                       |
| E2: Quiet Protector       | vulnerability -, hope ~    | Low vuln, moderate hope         |
| E3: Heart That Waits      | action -, vulnerability +  | Negative action, positive vuln  |
| E4: Hopeful Believer      | hope +                     | Very high hope                  |
| E5: Lonely Companion      | selfWorth -, compassion -  | Low both                        |
| E6: Open Heart            | vulnerability +, hope +    | Positive both                   |
| E7: Guarded Soul          | vulnerability -, hope -    | Low both                        |
| E8: Quiet Dreamer         | action -, hope +           | Negative action, positive hope  |
| E9: Growing Soul          | action +, compassion +     | High both                       |
| E10: Mirror Seeker        | honesty +, selfWorth +     | High both                       |
| E11: Forgiver             | compassion +, honesty ~    | High compassion                 |
| E12: Passionate Wanderer  | action +, vulnerability -  | High action, low vuln           |
| E13: Peaceful One         | selfWorth +, balanced      | High worth, balanced            |
| E14: Shadow Holder        | Default                    | Fallback                        |
| E15: Unnamed Heart        | ALL balanced               | Within ±1 all dims (SECRET)     |
| E16: Heart Between Worlds | High variance              | Wide range across dims (SECRET) |

## Recent Scoring Adjustments

### February 2026 - Content Expansion Balance Fixes

During the expansion from 5 to 7-9 scenes per path (enrich-story-experience), several ending condition adjustments were made to improve distribution balance:

**E10: The Mirror Seeker**

- **Issue**: Over-represented in Path A (appeared ~40% of playthroughs)
- **Change**: Increased honesty requirement from `>= 1` to `>= 2`
- **Rationale**: Mirror Seeker represents deep self-reflection; requiring higher honesty threshold makes it more selective and reduces over-triggering on Path A
- **Impact**: Reduced E10 frequency by ~15%, improved overall distribution balance

**E14: The Shadow Holder**

- **Issue**: Too easily triggered as fallback, didn't require enough negative state
- **Change**: Enhanced condition from `hope <= -1` to requiring `3+ negative dimensions`
- **Rationale**: Shadow Holder represents carrying unseen weight; should only appear when genuinely struggling across multiple dimensions, not just low hope
- **Impact**: E14 now appears only for truly negative emotional states, improving narrative coherence

**E9: The Growing Soul**

- **Issue**: Under-represented due to high action requirement (action >= 2)
- **Change 1**: Lowered action requirement to `>= 1` from `>= 2`
- **Change 2**: Adjusted E4 (Hopeful Believer) to check hope >= 3 to prevent interception
- **Change 3**: Added compassion +1 boost to Path A scene A4_5 for better reachability
- **Rationale**: Growing Soul (active + compassionate) was too rare despite being a positive ending; lowering threshold and adding strategic compassion boost makes it more achievable
- **Impact**: E9 frequency increased from <5% to ~10-15%, now properly represents active compassion

**Testing Validation**: All adjustments verified with Score Balance Tool exhaustive analysis. All 16 endings remain reachable from all paths with improved distribution (no ending >30%).

## Tools & Resources

### Score Balance Tool

- **Access**: Add `?dev=scoring` to URL
- **Use Cases**:
  - Test new choice sequences
  - Verify ending reachability
  - Check distribution balance
  - Export test cases for regression

### Code References

- **Scoring Engine**: `src/lib/scoringEngine.ts`
- **Story Data**: `src/app/data/storyData.ts`
- **Ending Conditions**: `ENDING_CONDITIONS` array in scoringEngine.ts
- **Result Text**: `src/app/data/resultData.ts`

### Related Docs

- **OpenSpec Proposal**: `openspec/changes/add-dimensional-scoring-engine/proposal.md`
- **Design Document**: `openspec/changes/add-dimensional-scoring-engine/design.md`
- **Testing Guide**: `src/dev/TESTING.md`
- **Project Context**: `openspec/project.md`

## Iteration Workflow

When adding new content or modifying scores:

1. **Design Phase**:
   - Sketch out scene text and choice labels
   - Identify 1-3 key dimensions per choice
   - Assign preliminary magnitudes

2. **Implementation Phase**:
   - Add choices to `storyData.ts`
   - Assign scores following guidelines above
   - commits changes

3. **Testing Phase**:
   - Open Score Balance Tool (`?dev=scoring`)
   - Test manually in Interactive Builder
   - Run exhaustive analysis in Coverage tab
   - Check Path Analysis for warnings

4. **Refinement Phase**:
   - Adjust scores if endings are imbalanced
   - Re-test after each adjustment
   - Document any intentional imbalances

5. **Documentation Phase**:
   - Export test cases for regression
   - Update this document if new patterns emerge
   - Note any special considerations

## Version History

- **v1.0** (February 2026): Initial strategy document for dimensional scoring system
- Future updates will be tracked here as scoring patterns evolve

## Contact

For questions about score assignment or to propose changes to this strategy:

- Review OpenSpec proposal: `openspec/changes/add-dimensional-scoring-engine/`
- Test with Score Balance Tool: `?dev=scoring`
- Update this document via pull request
