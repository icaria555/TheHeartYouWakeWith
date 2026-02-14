# Project Context

## Purpose

"The Heart You Wake With" is an interactive narrative experience designed for Valentine's Day 2026. It's an emotional journey that explores different relationship states and emotional responses through branching story choices. The experience leads users through introspective questions about love, vulnerability, honesty, and self-worth, culminating in one of 16 personalized "heart type" results based on a six-dimensional emotional profiling system.

The dimensional scoring system evaluates choices across six psychological dimensions (honesty, vulnerability, hope, selfWorth, action, compassion), enabling nuanced endings that reflect complex emotional patterns. Two secret endings reward balanced or extreme emotional states, adding depth for returning users.

The project creates a meaningful, reflective experience that goes beyond superficial Valentine's Day content, offering users insight into their emotional patterns and relationship perspectives through a privacy-first analytics approach.

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12 with custom theme variables
- **Animation**: Motion (Framer Motion fork) 12.23.24
- **UI Components**:
  - Radix UI primitives (accordion, dialog, dropdown, etc.)
  - shadcn/ui components (built on Radix UI) under MIT license
  - Custom UI components in `src/app/components/ui/`
- **Routing**: React Router 7.13.0
- **Icons**: Lucide React 0.487.0, Material UI Icons 7.3.5
- **Images**: Unsplash photos (used under Unsplash license)

## Project Conventions

### Code Style

- **TypeScript**: Strict typing with explicit interfaces for all data structures
- **Naming**:
  - Components: PascalCase (e.g., `Landing`, `StoryScene`)
  - Files: Match component names for React files (e.g., `Landing.tsx`)
  - Data files: camelCase (e.g., `storyData.ts`, `resultData.ts`)
  - Types/Interfaces: PascalCase (e.g., `Scene`, `ResultData`)
- **Import Aliases**: Use `@/` alias for src directory imports
- **Component Structure**: Functional components with TypeScript interfaces for props
- **State Management**: React hooks (useState) for local state
- **Formatting**: Consistent indentation, organized imports

### Architecture Patterns

- **State-Driven Navigation**: App state (`step`) determines which screen renders
- **Data-Driven Content**: All story content centralized in `storyData.ts` and `resultData.ts`
- **Component Composition**: Screen components receive callbacks via props
- **Typed Data Models**: All story scenes, choices, and results use TypeScript interfaces
- **Single-Page Application**: No traditional routing; state-based screen switching
- **Separation of Concerns**:
  - `/screens/` - Full-page view components
  - `/components/ui/` - Reusable UI components
  - `/data/` - Static story and result data
  - `/lib/` - Utility functions

### File Organization

```
src/
├── main.tsx              # App entry point
├── app/
│   ├── App.tsx          # Main app orchestration & state
│   ├── screens/         # Full-page views
│   │   ├── Landing.tsx
│   │   ├── RelationshipSelection.tsx
│   │   ├── StoryScene.tsx
│   │   ├── Ending.tsx
│   │   ├── ShareCard.tsx
│   │   ├── FeedbackDialog.tsx
│   │   └── SettingsDialog.tsx
│   ├── components/
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── figma/       # Figma-generated components
│   │   └── ConsentDialog.tsx  # Analytics consent modal
│   └── data/            # Story content and results
│       ├── storyData.ts
│       └── resultData.ts
├── dev/                 # Development tools
│   ├── ScoreBalanceTool.tsx  # Score validation utility
│   └── TESTING.md       # Score Balance Tool test guide
├── lib/                 # Utilities
│   ├── scoringEngine.ts # Dimensional scoring system
│   ├── analytics.ts     # Google Analytics 4 integration
│   ├── analyticsConfig.ts
│   └── utils.ts
└── styles/              # Global styles
```

### Testing Strategy

Currently no formal testing strategy defined. Future considerations:

- Component testing for UI components
- Integration testing for story flow logic
- E2E testing for complete user journeys

### Git Workflow

Standard feature branch workflow:

- Main branch for production-ready code
- Feature branches for new capabilities
- Follow OpenSpec workflow for structured changes

## Domain Context

### Story Structure

The experience follows a dimensional scoring structure with:

- **3 Main Paths**: Based on relationship status sel selection
  - Path A: In a relationship with Valentine's plans (initial: +1 hope, +1 honesty)
  - Path B: In a relationship without Valentine's plans (initial: -1 hope, -1 selfWorth)
  - Path C: Single/not in a relationship (initial: +1 selfWorth, -1 action)
- **5 Scenes per Path**: Progressive emotional journey
  - Scene 1-2: Story/setup (variant: "story")
  - Scene 3: Tension moment (variant: "tension") - Midpoint feedback shown
  - Scene 4: Hesitation decision (variant: "hesitation")
  - Scene 5: Final crossroad (variant: "crossroad") - May branch conditionally
- **16 Possible Endings**: Determined by six-dimensional scores, not choice trees
  - E1-E14: Standard endings based on dimensional thresholds
  - E15-E16: Secret endings for balanced/extreme scores (<5% frequency target)

### Dimensional Scoring System

**Six Emotional Dimensions:**

- **honesty**: Willingness to be truthful vs. protective/avoidant
- **vulnerability**: Openness to emotional risk vs. self-protection
- **hope**: Optimism about the future vs. pessimism/resignation
- **selfWorth**: Self-value and confidence vs. self-doubt
- **action**: Proactiveness and agency vs. passivity/inertia
- **compassion**: Care for others vs. self-focus

**Score Ranges:** Typically -6 to +6 per dimension
**Score Assignment:** Each choice modifies 0-3 dimensions by ±1 to ±3 points
**Ending Evaluation:** Priority-ordered conditions check scores to determine 1 of 16 endings

### Heart Type Results (16 Endings)

1. **E1: The Brave Heart** - High honesty, high vulnerability
2. **E2: The Quiet Protector** - Low vulnerability, moderate hope
3. **E3: The Heart That Waits** - Negative action, positive vulnerability
4. **E4: The Hopeful Believer** - High hope
5. **E5: The Lonely Companion** - Low selfWorth, low compassion
6. **E6: The Open Heart** - Positive vulnerability, positive hope
7. **E7: The Guarded Soul** - Low vulnerability, low hope
8. **E8: The Quiet Dreamer** - Negative action, positive hope
9. **E9: The Growing Soul** - High action, high compassion
10. **E10: The Mirror Seeker** - High honesty, high selfWorth
11. **E11: The Forgiver** - High compassion, moderate honesty
12. **E12: The Passionate Wanderer** - High action, low vulnerability
13. **E13: The Peaceful One** - High selfWorth, balanced scores
14. **E14: The Shadow Holder** - Default/fallback
15. **E15: The Unnamed Heart** - SECRET: All dimensions balanced within ±1
16. **E16: The Heart Between Worlds** - SECRET: High variance across dimensions

### Scene Variants

- **story**: Normal narrative moments with choices
- **tension**: Moments of emotional pressure
- **hesitation**: Critical decision points
- **crossroad**: Final defining choices

### Key Data Structures

```typescript
// Scene structure
interface Scene {
  id: SceneId; // e.g., "A1", "B3", "END_C1"
  variant: StorySceneVariant;
  text: string;
  choices: Choice[];
  illustrationSrc?: string; // Unsplash image URL
  result?: string; // For ending scenes only
}

// Result data structure
interface ResultData {
  title: string;
  reflection: string;
  closing: string;
  gradientClass: string;
  textColorClass: string;
  decorationType: "petals" | "sparkles" | "cloud" | "none";
}
```

## Important Constraints

- **Single Session**: No persistence layer; experience is ephemeral
- **No Backend**: Entirely client-side application
- **Image Dependencies**: Relies on Unsplash URLs for scene illustrations
- **Mobile-First**: Designed for responsive display but primarily mobile-oriented
- **Browser Compatibility**: Modern browsers supporting ES6+ features
- **Performance**: Must load quickly for emotional impact; minimal bundle size preferred

## External Dependencies

- **Unsplash**: Scene illustration images from unsplash.com (used under Unsplash license)
- **shadcn/ui**: UI components used under MIT license
- **Figma**: Original design available at https://www.figma.com/design/6EsKOPPuenRNl6Or5dqCBd/Untitled
- **Google Analytics 4**: Privacy-first event tracking (user consent required)
  - Measurement ID: G-0TL6RM3JRG
  - IP anonymization enabled
  - No automatic page views
  - localStorage consent management
- **Buy Me a Coffee**: Creator support widget (buymeacoffee.com/hasnainrafiq)
- **No CDN**: All assets bundled with Vite

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- **Dev Tool**: Access Score Balance Tool via `?dev=scoring` URL parameter

## Recent Changes

### Implemented Features

- **✅ Dimensional Scoring Engine** (February 2026)
  - Impact: BREAKING - Major architectural change
  - Summary: Replaced 9-ending branching narrative with 16-ending dimensional scoring system
  - Dimensions: 6-dimensional emotional profiling (honesty, vulnerability, hope, selfWorth, action, compassion)
  - Features: 2 secret endings, subtle score feedback UI, priority-based ending matcher, Score Balance Tool
  - Analytics: Privacy-first GA4 integration with explicit consent, 9 custom events
  - User Feedback: Optional feedback collection on Ending screen with text sharing consent
  - Monetization: Buy Me a Coffee widget integration
  - Dev Tools: Score Balance Tool for testing ending reachability and distribution
  - See: `openspec/changes/add-dimensional-scoring-engine/` for full details

## Future Considerations

- Enhance result sharing functionality (social media cards with custom graphics)
- Add accessibility improvements (ARIA labels, comprehensive keyboard navigation)
- Animation preferences for reduced motion
- Multi-language support for international audience
- Story content versioning and A/B testing
- Additional paths or branching scenarios
- More granular dimensional feedback

## Pending Changes

### Active Proposals

None currently
