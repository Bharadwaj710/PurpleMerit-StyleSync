import { AppShell } from '../components/AppShell.jsx';
import { SkeletonCard } from '../components/SkeletonCard.jsx';
import { UrlForm } from '../components/UrlForm.jsx';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

const sampleStats = [
  { label: 'Color Themes', value: '3' },
  { label: 'Instant Previews', value: '4+' },
  { label: 'Export Formats', value: '3' },
];

function ArrowBadge() {
  return (
    <div className="premium-chip flex h-14 w-14 items-center justify-center rounded-full text-white/90">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ShowcaseMiniCard({ title, body, icon }) {
  return (
    <div className="premium-gradient-card rounded-[2rem] p-6 text-white">
      <div className="premium-card-content">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">StyleSync</p>
          <ArrowBadge />
        </div>
        <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-[1.6rem] border border-white/15 bg-white/5 text-white/90 backdrop-blur">
          {icon}
        </div>
        <h3 className="mt-8 max-w-xs font-display text-3xl font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-4 max-w-sm text-sm leading-7 text-white/84">{body}</p>
      </div>
    </div>
  );
}

export function HomePage() {
  const isLoading = useStyleSyncStore((state) => state.isLoading);
  const error = useStyleSyncStore((state) => state.error);

  return (
    <AppShell>
      <section className="grid gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/10 px-5 py-2.5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/92">StyleSync</span>
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-tight text-white md:text-6xl lg:text-[4rem]">
            See how your website looks with a{' '}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              new design in seconds
            </span>
            .
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
            Just paste your website link below. We&apos;ll extract your current colors and fonts, and give you a simple workspace to try out new designs and see them update in real-time.
          </p>

          <div className="pt-2">
            <UrlForm />
          </div>

          {error ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-amber-400">Oops! We couldn't analyze that website</p>
                  <p className="text-sm leading-relaxed text-amber-200/90">{error}</p>
                  <p className="text-sm leading-relaxed text-amber-200/70">
                    Some sites have security settings that block our preview tools. Don't worry—we activated a default theme so you can still start customizing right away!
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4 pt-4">
            {sampleStats.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/18 bg-white/10 px-6 py-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/14 hover:shadow-panel"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/58">{item.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            <>
              <SkeletonCard className="min-h-[18rem]" lines={4} />
              <SkeletonCard className="min-h-[14rem]" lines={3} />
            </>
          ) : (
            <>
              <div className="premium-gradient-card rounded-[2.4rem] p-8 text-white">
                <div className="premium-card-content">
                  <div className="flex items-start justify-between gap-5">
                    <p className="text-lg font-semibold tracking-[0.12em] text-white/95">STYLESYNC</p>
                    <ArrowBadge />
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="premium-chip rounded-[1.6rem] p-4">
                      <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <rect x="4" y="5" width="16" height="14" rx="3" />
                        <path d="M8 9h8M8 13h5M8 17h4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="premium-chip rounded-[1.6rem] p-4">
                      <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M7 17V7m5 10V4m5 13v-7" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <h2 className="mt-10 max-w-lg font-display text-4xl font-semibold leading-tight md:text-[2.75rem]">
                    Try out new themes on realistic components.
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-8 text-white/84">
                    StyleSync takes your current website colors and lets you easily test out new looks on buttons, forms, and cards.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ShowcaseMiniCard
                  title="Preview your changes instantly."
                  body="See how your new colors and fonts look on real UI elements before applying them."
                  icon={
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                      <path d="M7 10h10M7 14h6" strokeLinecap="round" />
                    </svg>
                  }
                />

                <ShowcaseMiniCard
                  title="Switch themes in one click."
                  body="Try our built-in Dark, Pastel, or High-Contrast themes to instantly give your site a whole new vibe."
                  icon={
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M6 18c1.5-4.5 4.5-9 12-12" strokeLinecap="round" />
                      <circle cx="8" cy="16" r="2.5" />
                      <circle cx="17" cy="7" r="2.5" />
                    </svg>
                  }
                />
              </div>
            </>
          )}
        </div>
      </section>
    </AppShell>
  );
}
