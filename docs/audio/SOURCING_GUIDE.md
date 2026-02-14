# Epidemic Sound Track Sourcing Guide

🎉 **License Secured!** Now let's get the perfect tracks for each emotional path.

## Track Requirements

### Path A: Hopeful Morning (path-a-hopeful.mp3)

**Emotional Profile:** Optimistic, warm, romantic, gentle  
**Use Case:** Relationship with Valentine's plans - users feeling hopeful about love

**Recommended Search Terms on Epidemic Sound:**

- "hopeful acoustic"
- "warm piano love"
- "gentle optimistic"
- "romantic morning"
- "tender valentine"

**Musical Characteristics:**

- Tempo: 80-100 BPM (moderate, not rushed)
- Instruments: Acoustic guitar, piano, soft strings, light percussion
- Key: Major keys (C, G, D major for warmth)
- Mood: Uplifting but gentle, emotionally open
- Duration: 60-90 seconds loop

**Example Artists/Styles:**

- Similar to: Ólafur Arnalds (calm piano), Ben Lukas Boysen (ambient warmth)
- Avoid: Overly bright/cheery, high energy, dramatic builds

---

### Path B: Quiet Reflection (path-b-reflective.mp3)

**Emotional Profile:** Contemplative, uncertain, melancholic yet hopeful  
**Use Case:** Relationship without plans - users feeling forgotten or uncertain

**Recommended Search Terms on Epidemic Sound:**

- "contemplative piano"
- "melancholic acoustic"
- "reflective ambient"
- "quiet introspection"
- "emotional uncertainty"

**Musical Characteristics:**

- Tempo: 60-80 BPM (slower, thoughtful)
- Instruments: Solo piano, ambient pads, minimal strings, subtle electronic textures
- Key: Minor keys (A minor, D minor for introspection)
- Mood: Bittersweet, yearning, questioning
- Duration: 60-90 seconds loop

**Example Artists/Styles:**

- Similar to: Nils Frahm (minimalist piano), Max Richter (emotional ambient)
- Avoid: Too sad/depressing, harsh sounds, aggressive dynamics

---

### Path C: Peaceful Solitude (path-c-melancholic.mp3)

**Emotional Profile:** Independent, introspective, melancholic yet peaceful  
**Use Case:** Single/no relationship - users finding peace in solitude or longing for connection

**Recommended Search Terms on Epidemic Sound:**

- "peaceful solitude"
- "melancholic calm"
- "soft ambient meditation"
- "introspective piano"
- "gentle loneliness"

**Musical Characteristics:**

- Tempo: 50-70 BPM (very slow, meditative)
- Instruments: Soft piano, ambient drones, nature sounds (optional), celeste
- Key: Minor keys (E minor, B minor for depth)
- Mood: Peaceful yet tinged with longing, acceptance, self-reflection
- Duration: 60-90 seconds loop

**Example Artists/Styles:**

- Similar to: Jóhann Jóhannsson (cinematic minimalism), Hildur Guðnadóttir (emotional depth)
- Avoid: Too sparse/empty, overly sad, new age clichés

---

## Step-by-Step Process

### 1. Search on Epidemic Sound

1. Log into your Epidemic Sound account
2. Use the search terms above
3. Filter by:
   - **Duration**: 1-2 minutes (or longer tracks you can loop)
   - **Mood**: Match the profiles above
   - **Genre**: Ambient, Cinematic, Acoustic
4. Listen to previews with headphones
5. Test each track by imagining reading the story scenes

### 2. Download & Prepare

For each selected track:

1. **Download** the highest quality version available (WAV preferred)
2. **Trim** to 60-90 seconds if longer (use seamless loop point)
3. **Fade in/out** at loop point (1-2 second crossfade for seamless loop)
4. **Test** the loop by playing 3+ times - should be imperceptible

**Tools:**

- **macOS**: GarageBand, Logic Pro X, or Audacity (free)
- **Windows**: Audacity (free), FL Studio, Ableton Live
- **Online**: TwistedWave Audio Editor

### 3. Optimize for Web

Use FFmpeg or Audacity to convert:

```bash
# Install FFmpeg (if not already installed)
# macOS: brew install ffmpeg
# Windows: Download from ffmpeg.org

# Convert to 128kbps MP3 (good quality, small size)
ffmpeg -i original-track.wav -b:a 128k -ar 44100 path-a-hopeful.mp3
ffmpeg -i original-track.wav -b:a 128k -ar 44100 path-b-reflective.mp3
ffmpeg -i original-track.wav -b:a 128k -ar 44100 path-c-melancholic.mp3

# Optional: Create OGG fallback for older browsers
ffmpeg -i path-a-hopeful.mp3 -c:a libvorbis -q:a 4 path-a-hopeful.ogg
ffmpeg -i path-b-reflective.mp3 -c:a libvorbis -q:a 4 path-b-reflective.ogg
ffmpeg -i path-c-melancholic.mp3 -c:a libvorbis -q:a 4 path-c-melancholic.ogg
```

**Target Specs:**

- Format: MP3
- Bitrate: 128 kbps
- Sample Rate: 44.1 kHz
- Channels: Stereo
- Size: ~1-1.5 MB per file

### 4. Add to Project

1. Place the 3 MP3 files in:

   ```
   /public/audio/
   ├── path-a-hopeful.mp3
   ├── path-b-reflective.mp3
   └── path-c-melancholic.mp3
   ```

2. Test file paths by navigating to:
   - `http://localhost:5173/audio/path-a-hopeful.mp3`
   - `http://localhost:5173/audio/path-b-reflective.mp3`
   - `http://localhost:5173/audio/path-c-melancholic.mp3`

### 5. Test in Application

1. Start dev server: `npm run dev`
2. Accept consent dialog (includes audio)
3. Select each path and verify:
   - ✅ Audio loads without errors
   - ✅ Fade-in occurs smoothly (2 seconds)
   - ✅ Loop is seamless (no gap/click)
   - ✅ Mute/unmute works
   - ✅ Volume persists across browser refresh
   - ✅ Audio stops when restarting journey

### 6. Test on Devices

- **iOS Safari**: Confirm autoplay works after consent
- **Android Chrome**: Verify no audio glitches
- **Desktop**: Test all major browsers (Chrome, Firefox, Safari, Edge)

### 7. Update Attribution

Add to `ATTRIBUTIONS.md`:

```markdown
## Music

All background music licensed from Epidemic Sound.  
License: [Your License Type]  
License Holder: [Your Name/Company]  
License Valid: [Date Range]

- **Path A**: "[Track Title]" by [Artist Name]
- **Path B**: "[Track Title]" by [Artist Name]
- **Path C**: "[Track Title]" by [Artist Name]

Music provided by Epidemic Sound: https://www.epidemicsound.com/
```

---

## Quality Checklist

Before finalizing, verify each track:

- [ ] Matches the emotional profile perfectly
- [ ] 60-90 seconds duration
- [ ] Seamless loop (no clicks, pops, or gaps)
- [ ] 128kbps MP3, ~1-1.5 MB file size
- [ ] Correctly named and placed in `/public/audio/`
- [ ] Tested in dev environment
- [ ] Tested on iOS Safari and Android Chrome
- [ ] Attribution added to ATTRIBUTIONS.md
- [ ] No copyright issues (covered by Epidemic Sound license)

---

## Troubleshooting

**Audio doesn't play:**

- Check console for errors
- Verify file paths are correct
- Ensure consent dialog was accepted
- Try hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

**Loop has a gap:**

- Re-export with crossfade at loop point
- Use audio editor to create seamless loop
- Ensure no silence at start/end of file

**File too large:**

- Reduce bitrate to 96kbps (still acceptable quality)
- Shorten duration to 60 seconds
- Use mono instead of stereo (not recommended for music)

**Autoplay blocked:**

- This is expected behavior - audio only plays after user consent
- iOS Safari requires user interaction - our consent dialog handles this

---

## Estimated Time

- **Searching**: 1-2 hours (listening to multiple options)
- **Downloading & Editing**: 30-60 minutes
- **Optimization**: 15 minutes
- **Testing**: 30 minutes
- **Attribution**: 10 minutes

**Total: 2.5-4 hours** to complete all audio tasks.

---

## Need Help?

**Can't find the right track?**

- Focus on the "mood" rather than genre
- Try instrumentals with "Acoustic" or "Cinematic" tags
- Use Epidemic Sound's "Similar Tracks" feature
- Search by BPM (tempo) to match energy level

**Technical issues with audio editing?**

- Use Audacity (free, cross-platform): https://www.audacityteam.org/
- Tutorial: https://manual.audacityteam.org/man/creating_a_simple_crossfade.html
- For seamless loops: Select 2 seconds at start + end, apply crossfade

**License questions?**

- Check your Epidemic Sound dashboard
- Verify license covers commercial web use
- Keep license receipt/documentation

---

🎵 **Ready to make your story sing!** Take your time finding the perfect tracks - they'll set the emotional tone for thousands of users. ❤️
