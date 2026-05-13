import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-600">Module Not Found</h2>
      <p className="mt-4 text-zinc-400">The requested interview path does not exist in our library.</p>
      <Link href="/interview-prep" className="mt-8 rounded-full bg-white px-8 py-3 text-xs font-bold text-black">
        Return to Dashboard
      </Link>
    </div>
  );
}