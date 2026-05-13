"use client";
// Catches everything else

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error("Global System Error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-center">
      <div className="mb-8 h-20 w-20 rounded-full border border-white/10 flex items-center justify-center">
         <span className="text-2xl font-black text-zinc-800">!</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tighter">System Error.</h2>
      <p className="mt-2 text-zinc-500">A global exception has occurred.</p>
      <button  onClick={() => reset()} className="mt-8 text-xs font-black uppercase tracking-widest text-white underline underline-offset-8">
        Hard Reset
      </button>
    </div>
  );
}
