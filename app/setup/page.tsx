"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Briefcase,
  Clock,
  Target,
  Sparkles,
  Settings2,
  Layers,
} from "lucide-react";

// Import centralized data
import { INTERVIEW_DATA, EntryType } from "@/lib/mock-data";

function SetupContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- 1. INITIALIZE STATE FROM URL (Single Source of Truth) ---
  const slugParam = searchParams.get("slug");
  const modeParam = (searchParams.get("mode") as EntryType) || "role";

  const initialEntry =
    INTERVIEW_DATA.find((i) => i.slug === slugParam) || INTERVIEW_DATA[0];

  const [setupMode, setSetupMode] = useState<EntryType>(modeParam);
  const [selectedEntry, setSelectedEntry] = useState(initialEntry);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialEntry.skills,
  );

  // Settings
  const [seniority, setSeniority] = useState(
    searchParams.get("lv") || "Mid-Level",
  );
  const [duration, setDuration] = useState(searchParams.get("dur") || "30m");
  const [questionCount, setQuestionCount] = useState(
    searchParams.get("q") || "3",
  );

  const SENIORITY_LEVELS = ["Junior", "Mid-Level", "Senior", "Lead", "Manager"];
  const DURATIONS = ["15m", "30m", "45m", "60m"];
  const QUESTION_COUNTS = ["1", "2", "3"];

  // --- 2. URL SYNC HANDLER ---
  const updateUrl = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleModeToggle = (newMode: EntryType) => {
    setSetupMode(newMode);
    const firstOfNewMode = INTERVIEW_DATA.find((i) => i.type === newMode);
    if (firstOfNewMode) {
      setSelectedEntry(firstOfNewMode);
      setSelectedSkills(firstOfNewMode.skills);
      updateUrl({
        mode: newMode,
        slug: firstOfNewMode.slug,
      });
    }
  };

  const handleEntryChange = (slug: string) => {
    const entry = INTERVIEW_DATA.find((i) => i.slug === slug);
    if (entry) {
      setSelectedEntry(entry);
      setSelectedSkills(entry.skills);
      updateUrl({ slug });
    }
  };

  const handleSettingChange = (
    key: string,
    value: string,
    setter: (v: string) => void,
  ) => {
    setter(value);
    updateUrl({ [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
  };

  const themeColor = setupMode === "role" ? "cyan" : "amber";
  const activeEntries = INTERVIEW_DATA.filter((i) => i.type === setupMode);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 pb-24">
      <nav className="sticky top-20 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <Link
            href="/interview-prep"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] group-hover:bg-white/[0.05]">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Back to Selection
          </Link>
        </div>
      </nav>

      <div className="mx-auto mt-12 max-w-6xl px-6">
        <header className="mb-12">
          <div
            className={`mb-4 flex items-center gap-2 text-${themeColor}-500`}
          >
            <Settings2 className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Configuration
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
            Setup your session.
          </h1>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-12">
            {/* Mode Switcher */}
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1">
              <button
                onClick={() => handleModeToggle("role")}
                className={`rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${setupMode === "role" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Mock Interview
              </button>
              <button
                onClick={() => handleModeToggle("topic")}
                className={`rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${setupMode === "topic" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Targeted Practice
              </button>
            </div>

            {/* Selection Grid */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                <Briefcase className="h-5 w-5 text-zinc-500" />
                Select {setupMode === "role" ? "Position" : "Topic"}
              </h3>
              <div className="flex flex-wrap gap-3">
                {activeEntries.map((entry) => (
                  <button
                    key={entry.slug}
                    onClick={() => handleEntryChange(entry.slug)}
                    className={`rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 ${
                      selectedEntry.slug === entry.slug
                        ? `border-${themeColor}-500/50 bg-${themeColor}-500/10 text-${themeColor}-400 shadow-[0_0_25px_rgba(0,0,0,0.5)]`
                        : "border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            </section>

            {/* Focus Areas */}
            <section>
              <h3 className="mb-6 flex items-center justify-between text-lg font-bold text-white">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-zinc-500" />
                  Focus Areas
                </div>
                <span className="text-[10px] font-black uppercase text-zinc-600">
                  {selectedSkills.length} active
                </span>
              </h3>
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-sm">
                <div className="flex flex-wrap gap-3">
                  {selectedEntry.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full border px-5 py-2 text-xs font-bold transition-all duration-300 ${
                        selectedSkills.includes(skill)
                          ? `border-${themeColor}-500/50 bg-${themeColor}-500/10 text-${themeColor}-400 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                          : "border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid gap-12 md:grid-cols-2">
              <section>
                <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                  <Target className="h-5 w-5 text-zinc-500" />
                  Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SENIORITY_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        handleSettingChange("lv", level, setSeniority)
                      }
                      className={`rounded-full border px-5 py-2 text-xs font-bold transition-all ${
                        seniority === level
                          ? `border-${themeColor}-500/50 bg-${themeColor}-500/10 text-${themeColor}-400`
                          : "border-white/10 bg-white/[0.02] text-zinc-500"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
                  <Clock className="h-5 w-5 text-zinc-500" />
                  {setupMode === "role" ? "Duration" : "Questions"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(setupMode === "role" ? DURATIONS : QUESTION_COUNTS).map(
                    (val) => (
                      <button
                        key={val}
                        onClick={() =>
                          setupMode === "role"
                            ? handleSettingChange("dur", val, setDuration)
                            : handleSettingChange("q", val, setQuestionCount)
                        }
                        className={`rounded-full border px-5 py-2 text-xs font-bold transition-all ${
                          (setupMode === "role" ? duration : questionCount) ===
                          val
                            ? `border-${themeColor}-500/50 bg-${themeColor}-500/10 text-${themeColor}-400`
                            : "border-white/10 bg-white/[0.02] text-zinc-500"
                        }`}
                      >
                        {setupMode === "role"
                          ? val
                          : `${val} ${parseInt(val) === 1 ? "Question" : "Questions"}`}
                      </button>
                    ),
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* --- Right Column: Summary Card --- */}
          <div className="h-fit lg:sticky lg:top-40">
            <div className="rounded-3xl border border-white/10 bg-[#09090B] p-8 shadow-2xl relative overflow-hidden">
              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[80px] opacity-20 bg-${themeColor}-500`}
              />
              <h3 className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                <Sparkles className={`h-4 w-4 text-${themeColor}-400`} />
                Session Brief
              </h3>
              <div className="space-y-5 mb-10">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Context
                  </span>
                  <span className="text-sm font-bold text-white">
                    {setupMode === "role"
                      ? "Mock Simulation"
                      : "Targeted Drill"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Focus
                  </span>
                  <span className="text-sm font-bold text-white">
                    {selectedEntry.title}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Level
                  </span>
                  <span className="text-sm font-bold text-white">
                    {seniority}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Metric
                  </span>
                  <span className="text-sm font-bold text-white">
                    {setupMode === "role"
                      ? duration
                      : `${questionCount} ${parseInt(questionCount) === 1 ? "Question" : "Questions"}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  router.push(`/interview?slug=${selectedEntry.slug}`)
                }
                className={`w-full rounded-full py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:scale-[1.02] active:scale-95 bg-${themeColor}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
              >
                Initialize AI Engine
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <SetupContent />
    </Suspense>
  );
}
