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

1. **Scene Count Per Path**: Should all 3 paths have the same number of scenes (e.g., all 8 scenes) or vary by path complexity?
   - **Consideration**: Uniform length ensures consistent experience; variable length allows narrative flexibility

2. **Audio File Source**: Should we:
   - Use royalty-free music from services like Epidemic Sound/Artlist (requires licensing)
   - Commission original music (higher cost, full ownership)
   - Use Creative Commons music from Free Music Archive/YouTube Audio Library (free, attribution required)
   
3. **Particle Effect Complexity**: How computationally intensive should particle effects be?
   - **Light**: 10-20 particles, simple shapes, 60fps on all devices
   - **Medium**: 30-50 particles, varied shapes, 60fps on desktop/45fps mobile
   - **Heavy**: 100+ particles, complex physics, may impact older devices

4. **Gradient Animation Style**: What aesthetic direction for animated backgrounds?
   - **Subtle shifts**: Slow 30-60 second gradients (calm, meditative)
   - **Dynamic waves**: Flowing wave-like gradient movements (energetic, modern)
   - **Scene-specific**: Different animation styles per emotional tone (most complex)

5. **Music Transition Strategy**: How should music themes change?
   - **Score-triggered**: Music changes when dimensional scores cross thresholds
   - **Scene-based**: Each scene has predefined music theme
   - **Path-based**: Each path (A/B/C) has its own consistent theme

6. **Content Expansion Strategy**: How to add 2-5 scenes per path?
   - **Distribute evenly**: Add 1 scene after each existing scene
   - **Front-load**: Add 2-3 scenes early to establish mood, then proceed
   - **Mid-journey focus**: Add scenes around the midpoint (tension/hesitation)

7. **Performance Budget**: What are acceptable performance targets?
   - **Initial load**: < 3 seconds on 4G connection
   - **Scene transitions**: < 300ms for smooth UX
   - **Animation framerate**: 60fps on desktop, 45fps+ on mobile
   - **Audio loading**: Progressive/lazy loading vs. preload all themes

8. **Accessibility**: How to handle animations/audio for users with preferences?
   - **Motion**: Respect `prefers-reduced-motion` CSS media query
   - **Audio**: Default muted vs. default playing (with easy mute)
   - **Focus management**: Ensure animations don't interfere with screen readers
