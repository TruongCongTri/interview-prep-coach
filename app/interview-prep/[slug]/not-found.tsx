import Link from "next/link";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center bg-background px-6">
      <MapPinOff className="h-12 w-12 text-accent stroke-[1.5] mb-6" />
      <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-muted">Module Not Found</h2>
      <p className="mt-4 text-foreground text-lg">The requested interview path does not exist in our library.</p>
      <Link href="/interview-prep" className="cursor-back mt-8 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95">
        Return to Dashboard
      </Link>
    </div>
  );
}