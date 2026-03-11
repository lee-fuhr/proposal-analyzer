'use client'

export function RetainerUpsell() {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--accent)]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-label mb-4 text-[var(--accent-foreground)] opacity-70">YOUR WEBSITE HAS THE SAME PROBLEM</p>
        <h2 className="text-display text-2xl md:text-3xl mb-4 text-[var(--accent-foreground)]">
          Get the full messaging audit. $400.
        </h2>
        <p className="text-[var(--accent-foreground)] text-lg mb-3 opacity-90">
          Every page of your website. 15–20 specific copy-paste rewrites. The same commodity language that showed up in your proposal is probably on your homepage too.
        </p>
        <p className="text-[var(--accent-foreground)] opacity-60 text-sm mb-8">
          27 years. $400 one-time. Most clients close one extra deal and it&apos;s paid for 250×.
        </p>
        <a
          href="https://websiteaudit.leefuhr.com"
          className="btn-reversed inline-block mb-4"
        >
          Get the audit →
        </a>
        <p className="text-[var(--accent-foreground)] opacity-40 text-sm">
          Or <a href="https://cal.com/leefuhr/30i" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">book a call</a> if you want the whole messaging system rebuilt — starts at $750/month.
        </p>
      </div>
    </section>
  )
}
