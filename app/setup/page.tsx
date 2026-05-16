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

import { INTERVIEW_DATA, EntryType } from "@/lib/mock-data";

function SetupContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slugParam = searchParams.get("slug");
  const modeParam = (searchParams.get("mode") as EntryType) || "role";

  const initialEntry =
    INTERVIEW_DATA.find((i) => i.slug === slugParam) || INTERVIEW_DATA[0];

  const [setupMode, setSetupMode] = useState<EntryType>(modeParam);
  const [selectedEntry, setSelectedEntry] = useState(initialEntry);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialEntry.skills,
  );

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
      updateUrl({ mode: newMode, slug: firstOfNewMode.slug });
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
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
  };

  const activeEntries = INTERVIEW_DATA.filter((i) => i.type === setupMode);

  const handleInitialize = () => {
    const params = new URLSearchParams();
    params.set("slug", selectedEntry.slug);
    params.set("mode", setupMode);
    params.set("lv", seniority);

    if (setupMode === "role") {
      params.set("dur", duration);
    } else {
      params.set("q", questionCount);
    }

    router.push(`/interview?${params.toString()}`);
  };

  return (
    <main
      className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-700 ease-in-out"
      style={
        {
          // DYNAMIC CSS VARIABLE SWAP:
          // This instantly changes the active color for all 'accent' classes inside the page.
          "--accent":
            setupMode === "role" ? "var(--accent-role)" : "var(--accent-topic)",
          "--accent-light":
            setupMode === "role"
              ? "var(--accent-role-light)"
              : "var(--accent-topic-light)",
        } as React.CSSProperties
      }
    >

      <div className="mx-auto pt-32 max-w-6xl px-6">

        <header className="mb-12">
          <Link
            href="/interview-prep"
            className="cursor-return group mb-10 inline-flex items-center gap-3 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <div className="cursor-back flex h-8 w-8 items-center justify-center rounded-full border border-divider bg-transparent group-hover:border-accent transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Back to Selection
          </Link>
          <div className="mb-4 flex items-center gap-2 text-accent transition-colors duration-500">
            <Settings2 className="h-5 w-5 stroke-[1.5]" />
            <span className="font-heading text-xs font-medium uppercase tracking-widest">
              Configuration
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-foreground">
            Setup your session.
          </h1>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-12">
            {/* Mode Switcher */}
            <div className="inline-flex rounded-full border border-divider bg-background-alt p-1">
              <button
                onClick={() => handleModeToggle("role")}
                className={`cursor-select rounded-full px-8 py-2.5 font-heading text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  setupMode === "role"
                    ? "bg-accent text-background shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Mock Interview
              </button>
              <button
                onClick={() => handleModeToggle("topic")}
                className={`cursor-select rounded-full px-8 py-2.5 font-heading text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  setupMode === "topic"
                    ? "bg-accent text-background shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Targeted Practice
              </button>
            </div>

            {/* Selection Grid */}
            <section>
              <h3 className="font-heading mb-6 flex items-center gap-3 text-2xl font-medium text-foreground">
                <Briefcase className="h-6 w-6 text-accent stroke-[1.5] transition-colors duration-500" />
                Select {setupMode === "role" ? "Position" : "Topic"}
              </h3>
              <div className="flex flex-wrap gap-3">
                {activeEntries.map((entry) => (
                  <button
                    key={entry.slug}
                    onClick={() => handleEntryChange(entry.slug)}
                    className={`cursor-select rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                      selectedEntry.slug === entry.slug
                        ? "border-accent bg-accent-light text-foreground shadow-sm"
                        : "border-divider bg-transparent text-muted hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            </section>

            {/* Focus Areas */}
            <section>
              <h3 className="font-heading mb-6 flex items-center justify-between text-2xl font-medium text-foreground">
                <div className="flex items-center gap-3">
                  <Layers className="h-6 w-6 text-accent stroke-[1.5] transition-colors duration-500" />
                  Focus Areas
                </div>
                <span className="font-heading text-xs font-medium uppercase tracking-widest text-muted">
                  {selectedSkills.length} active
                </span>
              </h3>
              <div className="rounded-2xl border border-divider bg-background-alt/50 p-8">
                <div className="flex flex-wrap gap-3">
                  {selectedEntry.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                        selectedSkills.includes(skill)
                          ? "border-accent bg-accent-light text-foreground shadow-sm"
                          : "border-divider bg-transparent text-muted hover:border-accent/50 hover:text-foreground"
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
                <h3 className="font-heading mb-6 flex items-center gap-3 text-2xl font-medium text-foreground">
                  <Target className="h-6 w-6 text-accent stroke-[1.5] transition-colors duration-500" />
                  Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SENIORITY_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        handleSettingChange("lv", level, setSeniority)
                      }
                      className={`cursor-select rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        seniority === level
                          ? "border-accent bg-accent-light text-foreground"
                          : "border-divider bg-transparent text-muted hover:text-foreground hover:border-accent/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-heading mb-6 flex items-center gap-3 text-2xl font-medium text-foreground">
                  <Clock className="h-6 w-6 text-accent stroke-[1.5] transition-colors duration-500" />
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
                        className={`cursor-select rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                          (setupMode === "role" ? duration : questionCount) ===
                          val
                            ? "border-accent bg-accent-light text-foreground"
                            : "border-divider bg-transparent text-muted hover:text-foreground hover:border-accent/50"
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
          <div className="h-fit lg:sticky lg:top-32">
            <div className="rounded-2xl border border-divider bg-background-alt p-8 relative overflow-hidden transition-colors duration-500">
              <h3 className="font-heading mb-8 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-foreground">
                <Sparkles className="h-5 w-5 text-accent stroke-[1.5] transition-colors duration-500" />
                Session Brief
              </h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between border-b border-divider pb-4">
                  <span className="font-heading text-xs font-medium uppercase tracking-widest text-muted">
                    Context
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {setupMode === "role"
                      ? "Mock Simulation"
                      : "Targeted Drill"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-divider pb-4">
                  <span className="font-heading text-xs font-medium uppercase tracking-widest text-muted">
                    Focus
                  </span>
                  <span className="text-sm font-medium text-foreground text-right max-w-[150px] truncate">
                    {selectedEntry.title}
                  </span>
                </div>
                <div className="flex justify-between border-b border-divider pb-4">
                  <span className="font-heading text-xs font-medium uppercase tracking-widest text-muted">
                    Level
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {seniority}
                  </span>
                </div>
                <div className="flex justify-between border-b border-divider pb-4">
                  <span className="font-heading text-xs font-medium uppercase tracking-widest text-muted">
                    Metric
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {setupMode === "role"
                      ? duration
                      : `${questionCount} ${parseInt(questionCount) === 1 ? "Question" : "Questions"}`}
                  </span>
                </div>
              </div>
              <button
                onClick={handleInitialize}
                className="cursor-select w-full rounded-full bg-accent py-4 font-heading text-sm font-medium uppercase tracking-widest text-background shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg"
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
    <Suspense fallback={<div className="h-screen bg-background" />}>
      <SetupContent />
    </Suspense>
  );
}
