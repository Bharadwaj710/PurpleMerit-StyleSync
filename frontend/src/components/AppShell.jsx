export function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0e2230_0%,#184353_38%,#2d7b86_72%,#52bcb7_100%)] font-body text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(109,181,255,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(127,255,240,0.16),transparent_24%),radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_22%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</div>
    </div>
  );
}
