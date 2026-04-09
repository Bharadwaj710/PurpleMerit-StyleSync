import { useState } from 'react';
import { exportCssVariables, exportJson, exportTailwindConfig } from '../lib/exporters.js';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

export function ExportPanel() {
  const tokens = useStyleSyncStore((state) => state.editedTokens);
  const activeExport = useStyleSyncStore((state) => state.activeExport);
  const setActiveExport = useStyleSyncStore((state) => state.setActiveExport);
  const [copied, setCopied] = useState(false);

  const exporters = {
    json: exportJson(tokens),
    css: exportCssVariables(tokens),
    tailwind: exportTailwindConfig(tokens),
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(exporters[activeExport]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const exportOptions = [
    {
      key: 'json',
      label: 'JSON',
      description: 'Raw token object',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      key: 'css',
      label: 'CSS Variables',
      description: 'Custom properties',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      key: 'tailwind',
      label: 'Tailwind Config',
      description: 'theme.extend object',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/30 bg-white/80 p-8 shadow-panel backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            Export
          </p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ship your tokens
          </h2>
          <p className="text-sm text-slate-600">
            Export your design system in multiple formats ready for production
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy output
              </>
            )}
          </span>
        </button>
      </div>

      {/* Format Selector */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {exportOptions.map((option) => {
          const isActive = activeExport === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setActiveExport(option.key)}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={isActive ? 'text-white' : 'text-slate-400'}>
                  {option.icon}
                </div>
                <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {option.label}
                </p>
              </div>
              <p className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {option.description}
              </p>
              {isActive && (
                <div className="absolute right-3 top-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Code Output */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/10 bg-slate-950 shadow-lg">
        {/* Code Header */}
        <div className="border-b border-white/5 bg-slate-900/50 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <p className="ml-3 text-xs font-mono font-semibold text-slate-400">
              {activeExport === 'json'
                ? 'tokens.json'
                : activeExport === 'css'
                  ? 'variables.css'
                  : 'tailwind.config.js'}
            </p>
          </div>
        </div>

        {/* Code Content */}
        <div className="max-h-[400px] overflow-auto">
          <pre className="p-6 text-sm leading-relaxed text-slate-100">
            <code className="font-mono">{exporters[activeExport]}</code>
          </pre>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Export Info */}
      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700">
              {activeExport === 'json'
                ? 'Use this JSON object in your design token pipeline'
                : activeExport === 'css'
                  ? 'Import these variables in your global CSS file'
                  : 'Add this to your Tailwind config theme.extend'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
