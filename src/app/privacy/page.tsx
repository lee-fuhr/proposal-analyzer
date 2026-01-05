import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] py-4 px-6">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-section text-lg text-[var(--foreground)]">
            The Proposal Analyzer
          </Link>
          <Link href="/" className="text-body hover:text-[var(--accent)]">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display text-4xl text-[var(--foreground)] mb-8">
            Privacy
          </h1>

          <div className="space-y-8 text-body">
            <div>
              <h2 className="text-section text-xl text-[var(--foreground)] mb-4">
                Your proposals are private
              </h2>
              <p className="mb-4">
                We know proposals contain sensitive business information. Here&apos;s exactly what happens with your data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your uploaded file is deleted immediately after analysis</li>
                <li>We don&apos;t store your proposal content</li>
                <li>Only the analysis results are saved (score, detected phrases, fixes)</li>
                <li>Results are deleted after 90 days</li>
                <li>Your file is never shared with anyone</li>
              </ul>
            </div>

            <div>
              <h2 className="text-section text-xl text-[var(--foreground)] mb-4">
                What we collect
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Email:</strong> Required for payment receipt and results delivery</li>
                <li><strong>Payment info:</strong> Processed by Stripe (we never see your card)</li>
                <li><strong>Analysis results:</strong> Your commodity score and fixes (not your proposal content)</li>
                <li><strong>Usage:</strong> Basic analytics (page views, not personal data)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-section text-xl text-[var(--foreground)] mb-4">
                What we don&apos;t do
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sell or share your data</li>
                <li>Use your proposals to train AI models</li>
                <li>Store your documents after analysis</li>
                <li>Track you with invasive cookies</li>
                <li>Send marketing emails (unless you opt in)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-section text-xl text-[var(--foreground)] mb-4">
                Security
              </h2>
              <p>
                Uploads are encrypted in transit (HTTPS). Files are stored temporarily in encrypted cloud storage and deleted after processing. Payment is handled by Stripe, a PCI-compliant payment processor.
              </p>
            </div>

            <div>
              <h2 className="text-section text-xl text-[var(--foreground)] mb-4">
                Questions?
              </h2>
              <p>
                Email <a href="mailto:lee@leefuhr.com" className="text-[var(--accent)] hover:underline">lee@leefuhr.com</a> with any privacy concerns.
              </p>
            </div>

            <div className="pt-8 border-t border-[var(--border)]">
              <p className="text-[var(--muted-foreground)] text-sm">
                Last updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body text-sm">
            The Proposal Analyzer · Built by <a href="https://oww.leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
