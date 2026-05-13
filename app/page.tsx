"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  Sparkles,
  ShieldCheck,
  Zap,
  Cpu,
  BarChart3,
  Globe,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import SubCTA from "@/components/sections/SubCTA";

export default function LandingPage() {
  return (
    <main className="bg-black text-white selection:bg-cyan-500/30">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Animated Background Grids/Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              V-Coach 3.0 is now live
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Master your <br />
            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              interview.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl"
          >
            The AI-powered coach that simulates high-stakes technical
            interviews. Get analyzed on your delivery, STAR structure, and
            technical depth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/interview-prep">
              <button className="group relative flex h-14 items-center gap-2 rounded-full bg-white px-10 font-bold text-black transition-all hover:scale-105 active:scale-95">
                Start Practicing Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-10 font-bold text-white transition-all hover:bg-white/[0.05]">
              <Play className="h-4 w-4 fill-white" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Social Proof / Trust Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 flex flex-col items-center gap-8"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            Trusted by developers from
          </span>
          <div className="flex flex-wrap justify-center gap-8 grayscale invert transition-all hover:grayscale-0 md:gap-16">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-6 opacity-30"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              className="h-6 opacity-30"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Meta"
              className="h-6 opacity-30"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="h-6 opacity-30"
            />
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE BENTO GRID --- */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Built for precision.
          </h2>
          <p className="mt-4 text-zinc-500">
            The most advanced interview simulation engine ever built.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
          {/* Card 1: Large Featured */}
          <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 p-8 md:col-span-2">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <Cpu className="mb-4 h-8 w-8 text-cyan-500" />
                <h3 className="text-2xl font-bold">Real-time VAD Engine</h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-500">
                  Voice Activity Detection ensures the AI waits for you to
                  finish your thoughts, no matter how long the pause.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500">
                Explore Technology <ChevronRight className="h-4 w-4" />
              </div>
            </div>
            {/* Visual element */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-all group-hover:bg-cyan-500/20" />
          </div>

          {/* Card 2: Small */}
          <div className="rounded-3xl border border-white/5 bg-zinc-950 p-8">
            <BarChart3 className="mb-4 h-8 w-8 text-purple-500" />
            <h3 className="text-xl font-bold">STAR Scoring</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Instant analysis on Situation, Task, Action, and Result alignment.
            </p>
          </div>

          {/* Card 3: Small */}
          <div className="rounded-3xl border border-white/5 bg-zinc-950 p-8">
            <Globe className="mb-4 h-8 w-8 text-emerald-500" />
            <h3 className="text-xl font-bold">Global Roles</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Support for over 500+ job roles and technical topics.
            </p>
          </div>

          {/* Card 4: Long Featured */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 p-8 md:col-span-2">
            <div className="relative z-10">
              <Zap className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="text-2xl font-bold">Zero Latency Feedback</h3>
              <p className="mt-2 max-w-md text-sm text-zinc-500">
                Get your report the second you finish. No waiting for
                processing, no human intervention.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-xl border border-white/5 bg-black/50 p-4">
              <div className="h-2 w-full rounded-full bg-zinc-900">
                <motion.div
                  whileInView={{ width: "85%" }}
                  className="h-full rounded-full bg-amber-500"
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-bold text-zinc-600">
                <span>ANALYZING DELIVERY...</span>
                <span>85% MATCH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMMERSIVE INTERVIEW SECTION --- */}
      <section className="bg-[#050505] py-32">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl italic">
              The Orbs of <br /> Guidance.
            </h2>
            <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
              Our AI doesn&apos;t just read questions. It pulses, reacts, and
              listens to your inflection. It feels like a conversation because
              it is one.
            </p>
            <ul className="mt-10 space-y-6">
              {[
                "Adaptive difficulty based on seniority",
                "Eye-tracking and presence analysis",
                "PBR-textured immersive environment",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
                >
                  <ShieldCheck className="h-5 w-5 text-cyan-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex-1">
            {/* Visual representation of the interview room */}
            <div className="relative aspect-video w-full rounded-3xl border border-white/10 bg-black shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border-4 border-cyan-500 animate-pulse shadow-[0_0_50px_rgba(6,182,212,0.5)]" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 h-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-4">
                <div className="w-1/2 h-2 bg-zinc-800 rounded-full mb-2" />
                <div className="w-1/3 h-2 bg-zinc-800 rounded-full" />
              </div>
            </div>
            {/* Hover overlay glow */}
            <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </section>

      {/* Reusable SubCTA component */}
      <SubCTA />
    </main>
  );
}
