"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SubCTA() {
  const pathname = usePathname();
  if (pathname === "/interview") return null;
  
  if (pathname === "/feedback") return null;
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-32 text-center">
      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-6">
        <h2 className="mb-6 text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
          Ready to crush your <br className="hidden md:block" /> next interview?
        </h2>
        <p className="mb-10 text-lg text-zinc-400">
          Join thousands of developers mastering their delivery with V-Coach. 100% free to start.
        </p>

        {/* Input Pill Box matching Micro1 Design */}
        <div className="mx-auto flex w-full max-w-md items-center justify-center">
         
          <Link href="/setup" className="shrink-0">
            <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:bg-zinc-200">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}