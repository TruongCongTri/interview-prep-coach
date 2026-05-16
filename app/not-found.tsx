// Catches everything else
import Link from "next/link";
import { Compass } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-background">
      <Compass className="w-16 h-16 text-accent mb-6 stroke-[1.5]" />
      <h1 className="font-heading text-7xl font-light text-foreground mb-4 tracking-tight">404</h1>
      <h2 className="font-heading text-2xl font-medium text-foreground mb-2">Path Not Found</h2>
      <p className="text-muted text-lg max-w-md mb-10">
        The page you are looking for does not exist, or has been moved to a new location.
      </p>
      <Link
        href="/"
        className="cursor-back px-8 py-3 rounded-full text-background bg-foreground font-medium transition-transform hover:scale-105 active:scale-95"
      >
        Return Home
      </Link>
    </div>
  );
}