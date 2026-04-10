import {
  enhanceAccentForPreview,
  ensureSurfaceSeparation,
  getContrastRatio,
  getReadableTextColor,
  mixColors,
  withAlpha,
} from '../lib/colorUtils.js';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

function PreviewArrow({ color, borderColor, background }) {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur"
      style={{ color, borderColor, background }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function PreviewGrid() {
  const tokens = useStyleSyncStore((state) => state.editedTokens);
  const sampleSpacing = tokens.spacing.scale[4] ?? 24;

  const previewBackground = tokens.colors.background;
  const previewSurface = ensureSurfaceSeparation(tokens.colors.surface, previewBackground, tokens.colors.text);
  const canvasText =
    getContrastRatio(tokens.colors.text, previewBackground) >= 4.5
      ? tokens.colors.text
      : getReadableTextColor(previewBackground);
  const surfaceText =
    getContrastRatio(tokens.colors.text, previewSurface) >= 4.5
      ? tokens.colors.text
      : getReadableTextColor(previewSurface);
  const mutedText =
    getContrastRatio(tokens.colors.muted, previewSurface) >= 3
      ? tokens.colors.muted
      : mixColors(surfaceText, previewSurface, 0.4);

  const previewPrimary = enhanceAccentForPreview(tokens.colors.primary, previewSurface, surfaceText);
  const previewSecondary = enhanceAccentForPreview(tokens.colors.secondary, previewSurface, surfaceText);
  const primaryText = getReadableTextColor(previewPrimary);
  const secondaryText = getReadableTextColor(previewSecondary);

  const cardSurface = mixColors(previewSurface, '#ffffff', 0.12);
  const cardBorder = withAlpha(surfaceText, 0.08);
  const cardShadow = '0 24px 80px -40px rgba(15,23,42,0.24)';

  const showcaseStart = previewPrimary;
  const showcaseEnd = previewSecondary;
  const showcaseMid = mixColors(showcaseStart, showcaseEnd, 0.5);
  const showcaseText = getReadableTextColor(showcaseMid);
  const showcaseSoftText = mixColors(showcaseText, showcaseMid, 0.32);
  const showcaseChipBackground = withAlpha(showcaseText, 0.1);
  const showcaseChipBorder = withAlpha(showcaseText, 0.14);

  const inputBackground = mixColors(previewSurface, '#ffffff', 0.22);
  const inputText =
    getContrastRatio(tokens.colors.text, inputBackground) >= 4.5
      ? tokens.colors.text
      : getReadableTextColor(inputBackground);

  const textContrast = getContrastRatio(tokens.colors.text, previewBackground);
  const buttonContrast = getContrastRatio(primaryText, previewPrimary);

  return (
    <section
      className="rounded-[2rem] border border-white/30 bg-white/80 p-4 sm:p-6 shadow-panel backdrop-blur-md"
      style={{
        '--color-primary': previewPrimary,
        '--color-secondary': previewSecondary,
        '--color-background': previewBackground,
        '--color-surface': previewSurface,
        '--spacing-md': `${tokens.spacing.scale[3] ?? 16}px`,
        '--font-family-base': tokens.typography.fontFamily,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Live Preview</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900">See how it looks</h2>
        </div>
        <div className="rounded-full bg-slate-100/85 px-3 py-2 text-sm font-semibold text-slate-600 backdrop-blur">
          {tokens.metadata.personality}
        </div>
      </div>

      <div
        className="mt-6 overflow-hidden rounded-[1.75rem] border"
        style={{
          borderColor: withAlpha(canvasText, 0.08),
          background: `linear-gradient(135deg, ${previewBackground} 0%, ${previewSurface} 100%)`,
          color: canvasText,
          fontFamily: 'var(--font-family-base)',
        }}
      >
        <div className="border-b px-5 py-4" style={{ borderColor: withAlpha(canvasText, 0.08) }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: mutedText }}>
                Brand Surface
              </p>
              <p className="mt-2 text-lg font-semibold" style={{ color: canvasText }}>
                Marketing dashboard preview
              </p>
            </div>
            <div className="flex items-center gap-2">
              {[
                ['text', canvasText],
                ['muted', mutedText],
                ['primary', previewPrimary],
                ['surface', previewSurface],
              ].map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="h-8 w-8 rounded-full border shadow-sm"
                    style={{ backgroundColor: value, borderColor: withAlpha(canvasText, 0.08) }}
                  />
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: mutedText }}>
                    {key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div
              className="rounded-[1.5rem] border p-5 backdrop-blur-sm"
              style={{ background: cardSurface, borderColor: cardBorder, boxShadow: cardShadow, color: surfaceText }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: mutedText }}>
                Buttons and inputs
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="rounded-2xl px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:opacity-95"
                  style={{ background: previewPrimary, color: primaryText }}
                >
                  Primary Button
                </button>
                <button
                  className="rounded-2xl px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:opacity-95"
                  style={{ background: previewSecondary, color: secondaryText }}
                >
                  Secondary
                </button>
                <button
                  className="rounded-2xl border px-5 py-3 font-semibold transition hover:-translate-y-0.5"
                  style={{
                    borderColor: withAlpha(surfaceText, 0.18),
                    color: surfaceText,
                    background: withAlpha(previewSurface, 0.35),
                  }}
                >
                  Ghost
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    background: withAlpha('#ffffff', 0.54),
                    borderColor: withAlpha(previewSecondary, 0.3),
                  }}
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: mutedText }}>
                    Active Input State
                  </p>
                  <input
                    defaultValue="Design system search"
                    className="w-full rounded-xl border px-4 py-3 outline-none transition"
                    style={{
                      color: inputText,
                      background: inputBackground,
                      borderColor: previewSecondary,
                      boxShadow: `0 0 0 4px ${withAlpha(previewSecondary, 0.16)}`,
                    }}
                  />
                </div>
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    background: withAlpha('#ffffff', 0.54),
                    borderColor: 'rgba(239,68,68,0.24)',
                  }}
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Error Input State</p>
                  <input
                    defaultValue="Invalid token value"
                    className="w-full rounded-xl border bg-white px-4 py-3 text-red-500 outline-none"
                    style={{ borderColor: '#ef4444' }}
                  />
                </div>
              </div>
            </div>

            <div
              className="rounded-[1.5rem] border p-5 backdrop-blur-sm"
              style={{ background: cardSurface, borderColor: cardBorder, boxShadow: cardShadow, color: surfaceText }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: mutedText }}>
                Typography scale
              </p>
              <div className="mt-4 space-y-3">
                <h1 style={{ fontSize: tokens.typography.headingScale.h1, lineHeight: 1.05, color: surfaceText }}>Heading One</h1>
                <h2 style={{ fontSize: tokens.typography.headingScale.h2, lineHeight: 1.08, color: surfaceText }}>Heading Two</h2>
                <h3 style={{ fontSize: tokens.typography.headingScale.h3, lineHeight: 1.12, color: surfaceText }}>Heading Three</h3>
                <p style={{ fontSize: tokens.typography.baseSize, lineHeight: tokens.typography.lineHeight, color: mutedText }}>
                  See how your chosen fonts scale across different sizes. This text automatically updates as you change font settings.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border p-5"
              style={{
                color: showcaseText,
                borderColor: withAlpha(showcaseText, 0.12),
                background: `
                  radial-gradient(circle at 78% 76%, ${withAlpha(mixColors(showcaseEnd, '#ffffff', 0.36), 0.72)} 0%, transparent 22%),
                  radial-gradient(circle at 62% 34%, ${withAlpha(mixColors(showcaseStart, '#ffffff', 0.26), 0.44)} 0%, transparent 26%),
                  linear-gradient(160deg, ${showcaseStart} 0%, ${mixColors(showcaseStart, showcaseEnd, 0.46)} 46%, ${showcaseEnd} 100%)
                `,
                boxShadow: '0 24px 80px -40px rgba(15,23,42,0.38)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.08), transparent 28%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: 'auto, 64px 64px, 64px 64px',
                  opacity: 0.22,
                }}
              />
              <div className="relative z-[1]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: showcaseSoftText }}>
                    Showcase card
                  </p>
                  <PreviewArrow
                    color={showcaseText}
                    borderColor={showcaseChipBorder}
                    background={showcaseChipBackground}
                  />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div
                    className="rounded-[1.2rem] border p-3 backdrop-blur"
                    style={{ background: showcaseChipBackground, borderColor: showcaseChipBorder }}
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 7h16M4 12h10M4 17h7" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div
                    className="rounded-[1.2rem] border p-3 backdrop-blur"
                    style={{ background: showcaseChipBackground, borderColor: showcaseChipBorder }}
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="5" y="5" width="14" height="14" rx="3" />
                      <path d="M8.5 12h7" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <h3 className="mt-8 max-w-sm text-4xl font-semibold leading-tight">Bring your design to life</h3>
                <p className="mt-4 max-w-sm text-sm leading-7" style={{ color: showcaseSoftText }}>
                  We apply your colors and fonts to realistic UI elements so you can instantly see if the combination feels right.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border p-3 backdrop-blur" style={{ background: showcaseChipBackground, borderColor: showcaseChipBorder }}>
                    <p className="text-2xl font-semibold">{tokens.spacing.baseUnit}px</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: showcaseSoftText }}>
                      Base Unit
                    </p>
                  </div>
                  <div className="rounded-2xl border p-3 backdrop-blur" style={{ background: showcaseChipBackground, borderColor: showcaseChipBorder }}>
                    <p className="text-2xl font-semibold">{tokens.typography.baseSize}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: showcaseSoftText }}>
                      Base Type
                    </p>
                  </div>
                  <div className="rounded-2xl border p-3 backdrop-blur" style={{ background: showcaseChipBackground, borderColor: showcaseChipBorder }}>
                    <p className="text-2xl font-semibold">{tokens.spacing.scale.length}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: showcaseSoftText }}>
                      Scale Steps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-[1.5rem] border p-5 backdrop-blur-sm"
              style={{ background: cardSurface, borderColor: cardBorder, boxShadow: cardShadow, color: surfaceText }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: mutedText }}>
                Spacing & Layout System
              </p>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: mutedText, marginBottom: '1.25rem' }}>
                Watch how your spacing toggles expand or shrink the gaps. This invisible rhythm is what keeps a website looking structured and professional!
              </p>
              <div className="flex items-end gap-3">
                {tokens.spacing.scale.slice(0, 5).map((space, index) => (
                  <div key={space} className="flex-1 text-center">
                    <div
                      className="rounded-t-2xl transition-all duration-300"
                      style={{
                        height: `${Math.max(space * 2, sampleSpacing)}px`,
                        backgroundColor: index % 2 === 0 ? previewPrimary : previewSecondary,
                        opacity: 0.84 - index * 0.1,
                      }}
                    />
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: mutedText }}>
                      {space}px
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[1.5rem] border p-5 backdrop-blur-sm"
              style={{ background: cardSurface, borderColor: cardBorder, boxShadow: cardShadow, color: surfaceText }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: mutedText }}>
                  Accessibility
                </p>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 backdrop-blur">
                  WCAG 2.1
                </div>
              </div>

              <p className="mt-2 text-xs leading-relaxed" style={{ color: mutedText, marginBottom: '1.25rem' }}>
                Ensure your color pairings have enough contrast so that text and buttons remain highly readable for all users.
              </p>

              <div className="space-y-3">
                {[
                  { label: 'Normal Text', ratio: textContrast, fg: tokens.colors.text, bg: previewBackground },
                  { label: 'Primary Button', ratio: buttonContrast, fg: primaryText, bg: previewPrimary },
                ].map(({ label, ratio, fg, bg }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border p-3 shadow-none backdrop-blur-sm transition-all hover:bg-white/40"
                    style={{ borderColor: cardBorder }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border shadow-sm"
                        style={{ backgroundColor: bg, color: fg, borderColor: cardBorder }}
                      >
                        <span className="font-serif text-lg font-bold">Aa</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: mutedText }}>
                          {label}
                        </p>
                        <p className="mt-0.5 text-sm font-bold leading-tight">{ratio.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {ratio >= 4.5 ? (
                        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
                          AAA Pass
                        </span>
                      ) : ratio >= 3.0 ? (
                        <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600">
                          AA Large
                        </span>
                      ) : (
                        <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-600">
                          Fail
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
