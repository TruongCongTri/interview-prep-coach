"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mic,
  BrainCircuit,
  Globe2,
  ChevronRight,
  ArrowRight,
  ChartBar,
} from "lucide-react";
import SubCTA from "@/components/sections/SubCTA";

export default function LandingPage() {
  
  return (
    <main className="bg-background selection:bg-accent/20">
      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Soft Ambient Background Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-heading text-sm font-medium uppercase tracking-[0.15em] text-accent"
          >
            Vocal Preparation Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-6xl font-light tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            Master the <br />
            <span className="font-medium italic text-foreground">Global Interview.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-muted md:text-xl leading-relaxed"
          >
            A voice-driven AI interview simulator tailored for engineers and professionals 
            aiming for global enterprises. Master the STAR structure without the pressure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link href="/interview-prep">
              <button className="cursor-start group relative flex h-14 items-center gap-3 rounded-full bg-foreground px-8 font-heading text-background transition-transform hover:scale-105 active:scale-95">
                Initiate Live Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="cursor-select flex h-14 items-center gap-2 rounded-full border border-divider px-8 font-heading text-foreground transition-colors hover:bg-accent-light">
              Explore Philosophy
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURE COLUMNS (NO BOXES) --- */}
      <section className="mx-auto max-w-7xl px-6 py-32 border-t border-divider">
        <div className="mb-20 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-heading text-sm font-medium uppercase tracking-[0.1em] text-accent">
              01. The Architecture
            </span>
            <h2 className="font-heading text-4xl font-light tracking-tight text-foreground mt-4 md:text-5xl">
              Built for precision.
            </h2>
          </div>
          <p className="max-w-md text-muted text-lg">
            Designed to eliminate conversational lag, respect human pacing, and provide targeted feedback.
          </p>
        </div>

        {/* CSS Grid replaces the bento boxes. Using left-borders for separation */}
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col border-l border-divider pl-8">
            <Mic className="mb-6 h-8 w-8 text-accent stroke-[1.5]" />
            <h3 className="font-heading text-2xl font-medium text-foreground mb-3">Anti-Interruption</h3>
            <p className="text-muted leading-relaxed">
              Our stateful backend ensures the AI listens fully and probes logically, curing the &quot;interruption anxiety&quot; caused by standard voice agents.
            </p>
          </div>

          <div className="flex flex-col border-l border-divider pl-8">
            <Globe2 className="mb-6 h-8 w-8 text-accent stroke-[1.5]" />
            <h3 className="font-heading text-2xl font-medium text-foreground mb-3">Cultural Translation</h3>
            <p className="text-muted leading-relaxed">
              We don&apos;t just grade basic grammar. We evaluate structural Business Acumen, resilience, and alignment with specific global corporate cultures.
            </p>
          </div>

          <div className="flex flex-col border-l border-divider pl-8">
            <ChartBar className="mb-6 h-8 w-8 text-accent stroke-[1.5]" />
            <h3 className="font-heading text-2xl font-medium text-foreground mb-3">STAR Analytics</h3>
            <p className="text-muted leading-relaxed">
              Strict JSON generation pushed to your dashboard. Review surgical analysis of your Situation, Task, Action, and Result methodology.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE ENGINE / IMMERSIVE SECTION (NO BOXES) --- */}
      <section className="bg-background-alt py-32 border-t border-divider">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1">
            <span className="font-heading text-sm font-medium uppercase tracking-[0.1em] text-accent">
              02. The Engine
            </span>
            <h2 className="font-heading text-4xl font-light tracking-tight text-foreground mt-4 md:text-5xl">
              Stateful routing. <br />
              <span className="font-medium italic text-foreground">Natural pacing.</span>
            </h2>
            <p className="mt-8 text-lg text-muted leading-relaxed">
              Our LLM doesn&apos;t just listen; it tracks the state of the conversation. 
              If your answer is vague, it probes deeper. Once covered, it seamlessly 
              moves to the next topic to prevent the &quot;AI Rabbit Hole.&quot;
            </p>
            
            <div className="mt-12 flex items-center gap-4">
              <Link href="/interview-prep" className="cursor-select inline-flex items-center gap-2 font-heading font-medium text-accent hover:text-foreground transition-colors uppercase tracking-widest text-sm">
                Enter the Hot Seat <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex-1 w-full flex justify-center">
            {/* Minimalist representation of the AI Engine / No dark boxes */}
            <div className="relative flex items-center justify-center h-80 w-80 rounded-full border border-divider bg-background shadow-sm">
              {/* Pulsing ring replacing the dark glowing orb */}
              <div className="absolute inset-0 rounded-full border border-accent/20 animate-[ping_3s_ease-in-out_infinite]" />
              <div className="h-32 w-32 rounded-full border border-accent bg-accent-light flex items-center justify-center">
                <BrainCircuit className="h-10 w-10 text-accent stroke-[1]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable SubCTA component (Ensure you update the styles inside SubCTA to match the light theme as well) */}
      <SubCTA />
    </main>
  );
}