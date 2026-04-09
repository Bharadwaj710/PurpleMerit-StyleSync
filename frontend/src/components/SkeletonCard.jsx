export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-[#0f172a]/90 p-8 shadow-panel backdrop-blur-md font-mono text-sm ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wide">
          <span className="animate-pulse text-white/50">&gt;</span> Analyzing DOM Tree...
        </div>
        
        <div className="space-y-1 opacity-90">
          <div className="flex flex-col">
            <span className="text-pink-400">&lt;body&gt;</span>
            
            <div className="ml-4 flex flex-col border-l border-slate-600/50 pl-4 py-1 animate-pulse" style={{ animationDuration: '3s' }}>
              <span className="text-pink-400">&lt;header <span className="text-emerald-300">class</span>=<span className="text-yellow-200">"nav"</span>&gt;</span>
              <div className="ml-4 flex items-center gap-3 py-1.5 opacity-80">
                 <div className="h-3 w-16 rounded bg-slate-500/40" />
                 <span className="text-slate-400 text-xs tracking-wider">Extracting typography...</span>
              </div>
              <span className="text-pink-400">&lt;/header&gt;</span>
            </div>

            <div className="ml-4 mt-2 flex flex-col border-l border-slate-600/50 pl-4 py-1 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.4s' }}>
              <span className="text-pink-400">&lt;section <span className="text-emerald-300">id</span>=<span className="text-yellow-200">"hero"</span>&gt;</span>
              <div className="ml-4 flex flex-col gap-2 py-2 opacity-80">
                 <div className="h-4 w-3/4 rounded bg-slate-500/40" />
                 <span className="text-slate-400 text-xs tracking-wider">Finding dominant image colors...</span>
              </div>
              <span className="text-pink-400">&lt;/section&gt;</span>
            </div>

            <div className="ml-4 mt-2 flex flex-col border-l border-slate-600/50 pl-4 py-1 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}>
              <span className="text-pink-400">&lt;div <span className="text-emerald-300">class</span>=<span className="text-yellow-200">"components"</span>&gt;</span>
              <div className="ml-4 grid grid-cols-2 gap-3 py-2 opacity-80">
                 <div className="h-6 rounded bg-slate-500/40" />
                 <div className="h-6 rounded bg-slate-500/40" />
                 <span className="col-span-2 text-slate-400 text-xs mt-1 tracking-wider">Mapping spacing tokens...</span>
              </div>
              <span className="text-pink-400">&lt;/div&gt;</span>
            </div>

            <span className="text-pink-400 mt-2">&lt;/body&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
