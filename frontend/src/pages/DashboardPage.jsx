import { useState } from 'react';
import { AppShell } from '../components/AppShell.jsx';
import { ComparisonPanel } from '../components/ComparisonPanel.jsx';
import { ExportPanel } from '../components/ExportPanel.jsx';
import { PresetBar } from '../components/PresetBar.jsx';
import { PreviewGrid } from '../components/PreviewGrid.jsx';
import { TokenEditor } from '../components/TokenEditor.jsx';
import { updateTokenSet } from '../lib/api.js';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

function SaveConfirmModal({ onCancel, onConfirm, isSaving }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_36px_120px_-40px_rgba(15,23,42,0.42)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-7.938 4h15.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L2.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Confirm Save</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">Save your new design?</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              This will save the colors and fonts you just changed. You can keep editing after saving, but doing a reset will return to these exact settings.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSaving}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Yes, save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const tokens = useStyleSyncStore((state) => state.editedTokens);
  const site = useStyleSyncStore((state) => state.site);
  const scrapeStatus = useStyleSyncStore((state) => state.scrapeStatus);
  const scrapeWarnings = useStyleSyncStore((state) => state.scrapeWarnings);
  const tokenSetId = useStyleSyncStore((state) => state.tokenSetId);
  const saveStatus = useStyleSyncStore((state) => state.saveStatus);
  const setSaveStatus = useStyleSyncStore((state) => state.setSaveStatus);
  const markSaved = useStyleSyncStore((state) => state.markSaved);
  const setError = useStyleSyncStore((state) => state.setError);
  const goToHome = useStyleSyncStore((state) => state.goToHome);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  async function performSave() {
    if (!tokenSetId) {
      return;
    }

    setSaveStatus('saving');

    try {
      const saved = await updateTokenSet(tokenSetId, {
        colors: tokens.colors,
        typography: tokens.typography,
        spacing: tokens.spacing,
        metadata: tokens.metadata,
      });
      markSaved(saved);
      setShowSaveConfirm(false);
    } catch (error) {
      setSaveStatus('error');
      setError(error.message);
    }
  }

  function handleSaveClick() {
    if (!tokenSetId || saveStatus === 'saving') {
      return;
    }

    setShowSaveConfirm(true);
  }

  return (
    <AppShell>
      {showSaveConfirm ? (
        <SaveConfirmModal
          onCancel={() => setShowSaveConfirm(false)}
          onConfirm={performSave}
          isSaving={saveStatus === 'saving'}
        />
      ) : null}

      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/90">Dashboard</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">Your Design Workspace</h1>
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2 text-base text-white/88">
              <span className="text-sm font-medium text-white/62">Customizing website:</span>
              <span className="font-semibold text-white">{site?.url || tokens.metadata.sourceUrl || 'Manual session'}</span>
            </p>
            <p className="flex items-center gap-3 text-sm text-white/78">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/14 px-3 py-1 text-xs font-semibold capitalize text-white shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {scrapeStatus}
              </span>
              {tokenSetId && (
                <span className="rounded-full border border-white/22 bg-white/12 px-3 py-1 text-xs font-mono text-white/82 shadow-sm backdrop-blur-md">
                  {tokenSetId.slice(0, 8)}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-md ${
              saveStatus === 'saving'
                ? 'border-blue-200/35 bg-blue-400/18 text-blue-50'
                : saveStatus === 'saved'
                  ? 'border-emerald-200/35 bg-emerald-400/18 text-emerald-50'
                  : saveStatus === 'error'
                    ? 'border-red-200/35 bg-red-400/18 text-red-50'
                    : 'border-white/22 bg-white/14 text-white/92'
            }`}
          >
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
                ? 'Saved'
                : saveStatus === 'error'
                  ? 'Save failed'
                  : 'Unsaved changes'}
          </span>
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={!tokenSetId || saveStatus === 'saving'}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md disabled:translate-y-0 disabled:opacity-50"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={goToHome}
            className="rounded-full border border-white/24 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/14"
          >
            Analyze another URL
          </button>
        </div>
      </div>

      {scrapeWarnings.length > 0 && (
        <div className="mb-8 rounded-2xl border border-amber-200/40 bg-amber-50/85 px-6 py-4 shadow-sm backdrop-blur-md">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="flex-1 text-sm leading-relaxed text-amber-900">{scrapeWarnings[0]}</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <PresetBar />
        <div className="grid gap-8 xl:grid-cols-[1fr_1.65fr]">
          <TokenEditor />
          <PreviewGrid />
        </div>
        <ComparisonPanel />
        <ExportPanel />
      </div>
    </AppShell>
  );
}
