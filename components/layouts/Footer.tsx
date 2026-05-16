"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AudioLines } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname === "/interview") return null;
  
  return (
    <footer className="border-t border-divider bg-background-alt pt-16 pb-8 text-sm text-muted">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Logo & Copyright */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="cursor-goto mb-4 flex items-center gap-2 transition-opacity hover:opacity-80">
                <AudioLines className="h-5 w-5 text-accent stroke-[1.5]" />
                <span className="font-heading text-lg font-medium tracking-tight text-foreground">
                  Fluence
                </span>
              </Link>
              <p className="max-w-xs text-muted leading-relaxed">
                The world&apos;s most advanced vocal preparation platform for global engineers.
              </p>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="font-heading mb-4 font-medium text-foreground">Products</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">AI Interviewer</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Interview Prep</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">For Enterprise</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-4 font-medium text-foreground">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Question Bank</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">STAR Method Guide</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-4 font-medium text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="cursor-goto hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-divider pt-8 md:flex-row">
          <p className="mb-4 md:mb-0">© 2026 Fluence Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="https://my-porfolio-weye.vercel.app/" className="cursor-goto hover:text-foreground transition-colors">Portfolio</Link>
            <Link href="https://linkedin.com/in/trí-trương-công-35b174406" className="cursor-goto hover:text-foreground transition-colors">LinkedIn</Link>
            <Link href="https://github.com/TruongCongTri/interview-prep-coach.git" className="cursor-goto hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}