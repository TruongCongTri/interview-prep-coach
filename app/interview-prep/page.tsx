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
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Hero Section */}
        <header className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            V-Coach Intelligence
          </motion.div>
          <h1 className="text-6xl font-extrabold tracking-tighter md:text-8xl">
            Choose your <br /> focus.
          </h1>
        </header>

        {/* Search Bar (Synced) */}
        <div className="relative mx-auto mb-16">
          <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Search roles, topics, or stacks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-white/10 bg-white/[0.02] py-5 pl-14 pr-8 text-white backdrop-blur-md transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/10"
          />
        </div>

        {/* Mode Toggles (Synced) */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <button
            onClick={() => handleModeChange("role")}
            className={`group relative flex flex-col items-start rounded-3xl border p-8 text-left transition-all duration-500 ${
              activeMode === "role"
                ? "border-cyan-500/40 bg-cyan-500/[0.02]"
                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
            }`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${activeMode === "role" ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" : "border-white/10 text-zinc-600"}`}
            >
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Mock Interview
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Immersive role-play for full engineering and business positions.
            </p>
            {activeMode === "role" && (
              <motion.div
                layoutId="glow-bg"
                className="absolute inset-0 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)] pointer-events-none"
              />
            )}
          </button>

          <button
            onClick={() => handleModeChange("topic")}
            className={`group relative flex flex-col items-start rounded-3xl border p-8 text-left transition-all duration-500 ${
              activeMode === "topic"
                ? "border-amber-500/40 bg-amber-500/[0.02]"
                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
            }`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${activeMode === "topic" ? "border-amber-500/30 bg-amber-500/10 text-amber-400" : "border-white/10 text-zinc-600"}`}
            >
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Targeted Practice
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Atomic drills focused on specific technologies or behavioral
              skills.
            </p>
            {activeMode === "topic" && (
              <motion.div
                layoutId="glow-bg"
                className="absolute inset-0 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.1)] pointer-events-none"
              />
            )}
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {itemsToShow.map((item) => {
              // Determine theme based on type
              const isRole = item.type === "role";
              const themeColor = isRole ? "cyan" : "amber";

              return (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/interview-prep/${item.slug}`}
                    className={`group block h-full rounded-2xl border border-white/5 bg-[#09090B] p-6 backdrop-blur-md transition-all hover:border-${themeColor}-500/20 hover:bg-zinc-900`}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 group-hover:text-zinc-500 transition-colors">
                        {item.category}
                      </span>
                      {/* Dynamic Dot Color */}
                      <div
                        className={`h-2 w-2 rounded-full bg-zinc-800 transition-colors ${
                          isRole
                            ? "group-hover:bg-cyan-500"
                            : "group-hover:bg-amber-500"
                        }`}
                      />
                    </div>

                    {/* Dynamic Title Color */}
                    <h4
                      className={`text-xl font-bold tracking-tight text-white transition-colors ${
                        isRole
                          ? "group-hover:text-cyan-400"
                          : "group-hover:text-amber-400"
                      }`}
                    >
                      {item.title}
                    </h4>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-1 text-[10px] font-bold uppercase text-zinc-500"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`mt-12 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 transition-all group-hover:text-white`}
                    >
                      Initialize Module
                      {/* Dynamic Arrow Color */}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                          isRole
                            ? "group-hover:text-cyan-400"
                            : "group-hover:text-amber-400"
                        }`}
                      />
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
            <div className="flex items-center gap-3 text-cyan-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Scanning data...
              </span>
            </div>
          )}
          {!isLoadingMore &&
            visibleCount >= filteredData.length &&
            filteredData.length > 0 && (
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800">
                Module library complete
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
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PrepDashboardContent />
    </Suspense>
  );
}
