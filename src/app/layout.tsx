import type { Metadata } from 'next'
import '@/styles/globals.css'
import FeedbackWidget from '@/components/FeedbackWidget'

export const metadata: Metadata = {
  title: 'The Proposal Analyzer | Check if your RFP sounds commodity before submitting',
  description: 'Upload your proposal before submitting. Get a Commodity Score + 3 specific fixes to stand out. Results in 3 minutes. $200 one-time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800;900&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script async src="https://plausible.io/js/pa-ZS7e722oLqMRbqEKMLkaN.js"></script>
        <script dangerouslySetInnerHTML={{__html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}} />
      </head>
      <body>
        {children}
        <FeedbackWidget toolName="Proposal Analyzer" />
      </body>
    </html>
  )
}
