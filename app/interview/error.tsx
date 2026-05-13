"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black p-6">
      <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Engine Disruption</h2>
        <p className="mt-2 text-sm text-red-500/60">We encountered a sync error with the AI session.</p>
      </div>
      <button onClick={() => reset()} className="rounded-full border border-white/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white">
        Re-initialize Session
      </button>
    </div>
  );
}