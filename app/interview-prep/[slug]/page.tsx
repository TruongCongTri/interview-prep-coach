"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Play,
  Sparkles,
  ChevronDown,
  Lightbulb,
  Loader2,
} from "lucide-react";

// Import your centralized data
import { INTERVIEW_DATA } from "@/lib/mock-data";

export default function InterviewDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // --- 1. ALL HOOKS MUST BE AT THE TOP LEVEL ---
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // --- 2. FIND DATA ---
  const data = INTERVIEW_DATA.find((item) => item.slug === slug);

  // --- 3. THE EFFECT MUST BE UNCONDITIONAL ---
  useEffect(() => {
    // If data doesn't exist, we just don't set up the observer logic
    if (!data || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // Safe check inside the callback
        if (
          target.isIntersecting &&
          visibleCount < data.commonQuestions.length
        ) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 5, data.commonQuestions.length),
            );
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
    // Use optional chaining in dependencies to ensure they are defined/stable
  }, [visibleCount, data?.commonQuestions?.length, data]);

  // --- 4. CONDITIONAL RETURN (Must be after all Hooks) ---
  if (!data) {
    return notFound();
  }

  // --- 5. DERIVED THEME LOGIC ---
  const isRole = data.type === "role";
  const theme = {
    primary: isRole ? "cyan" : "amber",
    text: isRole ? "text-cyan-400" : "text-amber-400",
    bg: isRole ? "bg-cyan-500" : "bg-amber-500",
    border: isRole ? "border-cyan-500/20" : "border-amber-500/20",
    glow: isRole
      ? "shadow-[0_0_30px_rgba(6,182,212,0.3)]"
      : "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    tint: isRole ? "bg-cyan-500/10" : "bg-amber-500/10",
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-32">
      {/* --- Top Navigation --- */}
      <nav className="sticky top-20 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center px-6 py-4">
          <Link
            href="/interview-prep"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-colors group-hover:bg-white/[0.05]">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Back to explore
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-16 md:pt-24">
        {/* --- Hero Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          {/* Skill Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 backdrop-blur-md"
              >
                {skill}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            {data.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed">
            Review the top {data.commonQuestions.length} most common{" "}
            {data.title} interview questions and take an AI-powered practice
            session.
          </p>

          <div className="mt-12 relative group">
            {/* Dynamic Background Glow */}
            <div
              className={`absolute -inset-4 rounded-full ${theme.bg} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
            />

            <Link href={`/interview?slug=${data.slug}`}>
              <button
                className={`relative flex items-center gap-3 rounded-full ${theme.bg} px-10 py-5 text-base font-bold text-black ${theme.glow} transition-all hover:scale-105 active:scale-95`}
              >
                <Sparkles className="h-5 w-5" />
                Take practice AI interview
                <Play className="h-4 w-4 fill-black ml-1" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- Questions Section --- */}
        <div className="mt-32">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
            Common Interview Questions
          </h2>

          <div className="space-y-4">
            {data.commonQuestions.slice(0, visibleCount).map((item, index) => {
              const isOpen = openQuestionId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 5) * 0.1 }}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? `border-white/20 bg-white/[0.05]`
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <h3
                      className={`text-lg font-medium leading-relaxed transition-colors ${isOpen ? "text-white" : "text-zinc-300"}`}
                    >
                      {index + 1}. {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-500"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="border-t border-white/5 p-6 pt-4">
                          <div
                            className={`flex items-start gap-4 rounded-xl ${theme.tint} p-5 border ${theme.border}`}
                          >
                            <Lightbulb
                              className={`h-5 w-5 ${theme.text} shrink-0 mt-1`}
                            />
                            <div>
                              <h4
                                className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.text} mb-3`}
                              >
                                Approach strategy
                              </h4>
                              <p className="text-[15px] leading-relaxed text-zinc-300">
                                {item.suggestion}
                              </p>

                              {/* STAR Quick Hint */}
                              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 md:grid-cols-4">
                                {Object.entries(item.idealSTAR).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <span
                                        className={`text-[10px] font-black uppercase ${theme.text} block mb-1`}
                                      >
                                        {key}
                                      </span>
                                      <span className="text-[11px] text-zinc-500 leading-tight block">
                                        {value}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* --- Bottom Observer --- */}
          <div
            ref={loadMoreRef}
            className="mt-12 flex h-20 items-center justify-center"
          >
            {isLoadingMore && (
              <div className={`flex items-center gap-3 ${theme.text}`}>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Generating more...
                </span>
              </div>
            )}
            {!isLoadingMore && visibleCount >= data.commonQuestions.length && (
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-800">
                End of module
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
