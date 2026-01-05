'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface PreviewIssue {
  id: string
  phrase: string
  category: string
  subcategory: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  impact: number
  context: string
  explanation: string
  fix: string
  betterExample: string
  suggestedReplacement: string
  dataPoint?: string
  citation?: string
}

interface PreviewData {
  score: number
  scoreLabel: string
  scoreDescription: string
  totalIssues: number
  criticalCount: number
  highCount: number
  mediumCount: number
  lowCount: number
  previewIssues: PreviewIssue[]
  hiddenIssueCount: number
  teaser: string
  wordCount: number
  readingTime: string
}

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const [data, setData] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(`/api/results/${params.id}?preview=true`)
        const result = await response.json()

        if (result.success) {
          setData(result.preview)
        } else {
          setError(result.error || 'Failed to load results')
        }
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [params.id])

  const handleUnlock = () => {
    router.push(`/checkout?id=${params.id}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-body text-lg">Loading your preview...</p>
        </div>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">⚠️</p>
          <h1 className="text-section text-2xl mb-4">Something went wrong</h1>
          <p className="text-body mb-8">{error || 'Unable to load your results.'}</p>
          <Link href="/" className="btn-kinetic">
            Try again
          </Link>
        </div>
      </main>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40'
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/40'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40'
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/40'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/40'
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 40) return 'text-[var(--success)]'
    if (score <= 60) return 'text-yellow-400'
    if (score <= 80) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score <= 40) return 'bg-[var(--success)]/10'
    if (score <= 60) return 'bg-yellow-500/10'
    if (score <= 80) return 'bg-orange-500/10'
    return 'bg-red-500/10'
  }

  const getScoreBorderColor = (score: number) => {
    if (score <= 40) return 'border-[var(--success)]'
    if (score <= 60) return 'border-yellow-500'
    if (score <= 80) return 'border-orange-500'
    return 'border-red-500'
  }

  const getScoreUrgency = (score: number) => {
    if (score <= 40) return 'Keep this up'
    if (score <= 60) return 'Action needed'
    if (score <= 80) return 'URGENT: Fix before submitting'
    return 'CRITICAL: You\'re losing on price alone'
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="px-4 md:px-8 lg:px-12 py-6 border-b border-[var(--border)]">
        <div className="max-w-[95vw] mx-auto flex items-center justify-between">
          <Link href="/" className="text-display text-xl text-[var(--accent)]">
            Proposal Analyzer
          </Link>
          <span className="bg-[var(--success)]/20 text-[var(--success)] px-3 py-1 text-sm font-bold">
            FREE PREVIEW
          </span>
        </div>
      </header>

      {/* Score Section */}
      <section className={`px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)] ${getScoreBgColor(data.score)}`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Score Gauge */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-8 ${getScoreBorderColor(data.score)} flex items-center justify-center ${getScoreBgColor(data.score)}`}>
                  <div className="text-center">
                    <span className={`text-display text-6xl md:text-8xl ${getScoreColor(data.score)} font-bold`}>
                      {data.score}
                    </span>
                    <span className="text-[var(--muted-foreground)] text-sm block mt-1">/100</span>
                  </div>
                </div>
              </div>
              <p className={`text-section text-xl mt-4 font-bold ${getScoreColor(data.score)}`}>
                {data.scoreLabel}
              </p>
              <p className={`text-sm mt-2 font-bold uppercase tracking-wide ${getScoreColor(data.score)}`}>
                {getScoreUrgency(data.score)}
              </p>
            </div>

            {/* Score Details */}
            <div>
              <p className="text-body text-lg mb-6">{data.scoreDescription}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--muted)] p-4">
                  <p className="text-[var(--muted-foreground)] text-sm">Total issues</p>
                  <p className="text-display text-3xl">{data.totalIssues}</p>
                </div>
                <div className="bg-[var(--muted)] p-4">
                  <p className="text-[var(--muted-foreground)] text-sm">Word count</p>
                  <p className="text-display text-3xl">{data.wordCount.toLocaleString()}</p>
                </div>
              </div>

              {/* Issue breakdown by severity */}
              <div className="space-y-2 mb-4">
                <p className="text-[var(--muted-foreground)] text-xs font-bold">BREAKDOWN BY SEVERITY</p>
                <div className="flex gap-1 h-3">
                  {data.criticalCount > 0 && (
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${(data.criticalCount / data.totalIssues) * 100}%` }}
                      title={`${data.criticalCount} Critical`}
                    />
                  )}
                  {data.highCount > 0 && (
                    <div
                      className="bg-orange-500 h-full"
                      style={{ width: `${(data.highCount / data.totalIssues) * 100}%` }}
                      title={`${data.highCount} High`}
                    />
                  )}
                  {data.mediumCount > 0 && (
                    <div
                      className="bg-yellow-500 h-full"
                      style={{ width: `${(data.mediumCount / data.totalIssues) * 100}%` }}
                      title={`${data.mediumCount} Medium`}
                    />
                  )}
                  {data.lowCount > 0 && (
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${(data.lowCount / data.totalIssues) * 100}%` }}
                      title={`${data.lowCount} Low`}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.criticalCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-red-400 bg-red-500/20 border border-red-500/40">
                    {data.criticalCount} Critical
                  </span>
                )}
                {data.highCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-orange-400 bg-orange-500/20 border border-orange-500/40">
                    {data.highCount} High
                  </span>
                )}
                {data.mediumCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-yellow-400 bg-yellow-500/20 border border-yellow-500/40">
                    {data.mediumCount} Medium
                  </span>
                )}
                {data.lowCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-blue-400 bg-blue-500/20 border border-blue-500/40">
                    {data.lowCount} Low
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Issues */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-label mb-2">YOUR TOP 5 OF {data.totalIssues} ISSUES</p>
              <h2 className="text-section text-2xl">Fix these first — 30 minutes or less</h2>
            </div>
            <span className="bg-[var(--success)]/20 text-[var(--success)] px-3 py-1 text-sm font-bold shrink-0">
              FREE
            </span>
          </div>

          <div className="space-y-6">
            {data.previewIssues.map((issue, index) => (
              <div
                key={issue.id}
                className="border-2 border-[var(--border)] p-6 hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-[var(--accent)] text-2xl font-bold shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-bold uppercase border ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className="text-[var(--muted-foreground)] text-sm">
                        {issue.category} → {issue.subcategory}
                      </span>
                      <span className="text-[var(--muted-foreground)] text-sm">
                        Impact: {issue.impact}/10
                      </span>
                    </div>
                    <p className="text-section text-lg">
                      &ldquo;{issue.phrase}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pl-12 space-y-4">
                  {/* Context */}
                  <div className="bg-[var(--muted)] p-3 text-sm font-mono">
                    <span className="text-[var(--muted-foreground)]">...</span>
                    {issue.context.split(issue.phrase).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <mark className="bg-red-500/30 text-[var(--foreground)] px-1">{issue.phrase}</mark>
                        )}
                      </span>
                    ))}
                    <span className="text-[var(--muted-foreground)]">...</span>
                  </div>

                  {/* Explanation */}
                  <div>
                    <p className="text-[var(--accent)] text-xs font-bold mb-1">WHY IT HURTS</p>
                    <p className="text-body">{issue.explanation}</p>
                    {issue.dataPoint && (
                      <p className="text-[var(--muted-foreground)] text-sm mt-2 italic">
                        📊 {issue.dataPoint}
                        {issue.citation && <span className="opacity-70"> — {issue.citation}</span>}
                      </p>
                    )}
                  </div>

                  {/* Fix */}
                  <div>
                    <p className="text-[var(--success)] text-xs font-bold mb-1">HOW TO FIX</p>
                    <p className="text-body">{issue.fix}</p>
                  </div>

                  {/* Exact Copy Edit */}
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 p-3">
                    <p className="text-[var(--success)] text-xs font-bold mb-2">YOUR COPY, FIXED:</p>
                    <p className="text-body font-mono text-sm">
                      <span className="text-[var(--muted-foreground)]">...</span>
                      {issue.suggestedReplacement}
                      <span className="text-[var(--muted-foreground)]">...</span>
                    </p>
                    <p className="text-[var(--muted-foreground)] text-xs mt-2 italic">
                      💡 {issue.betterExample}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You Sound Like Everyone Else Section */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-red-500/5 border-y-2 border-red-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-red-500 text-sm font-bold mb-2">THE PAINFUL TRUTH</p>
            <h2 className="text-section text-3xl mb-4">
              You sound <span className="text-red-500">exactly like everyone else</span>
            </h2>
            <p className="text-body text-lg text-[var(--muted-foreground)]">
              Your competitors are using the same tired phrases. Evaluators can't tell you apart—so they pick the cheapest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">COMPETITOR A</p>
              <p className="text-body text-sm italic">"We are pleased to submit this proposal..."</p>
            </div>
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">YOU</p>
              <p className="text-body text-sm italic">"We are pleased to submit this proposal..."</p>
            </div>
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">COMPETITOR B</p>
              <p className="text-body text-sm italic">"We are pleased to submit this proposal..."</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">COMPETITOR A</p>
              <p className="text-body text-sm italic">"Our experienced team of professionals..."</p>
            </div>
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">YOU</p>
              <p className="text-body text-sm italic">"Our experienced team of professionals..."</p>
            </div>
            <div className="bg-[var(--background)] border-2 border-red-500/30 p-4">
              <p className="text-red-500 text-xs font-bold mb-2">COMPETITOR B</p>
              <p className="text-body text-sm italic">"Our experienced team of professionals..."</p>
            </div>
          </div>

          <div className="bg-red-500/10 border-2 border-red-500/40 p-6 text-center">
            <p className="text-red-500 font-bold mb-2">THE RESULT</p>
            <p className="text-body text-lg">
              When evaluators can't tell you apart, they default to the spreadsheet. Lowest price wins. Your expertise doesn't matter if your proposal doesn't show it.
            </p>
          </div>
        </div>
      </section>

      {/* Blurred/Locked Issues */}
      {data.hiddenIssueCount > 0 && (
        <section className="px-4 md:px-8 lg:px-12 py-12 relative">
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-label mb-2">{data.hiddenIssueCount} MORE CRITICAL ISSUES LOCKED</p>
                <h2 className="text-section text-2xl">Every issue is costing you deals</h2>
                <p className="text-body mt-2 text-[var(--muted-foreground)]">
                  Including {data.criticalCount > 5 ? `${data.criticalCount - Math.min(5, data.previewIssues.filter(i => i.severity === 'critical').length)} more CRITICAL` : 'more high-severity'} problems and {data.highCount > 0 ? `${data.highCount} high-impact` : 'multiple'} issues
                </p>
              </div>
              <span className="bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-sm font-bold shrink-0">
                $100
              </span>
            </div>

            {/* Blurred preview of more issues */}
            <div className="relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-[var(--background)]/60 z-10 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-display text-4xl text-red-500 mb-4">⚠️</p>
                  <p className="text-section text-2xl mb-2 font-bold">
                    {data.hiddenIssueCount} more deal-killers hidden
                  </p>
                  <p className="text-body text-[var(--muted-foreground)] mb-6 max-w-md">
                    These include pricing language that invites lowball competition, credibility-destroying clichés, and specific phrases that signal "commodity vendor" to evaluators.
                  </p>
                  <button
                    onClick={handleUnlock}
                    className="btn-kinetic text-lg mb-4"
                  >
                    Unlock all {data.totalIssues} fixes — $100
                  </button>
                  <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 p-4 mb-3 max-w-md mx-auto">
                    <p className="text-[var(--success)] text-sm font-bold mb-1">WIN-BACK GUARANTEE</p>
                    <p className="text-body text-sm">
                      If you lose after implementing our fixes, send us the winning bid. We'll analyze it free and show you exactly what beat you.
                    </p>
                  </div>
                  <p className="text-[var(--muted-foreground)] text-xs">
                    30-day money-back guarantee · Most fix top issues in under 30 minutes
                  </p>
                </div>
              </div>

              {/* Fake blurred issues behind */}
              <div className="space-y-4 select-none pointer-events-none">
                {[...Array(Math.min(5, data.hiddenIssueCount))].map((_, i) => (
                  <div key={i} className="border-2 border-[var(--border)] p-6 opacity-40">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-[var(--accent)] text-2xl font-bold">
                        {String(i + 4).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-[var(--muted)] text-transparent">severity</span>
                          <span className="text-transparent bg-[var(--muted)]">Category name here</span>
                        </div>
                        <p className="text-lg bg-[var(--muted)] text-transparent w-3/4 h-6"></p>
                      </div>
                    </div>
                    <div className="pl-12 space-y-3">
                      <div className="bg-[var(--muted)] h-16"></div>
                      <div className="bg-[var(--muted)] h-12"></div>
                      <div className="bg-[var(--muted)] h-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Unlock CTA */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--accent)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-3xl md:text-4xl text-[var(--accent-foreground)] mb-4">
            Stop competing on price alone
          </h2>
          <p className="text-[var(--accent-foreground)]/80 text-lg mb-4">
            All {data.totalIssues} issues prioritized by impact, with data-backed explanations and copy-paste fixes for every one.
          </p>
          <p className="text-[var(--accent-foreground)]/60 text-base mb-8">
            Most customers fix the top 5 critical issues in under 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={handleUnlock}
              className="btn-reversed text-lg w-full sm:w-auto"
            >
              Unlock full report — $100
            </button>
          </div>

          {/* Guarantee callout */}
          <div className="bg-[var(--accent-foreground)]/10 border-2 border-[var(--accent-foreground)]/20 p-6 mb-6">
            <p className="text-[var(--accent-foreground)] font-bold text-lg mb-2">
              🏆 Double guarantee
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-[var(--accent-foreground)] font-semibold mb-1">Money-back (30 days)</p>
                <p className="text-[var(--accent-foreground)]/70 text-sm">
                  Not useful? Full refund, no questions asked.
                </p>
              </div>
              <div>
                <p className="text-[var(--accent-foreground)] font-semibold mb-1">Win-back (if you lose)</p>
                <p className="text-[var(--accent-foreground)]/70 text-sm">
                  Send us the winning bid. We'll analyze it free and show exactly what beat you.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--accent-foreground)]/70 mb-4">
            <span>✓ All {data.totalIssues} issues</span>
            <span>✓ Prioritized by impact</span>
            <span>✓ Data-backed citations</span>
            <span>✓ Copy-paste fixes</span>
            <span>✓ Download as PDF</span>
          </div>
          <p className="text-[var(--accent-foreground)]/60 text-sm">
            🔒 Your proposal is never stored · Deleted immediately after analysis
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-[95vw] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label">
            Built by <a href="https://oww.leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a>
          </p>
          <nav className="flex gap-8">
            <Link href="/" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Analyze another
            </Link>
            <Link href="/privacy" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
