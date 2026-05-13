"use client";

import { useState, useRef, Suspense } from "react";
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
  const slug = searchParams.get("slug");
  const data = INTERVIEW_DATA.find((item) => item.slug === slug);

  const [activeTurnIndex, setActiveTurnIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data) return notFound();

  const isRole = data.type === "role";
  const theme = {
    primary: isRole ? "cyan" : "amber",
    text: isRole ? "text-cyan-400" : "text-amber-400",
    bg: isRole ? "bg-cyan-500" : "bg-amber-500",
    border: isRole ? "border-cyan-500/20" : "border-amber-500/20",
    glow: isRole
      ? "shadow-[0_0_50px_rgba(6,182,212,0.15)]"
      : "shadow-[0_0_50px_rgba(245,158,11,0.15)]",
    tint: isRole ? "bg-cyan-500/5" : "bg-amber-500/5",
  };

  const avgScore = Math.round(
    data.mockConversation.reduce(
      (acc, turn) => acc + turn.feedback.overallScore,
      0,
    ) / data.mockConversation.length,
  );

  const scrollToSection = (index: number) => {
    const sections = containerRef.current?.querySelectorAll("section");
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      setActiveTurnIndex(index);
    }
  };

  return (
    <main className="fixed inset-0 h-screen w-full bg-black text-white overflow-hidden selection:bg-cyan-500/30 font-sans">
      {/* --- SUB-NAV (Sits below Global Header at top-20) --- */}
      <nav className="sticky top-20 right-10 z-10 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/interview-prep"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Close Report
          </Link>
          <div
            className={`rounded-full border ${theme.border} bg-white/5 px-4 py-1 text-[10px] font-black uppercase tracking-widest ${theme.text}`}
          >
            {data.title} Assessment
          </div>
        </div>
      </nav>

      {/* --- FLOATING NAVIGATION DOCK --- */}
      <div className="fixed bottom-10 left-1/2 z-[100] -translate-x-1/2">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 p-2 backdrop-blur-2xl shadow-2xl"
        >
          <button
            onClick={() => scrollToSection(Math.max(0, activeTurnIndex - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronUp className="h-4 w-4 text-zinc-500" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {/* Nav Dots */}
            <button
              onClick={() => scrollToSection(0)}
              className={`h-2 w-2 rounded-full transition-all ${activeTurnIndex === 0 ? theme.bg : "bg-zinc-700"}`}
            />
            {data.mockConversation.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(i + 1)}
                className={`h-2 w-2 rounded-full transition-all ${activeTurnIndex === i + 1 ? theme.bg : "bg-zinc-700"}`}
              />
            ))}
            <button
              onClick={() => scrollToSection(data.mockConversation.length + 1)}
              className={`h-2 w-2 rounded-full transition-all ${activeTurnIndex === data.mockConversation.length + 1 ? theme.bg : "bg-zinc-700"}`}
            />
          </div>

          <div className="h-4 w-px bg-white/10 mx-2" />

          <span className="px-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Turn {activeTurnIndex}{" "}
            <span className="text-zinc-600">
              / {data.mockConversation.length}
            </span>
          </span>

          <button
            onClick={() =>
              scrollToSection(
                Math.min(data.mockConversation.length + 1, activeTurnIndex + 1),
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </button>
        </motion.div>
      </div>

      {/* --- SCROLL SNAP CONTAINER --- */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide pt-2"
        onScroll={(e) => {
          const index = Math.round(
            e.currentTarget.scrollTop / window.innerHeight,
          );
          setActiveTurnIndex(index);
        }}
      >
        {/* SECTION 0: HERO OVERVIEW */}
        <section className="h-screen w-full flex shrink-0 snap-start items-center justify-center p-6">
          <div
            className={`relative max-w-5xl w-full rounded-[40px] border border-white/10 bg-zinc-950 p-16 ${theme.glow} overflow-hidden`}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-left">
                <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">
                  Assessment Complete
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-9xl font-black tracking-tighter leading-none">
                    {avgScore}
                  </span>
                  <span className="text-2xl font-bold text-zinc-700">/100</span>
                </div>
                <h2 className="mt-8 text-3xl font-bold text-white">
                  {data.title}
                </h2>
                <p className="mt-4 text-zinc-400 max-w-sm leading-relaxed">
                  Based on your session, we have analyzed{" "}
                  {data.mockConversation.length} answers across multiple
                  technical and behavioral markers.
                </p>
              </div>

              <div className="grid gap-4 w-full md:w-auto">
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex items-center gap-4">
                  <Trophy className={`h-8 w-8 ${theme.text}`} />
                  <div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase">
                      Status
                    </div>
                    <div className="text-lg font-bold">Strong Candidate</div>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection(1)}
                  className={`w-full rounded-full ${theme.bg} py-4 font-black uppercase tracking-widest text-black shadow-2xl`}
                >
                  View Deep Dive
                </button>
              </div>
            </div>
            <div
              className={`absolute -right-20 -bottom-20 h-96 w-96 rounded-full blur-[120px] opacity-10 ${theme.bg}`}
            />
          </div>
        </section>

        {/* SECTION 1..N: QUESTION FEEDBACK */}
        {data.mockConversation.map((turn, index) => {
          const ideal = data.commonQuestions[index];
          return (
            <section
              key={turn.id}
              className="h-screen w-full flex shrink-0 snap-start items-center justify-center p-8 lg:p-12"
            >
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 h-full max-h-[80vh]">
                {/* --- LEFT COLUMN: DIALOGUE & BENCHMARK --- */}
                <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden">
                  {/* 1. The Question */}
                  <div className="rounded-[32px] border border-white/5 bg-zinc-950 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800 text-[10px] font-black text-zinc-500 uppercase">
                        Q
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        The Question
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white leading-snug italic">
                      &quot;{turn.aiQuestion}&quot;
                    </h2>
                  </div>

                  {/* 2. Your Answer */}
                  <div
                    className={`rounded-[32px] border ${theme.border} ${theme.tint} p-8 relative`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded ${theme.bg} text-[10px] font-black text-black uppercase`}
                      >
                        A
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}
                      >
                        Your Response
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-zinc-200 font-medium italic">
                      &quot;{turn.userMockAnswer}&quot;
                    </p>
                  </div>

                  {/* 3. Performance Metrics + Suggested Answer */}
                  <div className="flex-1 rounded-[32px] border border-white/5 bg-zinc-950 p-8 overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-2 gap-6 mb-8 border-b border-white/5 pb-8">
                      <div>
                        <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                          <CheckCircle2 className="h-4 w-4" /> Strengths
                        </h4>
                        <ul className="space-y-2 text-sm text-zinc-400">
                          {turn.feedback.strengths.map((s, i) => (
                            <li key={i} className="flex gap-2">
                              <span>•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase text-red-500 tracking-widest">
                          <AlertCircle className="h-4 w-4" /> Weaknesses
                        </h4>
                        <ul className="space-y-2 text-sm text-zinc-400">
                          {turn.feedback.weaknesses.map((w, i) => (
                            <li key={i} className="flex gap-2">
                              <span>•</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 tracking-widest">
                        <Lightbulb className="h-4 w-4" /> Suggested Answer
                        Benchmark
                      </h4>
                      <div className="space-y-4">
                        {[
                          { l: "S", t: ideal?.idealSTAR.s },
                          { l: "T", t: ideal?.idealSTAR.t },
                          { l: "A", t: ideal?.idealSTAR.a },
                          { l: "R", t: ideal?.idealSTAR.r },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-[10px] font-black text-zinc-600 uppercase w-6 pt-1">
                              {item.l}
                            </span>
                            <p className="flex-1 text-[13px] leading-relaxed text-zinc-400">
                              {item.t}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: STAR AUDIT --- */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-10 h-full flex flex-col">
                    <h3 className="mb-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      <Target className="h-5 w-5" /> Structural Integrity Audit
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
                          className={`group transition-all ${item.st === "detected" ? "opacity-100" : "opacity-30"}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-5">
                              <span
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-black ${
                                  item.st === "detected"
                                    ? `bg-emerald-500 text-black`
                                    : "bg-zinc-800 text-zinc-600"
                                }`}
                              >
                                {item.k}
                              </span>
                              <div>
                                <h4 className="text-md font-bold text-white">
                                  {item.l}
                                </h4>
                                <span
                                  className={`text-[9px] font-black uppercase ${item.st === "detected" ? "text-emerald-500" : "text-zinc-600"}`}
                                >
                                  {item.st === "detected"
                                    ? "Detected"
                                    : "Missing"}
                                </span>
                              </div>
                            </div>
                            {item.st === "detected" ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-zinc-800" />
                            )}
                          </div>
                          <p className="pl-[68px] text-[11px] leading-relaxed text-zinc-400">
                            {item.t}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`mt-10 rounded-2xl border ${theme.border} bg-white/5 p-6`}
                    >
                      <div
                        className={`text-[10px] font-black uppercase ${theme.text} mb-2`}
                      >
                        V-Coach Strategy
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-300 font-medium italic">
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
        <section className="h-screen w-full flex shrink-0 snap-start items-center justify-center p-6 bg-[#050505]">
          <div className="text-center">
            <Sparkles className={`mx-auto h-16 w-16 ${theme.text} mb-8`} />
            <h2 className="text-6xl font-black tracking-tighter mb-4 italic">
              Done.
            </h2>
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <Link
                href={`/setup?slug=${data.slug}`}
                className={`w-full rounded-full ${theme.bg} py-5 font-black uppercase tracking-widest text-black text-xs`}
              >
                Retake Session
              </Link>
              <Link
                href="/interview-prep"
                className="w-full rounded-full border border-white/10 py-5 font-black uppercase tracking-widest text-zinc-500 text-xs"
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
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <FeedbackContent />
    </Suspense>
  );
}
