export default function Loading() {
  return (
    <div className="mx-auto mt-32 max-w-6xl px-6 grid gap-12 lg:grid-cols-[1fr_400px]">
       <div className="space-y-12">
          <div className="h-10 w-48 animate-pulse rounded-full bg-zinc-900" />
          <div className="h-64 animate-pulse rounded-3xl bg-zinc-950" />
       </div>
       <div className="h-[400px] animate-pulse rounded-3xl bg-zinc-950" />
    </div>
  );
}