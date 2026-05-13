export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <div className="relative h-24 w-24">
         <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />
         <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-zinc-950">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
         </div>
      </div>
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
        Aggregating Performance Metrics...
      </p>
    </div>
  );
}