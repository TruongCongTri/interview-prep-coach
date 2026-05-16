"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AudioLines, ChevronDown, ArrowRight } from "lucide-react";
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
            ? "w-[90%] max-w-4xl rounded-full border border-divider bg-background/80 px-6 py-3 shadow-sm backdrop-blur-md"
            : "w-full max-w-7xl border-transparent bg-transparent px-6 py-4"
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="cursor-goto flex items-center gap-2 transition-opacity hover:opacity-80">
          <AudioLines className="h-6 w-6 text-accent stroke-[1.5]" />
          <span className="font-heading text-xl font-medium tracking-tight text-foreground">
            Fluence
          </span>
        </Link>

        {/* Middle: Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/interview-prep" className="cursor-goto flex cursor-pointer items-center gap-1 xt-sm font-medium text-muted transition-colors hover:text-foreground">
            Interview Prep
          </Link>
          <Link href="/products" className="cursor-goto flex cursor-pointer items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground">
            Products <ChevronDown className="h-4 w-4 opacity-70" />
          </Link>
          <Link href="/pricing" className="cursor-goto text-sm font-medium text-muted transition-colors hover:text-foreground">
            Pricing
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link href="/setup" className="shrink-0">
            <button className="cursor-start flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}