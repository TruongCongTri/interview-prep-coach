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
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center px-6">
      <div className="mb-8 h-20 w-20 rounded-full border border-accent/20 bg-accent-light flex items-center justify-center">
         <span className="font-heading text-3xl font-medium text-accent">!</span>
      </div>
      <h2 className="font-heading text-4xl font-light tracking-tight text-foreground">System Exception.</h2>
      <p className="mt-4 text-muted text-lg max-w-md">An unexpected error has occurred within the application state.</p>
      <button 
        onClick={() => reset()} 
        className="cursor-back mt-10 px-8 py-3 rounded-full text-background bg-foreground font-medium transition-transform hover:scale-105 active:scale-95"
      >
        Initiate Hard Reset
      </button>
    </div>
  );
}