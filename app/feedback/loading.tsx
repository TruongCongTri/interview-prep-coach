export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="relative h-24 w-24">
         <div className="absolute inset-0 animate-ping rounded-full bg-accent-light" />
         <div className="relative flex h-full w-full items-center justify-center rounded-full border border-divider bg-background-alt">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
         </div>
      </div>
      <p className="mt-8 font-heading text-xs font-medium uppercase tracking-widest text-muted">
        Aggregating Performance Metrics...
      </p>
    </div>
  );
}