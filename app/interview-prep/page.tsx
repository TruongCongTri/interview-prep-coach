"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Briefcase,
  Target,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { INTERVIEW_DATA, EntryType } from "@/lib/mock-data";

const ITEMS_PER_BATCH = 6;

function PrepDashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- 1. INITIALIZE STATE FROM URL ---
  const initialMode = (searchParams.get("mode") as EntryType) || "role";
  const initialSearch = searchParams.get("q") || "";

  const [activeMode, setActiveMode] = useState<EntryType>(initialMode);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // --- 2. URL SYNC HANDLERS ---
  const updateUrl = (mode: EntryType, query: string) => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (query) params.set("q", query);

    // Replace URL without adding to history stack to keep back-button clean
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleModeChange = (mode: EntryType) => {
    setActiveMode(mode);
    setVisibleCount(ITEMS_PER_BATCH);
    updateUrl(mode, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setVisibleCount(ITEMS_PER_BATCH);
    updateUrl(activeMode, val);
  };

  // --- 3. FILTERING LOGIC ---
  const filteredData = INTERVIEW_DATA.filter((item) => {
    const matchesMode = item.type === activeMode;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesMode && matchesSearch;
  });

  const itemsToShow = filteredData.slice(0, visibleCount);

  // --- 4. INFINITE SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleCount < filteredData.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
            setIsLoadingMore(false);
          }, 600);
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredData.length]);

  return (
    <main 
      className="min-h-screen bg-background text-foreground transition-colors duration-700 ease-in-out"
      style={{
        '--accent': activeMode === 'role' ? 'var(--accent-role)' : 'var(--accent-topic)',
        '--accent-light': activeMode === 'role' ? 'var(--accent-role-light)' : 'var(--accent-topic-light)',
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Hero Section */}
        <header className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 font-heading text-sm font-medium uppercase tracking-[0.15em] text-accent transition-colors duration-500"
          >
            <Sparkles className="h-4 w-4" />
            Fluence Intelligence
          </motion.div>
          <h1 className="font-heading text-6xl font-light tracking-tight md:text-8xl">
            Choose your <br />
            <span className="font-medium italic text-foreground">focus.</span>
          </h1>
        </header>

        {/* Search Bar (Synced) */}
        <div className="cursor-search relative mx-auto mb-16 max-w-2xl">
          <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search roles, topics, or stacks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-divider bg-background-alt py-5 pl-14 pr-8 text-foreground transition-all focus:border-accent focus:bg-background focus:outline-none focus:ring-4 focus:ring-accent-light"
          />
        </div>

        {/* Mode Toggles (Synced) */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <button
            onClick={() => handleModeChange("role")}
            className={`cursor-select group relative flex flex-col items-start rounded-3xl border p-8 text-left transition-all duration-500 ${
              activeMode === "role"
                ? "border-[color:var(--accent-role)] bg-[color:var(--accent-role-light)] shadow-sm"
                : "border-divider bg-background-alt hover:border-[color:var(--accent-role)]/50"
            }`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${
                activeMode === "role" 
                  ? "border-[color:var(--accent-role)]/30 bg-background text-[color:var(--accent-role)]" 
                  : "border-divider text-muted group-hover:text-[color:var(--accent-role)]"
              }`}
            >
              <Briefcase className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground">
              Mock Interview
            </h3>
            <p className="mt-2 text-sm text-muted">
              Immersive role-play for full engineering and business positions.
            </p>
          </button>

          <button
            onClick={() => handleModeChange("topic")}
            className={`cursor-select group relative flex flex-col items-start rounded-3xl border p-8 text-left transition-all duration-500 ${
              activeMode === "topic"
                ? "border-[color:var(--accent-topic)] bg-[color:var(--accent-topic-light)] shadow-sm"
                : "border-divider bg-background-alt hover:border-[color:var(--accent-topic)]/50"
            }`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${
                activeMode === "topic" 
                  ? "border-[color:var(--accent-topic)]/30 bg-background text-[color:var(--accent-topic)]" 
                  : "border-divider text-muted group-hover:text-[color:var(--accent-topic)]"
              }`}
            >
              <Target className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground">
              Targeted Practice
            </h3>
            <p className="mt-2 text-sm text-muted">
              Atomic drills focused on specific technologies or behavioral skills.
            </p>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {itemsToShow.map((item) => {
              const isRole = item.type === "role";
              const cardAccentVar = isRole ? 'var(--accent-role)' : 'var(--accent-topic)';

              return (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ '--card-accent': cardAccentVar } as React.CSSProperties}
                >
                  <Link
                    href={`/interview-prep/${item.slug}`}
                    className="cursor-view group flex flex-col h-full rounded-2xl border border-divider bg-background-alt p-6 transition-all hover:border-[color:var(--card-accent)] hover:bg-background hover:shadow-sm"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-muted group-hover:text-foreground transition-colors">
                        {item.category}
                      </span>
                      {/* Dynamic Dot Color */}
                      <div className="h-2 w-2 rounded-full bg-divider transition-colors group-hover:bg-[color:var(--card-accent)]" />
                    </div>

                    {/* Dynamic Title Color */}
                    <h4 className="font-heading text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-[color:var(--card-accent)]">
                      {item.title}
                    </h4>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-divider bg-background px-2 py-1 font-heading text-xs font-medium uppercase text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-12 flex items-center justify-between font-heading text-[10px] font-medium uppercase tracking-widest text-muted transition-all group-hover:text-foreground">
                      Initialize Module
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--card-accent)]" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Sentinel */}
        <div
          ref={loadMoreRef}
          className="mt-16 flex flex-col items-center justify-center gap-4 py-10"
        >
          {isLoadingMore && (
            <div className="flex items-center gap-3 text-accent transition-colors">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-heading text-xs font-medium uppercase tracking-widest">
                Scanning library...
              </span>
            </div>
          )}
          {!isLoadingMore &&
            visibleCount >= filteredData.length &&
            filteredData.length > 0 && (
              <p className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-divider border-t border-divider pt-8 w-32 text-center">
                End of list
              </p>
            )}
        </div>
      </div>
    </main>
  );
}

// Wrapper for Suspense (required for useSearchParams)
export default function InterviewPrepPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PrepDashboardContent />
    </Suspense>
  );
}