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
  }, [visibleCount, data?.commonQuestions?.length, data]);

  // --- 4. CONDITIONAL RETURN (Must be after all Hooks) ---
  if (!data) {
    return notFound();
  }

  // --- 5. DERIVED THEME LOGIC ---
  const isRole = data.type === "role";

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <main 
      className="min-h-screen bg-background text-foreground pb-32"
      style={{
        '--accent': isRole ? 'var(--accent-role)' : 'var(--accent-topic)',
        '--accent-light': isRole ? 'var(--accent-role-light)' : 'var(--accent-topic-light)',
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-4xl px-6 pt-32">
        {/* --- Breadcrumb Back Button --- */}
        <Link
          href="/interview-prep"
          className="cursor-back group mb-12 inline-flex items-center gap-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-divider bg-transparent transition-colors group-hover:border-accent">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Back to Library
        </Link>

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
                className="rounded-full border border-divider bg-background-alt px-4 py-1.5 font-heading text-[10px] font-medium uppercase tracking-widest text-muted"
              >
                {skill}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
            {data.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted leading-relaxed">
            Review the top {data.commonQuestions.length} most common{" "}
            {data.title} interview questions and take an AI-powered practice
            session.
          </p>

          <div className="mt-12 relative group">
            <Link href={`/interview?slug=${data.slug}`}>
              <button
                className="cursor-start relative flex items-center gap-3 rounded-full bg-foreground px-10 py-5 font-heading text-sm font-medium uppercase tracking-wider text-background shadow-sm transition-transform hover:scale-[1.02] active:scale-95 hover:shadow-md"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Initiate Practice Module
                <Play className="h-4 w-4 fill-accent text-accent ml-1" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- Questions Section --- */}
        <div className="mt-32">
          <h2 className="font-heading mb-12 text-center text-3xl font-medium tracking-tight text-foreground">
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
                      ? "border-accent bg-background"
                      : "border-divider bg-background-alt hover:border-accent/50"
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="cursor-view flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <h3
                      className={`font-heading text-xl font-medium leading-relaxed transition-colors ${
                        isOpen ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {index + 1}. {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-divider text-muted bg-background"
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
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-divider p-6 pt-4">
                          <div className="flex items-start gap-4 rounded-xl bg-accent-light p-6 border border-accent/20">
                            <Lightbulb
                              className="h-6 w-6 text-accent shrink-0 mt-1 stroke-[1.5]"
                            />
                            <div>
                              <h4 className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">
                                Approach Strategy
                              </h4>
                              <p className="text-base leading-relaxed text-foreground">
                                {item.suggestion}
                              </p>

                              {/* STAR Quick Hint */}
                              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-accent/20 pt-6 md:grid-cols-4">
                                {Object.entries(item.idealSTAR).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <span className="font-heading text-[10px] font-medium uppercase tracking-widest text-accent block mb-2">
                                        {key}
                                      </span>
                                      <span className="text-sm text-muted leading-tight block">
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
            className="mt-16 flex h-20 items-center justify-center"
          >
            {isLoadingMore && (
              <div className="flex items-center gap-3 text-accent">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-heading text-xs font-medium uppercase tracking-widest">
                  Loading insights...
                </span>
              </div>
            )}
            {!isLoadingMore && visibleCount >= data.commonQuestions.length && (
              <p className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-divider border-t border-divider pt-8 w-32 text-center">
                End of Module
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}