'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const statusMessages = [
  'Reading your proposal...',
  'Detecting commodity patterns...',
  'Comparing to industry RFPs...',
  'Generating your specific fixes...',
]

function ProcessingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const uploadId = searchParams.get('id')

  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!uploadId) {
      router.push('/')
      return
    }

    // Simulate progress while waiting for actual analysis
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev
        return prev + Math.random() * 8
      })
    }, 500)

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % statusMessages.length)
    }, 3000)

    // Poll for results
    const pollResults = async () => {
      try {
        const response = await fetch(`/api/results/${uploadId}`)
        const result = await response.json()

        if (result.success && result.status === 'complete') {
          // Results ready, redirect to free preview
          router.push(`/preview/${uploadId}`)
        } else if (result.status === 'processing') {
          // Still processing, poll again
          setTimeout(pollResults, 2000)
        } else if (result.status === 'error') {
          setError(result.error || 'Analysis failed. Your payment has been refunded.')
        }
      } catch {
        // Keep polling on network errors
        setTimeout(pollResults, 3000)
      }
    }

    // Start polling after initial delay
    setTimeout(pollResults, 2000)

    // For demo: auto-redirect after 5 seconds if no API
    const demoTimeout = setTimeout(() => {
      router.push(`/preview/${uploadId}`)
    }, 8000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(demoTimeout)
    }
  }, [uploadId, router])

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-section text-2xl text-[var(--foreground)] mb-4">
            Something went wrong
          </h1>
          <p className="text-body mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-kinetic"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Spinner */}
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-[var(--border)] rounded-full" />
            <div
              className="absolute inset-0 border-4 border-[var(--accent)] rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            />
          </div>
        </div>

        <h1 className="text-section text-3xl text-[var(--foreground)] mb-8">
          Analyzing your proposal
        </h1>

        {/* Progress bar */}
        <div className="progress-bar mb-4">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(progress, 95)}%` }}
          />
        </div>
        <p className="text-[var(--muted-foreground)] mb-8">
          {Math.round(Math.min(progress, 95))}%
        </p>

        {/* Status message */}
        <p className="text-body text-lg mb-12">
          &ldquo;{statusMessages[messageIndex]}&rdquo;
        </p>

        {/* Time estimate */}
        <p className="text-[var(--muted-foreground)] text-sm mb-8">
          Estimated time remaining: ~{Math.max(1, Math.round((100 - progress) / 30))} minute(s)
        </p>

        {/* Email note */}
        <div className="border-t border-[var(--border)] pt-6">
          <p className="text-body text-sm">
            📧 Results will be emailed when done.
            <br />
            Keep this page open or check your email.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-body">Loading...</p>
      </main>
    }>
      <ProcessingContent />
    </Suspense>
  )
}
