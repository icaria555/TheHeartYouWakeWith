# Audio System Testing Checklist ✅

## Quick Test (5 minutes)

### 1. Basic Audio Playback

- [ ] Open http://localhost:5174 in browser
- [ ] Accept consent dialog (includes audio permission)
- [ ] Select **Path A** (Relationship with plans)
- [ ] **Verify**: Hopeful music starts playing with 2-second fade-in
- [ ] **Verify**: AudioControls button appears in top-right corner (unmuted icon)
- [ ] Click through 2-3 scenes
- [ ] **Verify**: Music continues seamlessly (no cuts or interruptions)

### 2. Mute/Unmute Controls

- [ ] Click the AudioControls button (top-right)
- [ ] **Verify**: Music fades out/mutes
- [ ] **Verify**: Icon changes to muted state
- [ ] Click again to unmute
- [ ] **Verify**: Music fades back in
- [ ] **Verify**: Icon returns to unmuted state

### 3. Persistence

- [ ] Mute the audio
- [ ] Refresh the page (Cmd+R / Ctrl+R)
- [ ] Go through consent → select path
- [ ] **Verify**: Audio starts muted (remembers your preference)

### 4. Other Paths

- [ ] Restart journey
- [ ] Select **Path B** (Relationship without plans)
- [ ] **Verify**: Reflective music plays (different from Path A)
- [ ] Restart again
- [ ] Select **Path C** (Single/independent)
- [ ] **Verify**: Melancholic/peaceful music plays (different from A and B)

---

## Comprehensive Test (15 minutes)

### Audio Loading

- [ ] Open browser DevTools (F12)
- [ ] Go to Network tab
- [ ] Filter by "audio" or "mp3"
- [ ] Select a path
- [ ] **Verify**: Correct MP3 file loads (path-a-hopeful.mp3, path-b-reflective.mp3, or path-c-melancholic.mp3)
- [ ] Check file size (should be ~1-1.5 MB)
- [ ] **Verify**: No 404 errors in console

### Fade Transitions

- [ ] Select any path with audio unmuted
- [ ] Use a timer or count "one-thousand-one, one-thousand-two"
- [ ] **Verify**: Fade-in takes approximately 2 seconds
- [ ] Complete the journey to ending
- [ ] **Verify**: Fade-out takes approximately 2 seconds

### Seamless Looping

- [ ] Play through a path, let audio loop 3+ times
- [ ] Listen carefully at loop point
- [ ] **Verify**: No gap, click, or pop between loops
- [ ] **Verify**: Loop is seamless and imperceptible

### Analytics Tracking

- [ ] Open browser DevTools → Console
- [ ] Accept consent and select a path
- [ ] Look for console log: `"GA4 Event: audio_enabled"`
- [ ] Mute audio
- [ ] Look for console log: `"GA4 Event: audio_muted"`
- [ ] Unmute audio
- [ ] Look for console log: `"GA4 Event: audio_unmuted"`

### LocalStorage Persistence

- [ ] Open DevTools → Application tab → Storage → Local Storage
- [ ] Check for these keys:
  - [ ] `audioConsent` = "true" (after accepting consent)
  - [ ] `audioVolume` = "1" (or current volume)
  - [ ] `audioMuted` = "false" or "true" (based on mute state)

### Consent Flow

- [ ] Clear localStorage (DevTools → Application → Clear storage)
- [ ] Refresh page
- [ ] **Verify**: Consent dialog appears with audio section
- [ ] **Verify**: Heading says "Enhance Your Experience"
- [ ] **Verify**: Audio description mentions "background music enhances the emotional journey"
- [ ] Click "I Understand"
- [ ] **Verify**: `audioConsent="true"` saved to localStorage

---

## Browser Compatibility (30 minutes)

### Desktop Browsers

- [ ] **Chrome/Edge**: Test full flow
  - [ ] Audio plays after consent
  - [ ] Controls work
  - [ ] No console errors
- [ ] **Firefox**: Test full flow
  - [ ] Audio plays after consent
  - [ ] Controls work
  - [ ] No console errors
- [ ] **Safari**: Test full flow
  - [ ] Audio plays after consent (after user interaction)
  - [ ] Web Audio API works
  - [ ] No autoplay blocking issues

### Mobile Browsers

- [ ] **iOS Safari** (iPhone/iPad):
  - [ ] Accept consent → select path
  - [ ] **Verify**: Audio plays (not blocked by autoplay policy)
  - [ ] Test mute/unmute
  - [ ] **Verify**: No distortion or performance issues
- [ ] **Android Chrome**:
  - [ ] Accept consent → select path
  - [ ] **Verify**: Audio plays smoothly
  - [ ] Test mute/unmute
  - [ ] **Verify**: No lag or stuttering

---

## Accessibility Test (10 minutes)

### Screen Reader

- [ ] Enable screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Navigate to AudioControls button
- [ ] **Verify**: Button is announced with label "Mute audio" or "Unmute audio"
- [ ] **Verify**: Current state is clear

### Keyboard Navigation

- [ ] Use Tab key to navigate to AudioControls button
- [ ] **Verify**: Focus indicator visible
- [ ] Press Enter or Space
- [ ] **Verify**: Mute/unmute toggles

### Reduced Motion

- [ ] Enable reduced motion:
  - macOS: System Settings → Accessibility → Display → Reduce Motion
  - Windows: Settings → Ease of Access → Display → Show animations
- [ ] Refresh page and test
- [ ] **Verify**: AudioControls button animations disabled/reduced
- [ ] **Verify**: No jarring pulse animation
- [ ] **Verify**: Functionality still works

---

## Performance Test (10 minutes)

### Load Time

- [ ] Open DevTools → Network tab
- [ ] Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
- [ ] Check "Finish" time at bottom
- [ ] **Target**: Page loads in < 3 seconds on fast connection
- [ ] **Verify**: Audio files load progressively (not blocking initial render)

### FPS During Audio

- [ ] Open DevTools → Performance Monitor (Cmd+Shift+P → "Show Performance Monitor")
- [ ] Select a path and let audio play
- [ ] Click through scenes with animations
- [ ] **Verify**: FPS stays at 60 (or close) with audio playing
- [ ] **Verify**: No frame drops during fade-in/fade-out

### Memory Usage

- [ ] Open DevTools → Performance tab
- [ ] Record a full journey with audio
- [ ] Stop recording
- [ ] **Verify**: No memory leaks (sawtooth pattern is normal)
- [ ] **Verify**: Memory returns to baseline after restart

---

## Edge Cases (10 minutes)

### Missing Audio Consent

- [ ] Clear localStorage
- [ ] Refresh page
- [ ] Decline consent dialog
- [ ] Select a path
- [ ] **Verify**: No audio plays
- [ ] **Verify**: No console errors
- [ ] **Verify**: AudioControls button does NOT appear

### Network Failure Simulation

- [ ] Open DevTools → Network tab
- [ ] Set throttling to "Offline"
- [ ] Refresh page
- [ ] Accept consent → select path
- [ ] **Verify**: Graceful error handling (no crashes)
- [ ] Re-enable network
- [ ] **Verify**: Audio loads if you restart journey

### Multiple Tabs

- [ ] Open app in two browser tabs
- [ ] Accept consent in both
- [ ] Select different paths in each tab
- [ ] **Verify**: Each tab plays its own audio independently
- [ ] **Verify**: No audio conflicts or stuttering

### Journey Restart

- [ ] Start a journey with audio playing
- [ ] Click "Start Over" button
- [ ] **Verify**: Audio stops/fades out
- [ ] **Verify**: No audio continues playing in background
- [ ] Select a new path
- [ ] **Verify**: New audio starts cleanly

---

## Final Checks

### Audio Quality

- [ ] Listen with headphones
- [ ] **Verify**: No compression artifacts (hissing, warbling)
- [ ] **Verify**: 128kbps quality sounds acceptable
- [ ] **Verify**: Emotional tone matches path theme

### Attribution

- [ ] Check if ATTRIBUTIONS.md needs update
- [ ] **Add**: Track titles, artist names, Epidemic Sound license info
- [ ] **Add**: License validity dates
- [ ] **Verify**: All legal requirements met

---

## 🎯 Success Criteria

All tests should pass with:

- ✅ Audio plays on all 3 paths
- ✅ Fade-in/fade-out works smoothly (2 seconds)
- ✅ Controls respond immediately
- ✅ Mute state persists across sessions
- ✅ No console errors or 404s
- ✅ Works on iOS Safari and Android Chrome
- ✅ Graceful handling when consent declined
- ✅ No memory leaks or performance issues
- ✅ Accessibility features work (keyboard, screen reader, reduced motion)

---

## 📝 Report Issues

If you find any issues, note:

1. **What happened** (expected vs actual behavior)
2. **Browser & OS** (e.g., Chrome 120 on macOS 14)
3. **Console errors** (copy from DevTools)
4. **Steps to reproduce**

---

**Estimated Total Testing Time**: 1-1.5 hours for comprehensive coverage

**Quick Test Only**: 5-10 minutes to verify basic functionality
