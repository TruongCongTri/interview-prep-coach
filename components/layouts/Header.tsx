"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/interview") return null;
  return (
    <header className="fixed top-0 z-50 flex w-full justify-center pt-4 transition-all duration-500">
      <nav
        className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled
            ? "w-[90%] max-w-4xl rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "w-full max-w-7xl border-transparent bg-transparent px-6 py-4"
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            V-Coach
          </span>
        </Link>

        {/* Middle: Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/interview-prep" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Interview Prep
          </Link>
          <div className="flex cursor-pointer items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Products <ChevronDown className="h-4 w-4" />
          </div>
          <Link href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Pricing
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link href="/setup" className="shrink-0">
            <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:bg-zinc-200">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}