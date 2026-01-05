import { NextRequest, NextResponse } from 'next/server'
import { detectPhrases, calculateScore, getScoreInterpretation } from '@/lib/proposal-phrases'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { uploadId, text } = body

    if (!uploadId || !text) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate text length
    const wordCount = text.split(/\s+/).length
    if (wordCount < 500) {
      return NextResponse.json(
        { success: false, error: 'Document too short. Proposals must be at least 500 words.' },
        { status: 400 }
      )
    }

    // Detect commodity phrases
    const detectedPhrases = detectPhrases(text)

    // Calculate score
    const score = calculateScore(text)
    const interpretation = getScoreInterpretation(score)

    // In production, call Claude API for detailed analysis and fixes
    // For now, generate placeholder fixes
    const fixes = generateFixes(detectedPhrases, text)

    // Generate diagnosis
    const diagnosis = generateDiagnosis(detectedPhrases.length, score)

    const result = {
      success: true,
      uploadId,
      score,
      scoreCategory: interpretation.category,
      scoreLabel: interpretation.label,
      scoreDescription: interpretation.description,
      diagnosis,
      phrases: detectedPhrases.slice(0, 10).map(p => ({
        phrase: p.phrase,
        category: p.category,
        reason: p.reason,
        position: p.position
      })),
      fixes
    }

    // In production:
    // 1. Store results in Vercel KV
    // 2. Delete uploaded file from Blob Storage
    // 3. Send email notification

    return NextResponse.json(result)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}

function generateDiagnosis(phraseCount: number, score: number): string {
  if (score <= 40) {
    return `Your proposal is well-differentiated with only ${phraseCount} commodity phrases. Buyers will understand what makes you different. Focus on maintaining this clarity as you refine.`
  } else if (score <= 60) {
    return `Your proposal uses ${phraseCount} commodity phrases and has room for improvement. The structure is solid, but some sections rely on generic language. The fixes below address the most impactful opportunities.`
  } else {
    return `Your proposal uses ${phraseCount} commodity phrases and follows a generic structure. The executive summary focuses on your company instead of the client's problem. Buyers reading this won't understand why you're different from competitors—they'll just compare your price.`
  }
}

interface Fix {
  section: string
  broken: string
  whyCommodity: string
  rewrite: string
}

function generateFixes(phrases: { phrase: string; category: string; reason: string }[], text: string): Fix[] {
  // In production, Claude API would generate specific fixes based on actual document content
  // For now, return template fixes that would be customized

  const fixes: Fix[] = []

  // Find sections to fix based on detected phrases
  if (phrases.some(p => p.category === 'Opening cliché' || p.category === 'Pride claims')) {
    fixes.push({
      section: 'EXECUTIVE SUMMARY',
      broken: '"We are pleased to submit this proposal... [company] has been providing quality services for over X years..."',
      whyCommodity: 'Every proposal starts this way. Buyers skip it. You\'re wasting the only moment they\'re paying attention on credentials instead of demonstrating you understand their problem.',
      rewrite: 'Start with the client\'s specific challenge from their RFP. Reference a similar project you completed and the outcome. Lead with their problem, not your credentials.'
    })
  }

  if (phrases.some(p => p.category === 'Team claims' || p.category === 'Track record')) {
    fixes.push({
      section: 'QUALIFICATIONS',
      broken: '"[Company] has X years experience... Our team of experienced professionals..."',
      whyCommodity: 'Laundry list of generic qualifications. Every competitor is bonded, insured, and experienced. Buyers can\'t tell if your experience is relevant to THEIR specific project.',
      rewrite: 'Choose 1-2 most relevant projects. Name the project manager who will work on this. Include a reference with contact info. Make experience specific to their needs.'
    })
  }

  if (phrases.some(p => p.category === 'Pricing' || p.category === 'Capability')) {
    fixes.push({
      section: 'PRICING CONTEXT',
      broken: '"Please see attached pricing schedule for our competitive rates..."',
      whyCommodity: 'Pricing without context invites direct comparison. "Competitive rates" signals you\'re competing on price, not value.',
      rewrite: 'Frame your pricing difference explicitly. Explain what they get for the premium (or savings). Quantify the value in their terms—risk reduced, time saved, problems prevented.'
    })
  }

  // Ensure we always return 3 fixes
  while (fixes.length < 3) {
    if (fixes.length === 0) {
      fixes.push({
        section: 'OPENING',
        broken: 'Generic opening that doesn\'t differentiate',
        whyCommodity: 'First impressions matter. Generic openings signal generic thinking.',
        rewrite: 'Lead with insight about their specific situation. Show you understand their challenge before talking about yourself.'
      })
    } else if (fixes.length === 1) {
      fixes.push({
        section: 'APPROACH',
        broken: 'Standard methodology description',
        whyCommodity: 'Process descriptions sound the same. Buyers want to know how you think differently.',
        rewrite: 'Describe how your approach addresses their specific requirements. Include specifics from their RFP.'
      })
    } else {
      fixes.push({
        section: 'CLOSING',
        broken: '"We look forward to working with you..."',
        whyCommodity: 'Empty enthusiasm. Every competitor says this.',
        rewrite: 'End with a specific next step and the value they\'ll get from taking it. Make the path forward clear.'
      })
    }
  }

  return fixes.slice(0, 3)
}
