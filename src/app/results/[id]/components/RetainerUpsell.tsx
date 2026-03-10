'use client'

export function RetainerUpsell() {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--accent)]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-label mb-4 text-[var(--accent-foreground)] opacity-70">WANT THIS FIXED PROPERLY?</p>
        <h2 className="text-display text-2xl md:text-3xl mb-4 text-[var(--accent-foreground)]">
          I do this every day for manufacturers.
        </h2>
        <p className="text-[var(--accent-foreground)] text-lg mb-3 opacity-90">
          The audit shows you what&apos;s broken. My retainer fixes it — proposals, website, positioning, the whole messaging system. 27 years. Starts at $750/month.
        </p>
        <p className="text-[var(--accent-foreground)] opacity-60 text-sm mb-8">
          Most clients pay for themselves within the first month.
        </p>
        <a
          href="https://cal.com/leefuhr/30i"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-reversed inline-block"
        >
          Book a time →
        </a>
      </div>
    </section>
  )
}
