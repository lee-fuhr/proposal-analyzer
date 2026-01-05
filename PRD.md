# Proposal Analyzer - Product Requirements Document

**Last updated:** 2025-12-31
**Version:** 1.0.0
**Status:** Planning

---

## Overview

Upload your proposal before submitting. Get your commodity score + 3 specific fixes to stand out. Results in 3 minutes. $100 one-time payment.

Target customers: Contractors, manufacturers, and service companies bidding on $50K+ projects who make it to the final 3 but lose without being cheapest.

---

## User Flow

```
Landing page (/)
  → Upload proposal PDF
  → Processing page (/processing?id=X)
    → Shows upload progress, analysis checklist
  → Preview page (/preview/[id])
    → FREE: Commodity score, 3 top issues
    → LOCKED: All findings, specific rewrites, risk-justification examples
  → Purchase ($100)
  → Results page (/results/[id])
    → Full analysis with all fixes, downloadable
```

---

## Pages

### Landing (`/`)
- Hero: "Stop losing winnable bids"
- Problem: Generic proposals blend together
- Solution: Find where your proposal sounds like everyone else
- File upload zone (drag-and-drop)
- Price: $100 (closes 1 extra deal = 500-5000× ROI)
- Before/after examples
- Sample results CTA

**Uses shared:**
- None (custom landing page)

**Custom:**
- FileUploadZone component
- ProposalBeforeAfter examples

### Processing (`/processing?id=X`)
- File upload progress
- PDF text extraction
- Commodity phrase detection
- Checklist:
  - Uploading file
  - Extracting text from PDF
  - Analyzing for commodity phrases
  - Identifying fix opportunities
  - Generating rewrites

**Uses shared:**
- ✓ ProcessingPage (with file upload variant)
- ✓ ProcessingProgress
- ✓ ProcessingChecklist
- ✓ AnimatedCounter (for phrase count)

**Custom:**
- File upload status display

### Preview (`/preview/[id]`)
- Sidebar nav (3 views: Overview, Issues, Rewrites)
- Overview: Commodity score, overall assessment
- Issues view (locked): Top 10 problematic phrases
- Rewrites view (locked): Specific replacements
- Unlock CTA: "See all fixes for $100"

**Uses shared:**
- ✓ AuditLayout
- ✓ SidebarNav
- ✓ LockedFindings
- ✓ ScoreModal
- ✓ viewIcons (need custom: overview, issues, rewrites)
- ✓ getCommodityScore* functions

**Custom:**
- ProposalFindingCard (phrase + rewrite + why it matters)
- 3-view structure (vs. website-audit's 5)

### Results (`/results/[id]`)
- Full access to all views
- Download original + marked-up version (PDF)
- Print-friendly view
- Share/save option

**Uses shared:**
- ✓ AuditLayout
- ✓ SidebarNav
- ✓ ScoreModal
- ✓ viewIcons
- ✓ getCommodityScore* functions

**Custom:**
- PDF download functionality
- Markup export

### Sample (`/sample`)
- Pre-populated analysis for demo
- Shows full results (unlocked)
- "Analyze your proposal" CTA

**Uses shared:**
- Same as results page

**Custom:**
- Hardcoded sample data

---

## Shared Component Matrix

| Component | Used | Customization |
|-----------|------|---------------|
| ProcessingPage | ✓ | File upload variant instead of URL crawl |
| AuditLayout | ✓ | 3-view structure (Overview, Issues, Rewrites) |
| SidebarNav | ✓ | Using as-is |
| LockedFindings | ✓ | Adapted for proposal findings |
| ScoreModal | ✓ | Using as-is |
| AnimatedCounter | ✓ | For phrase count during processing |
| viewIcons | Partial | Need custom icons: issues, rewrites |
| ProcessingProgress | ✓ | Using as-is |
| ProcessingStatus | ✓ | Using as-is |
| ProcessingChecklist | ✓ | Custom checklist items |
| getCommodityScore* | ✓ | Same scoring system |
| formatHostname | ✗ | N/A (no URLs) |

---

## Tool-Specific Components

### Custom Components Needed

1. **FileUploadZone**
   - Drag-and-drop PDF upload
   - File size validation (max 10MB)
   - PDF format validation
   - Upload progress bar

2. **ProposalFindingCard**
   - Shows problematic phrase
   - Rewrite suggestion
   - Why it matters (risk-justification angle)
   - Copy button

3. **ProposalBeforeAfter**
   - Side-by-side generic vs. specific proposal language
   - Used in landing page examples

4. **PDFExport**
   - Generate marked-up PDF with highlights
   - Export clean rewrite suggestions
   - Print-friendly view

---

## Scoring System

**Uses commodity score (0-100, inverse - lower is better)**

Same as website-audit:
- 0-40: Well differentiated (green)
- 41-60: Needs work (yellow)
- 61-80: Highly generic (orange)
- 81-100: Commodity territory (red)

**Analysis focuses on:**
- Generic capability claims
- Vague quality statements
- Missing proof points
- Risk-justification opportunities

---

## Integration Notes

**Shared library version:** 1.0.0

**Estimated integration:** 12-16 hours
- Implement file upload flow: 4h
- Integrate ProcessingPage with file upload variant: 2h
- Adapt AuditLayout for 3-view structure: 2h
- Create custom viewIcons for proposal views: 1h
- Build ProposalFindingCard component: 2h
- Implement PDF export: 4h
- Testing and cleanup: 3h

**Dependencies:**
- None - builds on patterns from website-audit
- May need ProcessingPage file upload variant added to shared library

---

## API Endpoints

### POST `/api/upload`
**Input:** `multipart/form-data` with proposal PDF
**Output:** `{ success: boolean, analysisId: string, error?: string }`

Uploads PDF and starts analysis.

### GET `/api/analyze?id={id}`
**Output:**
```json
{
  "success": boolean,
  "analysis": {
    "status": "uploading|extracting|analyzing|complete|failed",
    "progress": number,
    "message": string,
    "phrasesFound": number
  }
}
```

Polls for analysis progress.

### GET `/api/results/[id]`
**Output:** Full proposal analysis

Returns complete analysis data.

---

## Commodity Phrase Detection

**Common proposal phrases to flag:**
- "Quality craftsmanship"
- "Customer-focused approach"
- "Innovative solutions"
- "Experienced team"
- "Competitive pricing"
- "Timely delivery"
- "Proven track record"

**Suggested rewrites emphasize:**
- Specific project counts
- Measurable outcomes
- Risk mitigation
- Cost-of-failure data
- Named team members with credentials
- Actual timeline performance

---

## Changelog

### 1.0.0 (2025-12-31)
- Initial PRD documenting integration with shared component library
- Defined 3-view proposal analysis structure
- Established file upload flow
