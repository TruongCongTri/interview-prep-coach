/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from "react";
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
  XCircle,
} from "lucide-react";

import { ConversationTurn, INTERVIEW_DATA } from "@/lib/mock-data";
import { Typewriter } from "@/components/ui/Typewriter";

type PermissionState = "idle" | "requesting" | "granted" | "denied";
type AIState = "listening" | "processing" | "speaking";

function InterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Extract Config from URL
  const slug = searchParams.get("slug");
  const mode = searchParams.get("mode") || "role";
  const level = searchParams.get("lv") || "Mid-Level";
  const dur = searchParams.get("dur") || "30m";
  const qParam = searchParams.get("q") || "3";
  const sid = searchParams.get("sid") || "default";

  const [sessionPhase, setSessionPhase] = useState<"setup" | "active">("setup");
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [aiState, setAiState] = useState<AIState>("speaking");

  // Pause/Think State
  const [isThinking, setIsThinking] = useState(false);
  const [thinkTimeLeft, setThinkTimeLeft] = useState(20);
  const [hasUsedPauseThisTurn, setHasUsedPauseThisTurn] = useState(false);

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState<
    { speaker: "ai" | "user"; text: string; id: number }[]
  >([]);
  const [micPerm, setMicPerm] = useState<PermissionState>("idle");
  const [camPerm, setCamPerm] = useState<PermissionState>("idle");
  const [screenPerm, setScreenPerm] = useState<PermissionState>("idle");
  const [isFinished, setIsFinished] = useState(false);

  // ─── sessionConversation as proper state, reset via useEffect ───────────────
  // Previously used a lazy useState initializer which only runs once on mount,
  // causing stale questions if slug/mode/dur/q params change between sessions.
  const [sessionConversation, setSessionConversation] = useState<ConversationTurn[]>([]);

  const data = INTERVIEW_DATA.find((item) => item.slug === slug);

  // 2. Calculate Question Count based on Duration
  const calculateTargetCount = (currentDur: string, currentMode: string, currentQ: string) => {
    if (currentMode === "topic") return parseInt(currentQ);
    switch (currentDur) {
      case "15m": return 2;
      case "30m": return 3;
      case "45m": return 4;
      case "60m": return 5;
      default:    return 3;
    }
  };

  // ─── Rebuild and re-shuffle session when any key param changes ───────────────
  // This replaces the old lazy useState(() => ...) initializer. Without this,
  // navigating to a new interview or changing dur/q reuses the old stale question set.
  useEffect(() => {
    if (!data) return;
    const targetCount = calculateTargetCount(dur, mode, qParam);
    const pool = [...data.mockConversation];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setSessionConversation(pool.slice(0, Math.min(targetCount, pool.length)));

    // Also reset all session progress state so the new params start fresh
    setCurrentTurnIndex(0);
    setSessionPhase("setup");
    setTranscript([]);
    setIsFinished(false);
    setIsThinking(false);
    setHasUsedPauseThisTurn(false);
    setThinkTimeLeft(20);
    setElapsedTime(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, mode, dur, qParam, sid]);
  // ─────────────────────────────────────────────────────────────────────────────

  // 3. Calculate Total Seconds for the session
  const totalSeconds = useMemo(() => {
    if (mode === "topic") {
      return parseInt(qParam) * 300;
    }
    return parseInt(dur) * 60;
  }, [mode, dur, qParam]);

  // 4. States for tracking time
  const [elapsedTime, setElapsedTime] = useState(0);

  // 5. Global Timer Effect
  useEffect(() => {
    if (sessionPhase !== "active" || isFinished || isThinking) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev >= totalSeconds) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionPhase, isFinished, isThinking, totalSeconds]);

  // 6. Pause Countdown Timer Effect
  useEffect(() => {
    if (!isThinking) return;

    const interval = setInterval(() => {
      setThinkTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsThinking(false);
            setHasUsedPauseThisTurn(true);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isThinking]);

  // 7. Time Formatting Helper
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const remainingTime = Math.max(0, totalSeconds - elapsedTime);

  // Track the original indices to pass to the feedback page
  const sessionIndices = useMemo(() => {
    if (!data) return "";
    return sessionConversation
      .map((q) => data.mockConversation.findIndex((item) => item.id === q.id))
      .join(",");
  }, [sessionConversation, data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionPhase !== "active" || !data) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [sessionPhase, data]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  if (!data)
    return (
      <div className="text-foreground bg-background text-center p-20 min-h-screen">
        Invalid Session
      </div>
    );

  const isRole = data.type === "role";

  const startInterview = () => {
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
    setSessionPhase("active");
    if (sessionConversation[0]) {
      setTranscript([
        {
          speaker: "ai",
          text: sessionConversation[0].aiQuestion,
          id: Date.now(),
        },
      ]);
    }
  };

  const finishSession = () => {
    setIsFinished(true);
    setTimeout(() => {
      router.push(
        `/feedback?slug=${slug}&indices=${sessionIndices}&lv=${level}&mode=${mode}&sid=${sid}`,
      );
    }, 4000);
  };

  const handleNextTurn = () => {
    setIsThinking(false);
    setHasUsedPauseThisTurn(false);
    setThinkTimeLeft(20);

    const currentTurn = sessionConversation[currentTurnIndex];

    setAiState("listening");
    setTranscript((prev) => [
      ...prev,
      { speaker: "user", text: currentTurn.userMockAnswer, id: Date.now() },
    ]);

    setTimeout(() => setAiState("processing"), 1200);

    setTimeout(() => {
      const nextIndex = currentTurnIndex + 1;
      if (nextIndex < sessionConversation.length) {
        setCurrentTurnIndex(nextIndex);
        setAiState("speaking");
        setTranscript((prev) => [
          ...prev,
          {
            speaker: "ai",
            text: sessionConversation[nextIndex].aiQuestion,
            id: Date.now(),
          },
        ]);
      } else {
        finishSession();
      }
    }, 3000);
  };

  const togglePause = () => {
    if (hasUsedPauseThisTurn && !isThinking) return;

    if (!isThinking) {
      setIsThinking(true);
      setThinkTimeLeft(20);
    } else {
      setIsThinking(false);
      setHasUsedPauseThisTurn(true);
    }
  };

  const handleSkipToFinish = () => {
    finishSession();
  };

  const allGranted =
    micPerm === "granted" && camPerm === "granted" && screenPerm === "granted";

  if (sessionPhase === "setup") {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground"
        style={
          {
            "--accent": isRole ? "var(--accent-role)" : "var(--accent-topic)",
            "--accent-light": isRole
              ? "var(--accent-role-light)"
              : "var(--accent-topic-light)",
          } as React.CSSProperties
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl rounded-[32px] border border-divider bg-background-alt p-8 md:p-12 shadow-sm"
        >
          <div className="mb-10 text-center">
            <h1 className="font-heading text-4xl font-light tracking-tight text-foreground">
              System Check
            </h1>
            <p className="mt-3 text-muted">
              Preparation for:{" "}
              <span className="text-foreground font-medium">{data.title}</span>
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
                className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${
                  p.state === "denied"
                    ? "border-red-500/50 bg-red-50 text-red-600"
                    : "border-divider bg-background text-foreground"
                }`}
              >
                <div className="flex items-center gap-4">
                  <p.icon
                    className={`h-5 w-5 stroke-[1.5] ${p.state === "granted" ? "text-[color:var(--accent)]" : "text-muted"}`}
                  />
                  <span className="font-medium">{p.label}</span>
                </div>
                <button
                  onClick={() => p.set("granted")}
                  className={`cursor-select rounded-full px-6 py-2 font-heading text-xs font-medium uppercase tracking-widest transition-colors ${
                    p.state === "granted"
                      ? "bg-[color:var(--accent-light)] text-[color:var(--accent)]"
                      : "bg-foreground text-background hover:scale-105 active:scale-95"
                  }`}
                >
                  {p.state === "granted" ? "Ready" : "Allow"}
                </button>
              </div>
            ))}
          </div>
          <button
            disabled={!allGranted}
            onClick={startInterview}
            className={`cursor-start mt-10 w-full rounded-full py-4 font-heading text-sm font-medium uppercase tracking-widest transition-all ${
              allGranted
                ? "bg-[color:var(--accent)] text-background shadow-md hover:scale-[1.02] active:scale-95"
                : "bg-divider text-muted cursor-not-allowed"
            }`}
          >
            Initiate Session
          </button>
        </motion.div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background text-foreground"
        style={
          {
            "--accent": isRole ? "var(--accent-role)" : "var(--accent-topic)",
          } as React.CSSProperties
        }
      >
        <div className="absolute h-[600px] w-[600px] rounded-full opacity-20 blur-[150px] bg-[color:var(--accent)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="rounded-full border border-divider bg-background-alt p-8 shadow-sm">
              <Sparkles className="h-10 w-10 text-[color:var(--accent)] stroke-[1.5]" />
            </div>
          </motion.div>
          <h2 className="font-heading text-5xl font-light tracking-tight md:text-7xl">
            Session Complete.
          </h2>
          <p className="mt-6 text-xl text-muted font-medium italic">
            &quot;Great job. You&apos;ve completed the {data.title} simulation.&quot;
          </p>
          <div className="mt-16 flex flex-col items-center gap-6 w-full max-w-xs">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-divider bg-background-alt">
              <Loader2 className="h-4 w-4 animate-spin text-[color:var(--accent)]" />
              <span className="font-heading text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Compiling Report...
              </span>
            </div>
            <div className="w-full h-1 bg-divider rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="h-full rounded-full bg-[color:var(--accent)]"
              />
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background overflow-hidden flex h-screen w-full text-foreground"
      style={
        {
          "--accent": isRole ? "var(--accent-role)" : "var(--accent-topic)",
          "--accent-light": isRole
            ? "var(--accent-role-light)"
            : "var(--accent-topic-light)",
        } as React.CSSProperties
      }
    >
      <div className="relative flex flex-1 flex-col justify-between p-6 md:p-8">
        <div className="w-full">
          {/* HEADER CONTROLS */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4 rounded-full border border-divider bg-background-alt/80 px-6 py-3 backdrop-blur-md shadow-sm">
              <div
                className={`h-2.5 w-2.5 rounded-full ${remainingTime < 60 ? "bg-red-500 animate-ping" : "bg-[color:var(--accent)] animate-pulse"}`}
              />

              <div className="flex items-baseline gap-1.5 font-mono">
                <span
                  className={`text-sm font-medium tracking-widest ${remainingTime < 60 ? "text-red-500" : "text-foreground"}`}
                >
                  {formatTime(remainingTime)}
                </span>
                <span className="text-xs text-muted/50">/</span>
                <span className="text-xs font-medium text-muted">
                  {formatTime(totalSeconds)}
                </span>
              </div>

              <span className="h-4 w-px bg-divider mx-2" />

              <div className="flex flex-col">
                <span className="font-heading text-[9px] font-medium uppercase tracking-widest text-muted leading-none mb-1">
                  {mode === "role" ? "Session Duration" : "Estimated Time"}
                </span>
                <span className="font-heading text-[11px] font-medium uppercase tracking-wider text-foreground leading-none">
                  {data.title}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/interview-prep")}
              className="cursor-back flex items-center gap-2 font-heading text-[10px] font-medium uppercase tracking-widest text-muted hover:text-foreground transition-all"
            >
              Terminate
              <XCircle className="h-4 w-4 text-muted group-hover:text-red-500 transition-colors" />
            </button>
          </header>

          {/* PROGRESS INDICATOR */}
          <div className="w-full max-w-2xl mx-auto mt-8 flex items-center justify-center gap-2 px-4">
            {sessionConversation.map((turn, idx) => {
              const isActive = idx === currentTurnIndex;
              const isPast = idx < currentTurnIndex;
              return (
                <div
                  key={turn.id}
                  className="group relative flex-1 h-1.5 rounded-full bg-divider transition-colors"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isActive ? "bg-[color:var(--accent)] w-full" : isPast ? "bg-[color:var(--accent-light)] w-full" : "w-0"}`}
                  />
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 invisible opacity-0 translate-y-2 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-50">
                    <div className="rounded-xl border border-divider bg-background p-3 shadow-lg text-center relative">
                      <span className="block font-heading text-[9px] font-medium uppercase tracking-widest text-[color:var(--accent)] mb-1">
                        {mode === "topic" ? "Topic Question" : `Turn ${idx + 1}`}
                      </span>
                      <p className="text-xs text-foreground/80 line-clamp-3">
                        {turn.aiQuestion}
                      </p>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r border-divider bg-background" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI ORB VISUALIZATION */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={
              isThinking
                ? { scale: 1, opacity: 0.5 }
                : aiState === "speaking"
                  ? { scale: [1, 1.05, 1] }
                  : aiState === "processing"
                    ? { rotate: 360 }
                    : { scale: 1 }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`relative flex h-48 w-48 items-center justify-center rounded-full border-[8px] transition-all duration-700 ${
              isThinking
                ? "border-muted/20"
                : aiState === "speaking"
                  ? "border-[color:var(--accent)] shadow-[0_0_40px_var(--accent-light)]"
                  : aiState === "processing"
                    ? "border-divider border-t-[color:var(--accent)]"
                    : "border-divider"
            }`}
          >
            <div
              className={`h-28 w-28 rounded-full blur-xl opacity-60 transition-colors ${
                isThinking ? "bg-muted" : "bg-[color:var(--accent)]"
              }`}
            />
          </motion.div>
          <div className="mt-14 font-heading text-xs font-medium uppercase tracking-[0.3em] text-muted">
            {isThinking ? "System Paused" : aiState}
          </div>
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="flex items-center justify-center gap-6 pb-6">
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`cursor-mute flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
              isMicMuted
                ? "border-red-500/50 bg-red-50 text-red-600 shadow-sm"
                : "border-divider bg-background text-foreground hover:bg-background-alt"
            }`}
          >
            {isMicMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={togglePause}
            disabled={hasUsedPauseThisTurn && !isThinking}
            className={`cursor-think flex items-center justify-center gap-3 px-8 py-4 rounded-full border transition-all duration-300 ${
              isThinking
                ? thinkTimeLeft <= 5
                  ? "border-red-500 bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse"
                  : "border-muted bg-muted text-background shadow-md"
                : hasUsedPauseThisTurn
                  ? "border-divider bg-background-alt text-muted/50 cursor-not-allowed"
                  : "border-divider bg-background text-foreground hover:bg-background-alt"
            }`}
          >
            <Brain
              className={`h-5 w-5 stroke-[1.5] ${isThinking && thinkTimeLeft <= 5 ? "animate-bounce" : ""}`}
            />
            <span className="font-heading text-sm font-medium uppercase tracking-wider w-[140px] shrink-0 text-center whitespace-nowrap tabular-nums">
              {isThinking
                ? `Resume (${thinkTimeLeft}s)`
                : hasUsedPauseThisTurn
                  ? "Used"
                  : "Pause"}
            </span>
          </button>
          <button
            onClick={handleNextTurn}
            disabled={isThinking}
            className={`cursor-answer px-10 py-4 rounded-full font-heading text-sm font-medium uppercase tracking-wider text-background transition-all bg-[color:var(--accent)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Complete Answer
          </button>
          <button
            onClick={handleSkipToFinish}
            className="cursor-skip flex items-center gap-2 font-heading text-xs font-medium uppercase tracking-widest text-muted hover:text-foreground transition-all ml-4"
          >
            Skip <FastForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* TRANSCRIPT SIDEBAR */}
      <aside className="w-[450px] border-l border-divider bg-background-alt flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-divider flex items-center justify-between bg-background/50">
          <span className="font-heading text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Live Transcript
          </span>
          <Volume2 className="h-4 w-4 text-muted" />
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {transcript.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.speaker === "ai" ? "items-start" : "items-end"}`}
            >
              <span className="font-heading text-[10px] font-medium uppercase tracking-widest text-muted mb-3">
                {msg.speaker === "ai" ? "Fluence AI" : "You"}
              </span>
              <div
                className={`max-w-[90%] text-base leading-relaxed p-5 rounded-2xl ${
                  msg.speaker === "ai"
                    ? "bg-background border border-divider text-foreground"
                    : "bg-[color:var(--accent-light)] border border-[color:var(--accent)]/20 text-foreground font-medium"
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
    <Suspense fallback={<div className="h-screen bg-background" />}>
      <InterviewContent />
    </Suspense>
  );
}