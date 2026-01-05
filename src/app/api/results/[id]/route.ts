import { NextRequest, NextResponse } from 'next/server'
import { analyzeProposal, generateFreePreview, AnalysisResult } from '@/lib/analysis-engine'

// Sample proposal text for demo purposes
const sampleProposalText = `
We are pleased to submit this proposal in response to your RFP dated December 1, 2024.
ABC Construction has been an industry leader providing quality products and services for over 25 years.

Thank you for the opportunity to present our qualifications. Our experienced team of professionals
is dedicated to delivering the highest quality work on every project. We pride ourselves on our
proven track record and commitment to excellence.

As a trusted partner in the construction industry, we offer comprehensive solutions with competitive pricing.
Our full-service approach ensures seamless project delivery from start to finish.

We are committed to quality and strive to exceed expectations on every project. Our innovative solutions
and cutting-edge technology, combined with our state-of-the-art equipment, positions us as the partner of choice
for clients seeking world-class construction services.

Our long-term relationships with clients demonstrate our customer-centric approach. We leverage our
years of experience to utilize best practices and deliver value-added solutions.

Moving forward, we look forward to working with you to become your strategic partner. In order to
demonstrate our commitment to this project, we have assembled a team of experienced professionals
with unparalleled expertise in commercial construction.

Our robust and scalable approach, combined with our proactive project management, ensures we will
deliver end-to-end solutions that exceed your expectations. At the end of the day, it goes without
saying that we are the best-in-class solution provider you need.

Please see attached pricing schedule for our competitive rates. We are confident our pricing
represents excellent value for the scope of work described.

Thank you again for considering ABC Construction. We endeavor to earn your business and aim to
deliver second to none results. We seek to build a long-term partnership with your organization.
`

// In-memory storage for demo (would use Vercel KV in production)
const analysisCache: Record<string, { result: AnalysisResult; timestamp: number; paid: boolean }> = {}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const isPreview = searchParams.get('preview') === 'true'

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Missing result ID' },
      { status: 400 }
    )
  }

  // Check if we have cached results
  let cached = analysisCache[id]

  // If not cached, generate new analysis (demo mode)
  if (!cached) {
    // In production, would check Vercel KV here
    // For demo, analyze sample text
    const result = analyzeProposal(sampleProposalText)
    cached = {
      result,
      timestamp: Date.now(),
      paid: false
    }
    analysisCache[id] = cached
  }

  // Return preview (limited) or full results
  if (isPreview) {
    const preview = generateFreePreview(cached.result)
    return NextResponse.json({
      success: true,
      status: 'complete',
      preview: {
        ...preview,
        wordCount: cached.result.wordCount,
        readingTime: cached.result.readingTime,
        highCount: cached.result.highCount,
        mediumCount: cached.result.mediumCount,
        lowCount: cached.result.lowCount
      }
    })
  }

  // Full results (check if paid in production)
  return NextResponse.json({
    success: true,
    status: 'complete',
    data: cached.result,
    paid: cached.paid
  })
}

// POST to mark as paid (called after Stripe webhook)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Missing result ID' },
      { status: 400 }
    )
  }

  // In production, verify Stripe webhook signature
  if (body.action === 'mark_paid') {
    if (analysisCache[id]) {
      analysisCache[id].paid = true
    }

    return NextResponse.json({
      success: true,
      message: 'Marked as paid'
    })
  }

  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  )
}
