import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

const presetMeta = [
  {
    key: 'source',
    label: 'Source',
    description: 'Your original website design.',
    swatches: ['#0f172a', '#e2e8f0', '#ffffff'],
  },
  {
    key: 'dark',
    label: 'Dark',
    description: 'A sleek, dark mode style.',
    swatches: ['#020617', '#60a5fa', '#2dd4bf'],
  },
  {
    key: 'pastel',
    label: 'Pastel',
    description: 'Light and friendly soft colors.',
    swatches: ['#fdf2f8', '#f472b6', '#38bdf8'],
  },
  {
    key: 'contrast',
    label: 'Contrast',
    description: 'Bold colors for maximum readability.',
    swatches: ['#ffffff', '#111827', '#f59e0b'],
  },
];

export function PresetBar() {
  const activePreset = useStyleSyncStore((state) => state.activePreset);
  const applyPreset = useStyleSyncStore((state) => state.applyPreset);
  const resetToScraped = useStyleSyncStore((state) => state.resetToScraped);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 p-8 shadow-panel backdrop-blur-md">
      {/* Header */}
      <div className="relative z-[1] mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            Theme Presets
          </p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Quick Themes: Try a new look instantly
          </h2>
          <p className="text-sm text-slate-600">
            Quickly change your entire layout with our hand-picked color themes
          </p>
        </div>
        <button
          type="button"
          onClick={resetToScraped}
          className="rounded-full border border-slate-200/80 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
        >
          Reset to source
        </button>
      </div>

      {/* Preset Grid */}
      <div className="relative z-[1] grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {presetMeta.map((preset) => {
          const isActive = activePreset === preset.key;
          const handleClick = preset.key === 'source' ? resetToScraped : () => applyPreset(preset.key);

          return (
            <button
              key={preset.key}
              type="button"
              onClick={handleClick}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                isActive
                  ? 'border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/95 via-cyan-50/80 to-teal-50/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              )}

              {/* Color Swatches */}
              <div className="relative z-[1] mb-5 flex gap-2">
                {preset.swatches.map((swatch, index) => (
                  <span
                    key={swatch}
                    className={`h-9 w-9 rounded-full border-2 shadow-sm transition-all ${
                      isActive ? 'border-white/20' : 'border-slate-200'
                    } ${isActive && index === 0 ? 'ring-2 ring-white/30' : ''}`}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-[1] space-y-2">
                <p className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {preset.label}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {preset.description}
                </p>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute right-4 top-4 z-[1]">
                  <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

            </button>
          );
        })}
      </div>
    </section>
  );
}
