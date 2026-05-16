export default function Loading() {
  return (
    <div className="mx-auto mt-32 max-w-6xl px-6 grid gap-12 lg:grid-cols-[1fr_400px]">
       <div className="space-y-12">
          {/* Skeleton for Mode Switcher */}
          <div className="h-10 w-64 animate-pulse rounded-full bg-divider/50" />
          {/* Skeleton for Options */}
          <div className="h-64 animate-pulse rounded-xl bg-background-alt" />
          <div className="h-40 animate-pulse rounded-xl bg-background-alt" />
       </div>
       {/* Skeleton for Summary Card */}
       <div className="h-[500px] animate-pulse rounded-xl bg-background-alt" />
    </div>
  );
}