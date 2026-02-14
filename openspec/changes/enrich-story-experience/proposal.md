# Change: Enrich Story Experience with Expanded Journey and Immersive Design

## Why

The current user experience has several limitations that reduce emotional impact and engagement:

1. **Generic Opening**: The "Who are you today?" question feels disconnected from the Valentine's Day theme and "The Heart You Wake With" concept
2. **Plain Visual Design**: The white/gray backgrounds (bg-gray-50) lack emotional depth and visual interest
3. **Short Journey**: Only 5 scenes per path feels rushed for exploring "the meaning of love" - users need more space for self-reflection
4. **Static Experience**: Lack of ambient sound and subtle animations makes the experience feel flat and less immersive
5. **Disconnected Theme**: Current questions don't consistently explore love's meaning in a way that resonates with the poetic title

Users deserve a richer, more contemplative journey that matches the sophistication of the dimensional scoring system and creates a memorable Valentine's Day experience.

## What Changes

### Content Expansion

- **Expand from 5 to 7-10 scenes per path** to give users more time for introspection
- **Rewrite opening question** from "Who are you today?" to **"What kind of Valentine's morning rises inside your heart today?"**
- **Enhance scene narratives** to better explore love's meaning (romantic, self-love, familial, lost love, hope for love)
- **Add transitional moments** between major emotional beats to improve pacing

### Visual Enhancement

- **Replace plain backgrounds** with animated gradient backgrounds that subtly shift based on emotional tone
- **Add particle effects** (floating hearts, light particles, or abstract shapes) that respond to scene mood
- **Keep thematic illustrations** but layer them with animated gradients for depth
- **Implement smooth page transitions** with motion effects between scenes
- **Add subtle micro-animations** to choice buttons (hover, selection, reveal)

### Audio Design

- **Add ambient background music** with 2-3 musical themes for different emotional tones:
  - Hopeful/romantic theme
  - Melancholic/reflective theme
  - Peaceful/contemplative theme
- **Implement audio controls** allowing users to mute/unmute at any time (settings icon or toggle)
- **Music crossfades** between themes based on dimensional score shifts
- **Store audio preference** in localStorage for session persistence

### User Experience

- **Audio consent on first visit** (similar to analytics consent)
- **Accessible controls** for audio management
- **Performance optimization** to ensure smooth animations and music don't impact load times
- **Mobile-optimized** animations and audio (reduced particle count on mobile, efficient audio loading)

### Breaking Changes

- **BREAKING**: `STORY_DATA` structure expands significantly (15-30 new scenes across all paths)
- **BREAKING**: Scene progression logic must accommodate variable scene counts per path
- **BREAKING**: Background styling changes from static `bg-gray-50` to dynamic gradient system
- **POSSIBLE BREAKING**: Choice data structure may need additional metadata for audio/visual cues

## Impact

### Affected Capabilities

- `narrative-engine` (modified) - Expanded scene count, new content that deepens emotional exploration
- `story-navigation` (modified) - Handle variable-length paths, new transition animations
- `user-feedback` (modified) - Enhanced with ambient audio feedback
- `visual-design` (new) - Animated gradients, particle effects, micro-animations system
- `audio-system` (new) - Background music, audio controls, theme management
- `performance` (modified) - Optimization for animations, audio, and particle effects

### Affected Code

- `src/app/data/storyData.ts` (heavy modification) - Add 15-30 new scenes, rewrite opening, expand narratives
- `src/app/screens/RelationshipSelection.tsx` (modified) - Update opening question text and visual design
- `src/app/screens/StoryScene.tsx` (modified) - Add animated backgrounds, particle effects, transition animations
- `src/app/screens/Landing.tsx` (modified) - Add audio consent dialog option
- `src/app/App.tsx` (modified) - Audio state management, theme switching logic
- `src/lib/audioManager.ts` (new) - Audio loading, theme management, crossfade logic
- `src/components/ParticleEffect.tsx` (new) - Canvas-based or CSS-based particle system
- `src/components/AnimatedBackground.tsx` (new) - Gradient animation component with theme support
- `src/components/AudioControls.tsx` (new) - Mute/unmute toggle component
- `src/styles/backgrounds.css` (new) - Animated gradient definitions and keyframes
- `public/audio/` (new) - Audio asset directory for music themes

### User-Visible Changes

- **Immediate**: Opening question changes to more poetic/thematic phrasing
- **Visual**: Every scene has a richly animated background instead of plain white/gray
- **Duration**: Journey takes 7-10 minutes instead of 3-5 minutes (40-100% longer)
- **Immersion**: Ambient music creates emotional atmosphere throughout experience
- **Polish**: Smooth transitions and subtle animations enhance professionalism

## Open Questions

1. **Scene Count Per Path**: ✅ **RESOLVED** - Paths will vary slightly (7-9 scenes) to fit narrative complexity:
   - Path A: 8 scenes (balanced relationship journey)
   - Path B: 9 scenes (most complex, relationship without plans needs deeper exploration)
   - Path C: 7 scenes (single perspective, more direct introspection)
   - **Rationale**: Provides narrative flexibility while maintaining consistent 7-10 minute experience

2. **Audio File Source**: ✅ **RESOLVED** - Will use **Epidemic Sound**:
   - Provides high-quality royalty-free music library
   - Requires subscription/licensing (ensure active license before deployment)
   - No attribution required in-app (per Epidemic Sound terms)
   - Wide selection allows finding tracks that match emotional themes
   - **Action Required**: Secure Epidemic Sound license before production deployment

3. **Particle Effect Complexity**: ✅ **RESOLVED** - Will use **Light** implementation:
   - 10-20 particles maximum
   - Simple shapes (circles, hearts)
   - Target 60fps on all devices
   - **Rationale**: Prioritizes accessibility and performance across all devices while maintaining visual interest. Ensures smooth experience even on older mobile devices without sacrificing the immersive effect.

4. **Gradient Animation Style**: ✅ **RESOLVED** - Will use **Subtle shifts**:
   - Slow 30-60 second gradient transitions
   - Calm, meditative aesthetic
   - **Rationale**: Aligns with the contemplative, introspective nature of "The Heart You Wake With" journey. Creates a soothing backdrop that enhances reflection without distracting from the narrative content.

5. **Music Transition Strategy**: ✅ **RESOLVED** - Will use **Path-based** approach:
   - Each path (A/B/C) has its own consistent musical theme
   - Theme plays throughout the entire journey for that path
   - **Rationale**: Simplest implementation, most predictable for users, and creates a cohesive sonic identity for each relationship journey type. Avoids jarring transitions mid-journey and allows for thoughtful music selection that matches each path's overall emotional arc.

6. **Content Expansion Strategy**: ✅ **RESOLVED** - Will use **Mid-journey focus**:
   - Add new scenes around the midpoint of each path
   - Focus on moments of tension, hesitation, or deeper reflection
   - **Rationale**: This allows the journey to establish its foundation quickly, then deepen emotional complexity where it matters most. The middle is where users are most engaged and ready for nuanced exploration. Maintains strong opening and closing while enriching the core contemplative space.

7. **Performance Budget**: ✅ **RESOLVED** - Performance targets set:
   - **Initial load**: < 3 seconds on 4G connection
   - **Scene transitions**: < 300ms for smooth UX
   - **Animation framerate**: 60fps on desktop, 45fps+ on mobile
   - **Audio loading**: Progressive/lazy loading (load audio for current path only, after user selection)
   - **Rationale**: These targets ensure a professional, responsive experience across all devices. Progressive audio loading prevents initial load bloat and only downloads the single music theme needed for the user's chosen path, optimizing bandwidth usage.

8. **Accessibility**: ✅ **RESOLVED** - Accessibility approach defined:
   - **Motion**: Respect `prefers-reduced-motion` CSS media query (disable/reduce animations for users who prefer reduced motion)
   - **Audio**: Default playing with easy mute toggle (respects audio consent, allows immediate control)
   - **Focus management**: Ensure animations don't interfere with screen readers (maintain proper ARIA labels and focus indicators)
   - **Rationale**: Balances immersive experience with accessibility needs. Auto-playing audio creates immediate atmosphere while respecting user consent (from landing page) and providing instant mute access. Motion sensitivity is fully respected through system preferences, and screen reader compatibility is maintained throughout.
