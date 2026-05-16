"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SubCTA() {
  const pathname = usePathname();
  
  if (pathname === "/interview" || pathname === "/feedback") return null;

  return (
    <section className="relative overflow-hidden border-t border-divider bg-background-alt py-32 text-center">
      {/* Subtle Warm Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-6 flex flex-col items-center">
        <h2 className="font-heading mb-6 text-5xl font-light tracking-tight text-foreground md:text-7xl">
          Ready to master your <br className="hidden md:block" /> next interview?
        </h2>
        <p className="mb-10 text-lg text-muted max-w-xl">
          Join professionals worldwide mastering their delivery and structure with Fluence.
        </p>

        <div className="mx-auto flex w-full max-w-md items-center justify-center">
          <Link href="/setup" className="shrink-0">
            <button className="cursor-start flex h-12 items-center justify-center gap-3 rounded-full bg-foreground px-8 font-heading text-background transition-transform hover:scale-105 active:scale-95">
              Initiate Live Demo <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}