"use client";

import { useState, useRef, Suspense, useMemo, useEffect } from "react";
import { useSearchParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Target,
  Sparkles,
  Trophy,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";
import { INTERVIEW_DATA } from "@/lib/mock-data";

function FeedbackContent() {
  const searchParams = useSearchParams();
  
  // 1. CATCH ALL QUERY PARAMETERS
  const slug = searchParams.get("slug");
  const indicesParam = searchParams.get("indices");
  const level = searchParams.get("lv") || "Mid-Level";
  const mode = searchParams.get("mode") || "role";

  const data = INTERVIEW_DATA.find((item) => item.slug === slug);

  const [activeTurnIndex, setActiveTurnIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- RECONSTRUCT SESSION ---
  const sessionConversation = useMemo(() => {
    if (!data) return [];
    if (!indicesParam) return data.mockConversation;
    const indexArray = indicesParam.split(",").map(Number);
    return indexArray.map((idx) => data.mockConversation[idx]).filter(Boolean);
  }, [data, indicesParam]);

  // --- INTERSECTION OBSERVER FOR NATURAL SCROLL ---
  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll("section");
    if (!sections || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveTurnIndex(index);
            }
          }
        });
      },
      // Trigger when a section enters the middle 40% of the viewport
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" } 
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sessionConversation]);

  if (!data || sessionConversation.length === 0) return notFound();

  const isRole = data.type === "role";

  const avgScore = Math.round(
    sessionConversation.reduce(
      (acc, turn) => acc + turn.feedback.overallScore,
      0,
    ) / sessionConversation.length,
  );

  const scrollToSection = (index: number) => {
    const sections = containerRef.current?.querySelectorAll("section");
    if (sections && sections[index]) {
      // Offset by 80px to account for the sticky nav bar
      const y = sections[index].getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main 
      className="min-h-screen w-full bg-background text-foreground pb-24 selection:bg-accent-light"
      style={{
        '--accent': isRole ? 'var(--accent-role)' : 'var(--accent-topic)',
        '--accent-light': isRole ? 'var(--accent-role-light)' : 'var(--accent-topic-light)',
      } as React.CSSProperties}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-24">
        <Link
          href="/interview-prep"
          className="cursor-back group flex items-center gap-3 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-divider bg-transparent transition-colors group-hover:border-[color:var(--accent)]">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Back to Library
        </Link>
        <div
          className="rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-light)] px-4 py-1.5 font-heading text-[10px] font-medium uppercase tracking-widest text-[color:var(--accent)] flex items-center gap-2"
        >
          {data.title} <span className="opacity-50">|</span> {level} Level
        </div>
      </div>

      {/* --- FLOATING NAVIGATION DOCK --- */}
      <div className="fixed bottom-10 left-1/2 z-[50] -translate-x-1/2">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 rounded-full border border-divider bg-background/90 p-2 backdrop-blur-2xl shadow-lg"
        >
          {/* Previous Section Button */}
          <button
            onClick={() => scrollToSection(Math.max(0, activeTurnIndex - 1))}
            className="cursor-backward flex h-10 w-10 items-center justify-center rounded-full hover:bg-background-alt transition-colors disabled:opacity-30"
            disabled={activeTurnIndex === 0}
          >
            <ChevronUp className="h-4 w-4 text-muted" />
          </button>

          <div className="flex items-center gap-2 px-3">
            {/* 1. Hero Dot (Index 0) */}
            <button
              onClick={() => scrollToSection(0)}
              className={`cursor-backward h-2.5 w-2.5 rounded-full transition-all ${
                activeTurnIndex === 0 
                  ? "bg-[color:var(--accent)] scale-110" 
                  : "bg-divider hover:bg-[color:var(--accent)]/50"
              }`}
            />

            {/* 2. Dynamic Question Dots (Indices 1 to N) */}
            {sessionConversation.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(i + 1)}
                className={`cursor-goto h-2.5 w-2.5 rounded-full transition-all ${
                  activeTurnIndex === i + 1 
                    ? "bg-[color:var(--accent)] scale-110" 
                    : "bg-divider hover:bg-[color:var(--accent)]/50"
                }`}
              />
            ))}

            {/* 3. Final CTA Dot (Index N + 1) */}
            <button
              onClick={() => scrollToSection(sessionConversation.length + 1)}
              className={`cursor-goto h-2.5 w-2.5 rounded-full transition-all ${
                activeTurnIndex === sessionConversation.length + 1 
                  ? "bg-[color:var(--accent)] scale-110" 
                  : "bg-divider hover:bg-[color:var(--accent)]/50"
              }`}
            />
          </div>

          <div className="h-4 w-px bg-divider mx-2" />

          {/* Counter Text */}
          <span className="px-3 font-heading text-[10px] font-medium uppercase tracking-widest text-muted min-w-[80px] text-center">
            {activeTurnIndex === 0 ? (
              "Overview"
            ) : activeTurnIndex > sessionConversation.length ? (
              "Finish"
            ) : (
              <>
                Turn {activeTurnIndex}{" "}
                <span className="text-divider ml-1">
                  / {sessionConversation.length}
                </span>
              </>
            )}
          </span>

          {/* Next Section Button */}
          <button
            onClick={() =>
              scrollToSection(
                Math.min(sessionConversation.length + 1, activeTurnIndex + 1),
              )
            }
            className="cursor-forward flex h-10 w-10 items-center justify-center rounded-full hover:bg-background-alt transition-colors disabled:opacity-30"
            disabled={activeTurnIndex === sessionConversation.length + 1}
          >
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
        </motion.div>
      </div>

      {/* Main Flow Container */}
      <div ref={containerRef} className="flex flex-col w-full">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] w-full flex items-center justify-center p-6 border-b border-divider">
          <div className="relative max-w-5xl w-full rounded-[40px] border border-divider bg-background-alt p-12 lg:p-20 overflow-hidden shadow-sm">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-left w-full">
                <h1 className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-muted mb-6">
                  {mode === "role" ? "Mock Interview Complete" : "Targeted Practice Complete"}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-9xl font-light tracking-tighter leading-none text-[color:var(--accent)]">
                    {avgScore}
                  </span>
                  <span className="text-2xl font-medium text-muted">/100</span>
                </div>
                <h2 className="mt-8 font-heading text-4xl font-medium text-foreground flex items-center gap-4">
                  {data.title}
                  <span className="text-xl font-light text-muted bg-background px-4 py-1.5 rounded-full border border-divider">
                    {level}
                  </span>
                </h2>
                <button
                  onClick={() => scrollToSection(1)}
                  className="cursor-view mt-10 rounded-full bg-foreground px-10 py-4 font-heading text-xs font-medium uppercase tracking-widest text-background shadow-md hover:scale-105 active:scale-95 transition-all inline-flex"
                >
                  View Breakdown
                </button>
              </div>
              <div className="hidden md:block opacity-20 shrink-0">
                <Trophy className="h-64 w-64 text-[color:var(--accent)] stroke-[1]" />
              </div>
            </div>
            <div
              className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px] opacity-20 bg-[color:var(--accent)] pointer-events-none"
            />
          </div>
        </section>

        {/* FEEDBACK CARDS */}
        {sessionConversation.map((turn) => {
          const ideal = turn;
          return (
            <section
              key={turn.id}
              className="min-h-screen w-full flex items-center justify-center p-6 lg:py-24 border-b border-divider"
            >
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: DIALOGUE & SUGGESTED ANSWER */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="rounded-[32px] border border-divider bg-background-alt p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-divider font-heading text-[10px] font-medium text-muted">
                        Q
                      </span>
                      <span className="font-heading text-[10px] font-medium uppercase tracking-widest text-muted">
                        The Prompt
                      </span>
                    </div>
                    <h2 className="text-2xl font-medium tracking-tight text-foreground leading-snug italic">
                      &quot;{turn.aiQuestion}&quot;
                    </h2>
                  </div>

                  <div
                    className="rounded-[32px] border border-[color:var(--accent)]/20 bg-[color:var(--accent-light)] p-8 relative"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-[color:var(--accent)] font-heading text-[10px] font-medium text-background"
                      >
                        A
                      </span>
                      <span
                        className="font-heading text-[10px] font-medium uppercase tracking-widest text-[color:var(--accent)]"
                      >
                        Your Response
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground font-medium">
                      &quot;{turn.userMockAnswer}&quot;
                    </p>
                  </div>

                  <div className="flex-1 rounded-[32px] border border-divider bg-background p-8 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 border-b border-divider pb-8">
                      <div>
                        <h4 className="mb-5 flex items-center gap-2 font-heading text-[10px] font-medium uppercase text-emerald-600 tracking-widest">
                          <CheckCircle2 className="h-4 w-4" /> Strengths
                        </h4>
                        <ul className="space-y-3 text-sm text-foreground/80">
                          {turn.feedback.strengths.map((s, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-emerald-500">•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-5 flex items-center gap-2 font-heading text-[10px] font-medium uppercase text-red-500 tracking-widest">
                          <AlertCircle className="h-4 w-4" /> Areas to Improve
                        </h4>
                        <ul className="space-y-3 text-sm text-foreground/80">
                          {turn.feedback.weaknesses.map((w, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-red-500">•</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="mb-6 flex items-center gap-2 font-heading text-[10px] font-medium uppercase text-[color:var(--accent)] tracking-widest">
                        <Lightbulb className="h-4 w-4" /> {level} Benchmark Standard
                      </h4>
                      <div className="space-y-5">
                        {[
                          { l: "S", t: ideal?.idealSTAR.s },
                          { l: "T", t: ideal?.idealSTAR.t },
                          { l: "A", t: ideal?.idealSTAR.a },
                          { l: "R", t: ideal?.idealSTAR.r },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-5">
                            <span className="font-heading text-xs font-medium text-muted uppercase w-6 pt-1 text-center shrink-0">
                              {item.l}
                            </span>
                            <p className="flex-1 text-sm leading-relaxed text-muted font-medium">
                              {item.t}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: ENLARGED STAR AUDIT */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="rounded-[32px] border border-divider bg-background-alt p-8 lg:p-10 flex flex-col h-full">
                    <h3 className="mb-10 flex items-center gap-3 font-heading text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      <Target className="h-5 w-5 stroke-[1.5]" /> Structure Integrity Audit
                    </h3>
                    <div className="flex-1 space-y-6">
                      {[
                        {
                          k: "S",
                          l: "Situation",
                          st: turn.feedback.starAnalysis.s,
                          t: ideal?.idealSTAR.s,
                        },
                        {
                          k: "T",
                          l: "Task",
                          st: turn.feedback.starAnalysis.t,
                          t: ideal?.idealSTAR.t,
                        },
                        {
                          k: "A",
                          l: "Action",
                          st: turn.feedback.starAnalysis.a,
                          t: ideal?.idealSTAR.a,
                        },
                        {
                          k: "R",
                          l: "Result",
                          st: turn.feedback.starAnalysis.r,
                          t: ideal?.idealSTAR.r,
                        },
                      ].map((item) => (
                        <div
                          key={item.k}
                          className={`group transition-all ${item.st === "detected" ? "opacity-100" : "opacity-50 grayscale"}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-5">
                              <span
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-2xl font-medium ${
                                  item.st === "detected" 
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                                    : "bg-background border border-divider text-muted"
                                }`}
                              >
                                {item.k}
                              </span>
                              <div>
                                <h4 className="text-lg font-medium text-foreground">
                                  {item.l}
                                </h4>
                                <span
                                  className={`font-heading text-[10px] font-medium uppercase tracking-widest ${
                                    item.st === "detected" ? "text-emerald-600" : "text-muted"
                                  }`}
                                >
                                  {item.st === "detected" ? "Detected" : "Missing"}
                                </span>
                              </div>
                            </div>
                            {item.st === "detected" ? (
                              <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="h-6 w-6 text-divider shrink-0" />
                            )}
                          </div>
                          <p
                            className={`pl-[68px] text-sm leading-relaxed ${
                              item.st === "detected" ? "text-foreground/80 font-medium" : "text-muted italic"
                            }`}
                          >
                            {item.t}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="mt-10 rounded-2xl border border-[color:var(--accent)]/20 bg-[color:var(--accent-light)] p-8"
                    >
                      <div
                        className="font-heading text-[10px] font-medium uppercase tracking-widest text-[color:var(--accent)] mb-3"
                      >
                        Fluence Strategy
                      </div>
                      <p className="text-base leading-relaxed text-foreground font-medium italic">
                        {/* Dynamic Pseudo-Context to make the static data feel alive */}
                        {level === "Senior" || level === "Lead" || level === "Manager" 
                          ? `At the ${level} level, expectations go beyond task execution. Focus on strategic business impact. `
                          : `As a ${level} candidate, focus on demonstrating clear task execution and learning agility. `
                        }
                        {ideal?.suggestion}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          );
        })}

        {/* FINAL SECTION */}
        <section className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-background-alt pt-24 pb-48">
          <div className="text-center w-full max-w-lg">
            <Sparkles className="mx-auto h-16 w-16 text-[color:var(--accent)] stroke-[1.5] mb-8" />
            <h2 className="font-heading text-6xl md:text-7xl font-light tracking-tight mb-12 text-foreground">
              Module Complete.
            </h2>
            <div className="flex flex-col gap-4 w-full mx-auto">
              {/* Pass the exact same setup parameters back to the setup page for easy retrying */}
              <Link
                href={`/setup?slug=${data.slug}&mode=${mode}&lv=${level}`}
                className="cursor-start w-full rounded-full bg-[color:var(--accent)] py-4 font-heading text-sm font-medium uppercase tracking-widest text-background shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Retake Session
              </Link>
              <Link
                href="/interview-prep"
                className="cursor-back w-full rounded-full border border-divider bg-background py-4 font-heading text-sm font-medium uppercase tracking-widest text-muted hover:border-[color:var(--accent)] hover:text-foreground transition-all"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-background" />}>
      <FeedbackContent />
    </Suspense>
  );
}