'use client'

import Link from 'next/link'

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-section text-lg text-[var(--foreground)]">
            The Proposal Analyzer
          </Link>
          <Link href="/" className="btn-kinetic text-sm py-2 px-4">
            Analyze YOUR proposal
          </Link>
        </div>
      </header>

      {/* Sample banner */}
      <section className="py-6 px-6 bg-[var(--accent)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white text-lg font-semibold mb-2">
            ⚡ FULL SAMPLE REPORT
          </p>
          <p className="text-white/80">
            This is exactly what you get. Real analysis of an anonymized construction proposal.
          </p>
        </div>
      </section>

      {/* Proposal header */}
      <section className="py-8 px-6 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-section text-2xl text-[#0A0A0A] mb-2">
            Commercial Construction RFP Response
          </h1>
          <p className="text-[#525252] text-sm">
            Complete proposal analysis • 5 fixes with copy-paste rewrites
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-label mb-6">EXECUTIVE SUMMARY</h3>
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <h4 className="text-section text-xl text-[#0A0A0A] mb-4">Bottom Line</h4>
            <p className="text-[#0A0A0A] text-lg mb-6" style={{fontFamily: 'var(--font-body)'}}>
              Your proposal uses <strong>14 commodity phrases</strong> and follows a generic structure. The executive summary focuses on your company instead of the client&apos;s problem. Evaluators reading this won&apos;t understand why you&apos;re different from competitors—they&apos;ll compare your price.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--danger)] mb-1">72</p>
                <p className="text-sm text-[#525252]">Commodity Score (high = bad)</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--warning)] mb-1">14</p>
                <p className="text-sm text-[#525252]">Commodity phrases detected</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--accent)] mb-1">5</p>
                <p className="text-sm text-[#525252]">Copy-paste fixes provided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost section */}
      <section className="bg-[var(--accent)] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-section text-2xl text-white mb-4">
              What this is costing you
            </h2>
            <p className="text-[5rem] md:text-[7rem] font-display text-white leading-none mb-4">
              $180,000
            </p>
            <p className="text-white">
              in lost bids annually (estimated)
            </p>
          </div>

          <div className="bg-black/20 p-6 mt-8">
            <p className="text-label text-white/70 mb-4">How I calculated this</p>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <p className="text-3xl font-display">$150,000</p>
                <p className="text-sm opacity-70">avg project value</p>
              </div>
              <div>
                <p className="text-3xl font-display">×12</p>
                <p className="text-sm opacity-70">bids per year</p>
              </div>
              <div>
                <p className="text-3xl font-display">×10%</p>
                <p className="text-sm opacity-70">lost to commodity messaging</p>
              </div>
            </div>
            <p className="text-sm text-white/60 mt-4">
              Based on analysis of proposal win rates at $2M-$10M contractors. Your actual numbers may vary.
            </p>
          </div>
        </div>
      </section>

      {/* All fixes */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h3 className="text-label mb-6">COMPLETE FIX RECOMMENDATIONS</h3>

          {/* Fix 1 - HIGH */}
          <div className="bg-[var(--background)] border border-[var(--border)] border-l-4 border-l-[var(--danger)] p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-section text-lg text-[#0A0A0A]">Executive Summary Opens With Credentials</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-2 py-0.5 text-xs font-bold">HIGH</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-label text-xs mb-1">FOUND IN YOUR PROPOSAL</p>
                <div className="bg-[var(--muted)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;We are pleased to submit this proposal in response to your RFP dated December 1, 2024. <span className="bg-[var(--danger)]/20 px-1">ABC Construction has been providing quality construction services for over 25 years</span>...&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--danger)]">WHY IT HURTS YOU</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Every proposal starts this way. Evaluators skip it. You&apos;re wasting the only moment they&apos;re paying attention on credentials instead of demonstrating you understand their problem.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--success)]">REPLACE WITH</p>
                <div className="bg-[var(--success)]/10 border-l-4 border-[var(--success)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;Your RFP mentions a 6-month construction timeline with active tenant operations during renovation. That&apos;s the hard part—not the construction, but managing disruption. In our 2023 project for Riverdale Medical Plaza, we completed a similar scope (42,000 SF renovation, 18 occupied suites) in 5 months with zero tenant complaints. Here&apos;s how we&apos;d approach your project...&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fix 2 - HIGH */}
          <div className="bg-[var(--background)] border border-[var(--border)] border-l-4 border-l-[var(--danger)] p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-section text-lg text-[#0A0A0A]">&ldquo;Industry Leader&rdquo; Claim Without Proof</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-2 py-0.5 text-xs font-bold">HIGH</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-label text-xs mb-1">FOUND IN YOUR PROPOSAL</p>
                <div className="bg-[var(--muted)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;As an <span className="bg-[var(--danger)]/20 px-1">industry leader in commercial construction</span>, we bring unmatched expertise to every project.&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--danger)]">WHY IT HURTS YOU</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Unverifiable. Every competitor calls themselves a leader. Evaluators have read &ldquo;industry leader&rdquo; in 50 proposals this year. It&apos;s invisible.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--success)]">REPLACE WITH</p>
                <div className="bg-[var(--success)]/10 border-l-4 border-[var(--success)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;We&apos;ve completed 47 commercial renovations in occupied buildings since 2018. Here&apos;s a 3-minute case study video from our most similar project—a 38,000 SF medical office building completed 2 weeks early.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fix 3 - HIGH */}
          <div className="bg-[var(--background)] border border-[var(--border)] border-l-4 border-l-[var(--danger)] p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-section text-lg text-[#0A0A0A]">&ldquo;Proven Track Record&rdquo; Without Showing It</h4>
              <span className="bg-[var(--danger)]/20 text-[var(--danger)] px-2 py-0.5 text-xs font-bold">HIGH</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-label text-xs mb-1">FOUND IN YOUR PROPOSAL</p>
                <div className="bg-[var(--muted)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;Our <span className="bg-[var(--danger)]/20 px-1">proven track record</span> demonstrates our commitment to delivering projects on time and within budget.&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--danger)]">WHY IT HURTS YOU</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Show the proof, don&apos;t claim it exists. When you say &ldquo;proven track record,&rdquo; evaluators hear &ldquo;I have nothing specific to point to.&rdquo;
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--success)]">REPLACE WITH</p>
                <div className="bg-[var(--success)]/10 border-l-4 border-[var(--success)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;Of our last 23 projects, 21 finished on or ahead of schedule. The two exceptions: a supply chain delay in 2022 (we gave a $15K credit) and a permit issue in Chicago (we covered overtime to recover). Full project list with references attached.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fix 4 - MEDIUM */}
          <div className="bg-[var(--background)] border border-[var(--border)] border-l-4 border-l-[var(--warning)] p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-section text-lg text-[#0A0A0A]">&ldquo;Competitive Pricing&rdquo; Signals Race to Bottom</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-2 py-0.5 text-xs font-bold">MEDIUM</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-label text-xs mb-1">FOUND IN YOUR PROPOSAL</p>
                <div className="bg-[var(--muted)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;We offer <span className="bg-[var(--warning)]/20 px-1">competitive pricing</span> without compromising on quality.&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--danger)]">WHY IT HURTS YOU</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Signals you&apos;re competing on price, not value. Invites comparison shopping. You just told them to negotiate.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--success)]">REPLACE WITH</p>
                <div className="bg-[var(--success)]/10 border-l-4 border-[var(--success)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;Our pricing includes a dedicated project manager on-site daily (not split across projects), weekly photo documentation, and a locked-in change order rate of $85/hour—the same rate we quoted in 2021.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fix 5 - MEDIUM */}
          <div className="bg-[var(--background)] border border-[var(--border)] border-l-4 border-l-[var(--warning)] p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-section text-lg text-[#0A0A0A]">&ldquo;Trusted Partner&rdquo; Claims Trust It Hasn&apos;t Earned</h4>
              <span className="bg-[var(--warning)]/20 text-[var(--warning)] px-2 py-0.5 text-xs font-bold">MEDIUM</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-label text-xs mb-1">FOUND IN YOUR PROPOSAL</p>
                <div className="bg-[var(--muted)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;We pride ourselves on being a <span className="bg-[var(--warning)]/20 px-1">trusted partner</span> to our clients.&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--danger)]">WHY IT HURTS YOU</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Every vendor calls themselves trusted. Trust is earned, not claimed. This tells them nothing about why they should trust you.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-1 text-[var(--success)]">REPLACE WITH</p>
                <div className="bg-[var(--success)]/10 border-l-4 border-[var(--success)] p-3">
                  <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                    &ldquo;Five of our current clients have worked with us on 3+ projects. Riverdale Medical gave us their second building without an RFP. References from all repeat clients available on request.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl text-white mb-4">
            Ready to analyze YOUR proposal?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Upload your proposal. Get fixes you can paste before the deadline.
          </p>
          <Link href="/" className="btn-reversed text-lg">
            Analyze my proposal →
          </Link>
          <p className="text-white/70 text-sm mt-4">
            Top fixes free · No email required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#525252] text-sm" style={{fontFamily: 'var(--font-body)'}}>
            The Proposal Analyzer · Built by <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a> · <Link href="/privacy" className="hover:text-[var(--accent)]">Privacy</Link>
          </p>
        </div>
      </footer>
    </main>
  )
}
