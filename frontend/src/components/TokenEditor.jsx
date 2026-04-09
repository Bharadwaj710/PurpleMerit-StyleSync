import { useState } from 'react';
import { updateLock } from '../lib/api.js';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

function LockButton({ tokenKey }) {
  const site = useStyleSyncStore((state) => state.site);
  const locked = useStyleSyncStore((state) => state.lockedTokens[tokenKey]);
  const setLockState = useStyleSyncStore((state) => state.setLockState);
  const setError = useStyleSyncStore((state) => state.setError);

  async function handleClick() {
    if (!site?.id) {
      return;
    }

    const nextLocked = !locked;
    setLockState(tokenKey, nextLocked);

    try {
      await updateLock({
        siteId: site.id,
        tokenKey,
        isLocked: nextLocked,
      });
    } catch (error) {
      setLockState(tokenKey, locked);
      setError(error.message);
    }
  }

  return site?.id ? (
    <button
      type="button"
      onClick={handleClick}
      className={`relative overflow-hidden rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
        locked
          ? 'bg-slate-900 text-white shadow-[0_0_12px_rgba(15,23,42,0.3)] hover:bg-slate-800'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      <span className="flex items-center gap-1.5">
        <svg 
          className={`h-3.5 w-3.5 transition-all duration-300 ${locked ? 'scale-100 rotate-0' : 'scale-90 -rotate-6 opacity-70'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {locked ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          )}
        </svg>
        <span className="inline-block min-w-[38px] text-left">{locked ? 'Locked' : 'Lock'}</span>
      </span>
    </button>
  ) : (
    <span className="rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400">No Site</span>
  );
}

function SectionHeader({ title, countLabel, expanded, onToggle, onReset, icon, helperText }) {
  return (
    <div className="rounded-[1.6rem] border border-slate-100 bg-white/55 px-4 py-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onToggle} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">{icon}</span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">{title}</p>
            <p className="text-xs text-slate-500">{helperText}</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{countLabel}</span>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function TokenEditor() {
  const tokens = useStyleSyncStore((state) => state.editedTokens);
  const lockedTokens = useStyleSyncStore((state) => state.lockedTokens);
  const updateTokens = useStyleSyncStore((state) => state.updateTokens);
  const updateHeadingScale = useStyleSyncStore((state) => state.updateHeadingScale);
  const updateSpacingScale = useStyleSyncStore((state) => state.updateSpacingScale);
  const resetSectionToSaved = useStyleSyncStore((state) => state.resetSectionToSaved);
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    typography: true,
    spacing: true,
  });

  function toggleSection(section) {
    setExpandedSections((state) => ({
      ...state,
      [section]: !state[section],
    }));
  }

  return (
    <section className="space-y-8 rounded-[2rem] border border-white/30 bg-white/80 p-8 shadow-panel backdrop-blur-md">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Design Settings</p>
        <h2 className="font-display text-2xl font-bold text-slate-900">Fine-tune your styles</h2>
        <p className="text-sm text-slate-600">
          Tweak your colors, switch fonts, and adjust spacing to find the perfect look.
        </p>
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Colors"
          helperText="Your main website colors and background tones"
          countLabel={`${Object.keys(tokens.colors).length}`}
          expanded={expandedSections.colors}
          onToggle={() => toggleSection('colors')}
          onReset={() => resetSectionToSaved('colors')}
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        />

        {expandedSections.colors ? (
          <div className="space-y-3 rounded-[1.8rem] border border-slate-100 bg-white/45 p-4">
            {Object.entries(tokens.colors).map(([key, value]) => (
              <div
                key={key}
                className={`group grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl border p-3 transition-all duration-300 ${
                  lockedTokens[`colors.${key}`] 
                    ? 'border-sky-200 bg-sky-50/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-300/50 scale-[1.01]' 
                    : 'border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <label className="flex items-center gap-3 font-medium capitalize text-slate-700">
                  <div
                    className="h-8 w-8 flex-shrink-0 rounded-xl border-2 border-white shadow-sm ring-1 ring-slate-200 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-sm">{key}</span>
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(event) => updateTokens('colors', key, event.target.value)}
                  className="h-10 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
                />
                <LockButton tokenKey={`colors.${key}`} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Typography"
          helperText="Font choices and heading scale"
          countLabel={`${Object.keys(tokens.typography.headingScale).length + 2}`}
          expanded={expandedSections.typography}
          onToggle={() => toggleSection('typography')}
          onReset={() => resetSectionToSaved('typography')}
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />

        {expandedSections.typography ? (
          <div className="space-y-3 rounded-[1.8rem] border border-slate-100 bg-white/45 p-4">
            <div className={`space-y-2 rounded-2xl border p-4 transition-all duration-300 ${
                lockedTokens['typography.fontFamily'] 
                  ? 'border-sky-200 bg-sky-50/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-300/50 scale-[1.01]' 
                  : 'border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white hover:shadow-sm'
              }`}>
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-700">Font family</label>
                <LockButton tokenKey="typography.fontFamily" />
              </div>
              <input
                value={tokens.typography.fontFamily}
                onChange={(event) => updateTokens('typography', 'fontFamily', event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
                placeholder="e.g., Inter, system-ui, sans-serif"
              />
            </div>

            <div className={`space-y-2 rounded-2xl border p-4 transition-all duration-300 ${
                lockedTokens['typography.baseSize'] 
                  ? 'border-sky-200 bg-sky-50/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-300/50 scale-[1.01]' 
                  : 'border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white hover:shadow-sm'
              }`}>
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-700">Base size</label>
                <LockButton tokenKey="typography.baseSize" />
              </div>
              <input
                value={tokens.typography.baseSize}
                onChange={(event) => updateTokens('typography', 'baseSize', event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
                placeholder="e.g., 16px, 1rem"
              />
            </div>

            {Object.entries(tokens.typography.headingScale).map(([key, value]) => (
              <div
                key={key}
                className={`grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-2xl border p-3 transition-all duration-300 ${
                  lockedTokens[`typography.headingScale.${key}`] 
                    ? 'border-sky-200 bg-sky-50/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-300/50 scale-[1.01]' 
                    : 'border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <span className="text-sm font-semibold uppercase text-slate-600">{key}</span>
                <input
                  value={value}
                  onChange={(event) => updateHeadingScale(key, event.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10"
                  placeholder="e.g., 2rem"
                />
                <LockButton tokenKey={`typography.headingScale.${key}`} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Spacing"
          helperText="System rhythm and scale steps"
          countLabel={`${tokens.spacing.scale.length} steps`}
          expanded={expandedSections.spacing}
          onToggle={() => toggleSection('spacing')}
          onReset={() => resetSectionToSaved('spacing')}
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          }
        />

        {expandedSections.spacing ? (
          <div className="space-y-3 rounded-[1.8rem] border border-slate-100 bg-white/45 p-4">
            {tokens.spacing.scale.map((value, index) => (
              <div
                key={`${index}-${value}`}
                className={`grid grid-cols-[60px_1fr_auto_auto] items-center gap-3 rounded-2xl border p-3 transition-all duration-300 ${
                  lockedTokens[`spacing.scale.${index}`] 
                    ? 'border-sky-200 bg-sky-50/40 shadow-[0_0_15px_rgba(56,189,248,0.15)] ring-1 ring-sky-300/50 scale-[1.01]' 
                    : 'border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <span className="text-xs font-bold text-slate-500">Step {index + 1}</span>
                <input
                  type="range"
                  min="2"
                  max="96"
                  value={value}
                  onChange={(event) => updateSpacingScale(index, event.target.value)}
                  className="h-2 cursor-pointer appearance-none rounded-full bg-slate-200"
                  style={{
                    background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${((value - 2) / 94) * 100}%, rgb(226 232 240) ${((value - 2) / 94) * 100}%, rgb(226 232 240) 100%)`,
                  }}
                />
                <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">{value}px</span>
                <LockButton tokenKey={`spacing.scale.${index}`} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
