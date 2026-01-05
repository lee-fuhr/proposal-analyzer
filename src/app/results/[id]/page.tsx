'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

interface DetectedIssue {
  id: string
  phrase: string
  category: string
  subcategory: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  impact: number
  position: number
  context: string
  explanation: string
  fix: string
  betterExample: string
  suggestedReplacement: string
  dataPoint?: string
  citation?: string
}

interface AnalysisResult {
  score: number
  scoreLabel: string
  scoreDescription: string
  totalIssues: number
  criticalCount: number
  highCount: number
  mediumCount: number
  lowCount: number
  issues: DetectedIssue[]
  topPriorities: DetectedIssue[]
  industryBenchmark: {
    averageScore: number
    topPerformerScore: number
    yourPercentile: number
  }
  estimatedImpact: {
    currentWinRate: string
    potentialWinRate: string
    revenueAtStake: string
  }
  wordCount: number
  readingTime: string
}

export default function FullResultsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [data, setData] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [exportingProposal, setExportingProposal] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const isUnlocked = searchParams.get('unlocked') === 'true'

  const exportRevisedProposal = async () => {
    setExportingProposal(true)
    try {
      const response = await fetch(`/api/export/${params.id}`)
      const result = await response.json()

      if (result.success) {
        // Create and download text file
        const blob = new Blob([result.revisedProposal], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = result.downloadFilename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExportingProposal(false)
    }
  }

  const generatePDF = async () => {
    if (!data) return
    setGeneratingPDF(true)

    try {
      // Dynamic imports for client-side only
      const jsPDF = (await import('jspdf')).default
      const html2canvas = (await import('html2canvas')).default

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      let yPos = margin

      // Helper functions
      const addNewPage = () => {
        pdf.addPage()
        yPos = margin
      }

      const checkPageBreak = (neededHeight: number) => {
        if (yPos + neededHeight > pageHeight - margin) {
          addNewPage()
        }
      }

      // Title section
      pdf.setFillColor(25, 25, 28)
      pdf.rect(0, 0, pageWidth, 50, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Proposal Analysis Report', margin, 25)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generated ${new Date().toLocaleDateString()}`, margin, 35)
      yPos = 60

      // Score Overview
      pdf.setTextColor(50, 50, 50)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Commodity Score', margin, yPos)
      yPos += 12

      // Score circle representation
      const scoreColor = data.score <= 40 ? [34, 197, 94] : data.score <= 60 ? [234, 179, 8] : data.score <= 80 ? [249, 115, 22] : [239, 68, 68]
      pdf.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2])
      pdf.circle(margin + 15, yPos + 8, 12, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.text(String(data.score), margin + 11, yPos + 12)

      pdf.setTextColor(50, 50, 50)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(data.scoreLabel, margin + 35, yPos + 5)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(100, 100, 100)
      const descLines = pdf.splitTextToSize(data.scoreDescription, pageWidth - margin * 2 - 35)
      pdf.text(descLines, margin + 35, yPos + 12)
      yPos += 35

      // Issue Summary
      checkPageBreak(40)
      pdf.setTextColor(50, 50, 50)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Issue Breakdown', margin, yPos)
      yPos += 8

      const issueSummary = [
        { label: 'Critical', count: data.criticalCount, color: [239, 68, 68] },
        { label: 'High', count: data.highCount, color: [249, 115, 22] },
        { label: 'Medium', count: data.mediumCount, color: [234, 179, 8] },
        { label: 'Low', count: data.lowCount, color: [59, 130, 246] },
      ]

      issueSummary.forEach(item => {
        pdf.setFillColor(item.color[0], item.color[1], item.color[2])
        pdf.circle(margin + 3, yPos + 2, 3, 'F')
        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(10)
        pdf.text(`${item.label}: ${item.count}`, margin + 10, yPos + 4)
        yPos += 8
      })

      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`Total: ${data.totalIssues} issues`, margin, yPos + 5)
      yPos += 20

      // Top 5 Priorities
      checkPageBreak(50)
      pdf.setFillColor(107, 77, 255)
      pdf.rect(0, yPos - 5, pageWidth, 10, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Top 5 Priorities', margin, yPos + 2)
      yPos += 15

      data.topPriorities.forEach((issue, idx) => {
        checkPageBreak(25)
        pdf.setTextColor(107, 77, 255)
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`#${idx + 1}`, margin, yPos)

        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(10)
        const phraseLines = pdf.splitTextToSize(`"${issue.phrase}"`, pageWidth - margin * 2 - 15)
        pdf.text(phraseLines, margin + 15, yPos)
        yPos += phraseLines.length * 5 + 8
      })
      yPos += 10

      // All Issues by Category
      const categoryGroups = data.issues.reduce((acc, issue) => {
        if (!acc[issue.category]) acc[issue.category] = []
        acc[issue.category].push(issue)
        return acc
      }, {} as Record<string, DetectedIssue[]>)

      Object.entries(categoryGroups).forEach(([category, issues]) => {
        checkPageBreak(30)
        pdf.setTextColor(50, 50, 50)
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`${category} (${issues.length})`, margin, yPos)
        yPos += 10

        issues.forEach((issue, idx) => {
          checkPageBreak(45)

          // Severity badge
          const sevColor = issue.severity === 'critical' ? [239, 68, 68] :
                          issue.severity === 'high' ? [249, 115, 22] :
                          issue.severity === 'medium' ? [234, 179, 8] : [59, 130, 246]
          pdf.setFillColor(sevColor[0], sevColor[1], sevColor[2])
          pdf.roundedRect(margin, yPos - 3, 18, 6, 1, 1, 'F')
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(7)
          pdf.text(issue.severity.toUpperCase(), margin + 2, yPos + 1)

          // Issue text
          pdf.setTextColor(50, 50, 50)
          pdf.setFontSize(10)
          pdf.setFont('helvetica', 'bold')
          const issueText = pdf.splitTextToSize(`"${issue.phrase}"`, pageWidth - margin * 2 - 25)
          pdf.text(issueText, margin + 22, yPos)
          yPos += issueText.length * 4 + 3

          // Explanation
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(100, 100, 100)
          pdf.setFontSize(9)
          const explainLines = pdf.splitTextToSize(issue.explanation, pageWidth - margin * 2 - 10)
          pdf.text(explainLines.slice(0, 2), margin + 5, yPos)
          yPos += Math.min(explainLines.length, 2) * 4 + 2

          // Fix
          pdf.setTextColor(34, 197, 94)
          pdf.setFontSize(8)
          pdf.text('FIX:', margin + 5, yPos)
          pdf.setTextColor(50, 50, 50)
          const fixLines = pdf.splitTextToSize(issue.fix, pageWidth - margin * 2 - 20)
          pdf.text(fixLines.slice(0, 2), margin + 15, yPos)
          yPos += Math.min(fixLines.length, 2) * 4 + 8
        })
        yPos += 5
      })

      // Footer on last page
      pdf.setTextColor(150, 150, 150)
      pdf.setFontSize(8)
      pdf.text('Generated by Proposal Analyzer | leefuhr.com', margin, pageHeight - 10)

      // Download
      pdf.save(`proposal-analysis-${params.id}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      // Fallback to print
      window.print()
    } finally {
      setGeneratingPDF(false)
    }
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/results/${params.id}`)
        const result = await response.json()

        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error || 'Failed to load results')
        }
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [params.id])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-body text-lg">Loading your full report...</p>
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
    if (score <= 80) return 'text-orange-400'
    return 'text-red-400'
  }

  const filteredIssues = filter === 'all'
    ? data.issues
    : data.issues.filter(i => i.severity === filter)

  const categoryGroups = filteredIssues.reduce((acc, issue) => {
    if (!acc[issue.category]) {
      acc[issue.category] = []
    }
    acc[issue.category].push(issue)
    return acc
  }, {} as Record<string, DetectedIssue[]>)

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="px-4 md:px-8 lg:px-12 py-6 border-b border-[var(--border)] sticky top-0 bg-[var(--background)] z-50">
        <div className="max-w-[95vw] mx-auto flex items-center justify-between">
          <Link href="/" className="text-display text-xl text-[var(--accent)]">
            Proposal Analyzer
          </Link>
          <div className="flex items-center gap-4">
            <span className="bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-sm font-bold">
              FULL REPORT
            </span>
            <button
              onClick={exportRevisedProposal}
              disabled={exportingProposal}
              className="btn-kinetic px-4 py-2 text-sm hidden md:block disabled:opacity-50"
            >
              {exportingProposal ? 'Generating...' : 'Get Revised Proposal'}
            </button>
            <button
              onClick={generatePDF}
              disabled={generatingPDF}
              className="btn-outline px-4 py-2 text-sm hidden md:block disabled:opacity-50"
            >
              {generatingPDF ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* Score Overview */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Score */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-40 h-40 rounded-full border-8 border-[var(--border)] flex items-center justify-center">
                  <div className="text-center">
                    <span className={`text-display text-5xl ${getScoreColor(data.score)}`}>
                      {data.score}
                    </span>
                    <span className="text-[var(--muted-foreground)] text-xs block">/100</span>
                  </div>
                </div>
              </div>
              <p className={`text-section text-lg mt-3 ${getScoreColor(data.score)}`}>
                {data.scoreLabel}
              </p>
              <p className="text-body text-sm text-[var(--muted-foreground)] mt-2 max-w-xs mx-auto">
                {data.scoreDescription}
              </p>
            </div>

            {/* Issue Breakdown */}
            <div className="bg-[var(--muted)] p-6">
              <p className="text-label text-xs mb-4">ISSUE BREAKDOWN</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                    <span className="text-body">Critical</span>
                  </div>
                  <span className="text-section font-bold">{data.criticalCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                    <span className="text-body">High</span>
                  </div>
                  <span className="text-section font-bold">{data.highCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-sm"></span>
                    <span className="text-body">Medium</span>
                  </div>
                  <span className="text-section font-bold">{data.mediumCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                    <span className="text-body">Low</span>
                  </div>
                  <span className="text-section font-bold">{data.lowCount}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-body font-bold">Total</span>
                  <span className="text-section font-bold text-[var(--accent)]">{data.totalIssues}</span>
                </div>
              </div>
            </div>

            {/* Industry Benchmark */}
            <div className="bg-[var(--muted)] p-6">
              <p className="text-label text-xs mb-4">INDUSTRY BENCHMARK</p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">Your score</span>
                    <span className={`font-bold ${getScoreColor(data.score)}`}>{data.score}</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] mt-1 relative">
                    <div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${data.score}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">Average proposal</span>
                    <span className="font-bold text-[var(--muted-foreground)]">{data.industryBenchmark.averageScore}</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] mt-1 relative">
                    <div
                      className="h-full bg-[var(--muted-foreground)]"
                      style={{ width: `${data.industryBenchmark.averageScore}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">Top performers</span>
                    <span className="font-bold text-[var(--success)]">{data.industryBenchmark.topPerformerScore}</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] mt-1 relative">
                    <div
                      className="h-full bg-[var(--success)]"
                      style={{ width: `${data.industryBenchmark.topPerformerScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-[var(--muted-foreground)] text-xs mt-4">
                You&apos;re in the {data.industryBenchmark.yourPercentile}th percentile
              </p>
            </div>
          </div>

          {/* Document Stats */}
          <div className="flex flex-wrap gap-6 mt-8 justify-center text-sm text-[var(--muted-foreground)]">
            <span>{data.wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{data.readingTime}</span>
            <span>•</span>
            <span>{data.totalIssues} issues found</span>
          </div>
        </div>
      </section>

      {/* Top Priorities */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--accent)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-display text-2xl text-[var(--accent-foreground)] mb-2">
            Fix these 5 first
          </h2>
          <p className="text-[var(--accent-foreground)]/70 mb-8">
            Highest impact issues—fixing these will have the biggest effect on your score
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {data.topPriorities.map((issue, index) => (
              <div key={issue.id} className="bg-[var(--background)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[var(--accent)] text-xl font-bold">#{index + 1}</span>
                  <span className={`px-2 py-0.5 text-xs font-bold uppercase border ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-section text-sm mb-2 line-clamp-2">
                  &ldquo;{issue.phrase}&rdquo;
                </p>
                <p className="text-[var(--muted-foreground)] text-xs">
                  {issue.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 md:px-8 lg:px-12 py-6 border-b border-[var(--border)] sticky top-[73px] bg-[var(--background)] z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-label text-xs">FILTER:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm border transition-colors ${
                  filter === 'all'
                    ? 'bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--accent)]'
                }`}
              >
                All ({data.totalIssues})
              </button>
              <button
                onClick={() => setFilter('critical')}
                className={`px-3 py-1 text-sm border transition-colors ${
                  filter === 'critical'
                    ? 'bg-red-500 text-white border-red-500'
                    : 'border-red-500/40 text-red-400 hover:bg-red-500/20'
                }`}
              >
                Critical ({data.criticalCount})
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 py-1 text-sm border transition-colors ${
                  filter === 'high'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-orange-500/40 text-orange-400 hover:bg-orange-500/20'
                }`}
              >
                High ({data.highCount})
              </button>
              <button
                onClick={() => setFilter('medium')}
                className={`px-3 py-1 text-sm border transition-colors ${
                  filter === 'medium'
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20'
                }`}
              >
                Medium ({data.mediumCount})
              </button>
              <button
                onClick={() => setFilter('low')}
                className={`px-3 py-1 text-sm border transition-colors ${
                  filter === 'low'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-blue-500/40 text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                Low ({data.lowCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Issues by Category */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {Object.entries(categoryGroups).map(([category, issues]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-section text-xl">{category}</h3>
                <span className="text-[var(--muted-foreground)] text-sm">
                  {issues.length} issue{issues.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <details
                    key={issue.id}
                    className="border-2 border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
                  >
                    <summary className="p-4 cursor-pointer list-none">
                      <div className="flex items-start gap-4">
                        <span className="text-[var(--accent)] text-lg font-bold shrink-0 w-8">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-bold uppercase border ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </span>
                            <span className="text-[var(--muted-foreground)] text-xs">
                              {issue.subcategory}
                            </span>
                            <span className="text-[var(--muted-foreground)] text-xs">
                              Impact: {issue.impact}/10
                            </span>
                          </div>
                          <p className="text-section text-sm">
                            &ldquo;{issue.phrase}&rdquo;
                          </p>
                        </div>
                        <span className="text-[var(--muted-foreground)] group-open:rotate-180 transition-transform shrink-0">
                          ▼
                        </span>
                      </div>
                    </summary>

                    <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] ml-12 space-y-4">
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
                        <p className="text-body text-sm">{issue.explanation}</p>
                        {issue.dataPoint && (
                          <p className="text-[var(--muted-foreground)] text-xs mt-2 italic">
                            📊 {issue.dataPoint}
                            {issue.citation && <span className="opacity-70"> — {issue.citation}</span>}
                          </p>
                        )}
                      </div>

                      {/* Fix */}
                      <div>
                        <p className="text-[var(--success)] text-xs font-bold mb-1">HOW TO FIX</p>
                        <p className="text-body text-sm">{issue.fix}</p>
                      </div>

                      {/* Exact Copy Edit with Copy */}
                      <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 p-3 relative">
                        <p className="text-[var(--success)] text-xs font-bold mb-2">YOUR COPY, FIXED:</p>
                        <p className="text-body text-sm font-mono pr-16">
                          <span className="text-[var(--muted-foreground)]">...</span>
                          {issue.suggestedReplacement}
                          <span className="text-[var(--muted-foreground)]">...</span>
                        </p>
                        <button
                          onClick={() => copyToClipboard(issue.suggestedReplacement, issue.id)}
                          className="absolute top-3 right-3 text-[var(--success)] text-xs hover:underline"
                        >
                          {copiedId === issue.id ? '✓ Copied' : 'Copy'}
                        </button>
                        <p className="text-[var(--muted-foreground)] text-xs mt-2 italic">
                          💡 {issue.betterExample}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary & Next Steps */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-2xl mb-8 text-center">What happens next</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-4xl block mb-4">1️⃣</span>
              <p className="text-section mb-2">Fix critical issues</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">
                Start with the {data.criticalCount} critical issues above. These are killing your differentiation.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">2️⃣</span>
              <p className="text-section mb-2">Work through high impact</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">
                Then tackle the {data.highCount} high-impact items. These significantly affect evaluator perception.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-4">3️⃣</span>
              <p className="text-section mb-2">Polish the rest</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">
                If time allows, address medium and low items. Every improvement counts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Upsell */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label mb-4">WANT MORE HELP?</p>
          <h2 className="text-section text-2xl mb-4">
            90-minute proposal coaching session
          </h2>
          <p className="text-body text-lg mb-8">
            Walk through your proposal with me. We&apos;ll rewrite the worst sections together and create a messaging strategy you can reuse.
          </p>
          <a
            href="mailto:lee@leefuhr.com?subject=Proposal%20Coaching%20Session"
            className="btn-kinetic text-lg"
          >
            Book a session — $1,500
          </a>
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
              Analyze another proposal
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
