"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  Monitor,
  Loader2,
  Volume2,
  Brain,
  FastForward,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Import centralized data
import { INTERVIEW_DATA } from "@/lib/mock-data";
import { Typewriter } from "@/components/ui/Typewriter";

type PermissionState = "idle" | "requesting" | "granted" | "denied";
type AIState = "listening" | "processing" | "speaking";

function InterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");

  const [sessionPhase, setSessionPhase] = useState<"setup" | "active">("setup");
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [aiState, setAiState] = useState<AIState>("speaking");
  const [isThinking, setIsThinking] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState<
    { speaker: "ai" | "user"; text: string; id: number }[]
  >([]);

  const [micPerm, setMicPerm] = useState<PermissionState>("idle");
  const [camPerm, setCamPerm] = useState<PermissionState>("idle");
  const [screenPerm, setScreenPerm] = useState<PermissionState>("idle");

  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const data = INTERVIEW_DATA.find((item) => item.slug === slug);

  // --- 1. UPDATED TIMER EFFECT (No setTranscript here) ---
  useEffect(() => {
    if (sessionPhase !== "active" || !data) return;

    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [sessionPhase, data]); // transcript.length removed from dependencies

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid Session</h1>
          <Link
            href="/interview-prep"
            className="mt-4 text-cyan-500 underline block"
          >
            Return to Prep
          </Link>
        </div>
      </div>
    );
  }

  const isRole = data.type === "role";
  const theme = {
    primary: isRole ? "cyan" : "amber",
    hex: isRole ? "#06b6d4" : "#f59e0b",
    text: isRole ? "text-cyan-500" : "text-amber-500",
    bg: isRole ? "bg-cyan-500" : "bg-amber-500",
    border: isRole ? "border-cyan-500/50" : "border-amber-500/50",
    glow: isRole ? "rgba(6,182,212,0.3)" : "rgba(245,158,11,0.3)",
  };

  // --- 2. UPDATED START HANDLER ---
  const startInterview = () => {
    // Request Fullscreen
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    }

    setSessionPhase("active");

    // Initialize the first AI message immediately on click
    const firstTurn = data.mockConversation[0];
    if (firstTurn) {
      setTranscript([
        {
          speaker: "ai",
          text: firstTurn.aiQuestion,
          id: Date.now(),
        },
      ]);
    }
  };

  const handleNextTurn = () => {
    if (isThinking) return;
    const currentTurn = data.mockConversation[currentTurnIndex];

    setAiState("listening");
    setTranscript((prev) => [
      ...prev,
      { speaker: "user", text: currentTurn.userMockAnswer, id: Date.now() },
    ]);

    setTimeout(() => setAiState("processing"), 1200);

    setTimeout(() => {
      const nextIndex = currentTurnIndex + 1;
      if (nextIndex < data.mockConversation.length) {
        setCurrentTurnIndex(nextIndex);
        setAiState("speaking");
        setTranscript((prev) => [
          ...prev,
          {
            speaker: "ai",
            text: data.mockConversation[nextIndex].aiQuestion,
            id: Date.now(),
          },
        ]);
      } else {
        // FIX: Show completion screen instead of immediate redirect
        setIsFinished(true);

        // Auto-redirect to feedback after 4 seconds
        setTimeout(() => {
          router.push(`/feedback?slug=${data.slug}`);
        }, 4000);
      }
    }, 3000);
  };

  const handleSkipToFinish = () => {
    setIsFinished(true);

    // Optional: You could add a specific transcript entry
    // noting the session was ended early.

    setTimeout(() => {
      router.push(`/feedback?slug=${data.slug}`);
    }, 4000);
  };
  const allGranted =
    micPerm === "granted" && camPerm === "granted" && screenPerm === "granted";

  if (sessionPhase === "setup") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-8 md:p-12"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              System Check
            </h1>
            <p className="mt-3 text-zinc-400">
              Preparation for:{" "}
              <span className="text-white font-semibold">{data.title}</span>
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Microphone",
                state: micPerm,
                set: setMicPerm,
                icon: Mic,
              },
              { label: "Camera", state: camPerm, set: setCamPerm, icon: Video },
              {
                label: "Screen Share",
                state: screenPerm,
                set: setScreenPerm,
                icon: Monitor,
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-2xl border p-5 ${p.state === "denied" ? "border-red-500/50 bg-red-500/5" : "border-white/5 bg-white/[0.02]"}`}
              >
                <div className="flex items-center gap-4 text-white">
                  <p.icon
                    className={`h-5 w-5 ${p.state === "granted" ? "text-emerald-500" : "text-zinc-500"}`}
                  />
                  <span className="font-semibold">{p.label}</span>
                </div>
                <button
                  onClick={() => p.set("granted")}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest ${p.state === "granted" ? "bg-emerald-500/10 text-emerald-500" : "bg-white text-black hover:bg-zinc-200 transition-colors"}`}
                >
                  {p.state === "granted" ? "Ready" : "Allow"}
                </button>
              </div>
            ))}
          </div>

          <button
            disabled={!allGranted}
            onClick={startInterview}
            className={`mt-10 w-full rounded-full py-4 font-bold transition-all ${allGranted ? `${theme.bg} text-black ${theme.glow} hover:scale-[1.02]` : "bg-zinc-800 text-zinc-500"}`}
          >
            Start Interview
          </button>
        </motion.div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white">
        {/* Background Glow */}
        <div
          className={`absolute h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] ${theme.bg}`}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div
              className={`rounded-3xl border ${theme.border} bg-white/5 p-6 shadow-2xl`}
            >
              <Sparkles className={`h-12 w-12 ${theme.text}`} />
            </div>
          </motion.div>

          <h2 className="text-5xl font-black tracking-tighter md:text-7xl">
            Session Complete.
          </h2>

          <p className="mt-6 text-xl text-zinc-500 font-medium italic">
            &quot;Great job. You’ve completed the {data.title} simulation.&quot;
          </p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02]">
              <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Generating Performance Report...
              </span>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className={`h-1 rounded-full ${theme.bg} shadow-[0_0_15px_${theme.glow}]`}
            />
          </div>

          <button
            onClick={() => router.push(`/feedback?slug=${data.slug}`)}
            className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 hover:text-white transition-colors"
          >
            Skip to Report
          </button>
        </motion.div>
      </main>
    );
  }
  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex h-screen w-full text-white"
    >
      <div className="relative flex flex-1 flex-col justify-between p-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 backdrop-blur-md">
            <div className={`h-2 w-2 rounded-full animate-pulse ${theme.bg}`} />
            <span className="font-mono text-sm tracking-widest">
              {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {data.title}
            </span>
          </div>
          <button
            onClick={() => router.push("/interview-prep")}
            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            Quit
          </button>
        </header>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={
              isThinking
                ? { scale: 1, opacity: 0.5 }
                : aiState === "speaking"
                  ? { scale: [1, 1.1, 1] }
                  : aiState === "processing"
                    ? { rotate: 360 }
                    : { scale: 1 }
            }
            transition={{ duration: 2, repeat: Infinity }}
            className={`relative flex h-48 w-48 items-center justify-center rounded-full border-[12px] transition-all duration-700 ${
              isThinking
                ? "border-amber-500/50"
                : aiState === "speaking"
                  ? `border-${theme.primary}-500 shadow-[0_0_60px_${theme.glow}]`
                  : aiState === "processing"
                    ? "border-zinc-700"
                    : "border-white/10"
            }`}
          >
            <div
              className={`h-24 w-24 rounded-full blur-2xl opacity-40 ${isThinking ? "bg-amber-500" : theme.bg}`}
            />
          </motion.div>

          <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
            {isThinking ? "AI Paused" : aiState}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`p-5 rounded-full border transition-all ${isMicMuted ? "border-red-500/50 bg-red-500/10 text-red-500" : "border-white/10 bg-white/[0.02] text-white"}`}
          >
            {isMicMuted ? <MicOff /> : <Mic />}
          </button>

          <button
            onClick={() => setIsThinking(!isThinking)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full border font-bold transition-all ${
              isThinking
                ? `border-amber-500 bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]`
                : `border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white`
            }`}
          >
            <Brain className="h-5 w-5" />
            {isThinking ? "Resume" : "Pause to Think"}
          </button>

          <button
            onClick={handleNextTurn}
            disabled={isThinking}
            className={`px-10 py-4 rounded-full font-bold text-black transition-all ${theme.bg} hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            Complete Answer
          </button>

          <button
            onClick={handleSkipToFinish}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all"
          >
            Skip <FastForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      <aside className="w-[450px] border-l border-white/5 bg-[#030303] flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            AI Transcript (CC)
          </span>
          <Volume2 className="h-4 w-4 text-zinc-700" />
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {transcript.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.speaker === "ai" ? "items-start" : "items-end"}`}
            >
              <span className="text-[9px] font-black uppercase text-zinc-800 mb-3">
                {msg.speaker === "ai" ? "V-Coach AI" : "Interviewee"}
              </span>
              <div
                className={`max-w-[90%] text-sm leading-relaxed ${
                  msg.speaker === "ai"
                    ? "text-zinc-100"
                    : `${theme.text} font-medium italic` // Matches Cyan or Amber theme
                }`}
              >
                {msg.speaker === "ai" && i === transcript.length - 1 ? (
                  <Typewriter text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      </aside>
    </main>
  );
}

export default function InterviewRoomPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <InterviewContent />
    </Suspense>
  );
}
