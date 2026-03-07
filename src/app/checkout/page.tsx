'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [previewData, setPreviewData] = useState<{
    score: number
    totalIssues: number
    criticalCount: number
  } | null>(null)

  useEffect(() => {
    // Fetch preview data for context
    const fetchPreview = async () => {
      if (!id) return
      try {
        const response = await fetch(`/api/results/${id}?preview=true`)
        const result = await response.json()
        if (result.success) {
          setPreviewData({
            score: result.preview.score,
            totalIssues: result.preview.totalIssues,
            criticalCount: result.preview.criticalCount
          })
        }
      } catch {
        // Ignore errors - preview data is optional
      }
    }
    fetchPreview()
  }, [id])

  const handleApplyPromo = () => {
    setPromoError('')
    if (promoCode.toUpperCase() === 'COMMODITY30') {
      setPromoApplied(true)
    } else {
      setPromoError('Invalid promo code')
    }
  }

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId: id,
          promoCode: promoApplied ? 'COMMODITY30' : undefined
        })
      })

      const result = await response.json()

      if (result.success && result.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = result.checkoutUrl
      } else {
        // For development without Stripe, mock success
        router.push(`/results/${id}?unlocked=true`)
      }
    } catch {
      // For development, redirect to results
      router.push(`/results/${id}?unlocked=true`)
    } finally {
      setLoading(false)
    }
  }

  const price = promoApplied ? 70 : 100
  const savings = promoApplied ? 30 : 0

  if (!id) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">⚠️</p>
          <h1 className="text-section text-2xl mb-4">Missing analysis ID</h1>
          <p className="text-body mb-8">We couldn&apos;t find your analysis. Please try uploading again.</p>
          <Link href="/" className="btn-kinetic">
            Start over
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="px-4 md:px-8 lg:px-12 py-6 border-b border-[var(--border)]">
        <div className="max-w-[95vw] mx-auto flex items-center justify-between">
          <Link href="/" className="text-display text-xl text-[var(--accent)]">
            Proposal Analyzer
          </Link>
          <Link href={`/preview/${id}`} className="text-body text-sm hover:text-[var(--accent)]">
            ← Back to preview
          </Link>
        </div>
      </header>

      {/* Checkout */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: What you get */}
            <div>
              <h1 className="text-display text-3xl md:text-4xl mb-6">
                Unlock your full report
              </h1>

              {previewData && (
                <div className="bg-[var(--muted)] p-4 mb-8">
                  <p className="text-body text-sm text-[var(--muted-foreground)] mb-2">YOUR ANALYSIS</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-display text-3xl text-[var(--accent)]">{previewData.score}</span>
                      <span className="text-[var(--muted-foreground)] text-sm">/100</span>
                    </div>
                    <div className="text-sm">
                      <p className="text-body"><strong>{previewData.totalIssues}</strong> issues found</p>
                      {previewData.criticalCount > 0 && (
                        <p className="text-red-400">{previewData.criticalCount} critical</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-body text-lg mb-8">
                You&apos;ve seen your top 5 issues. The full report includes:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-section">All {previewData?.totalIssues || '50+'} issues prioritized</p>
                    <p className="text-body text-sm text-[var(--muted-foreground)]">Sorted by impact so you know exactly what to fix first</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-section">Data-backed explanations</p>
                    <p className="text-body text-sm text-[var(--muted-foreground)]">Research citations from APMP, Gartner, Forrester</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-section">Copy-paste rewrites</p>
                    <p className="text-body text-sm text-[var(--muted-foreground)]">Specific alternatives for every issue, not generic advice</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-section">Industry benchmarks</p>
                    <p className="text-body text-sm text-[var(--muted-foreground)]">See how you compare to average and top performers</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-section">Downloadable PDF</p>
                    <p className="text-body text-sm text-[var(--muted-foreground)]">Share with your team, reference for future proposals</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Payment */}
            <div>
              <div className="border-2 border-[var(--accent)] p-8 sticky top-8">
                <div className="text-center mb-8">
                  {promoApplied ? (
                    <div>
                      <p className="text-[var(--muted-foreground)] line-through text-lg">$100</p>
                      <p className="text-display text-5xl text-[var(--accent)]">${price}</p>
                      <p className="text-[var(--success)] text-sm font-bold mt-2">
                        You save ${savings} with COMMODITY30
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-display text-5xl text-[var(--accent)]">${price}</p>
                      <p className="text-[var(--muted-foreground)] text-sm mt-2">One-time payment</p>
                    </div>
                  )}
                </div>

                {/* Promo code */}
                {!promoApplied && (
                  <div className="mb-6">
                    <label className="text-label text-xs block mb-2">PROMO CODE</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-[var(--muted)] border border-[var(--border)] px-4 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="btn-outline px-4 py-2 text-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-400 text-sm mt-2">{promoError}</p>
                    )}
                  </div>
                )}

                {promoApplied && (
                  <div className="mb-6 bg-[var(--success)]/20 border border-[var(--success)]/40 p-3 text-center">
                    <p className="text-[var(--success)] text-sm font-bold">
                      ✓ COMMODITY30 applied — $30 off
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-kinetic w-full text-lg mb-4"
                >
                  {loading ? 'Processing...' : `Pay $${price} and unlock`}
                </button>

                <div className="text-center space-y-2">
                  <p className="text-[var(--muted-foreground)] text-xs">
                    Secure payment via Stripe
                  </p>
                  <p className="text-[var(--muted-foreground)] text-xs">
                    Instant access after payment
                  </p>
                </div>

                {/* ROI reminder */}
                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <p className="text-[var(--muted-foreground)] text-xs text-center">
                    If your average bid is $100K and this helps you win just one more...
                  </p>
                  <p className="text-section text-center mt-2">
                    ${price} → <span className="text-[var(--accent)]">$100,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-3xl mb-4">🛡️</p>
          <h2 className="text-section text-xl mb-4">30-day money-back guarantee</h2>
          <p className="text-body">
            If the report doesn&apos;t help you improve your proposal, email me within 30 days for a full refund. No questions asked.
          </p>
          <p className="text-[var(--muted-foreground)] text-sm mt-4">
            — Lee Fuhr
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-[95vw] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label">
            Built by <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a>
          </p>
          <nav className="flex gap-8">
            <Link href="/privacy" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
            <a href="mailto:hi@leefuhr.com" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Questions?
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-body">Loading checkout...</p>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
