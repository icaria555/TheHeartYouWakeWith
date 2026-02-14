# Audio Assets

✅ **Epidemic Sound License: SECURED**

This directory contains background music tracks for the three story paths.

## 📋 Quick Start

1. **Read the sourcing guide**: See [SOURCING_GUIDE.md](./SOURCING_GUIDE.md) for detailed instructions
2. **Download 3 tracks** from Epidemic Sound (2-4 hours)
3. **Optimize to MP3** @ 128kbps
4. **Place files here** with exact naming
5. **Test in dev** (`npm run dev`)
6. **Update attribution** in ATTRIBUTIONS.md

## Required Files

After securing an Epidemic Sound license, add the following files:

1. **path-a-hopeful.mp3** - Path A: Relationship with Valentine's plans
   - Theme: Hopeful, warm, optimistic
   - Duration: 60-90 seconds (seamless loop)
   - Format: MP3 @ 128kbps

2. **path-b-reflective.mp3** - Path B: Relationship without plans
   - Theme: Reflective, contemplative, uncertain
   - Duration: 60-90 seconds (seamless loop)
   - Format: MP3 @ 128kbps

3. **path-c-melancholic.mp3** - Path C: Single/No relationship
   - Theme: Melancholic yet peaceful, introspective
   - Duration: 60-90 seconds (seamless loop)
   - Format: MP3 @ 128kbps

## Optimization

- Compress tracks to 128kbps MP3 for web delivery
- Ensure seamless looping (no gaps or clicks)
- Create OGG fallback for wider browser support (optional)
- Test on iOS Safari and Android Chrome

## Licensing

⚠️ **IMPORTANT**: Epidemic Sound license required before production deployment

- License URL: https://www.epidemicsound.com/
- Licensing type: Commercial use for web applications
- Attribution: Add to ATTRIBUTIONS.md file

## Placeholder Behavior

Until real audio files are added, the audio system will gracefully handle missing files:

- Audio controls will appear but won't play anything
- No errors will be shown to users
- System is ready to work immediately when files are added

## Testing

To test the audio system with placeholder files:

1. Create silent MP3 files (or use royalty-free placeholders)
2. Name them according to the convention above
3. Place them in this directory
4. Audio system will automatically load and play them
