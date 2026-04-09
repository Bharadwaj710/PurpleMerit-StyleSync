import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

export function ComparisonPanel() {
  const enabled = useStyleSyncStore((state) => state.comparisonEnabled);
  const scrapedTokens = useStyleSyncStore((state) => state.scrapedTokens);
  const editedTokens = useStyleSyncStore((state) => state.editedTokens);
  const setComparisonEnabled = useStyleSyncStore((state) => state.setComparisonEnabled);

  return (
    <section className="rounded-[2rem] border border-white/30 bg-white/80 p-8 shadow-panel backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            Before / After
          </p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            See the system evolve
          </h2>
          <p className="text-sm text-slate-600">
            Compare your original scraped tokens with your refined design system
          </p>
        </div>
        <button
          type="button"
          onClick={() => setComparisonEnabled(!enabled)}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
            enabled
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
          }`}
        >
          {enabled ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              Hide compare
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Show compare
            </span>
          )}
        </button>
      </div>

      {/* Comparison Grid */}
      {enabled && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Before Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-bold uppercase tracking-[0.15em]" style={{ color: scrapedTokens.colors.muted }}>
                  Before (Original)
                </p>
              </div>
            </div>
            <div className="p-6" style={{ background: scrapedTokens.colors.background }}>
              <div
                className="rounded-2xl p-6 shadow-sm"
                style={{ background: scrapedTokens.colors.surface }}
              >
                <div
                  className="h-24 rounded-2xl"
                  style={{ background: scrapedTokens.colors.primary }}
                />
                <div className="mt-5 space-y-3">
                  <div
                    className="h-3 w-2/3 rounded-full"
                    style={{ background: scrapedTokens.colors.text, opacity: 0.24 }}
                  />
                  <div
                    className="h-3 w-4/5 rounded-full"
                    style={{ background: scrapedTokens.colors.text, opacity: 0.16 }}
                  />
                  <div
                    className="h-3 w-1/2 rounded-full"
                    style={{ background: scrapedTokens.colors.text, opacity: 0.12 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* After Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md transition-all hover:shadow-lg">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-bold uppercase tracking-[0.15em]" style={{ color: editedTokens.colors.muted }}>
                  After (Refined)
                </p>
              </div>
            </div>
            <div
              className="p-6 transition-all duration-300"
              style={{ background: editedTokens.colors.background }}
            >
              <div
                className="rounded-2xl p-6 shadow-lg"
                style={{ background: editedTokens.colors.surface }}
              >
                <div
                  className="h-24 rounded-2xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${editedTokens.colors.primary} 0%, ${editedTokens.colors.secondary} 100%)`,
                  }}
                />
                <div className="mt-5 space-y-3">
                  <div
                    className="h-3 w-2/3 rounded-full transition-all duration-300"
                    style={{ background: editedTokens.colors.text, opacity: 0.28 }}
                  />
                  <div
                    className="h-3 w-4/5 rounded-full transition-all duration-300"
                    style={{ background: editedTokens.colors.text, opacity: 0.20 }}
                  />
                  <div
                    className="h-3 w-1/2 rounded-full transition-all duration-300"
                    style={{ background: editedTokens.colors.text, opacity: 0.14 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed State Message */}
      {!enabled && (
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-center">
          <p className="text-sm text-slate-600">
            Click "Show compare" to see your design system transformation
          </p>
        </div>
      )}
    </section>
  );
}
