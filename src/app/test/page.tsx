'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function TestPage() {
  const [testId] = useState('test-demo-123')

  const setupTestData = () => {
    const testProposal = `Our company has been providing quality services for over 20 years.
We pride ourselves on customer service and attention to detail.
Our team of experienced professionals delivers results that exceed expectations.
We offer competitive pricing and flexible scheduling.
Contact us today for a free consultation!`

    localStorage.setItem(`proposal-${testId}`, testProposal)
    alert('Test data loaded! You can now test the flow.')
  }

  const setupPaidAccess = () => {
    localStorage.setItem(`paid-${testId}`, 'true')
    alert('Marked as paid! You can now access results directly.')
  }

  const clearAllData = () => {
    localStorage.clear()
    alert('All test data cleared!')
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-bold mb-2 tracking-wider">PROPOSAL ANALYZER</p>
          <h1 className="text-display text-4xl md:text-6xl mb-4">
            QA <span className="text-[var(--accent)]">dashboard</span>
          </h1>
          <p className="text-body text-lg mb-6">
            Test all pages and flows · Port 3004
          </p>
          <Link href="/" className="text-[var(--accent)] hover:underline">
            ← Back to landing page
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Quick actions</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button onClick={setupTestData} className="btn-kinetic text-center">
              Load test proposal
            </button>
            <button onClick={setupPaidAccess} className="btn-outline text-center">
              Mark as paid
            </button>
            <button onClick={clearAllData} className="btn-outline text-center">
              Clear all data
            </button>
          </div>
          <div className="bg-[var(--muted)] p-4 border-l-4 border-[var(--accent)]">
            <p className="text-body text-sm">
              <strong className="text-[var(--foreground)]">Test ID:</strong> {testId}
            </p>
            <p className="text-body text-sm mt-2">
              <strong className="text-[var(--foreground)]">Promo code:</strong> <code className="text-[var(--accent)]">COMMODITY30</code> ($30 off)
            </p>
          </div>
        </div>
      </section>

      {/* Page Flow */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Page flow</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <Link
              href="/"
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">1. HOME</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Landing page</p>
              <p className="text-body text-sm">Upload proposal to analyze</p>
            </Link>

            <Link
              href={`/processing?id=${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">2. PROCESSING</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Analysis progress</p>
              <p className="text-body text-sm">Animated progress bar</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/preview/${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">3. PREVIEW</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Free preview</p>
              <p className="text-body text-sm">Top 5 issues + damning comparison</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/checkout?id=${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">4. CHECKOUT</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Payment page</p>
              <p className="text-body text-sm">Mock payment form</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/results/${testId}?unlocked=true`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--success)] hover:bg-[var(--success)]/10 transition-colors"
            >
              <p className="text-[var(--success)] text-sm font-bold mb-2">5. RESULTS</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Full analysis</p>
              <p className="text-body text-sm">All issues + rewrites</p>
              <p className="text-[var(--danger)] text-xs mt-2">⚠️ Requires paid status</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Pages */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Additional pages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/sample"
              className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--foreground)] font-semibold mb-1">Sample results</p>
              <p className="text-body text-sm">Pre-built demo analysis</p>
            </Link>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--foreground)] font-semibold mb-2">Test file download</p>
              <a
                href="/sample-proposal.txt"
                download
                className="btn-outline inline-block text-sm"
              >
                Download sample-proposal.txt
              </a>
              <p className="text-body text-xs mt-2">Contains 20+ commodity phrases</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Flow Tests */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">User flow tests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Complete purchase flow</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Go to landing page and upload file (or paste proposal)</li>
                <li>2. Submit to trigger processing animation</li>
                <li>3. View free preview with top 5 issues + competitor comparison</li>
                <li>4. Click through to checkout</li>
                <li>5. Complete payment (any values work, try COMMODITY30)</li>
                <li>6. View full results with all issues + rewrites</li>
              </ol>
              <Link href="/" className="btn-kinetic inline-block">
                Start flow →
              </Link>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Direct results access (paid)</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Click "Load test proposal" above</li>
                <li>2. Click "Mark as paid"</li>
                <li>3. Go directly to results page</li>
                <li>4. Should see full analysis without checkout</li>
              </ol>
              <div className="flex gap-3">
                <button onClick={() => { setupTestData(); setupPaidAccess(); }} className="btn-outline">
                  Setup paid access
                </button>
                <Link href={`/results/${testId}?unlocked=true`} className="btn-kinetic">
                  Go to results →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QA Checklist */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">QA checklist</h2>
          <div className="bg-[var(--muted)] p-6 border-2 border-[var(--border)]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Landing page loads, upload zone works</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>File upload accepts .txt, .pdf, .doc, .docx</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Processing page shows progress, redirects</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Preview shows score + top 5 issues</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Damning competitor comparison shows</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Blurred section shows remaining issues</span>
                </label>
              </div>
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Checkout shows price, promo code works</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Pay button redirects to full results</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Full results show all issues + rewrites</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Copy buttons work for alternatives</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Mobile responsive on all pages</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Before/after examples display correctly</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Known limitations (demo mode)</h2>
          <div className="bg-[var(--warning)]/10 border-2 border-[var(--warning)]/30 p-6">
            <ul className="list-disc list-inside space-y-2 text-body text-sm">
              <li>File upload API returns mock ID (actual parsing not implemented)</li>
              <li>All uploads show same sample proposal analysis</li>
              <li>Stripe not connected - payment is simulated</li>
              <li>Results not persisted (in-memory only, resets on server restart)</li>
              <li>PDF download not implemented</li>
              <li>Email notifications not implemented</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-label">Proposal Analyzer v1.0 · Port 3004</p>
        </div>
      </footer>
    </main>
  )
}
