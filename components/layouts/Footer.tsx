"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/interview") return null;
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 text-sm text-zinc-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Logo & Copyright */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2 transition-opacity hover:opacity-80">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-black">
                  <Sparkles className="h-3 w-3" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  V-Coach
                </span>
              </Link>
              <p className="max-w-xs text-zinc-500">
                The world&apos;s most advanced AI interview prep engine for global engineers.
              </p>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">AI Interviewer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Interview Prep</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">For Enterprise</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Question Bank</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">STAR Method Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="mb-4 md:mb-0">© 2026 V-Coach Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Twitter / X</Link>
            <Link href="https://linkedin.com/in/trí-trương-công-35b174406" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="https://github.com/TruongCongTri/interview-prep-coach.git" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}