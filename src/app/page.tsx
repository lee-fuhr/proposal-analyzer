'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Interactive ROI Calculator - inline sentence format
function ROICalculator({ toolCost }: { toolCost: number }) {
  const [dealValue, setDealValue] = useState(100000)
  const presets = [50000, 100000, 150000, 250000, 500000]

  const roi = Math.round(dealValue / toolCost)
  const formatK = (n: number) => `$${Math.round(n / 1000)}K`

  return (
    <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--accent)]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white/80 text-sm font-bold mb-6 flex items-center justify-center gap-2">
          THE MATH
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.167 0.917c-0.017 4.187 2.019 6.563 6.667 6.666-4.31-0.017-6.448 2.294-6.667 6.667-0.042-4.125-1.885-6.673-6.667-6.667 4.277-0.06 6.65-2.125 6.667-6.666Z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.675 0.917v2.666"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.341 2.25h2.667"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.167 12.417v2.666"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.833 13.75h2.667"/>
          </svg>
        </p>

        <p className="text-[var(--accent-foreground)] text-xl md:text-2xl leading-relaxed">
          If I help you win one more typical{' '}
          <span className="inline-flex items-center gap-2">
            <select
              value={dealValue}
              onChange={(e) => setDealValue(Number(e.target.value))}
              className="bg-white text-[var(--accent)] px-3 py-1 font-bold text-xl md:text-2xl border-2 border-white cursor-pointer"
            >
              {presets.map((preset) => (
                <option key={preset} value={preset}>{formatK(preset)}</option>
              ))}
            </select>
          </span>
          {' '}deal, your ROI is{' '}
          <span className="text-white font-bold">{roi.toLocaleString()}×</span>
          {' '}(spend ${toolCost} to get {formatK(dealValue)}).
        </p>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const validateFile = (f: File): string | null => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(f.type)) {
      return 'File type not supported. Upload PDF, Word (.doc/.docx), or paste plain text.'
    }

    if (f.size > maxSize) {
      return 'This file is too large (max 10MB). Try removing images or splitting into sections.'
    }

    return null
  }

  const handleFile = useCallback((f: File) => {
    const validationError = validateFile(f)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setFile(f)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleProceed = async () => {
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        if (typeof window !== 'undefined' && window.plausible) {
          window.plausible('Upload Started')
        }
        // Redirect to processing (which goes to free preview)
        router.push(`/processing?id=${result.uploadId}`)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Headline - VBF */}
            <div>
              <p className="text-label mb-4">PROPOSAL ANALYZER</p>
              <h1 className="text-display text-[clamp(2.25rem,6vw,5rem)] mb-6">
                Stop losing
                <br />
                <span className="text-[var(--accent)]">winnable</span>
                <br />
                bids
              </h1>
              <p className="text-body text-xl md:text-2xl max-w-xl mb-6">
                Your proposal says &ldquo;committed to excellence&rdquo; and &ldquo;proven track record.&rdquo; So does every other bid. When evaluators can&apos;t tell you apart, they pick the cheapest one. We show you exactly where you sound like everyone else — and <strong>hand you copy that wins.</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                <span>2 minutes</span>
                <span>·</span>
                <span>Copy-paste fixes</span>
                <span>·</span>
                <span>Top fixes free</span>
              </div>
            </div>

            {/* Right: Upload box */}
            <div>
              <div className="bg-[var(--accent)] p-8 md:p-10">
                {!file ? (
                  <>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-[var(--accent-foreground)]">
                        <path d="m16 16-4-4-4 4" strokeWidth="1.5"/>
                        <path d="m12 12 0 9" strokeWidth="1.5"/>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" strokeWidth="1.5"/>
                      </svg>
                      <p className="text-[var(--accent-foreground)] text-lg font-semibold mb-2">
                        Drop your proposal here
                      </p>
                      <p className="text-white/80 text-sm">
                        PDF, Word, or paste text
                      </p>
                      <button className="mt-4 text-[var(--accent-foreground)] underline text-sm">
                        or browse files
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-[var(--background)] p-4">
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[var(--accent)]">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        <div className="flex-1">
                          <p className="text-[var(--foreground)] font-semibold truncate">
                            {file.name}
                          </p>
                          <p className="text-[var(--muted-foreground)] text-sm">
                            {(file.size / 1024).toFixed(0)} KB · Ready for analysis
                          </p>
                        </div>
                        <button
                          onClick={removeFile}
                          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleProceed}
                      disabled={isUploading}
                      className="btn-reversed w-full text-lg"
                    >
                      {isUploading ? 'Uploading...' : 'Find the weak spots →'}
                    </button>

                    <p className="text-white/80 text-xs text-center">
                      Get copy-paste fixes before your deadline.
                    </p>
                  </div>
                )}

                {error && (
                  <p className="text-red-200 text-sm mt-4 p-3 bg-red-500/20 border border-red-400/30">
                    {error}
                  </p>
                )}

              </div>

              {/* Sample CTA - prominent secondary action */}
              <div className="mt-4 text-center">
                <Link href="/sample" className="btn-outline w-full text-base">
                  Or see a full sample analysis first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes strip */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-section text-base md:text-lg text-white">Can&apos;t tell you apart</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Compare on price</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">3-bid territory</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Margins erode</span>
            <span className="text-white text-xl">★</span>
          </div>
        </div>
      </section>

      {/* Free vs Paid comparison */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center flex items-center justify-center gap-2">
            HOW IT WORKS
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4" stroke="currentColor" strokeWidth="1">
              <circle cx="8" cy="8" r="2.5"/>
              <path d="M9.796 1.343c-0.527-1.79-3.065-1.79-3.592 0l-0.094 0.319a0.873 0.873 0 0 1-1.255 0.52l-0.292-0.16c-1.64-0.892-3.433 0.902-2.54 2.541l0.159 0.292a0.873 0.873 0 0 1-0.52 1.255l-0.319 0.094c-1.79 0.527-1.79 3.065 0 3.592l0.319 0.094a0.873 0.873 0 0 1 0.52 1.255l-0.16 0.292c-0.892 1.64 0.901 3.434 2.541 2.54l0.292-0.159a0.873 0.873 0 0 1 1.255 0.52l0.094 0.319c0.527 1.79 3.065 1.79 3.592 0l0.094-0.319a0.873 0.873 0 0 1 1.255-0.52l0.292 0.16c1.64 0.893 3.434-0.902 2.54-2.541l-0.159-0.292a0.873 0.873 0 0 1 0.52-1.255l0.319-0.094c1.79-0.527 1.79-3.065 0-3.592l-0.319-0.094a0.873 0.873 0 0 1-0.52-1.255l0.16-0.292c0.893-1.64-0.902-3.433-2.541-2.54l-0.292 0.159a0.873 0.873 0 0 1-1.255-0.52z"/>
            </svg>
          </p>
          <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-6 text-center">
            Top issues free. <span className="text-[var(--muted-foreground)]">Full analysis $97.</span>
          </h2>
          <p className="text-body text-lg text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            The free preview alone is enough to fix a proposal today. The full analysis is what proposal consultants charge $2,000+ for.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Preview */}
            <div className="border-2 border-[var(--success)] p-8 relative">
              <div className="absolute -top-3 right-8 bg-[var(--success)] text-[var(--background)] px-3 py-1 text-xs font-bold">
                NO CREDIT CARD
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--success)]/20 text-[var(--success)] px-3 py-1 text-sm font-bold">FREE</span>
                <span className="text-section text-xl">Preview</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">Real analysis. Not a teaser. Fix your proposal today.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Commodity score</strong> — see where you stand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Top 10 issues</strong> — highest-impact problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Copy-paste fixes</strong> for each issue</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Competitor comparison</strong> — see the gap</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--muted-foreground)] text-lg shrink-0">—</span>
                  <span className="text-[var(--muted-foreground)]">Remaining 40+ issues locked</span>
                </li>
              </ul>
            </div>

            {/* Full Analysis */}
            <div className="border-2 border-[var(--accent)] p-8 relative">
              <div className="absolute -top-3 right-8 bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-xs font-bold">
                COMPLETE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-sm font-bold">$97</span>
                <span className="text-section text-xl">Full analysis</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">Win one $50K bid = 250× ROI</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Everything in free preview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>All 50+ issues</strong> — complete audit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Data-backed citations</strong> from APMP research</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Industry comparison</strong> vs top performers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>PDF export</strong> — shareable report</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the full report */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4">WHAT YOU GET FOR $97</p>
          <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-12">
            The most actionable proposal audit
            <br />
            <span className="text-[var(--foreground)]">you&apos;ve ever received.</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">PRIORITIZED</p>
              <p className="text-section text-xl mb-3">Fixes ranked by impact</p>
              <p className="text-body">Critical issues first. Know exactly what to fix for maximum improvement with minimum effort.</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">DATA-BACKED</p>
              <p className="text-section text-xl mb-3">Research-based explanations</p>
              <p className="text-body">Every issue includes stats from APMP, Gartner, Forrester, and proposal management research.</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">ACTIONABLE</p>
              <p className="text-section text-xl mb-3">Copy-paste rewrites</p>
              <p className="text-body">Not generic advice. Actual sentences you can use, written for your specific phrases.</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">FAST TO FIX</p>
              <p className="text-section text-xl mb-3">Fix top 5 in 30 minutes</p>
              <p className="text-body">Start with critical issues. You don&apos;t have to fix everything today—just the high-impact ones.</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">BENCHMARKED</p>
              <p className="text-section text-xl mb-3">Industry comparison</p>
              <p className="text-body">See how you compare to average proposals and top performers in your industry.</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">COMPLIANCE-SAFE</p>
              <p className="text-section text-xl mb-3">Formal RFPs welcome</p>
              <p className="text-body">Improves readability without breaking required regulatory or procurement language.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-label mb-4">THE REAL PROBLEM</p>
              <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-8">
                It&apos;s not your product.
                <br />
                It&apos;s not your price.
                <br />
                <span className="text-[var(--foreground)]">It&apos;s your proposal.</span>
              </h2>
              <p className="text-body text-xl md:text-2xl">
                You&apos;ve built something genuinely better. But your proposal sounds exactly like the other two bidders. So buyers put you in a spreadsheet and pick the cheapest one.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <span className="text-display text-[7rem] md:text-[10rem] text-[var(--border)] block leading-none">
                  72
                </span>
                <span className="text-body text-lg text-[var(--muted-foreground)]">
                  Average proposal commodity score
                </span>
                <span className="text-body text-sm text-[var(--muted-foreground)] block mt-2">
                  (That&apos;s &ldquo;indistinguishable from competitors&rdquo;)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI calculation - Interactive */}
      <ROICalculator toolCost={97} />

      {/* Before/After Examples */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 border-t-2 border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center flex items-center justify-center gap-2">
            SEE THE DIFFERENCE
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.167 0.917c-0.017 4.187 2.019 6.563 6.667 6.666-4.31-0.017-6.448 2.294-6.667 6.667-0.042-4.125-1.885-6.673-6.667-6.667 4.277-0.06 6.65-2.125 6.667-6.666Z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.675 0.917v2.666"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.341 2.25h2.667"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.167 12.417v2.666"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.833 13.75h2.667"/>
            </svg>
          </p>
          <h2 className="text-section text-4xl md:text-5xl mb-16 text-center">
            Generic → <span className="text-[var(--foreground)]">Differentiated</span>
          </h2>

          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 p-6">
                <p className="text-red-700 text-xs font-bold mb-3">❌ BEFORE</p>
                <p className="text-body italic">&ldquo;We are committed to quality and strive to exceed expectations on every project.&rdquo;</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-6">
                <p className="text-green-700 text-xs font-bold mb-3">✓ AFTER</p>
                <p className="text-body italic">&ldquo;Our 6-point QC checklist caught 23 issues on the Riverside project before you saw them—saving $47K in rework.&rdquo;</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 p-6">
                <p className="text-red-700 text-xs font-bold mb-3">❌ BEFORE</p>
                <p className="text-body italic">&ldquo;Our team of experienced professionals is dedicated to providing the highest level of service.&rdquo;</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-6">
                <p className="text-green-700 text-xs font-bold mb-3">✓ AFTER</p>
                <p className="text-body italic">&ldquo;Your project manager, Tom Wilson, has delivered 14 pharmaceutical cleanrooms in the last 5 years—including the Pfizer facility 3 miles from your site.&rdquo;</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 p-6">
                <p className="text-red-700 text-xs font-bold mb-3">❌ BEFORE</p>
                <p className="text-body italic">&ldquo;We offer competitive pricing with excellent value for your investment.&rdquo;</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-6">
                <p className="text-green-700 text-xs font-bold mb-3">✓ AFTER</p>
                <p className="text-body italic">&ldquo;Our fixed-price model means no change order surprises. The Murphy project came in $12K under budget despite 3 scope changes.&rdquo;</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 p-6">
                <p className="text-red-700 text-xs font-bold mb-3">❌ BEFORE (Formal RFP)</p>
                <p className="text-body italic">&ldquo;The contractor shall provide comprehensive quality assurance protocols consistent with industry best practices.&rdquo;</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-6">
                <p className="text-green-700 text-xs font-bold mb-3">✓ AFTER (Formal RFP)</p>
                <p className="text-body italic">&ldquo;Our 6-point QA protocol (Section M.3) maintains AS9100D certification—the same process that passed DCMA surveillance on Contract #W912DR-21-C-0045.&rdquo;</p>
              </div>
            </div>
          </div>

          <p className="text-center text-[var(--muted-foreground)] mt-12">
            These aren&apos;t templates. The Analyzer shows you YOUR weak phrases and gives you rewrites specific to YOUR proposal.
          </p>
        </div>
      </section>

      {/* Pro tip */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label mb-4">PRO TIP</p>
          <h2 className="text-section text-3xl md:text-4xl mb-6">
            Lost a bid? Analyze what went wrong.
          </h2>
          <p className="text-body text-xl">
            Run the winning competitor&apos;s public materials through the Commodity Test. See exactly where their positioning beat yours — so you can fix it before the next bid.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-label mb-4 text-center">FREQUENTLY ASKED</p>
          <h2 className="text-section text-3xl md:text-4xl mb-12 text-center">Common questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-section text-xl mb-3">What kind of proposals can I analyze?</h3>
              <p className="text-body text-lg">
                Bid proposals, RFP responses, design-build proposals, GC packages, subcontractor bids — any document where you&apos;re competing for work. PDF, Word, and text formats all work.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What&apos;s a &ldquo;commodity phrase&rdquo; in a proposal?</h3>
              <p className="text-body text-lg">
                Same problem as websites, different words. Proposals lean on &ldquo;proven track record,&rdquo; &ldquo;committed to excellence,&rdquo; &ldquo;dedicated team of professionals.&rdquo; These phrases feel safe. They&apos;re also invisible — evaluators have read them 50 times this week.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">How specific are the suggested fixes?</h3>
              <p className="text-body text-lg">
                Specific enough to copy-paste. If your proposal says &ldquo;we have 25 years of experience,&rdquo; we&apos;ll hand you: &ldquo;In 2023, we completed 47 projects like yours with zero warranty claims.&rdquo; No vague advice. Actual sentences you can use.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Why not just use Grammarly or ChatGPT?</h3>
              <p className="text-body text-lg">
                They check grammar and clarity. This checks differentiation — whether your proposal sounds like you or like everyone else. You can have perfect grammar and still lose to a proposal that tells a better story.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">I need to submit in 2 hours. Is that enough time?</h3>
              <p className="text-body text-lg">
                Plenty. Analysis takes 3 minutes. Fixing the top 10 issues takes 30 minutes — probably less, since we hand you the exact replacement sentences. Most proposals lose on 5-10 sentences where you sound exactly like everyone else. Fix those, you&apos;re done.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What if my company requires certain boilerplate in proposals?</h3>
              <p className="text-body text-lg">
                Keep it. Legal terms, safety certifications, insurance requirements — those aren&apos;t the problem. The problem is when your executive summary, your approach section, and your qualifications all read like boilerplate too. That&apos;s where evaluators decide. That&apos;s where we focus.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Should I analyze before or after submitting?</h3>
              <p className="text-body text-lg">
                Before. Always before. The fixes take 30 minutes and could be the difference between winning and losing. If you&apos;re building a proposal template for repeat use, analyze that — every future bid gets better automatically.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Do you store my proposal?</h3>
              <p className="text-body text-lg">
                No. Your proposal is analyzed and deleted immediately after processing. We don&apos;t keep your content, pricing, or any submitted documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <p className="text-label mb-6 text-center">THIS IS FOR YOU IF</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[var(--success)] text-xl">✓</span>
                <p className="text-body text-lg">You submit RFPs, proposals, quotes, or scopes worth $50K+</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--success)] text-xl">✓</span>
                <p className="text-body text-lg">You make it to final 3 but rarely win without being cheapest</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--success)] text-xl">✓</span>
                <p className="text-body text-lg">You want specific fixes, not a consultant to rewrite everything</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--success)] text-xl">✓</span>
                <p className="text-body text-lg">You need results before the proposal is due (not a 2-week project)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[var(--muted)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl mb-4">
            Stop losing bids to commodity messaging
          </h2>
          <p className="text-body text-xl mb-8">
            Upload your proposal. Top 10 issues free. Full analysis $97.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-kinetic text-lg"
          >
            See my top issues →
          </button>
          <p className="text-[var(--muted-foreground)] text-sm mt-4">
            No credit card required · 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer lockup: Credibility + More tools + Footer */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)] border-t-2 border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          {/* Credibility */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-body text-lg md:text-xl">
                Built by <a href="https://leefuhr.com" className="text-[var(--accent)] underline hover:no-underline">Lee Fuhr</a>. I&apos;ve seen too many contractors lose bids to worse outfits with better proposals. Same methodology as The Commodity Test, applied to proposals instead of websites. Because &ldquo;we do quality work&rdquo; doesn&apos;t win bids — proving it does.
              </p>
            </div>
            <Link href="/sample" className="btn-outline min-h-[44px] shrink-0">
              See a sample analysis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* More tools */}
          <p className="text-label mb-6 text-center">MORE TOOLS FOR MANUFACTURERS</p>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://commodity-test-app.vercel.app" className="bg-[var(--background)] p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-section text-lg mb-2">Commodity Test</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">Find where your website sounds like everyone else — and get copy that differentiates.</p>
            </a>
            <a href="https://case-study-extractor.vercel.app" className="bg-[var(--background)] p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-section text-lg mb-2">Case Study Extractor</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">Turn project photos and invoices into sales-ready case studies in 5 minutes.</p>
            </a>
            <a href="https://risk-translator.vercel.app" className="bg-[var(--background)] p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-section text-lg mb-2">Risk Translator</p>
              <p className="text-body text-sm text-[var(--muted-foreground)]">Translate your specs into risk language that gets purchasing to approve the budget.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label">
            <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr Inc</a> © 2025
          </p>

          <nav className="flex gap-8">
            <Link href="/sample" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              See sample
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
