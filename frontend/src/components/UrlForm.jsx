import { scrapeSite } from '../lib/api.js';
import { useStyleSyncStore } from '../store/useStyleSyncStore.js';

export function UrlForm() {
  const url = useStyleSyncStore((state) => state.url);
  const isLoading = useStyleSyncStore((state) => state.isLoading);
  const setUrl = useStyleSyncStore((state) => state.setUrl);
  const setLoading = useStyleSyncStore((state) => state.setLoading);
  const setError = useStyleSyncStore((state) => state.setError);
  const setScrapeSession = useStyleSyncStore((state) => state.setScrapeSession);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await scrapeSite(url);
      setScrapeSession(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/18 bg-white/10 p-3 shadow-panel backdrop-blur-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Paste your website link to start customizing..."
            className="h-14 w-full rounded-2xl border border-white/18 bg-white/92 px-5 pr-32 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:shadow-[0_0_0_4px_rgba(125,211,252,0.16)] focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
          />
          <div className="pointer-events-none absolute inset-y-0 right-4 hidden items-center text-xs font-semibold uppercase tracking-[0.18em] text-white/44 sm:flex">
            Customize
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="h-14 rounded-2xl bg-white px-6 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? 'Analyzing...' : 'Customize Website'}
        </button>
      </div>
    </form>
  );
}
