# Preview page improvements

## Changes made to `/src/app/preview/[id]/page.tsx`

### 1. More alarming score display

**Added helper functions:**
- `getScoreBgColor()` - Background colors based on score severity
- `getScoreBorderColor()` - Border colors for the score gauge
- `getScoreUrgency()` - Urgent messaging that appears below score label

**Visual changes:**
- Score section now has colored background (red for bad scores)
- Score gauge border color matches severity (red=bad, green=good)
- Added urgency message below score:
  - 40 or below: "Keep this up"
  - 41-60: "Action needed"
  - 61-80: "URGENT: Fix before submitting"
  - 81+: "CRITICAL: You're losing on price alone"
- Stronger red (#ef4444) for bad scores instead of muted red-400

### 2. "You sound like everyone else" section

**New section added between preview issues and blurred section:**
- Red-tinted background (red-500/5) with red borders
- Header: "THE PAINFUL TRUTH"
- Main message: "You sound exactly like everyone else"
- Side-by-side comparison showing:
  - 3 columns: "Competitor A" | "YOU" | "Competitor B"
  - Same generic phrases in all three
  - Two rows of examples:
    1. "We are pleased to submit this proposal..."
    2. "Our experienced team of professionals..."
- Result callout box explaining that indistinguishability leads to price-only competition

**Purpose:** Make the pain visceral. Show them they're not unique.

### 3. Improved blurred section (more tantalizing)

**Header changes:**
- From: "{X} MORE ISSUES FOUND"
- To: "{X} MORE CRITICAL ISSUES LOCKED"
- Added subtext showing how many critical/high-impact issues remain

**Lock overlay changes:**
- Icon changed from 🔒 to ⚠️ (more alarming)
- Headline: "{X} more deal-killers hidden" (stronger language)
- Description now specifically mentions:
  - Pricing language that invites lowball competition
  - Credibility-destroying clichés
  - Phrases that signal "commodity vendor"
- CTA text: "Unlock all {totalIssues} fixes — $97" (shows total value)

**Added guarantee in lock overlay:**
- Green callout box with "WIN-BACK GUARANTEE" header
- "If you lose after implementing our fixes, send us the winning bid. We'll analyze it free and show you exactly what beat you."
- Positioned right above the final fine print

### 4. Enhanced final CTA section

**Headline change:**
- From: "Get the complete picture"
- To: "Stop competing on price alone" (more benefit-focused)

**New guarantee callout:**
- Two-column grid showing both guarantees:
  1. **Money-back (30 days):** Not useful? Full refund, no questions asked.
  2. **Win-back (if you lose):** Send us the winning bid. We'll analyze it free.
- Styled with semi-transparent background and border
- Header: "🏆 Double guarantee"

**Purpose:** Reduce risk perception at the decision point.

## Key psychological improvements

1. **More damning preview:**
   - Urgent messaging on bad scores
   - Visual alarm (red backgrounds/borders)
   - Direct comparison showing commodity language

2. **Competitor comparison:**
   - Shows them they're NOT unique
   - Uses actual phrases from their own proposal
   - Makes the commodity problem tangible

3. **Guarantee messaging:**
   - Appears twice (lock overlay + final CTA)
   - Win-back guarantee is unique and compelling
   - Shows confidence in the product

4. **More tantalizing locked content:**
   - Specific language about what's hidden
   - Shows remaining critical issue count
   - Uses stronger "deal-killer" language

## What this achieves

The preview now:
- **Hurts more:** Red colors, urgent messaging, direct comparisons
- **Shows the problem:** Side-by-side competitor language comparison
- **Reduces risk:** Double guarantee prominently displayed
- **Creates urgency:** Specific language about critical issues still hidden
- **Increases perceived value:** Shows total issue count in CTA

## Testing recommendations

1. Test with different score ranges (40, 60, 80, 90) to see urgency messaging
2. Verify the competitor comparison section displays correctly on mobile
3. Ensure guarantee messaging is prominent but not overwhelming
4. Check that blurred section teaser accurately counts remaining critical issues
