"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-6">
      <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-50 p-8 text-center max-w-md">
        <h2 className="font-heading text-2xl font-medium text-red-600">Engine Disruption</h2>
        <p className="mt-3 text-base text-red-600/80">We encountered a synchronization error with the AI session.</p>
      </div>
      <button 
        onClick={() => reset()} 
        className="cursor-back rounded-full bg-foreground px-8 py-3 font-heading text-sm font-medium uppercase tracking-widest text-background transition-transform hover:scale-105 active:scale-95"
      >
        Re-initialize Session
      </button>
    </div>
  );
}