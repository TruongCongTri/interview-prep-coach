export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32">
      <div className="mb-16 h-20 w-64 animate-pulse rounded-2xl bg-zinc-900" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-3xl border border-white/5 bg-zinc-950" />
        ))}
      </div>
    </div>
  );
}