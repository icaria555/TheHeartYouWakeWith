# Privacy & Data Collection

## Our Commitment

"The Heart You Wake With" is designed with privacy as a core principle. We collect minimal data, only with explicit consent, and provide full transparency and control over what is tracked.

## What We Collect (With Your Permission)

### When Analytics is Enabled

If you choose to enable analytics, we collect:

✅ **Journey Data**:

- Which relationship path you selected (A, B, or C)
- Choices you made in each scene
- The ending you reached
- Dimensional scores at key moments (midpoint and ending)

✅ **Engagement Data**:

- When you started the experience
- If you reached the midpoint or ending
- Whether you clicked Share, Restart, or Buy Me a Coffee buttons

✅ **Optional Feedback**:

- Star rating (if you provide it)
- Text feedback (ONLY if you explicitly consent to share it)

### Always Anonymized

🔒 **IP addresses are anonymized** - Google Analytics 4 removes the last octet
🔒 **No personally identifiable information** - We never collect names, emails, or accounts
🔒 **No cross-site tracking** - This data stays within this experience
🔒 **No automatic tracking** - Page views are NOT collected automatically

## What We Don't Collect

❌ Personal information (name, email, phone, etc.)  
❌ Device identifiers  
❌ Location data beyond country-level (from anonymized IP)  
❌ Browsing history  
❌ Session recordings or screenshots  
❌ Any data without your explicit consent

## How We Use Your Data

### Purpose

We use analytics data to:

- Understand which endings are reached most/least often
- Identify if any endings are unreachable (to fix bugs)
- See which dimensional scores are common
- Improve the narrative experience based on patterns
- Understand emotional journey completion rates

### We Do NOT Use Data To:

- Identify individual users
- Track you across websites
- Sell to third parties
- Create advertising profiles
- Make automated decisions about you

## Your Privacy Controls

### Consent Dialog

When you first visit, you'll see a consent dialog explaining what we track. You have three options:

1. ✅ **Enable Analytics** - Help us improve the experience
2. ❌ **Disable Analytics** - No tracking (except consent choice itself)
3. 🔄 **Close Dialog** - Decide later (no tracking until you choose)

Your consent choice is stored locally in your browser (`localStorage`) and never sent to any server.

### Settings Menu

You can change your mind anytime:

1. Click the **⚙️ gear icon** on the landing page
2. View your current consent status (Enabled, Disabled, or Not Set)
3. Choose a different option:
   - **Enable Analytics** - Start tracking
   - **Disable Analytics** - Stop tracking
   - **Reset to Default** - Clear your choice completely

### How to Completely Opt Out

If you want to ensure no analytics tracking:

**Option 1: Use Settings (Recommended)**

1. Open the experience
2. Click the gear icon (⚙️) on the landing page
3. Select "Disable Analytics"
4. Confirmation: Status will show "Disabled" with a red ✗

**Option 2: Clear Browser Data**

1. Clear cookies and localStorage for this site
2. When you return, choose "Disable Analytics" in the consent dialog

**Option 3: Use Browser Extensions**

- Install a tracking blocker (uBlock Origin, Privacy Badger, etc.)
- These will block Google Analytics by default

**Option 4: Browser Settings**

- Enable "Do Not Track" in your browser settings
- Use private/incognito mode (no data persists between sessions)

## Feedback Collection

### Star Ratings

When you reach an ending, you can optionally rate your experience:

- Ratings are anonymous and aggregated
- No consent dialog required (minimal data)
- Helps us understand which endings resonate

### Text Feedback

If you choose to write feedback:

1. **First consent**: Enable analytics (if you haven't already)
2. **Second consent**: Specific checkbox for sharing your text
3. **Your feedback is truncated to 100 characters** before sending
4. **Optional**: You can provide a rating without text

**Example**:

- You write: "This ending really resonated with my experience of..."
- We receive: "This ending really resonated with my experience of..." (first 100 chars max)
- Associated with: Ending ID, dimensional scores, no personally identifying info

### Opting Out of Feedback

- Simply don't fill out the feedback form
- Uncheck the "Share my feedback text" box if you change your mind
- Disable analytics entirely to prevent any feedback submission

## Technical Implementation

### Google Analytics 4

- **Service**: Google Analytics 4 (GA4)
- **Measurement ID**: `G-0TL6RM3JRG`
- **Data Processor**: Google LLC
- **Server Location**: United States (Google's infrastructure)
- **Data Retention**: 14 months (standard GA4 retention)

### Client-Side Only

All consent logic happens in your browser:

- No server-side tracking
- No cookies (except GA4's `_ga` if you enable analytics)
- Consent stored locally only

### Events Tracked

When analytics is enabled, we send these events to Google Analytics:

| Event Name           | When It Fires             | Data Included                                   |
| -------------------- | ------------------------- | ----------------------------------------------- |
| `session_start`      | You begin the experience  | Event category only                             |
| `path_selected`      | You choose A, B, or C     | Path name                                       |
| `choice_made`        | You make a choice         | Scene ID, choice label, score deltas            |
| `midpoint_reached`   | You reach scene 3         | Path, dominant dimension, scores                |
| `ending_reached`     | You complete the story    | Ending ID/title, scores, path                   |
| `feedback_submitted` | You submit feedback       | Ending ID, feedback length, text (if consented) |
| `share_clicked`      | You click Share button    | Ending ID                                       |
| `restart_clicked`    | You click Restart         | Ending ID                                       |
| `coffee_clicked`     | You click Buy Me a Coffee | Ending ID                                       |

Each event includes standard GA4 metadata (timestamp, anonymized IP, country, device type, browser).

## Third-Party Services

### Google Analytics 4

- **Purpose**: Track engagement and endings
- **Privacy Policy**: https://policies.google.com/privacy
- **Opt Out**: https://tools.google.com/dlpage/gaoptout

### Buy Me a Coffee

- **Purpose**: Creator support widget
- **Privacy Policy**: https://www.buymeacoffee.com/privacy-policy
- **Data**: No tracking from our side; Buy Me a Coffee may track clicks

### Unsplash

- **Purpose**: Scene illustrations (images loaded from Unsplash CDN)
- **Privacy Policy**: https://unsplash.com/privacy
- **Data**: Unsplash may track image loads (industry standard CDN behavior)

## Data Security

### In Transit

- ✅ All data sent via HTTPS (encrypted)
- ✅ Google Analytics uses secure connections
- ✅ No sensitive data (PII) transmitted

### At Rest

- ✅ Your consent choice stored locally only (localStorage)
- ✅ Analytics data stored on Google's secure servers
- ✅ No database on our end (client-side only)

## Data Retention

- **Consent Choice**: Stored until you clear browser data or reset settings
- **Analytics Data**: Retained by Google Analytics for 14 months, then automatically deleted
- **Feedback Text**: Retained in GA4 events (14 months) but truncated to 100 chars

## Your Rights

### Access

You can view your consent status anytime via the Settings menu (gear icon).

### Correction

If you want to change your consent choice, use the Settings menu.

### Deletion

To delete all local data:

1. Disable analytics via Settings
2. it your browser data for this site
3. Optionally contact Google Analytics for deletion: https://support.google.com/analytics/contact/data_deletion

### Portability

Due to the anonymous nature of the data, there's no portable data to export. We don't maintain user accounts or profiles.

## Regional Considerations

### GDPR (European Union)

This experience complies with GDPR principles:

- ✅ Explicit consent before tracking
- ✅ Clear information about data collection
- ✅ Easy-to-use opt-out mechanism
- ✅ No processing of sensitive personal data
- ✅ Data minimization (only necessary data)

### CCPA (California)

California residents have the right to:

- Know what data is collected (see above)
- Request deletion (clear browser data + contact Google)
- Opt out of "sale" (we don't sell data)

### Other Regions

We apply the same privacy-first principles globally.

## Children's Privacy

This experience is not directed at children under 13. We do not knowingly collect data from children. If you believe a child has provided data, please contact us so we can delete it.

## Changes to This Privacy Policy

If we make material changes to data collection practices:

- We'll update this document
- We'll display a notification on the site
- You'll be asked to re-consent if required

## Contact & Questions

For privacy-related questions:

- Review this document thoroughly
- Check the Settings menu for consent controls
- For Google Analytics data requests: https://support.google.com/analytics/

## Transparency Commitment

We believe in radical transparency:

- ✅ This privacy policy is comprehensive, not a legal minimum
- ✅ All tracking code is visible in the source (open build)
- ✅ Consent UX is explicit, not manipulative
- ✅ Defaults favor privacy (no tracking without permission)

## Alternative: Fully Private Use

If you want to experience the story without ANY external connections:

1. **Disable Analytics** via Settings
2. **Use adblocker** to block Google Analytics script
3. **Note**: Unsplash images will still load (for illustrations)
4. **Future**: We may offer a downloadable version with no external dependencies

---

**Last Updated**: February 2026  
**Effective Date**: February 2026

_Your privacy matters. Your emotional journey is personal. We respect that._
