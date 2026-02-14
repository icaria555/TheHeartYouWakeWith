# The Heart You Wake With

An interactive narrative experience exploring love, vulnerability, and self-worth through dimensional emotional profiling. Created for Valentine's Day 2026.

## 🎭 About

"The Heart You Wake With" is an introspective journey that adapts to your emotional choices, leading to one of 16 unique "heart type" results. Unlike traditional branching narratives, this experience uses a six-dimensional scoring system to evaluate your responses across:

- **Honesty** - Truth vs. protection
- **Vulnerability** - Openness vs. guardedness
- **Hope** - Optimism vs. resignation
- **Self-Worth** - Confidence vs. doubt
- **Action** - Agency vs. passivity
- **Compassion** - Empathy vs. self-focus

Your choices shape your dimensional profile, which determines your ending through sophisticated conditional logic rather than predetermined paths.

## ✨ Features

- **16 Unique Endings**: Including 2 secret endings for balanced or extreme emotional states
- **3 Story Paths**: Relationship with plans (8 scenes), relationship without plans (9 scenes), or single (7 scenes)
- **Immersive Experience**: ~7-10 minute contemplative journey with ambient music and animated backgrounds
- **Dimensional Scoring**: Nuanced emotional profiling across 6 psychological axes
- **Path-Based Audio**: Ambient background music tailored to each relationship journey (hopeful, reflective, or melancholic themes)
- **Visual Atmosphere**: Subtle gradient animations and particle effects create a meditative aesthetic
- **Subtle Feedback**: Evocative phrases at the midpoint reflect your dominant emotional tendency
- **Privacy-First Analytics**: Optional tracking with explicit consent and full control
- **User Feedback**: Share your thoughts with optional text contribution
- **Creator Support**: Buy Me a Coffee widget for supporting the creator

## 🚀 Running the Code

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🎯 Ending Distribution & Mechanics

### How Endings Work

Unlike choice-tree narratives where specific paths lead to predetermined endings, this experience evaluates your **accumulated dimensional scores** at the story's conclusion. Each ending has unique conditional requirements:

**Examples**:

- **E1: The Brave Heart** requires high honesty AND high vulnerability
- **E4: The Hopeful Believer** requires very high hope (any other scores)
- **E15: The Unnamed Heart** (SECRET) requires ALL dimensions balanced within ±1

### Target Distribution

The system is designed for balanced ending reachability:

- ✅ All 16 endings reachable from any starting path
- ✅ No ending should appear >30% of the time
- ✅ Secret endings (E15, E16) appear <5% (rare by design)
- ✅ Most common ending should be <25% for variety

### The 16 Heart Types

1. **The Brave Heart** - Chooses truth despite fear
2. **The Quiet Protector** - Guards feelings carefully
3. **The Heart That Waits** - Patient with own timing
4. **The Hopeful Believer** - Trusts in possibilities
5. **The Lonely Companion** - Loyal despite loneliness
6. **The Open Heart** - Ready for connection
7. **The Guarded Soul** - Cautious from experience
8. **The Quiet Dreamer** - Hopeful but still
9. **The Growing Soul** - Active and compassionate
10. **The Mirror Seeker** - Honest self-reflection
11. **The Forgiver** - Grace and understanding
12. **The Passionate Wanderer** - Free and guarded
13. **The Peaceful One** - Self-assured balance
14. **The Shadow Holder** - Carrying unseen weight
15. **The Unnamed Heart** 🔒 SECRET - Perfect balance
16. **The Heart Between Worlds** 🔒 SECRET - Beautiful contradiction

## 🛠️ Development Tools

### Score Balance Tool

Access via `?dev=scoring` URL parameter (e.g., `http://localhost:5173/?dev=scoring`).

A comprehensive development utility for validating the dimensional scoring system:

- **Interactive Builder**: Step through any path, see scores update in real-time
- **Ending Coverage**: Run exhaustive analysis to verify all 16 endings are reachable
- **Path Analysis**: Detect distribution imbalances and dominant endings
- **Analytics Tab**: View tracking configuration and consent status
- **Export/Import**: Save choice sequences as JSON for regression testing

**Use Cases**:

- Test new story content
- Validate score assignments
- Ensure balanced ending distribution
- Debug conditional logic
- Verify analytics tracking

See `src/dev/TESTING.md` for complete testing guide.

## 📊 Analytics & Privacy

### What We Track (With Your Consent)

When you grant analytics consent, we collect:

- Path selections (A, B, or C)
- Choices made and their dimensional impacts
- Final ending reached
- Dimensional scores at key moments
- Optional user feedback (with separate text sharing consent)

### What We Don't Track

- ❌ No personally identifiable information
- ❌ No IP addresses (anonymized by Google Analytics)
- ❌ No cross-site tracking
- ❌ No automatic page views
- ❌ No data collection without explicit consent

### Privacy Controls

- **Consent Dialog**: Appears on first visit
- **Settings Menu**: Access via gear icon on landing page
- **Three Options**:
  - ✅ Enable Analytics
  - ❌ Disable Analytics
  - 🔄 Reset (clears consent choice)
- **Full Control**: Change preferences anytime
- **Transparent**: Clear explanation of what's collected

### Technical Details

- Platform: Google Analytics 4 (GA4)
- Measurement ID: `G-0TL6RM3JRG`
- Storage: Consent stored in `localStorage` only
- IP Anonymization: Enabled
- Compliance: Privacy-first design

## 💝 Creator Support

This experience is free to use. If you'd like to support the creator, you can [buy them a coffee](https://buymeacoffee.com/hasnainrafiq).

The Buy Me a Coffee widget appears on the ending screen and is fully optional.

## 🏗️ Technical Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Animation**: Motion (Framer Motion fork)
- **Audio**: Web Audio API with progressive loading
- **UI Components**: Radix UI + shadcn/ui
- **Analytics**: Google Analytics 4
- **Icons**: Lucide React
- **Images**: Unsplash
- **Music**: Epidemic Sound (licensed)

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx              # Main orchestration
│   ├── screens/             # Full-page views
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── AudioControls.tsx
│   │   └── ParticleEffect.tsx
│   └── data/                # Story content & results
├── dev/
│   ├── ScoreBalanceTool.tsx # Score validation tool
│   └── TESTING.md           # Testing guide
├── lib/
│   ├── scoringEngine.ts     # Dimensional scoring system
│   ├── audioManager.ts      # Path-based audio system
│   ├── analytics.ts         # GA4 integration
│   └── utils.ts
├── types/
│   └── audio.ts             # Audio type definitions
└── styles/                  # Global styles + backgrounds
```

## 📖 Documentation

- **Scoring Engine API**: See code comments in `src/lib/scoringEngine.ts`
- **Score Assignment Strategy**: `guidelines/SCORE_ASSIGNMENT_STRATEGY.md`
- **Project Context**: `openspec/project.md`
- **Change Proposal**: `openspec/changes/add-dimensional-scoring-engine/`
- **Testing Guide**: `src/dev/TESTING.md`

## 🤝 Contributing

This project uses the OpenSpec workflow for structured changes. See `openspec/AGENTS.md` for conventions.

Before making changes:

1. Review existing documentation
2. Test with Score Balance Tool
3. Ensure all 16 endings remain reachable
4. Follow score assignment guidelines
5. Build successfully with no errors

## 📄 License

Original design: [Figma](https://www.figma.com/design/6EsKOPPuenRNl6Or5dqCBd/Untitled)

UI components based on shadcn/ui (MIT License)

Images from Unsplash (Unsplash License)

## 🎨 Design Philosophy

This experience aims to:

- Provide meaningful self-reflection, not superficial quizzes
- Honor emotional complexity (no "good" or "bad" endings)
- Respect user privacy with transparent data practices
- Create replayability through varied outcomes
- Balance accessibility with depth

## 🐛 Known Limitations

- No data persistence (single-session experience)
- English only (currently)
- Modern browser required (ES6+ features)
- Client-side only (no backend)
- Image dependencies on Unsplash URLs

## 🔮 Future Possibilities

- Multi-language support
- Social sharing with custom graphics
- Additional story paths or seasons
- Enhanced accessibility features
- Offline support (PWA)
- More granular dimensional feedback

---

**Created with care for Valentine's Day 2026**  
_What heart will you wake with?_
