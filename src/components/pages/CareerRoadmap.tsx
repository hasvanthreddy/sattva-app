import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin, CheckCircle, Clock, Lock, ArrowRight, Zap, ChevronRight, ArrowLeft,
} from "lucide-react";
import type { Page } from "@/App";

const PHASES = [
  {
    id: 1, title: "Foundations", duration: "Month 1–2", completed: true,
    steps: [
      { title: "Python Programming Basics", status: "done", hours: 20 },
      { title: "Web Development with HTML/CSS", status: "done", hours: 15 },
      { title: "Introduction to Databases (SQL)", status: "done", hours: 12 },
      { title: "Git & Version Control", status: "done", hours: 8 },
    ],
  },
  {
    id: 2, title: "Core Engineering", duration: "Month 3–5", completed: false, active: true,
    steps: [
      { title: "Data Structures & Algorithms", status: "in-progress", hours: 40, progress: 60 },
      { title: "React / Next.js Frontend", status: "in-progress", hours: 35, progress: 30 },
      { title: "Node.js Backend Development", status: "pending", hours: 30 },
      { title: "REST API Design", status: "pending", hours: 15 },
    ],
  },
  {
    id: 3, title: "Advanced Skills", duration: "Month 6–8", completed: false,
    steps: [
      { title: "System Design Fundamentals", status: "locked", hours: 45 },
      { title: "Cloud Services (AWS)", status: "locked", hours: 40 },
      { title: "DevOps & CI/CD", status: "locked", hours: 25 },
      { title: "Microservices Architecture", status: "locked", hours: 30 },
    ],
  },
  {
    id: 4, title: "Career Launch", duration: "Month 9–10", completed: false,
    steps: [
      { title: "Portfolio Projects (3 full-stack apps)", status: "locked", hours: 60 },
      { title: "Mock Interview Preparation", status: "locked", hours: 20 },
      { title: "Resume & LinkedIn Optimization", status: "locked", hours: 8 },
      { title: "Job Applications & Networking", status: "locked", hours: 0 },
    ],
  },
];

const MILESTONES = [
  { label: "First Project", icon: "🎯", achieved: true },
  { label: "50% Complete", icon: "⭐", achieved: true },
  { label: "DSA Champion", icon: "🏆", achieved: false },
  { label: "First Internship", icon: "💼", achieved: false },
  { label: "Job Ready", icon: "🚀", achieved: false },
];

export function CareerRoadmap({ nav }: { nav: (p: Page) => void }) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <MapPin className="w-5 h-5 text-violet-400" />
          <div>
            <h1 className="text-xl font-bold">Dynamic Career Roadmap</h1>
            <p className="text-white/40 text-sm">Software Developer — personalized 10-month journey</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-white/30">Overall Progress</div>
            <div className="text-lg font-bold text-violet-400">42%</div>
          </div>
          <div className="w-28">
            <Progress value={42} />
          </div>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs text-white/30 uppercase tracking-wide">Milestones</span>
          {MILESTONES.map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className={`text-base ${m.achieved ? "opacity-100" : "opacity-25 grayscale"}`}>{m.icon}</span>
              <span className={`text-xs ${m.achieved ? "text-white/70" : "text-white/20"}`}>{m.label}</span>
              {i < MILESTONES.length - 1 && <ChevronRight className="w-3 h-3 text-white/10 ml-2" />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 space-y-4">
        {PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const doneCount = phase.steps.filter((s) => s.status === "done").length;
          const phaseProgress = (doneCount / phase.steps.length) * 100;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border transition-all ${
                (phase as any).active
                  ? "border-violet-500/30 bg-violet-500/[0.05]"
                  : phase.completed
                  ? "border-green-500/20 bg-green-500/[0.03]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  phase.completed ? "bg-green-500/20" : (phase as any).active ? "bg-violet-500/20" : "bg-white/5"
                }`}>
                  {phase.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (phase as any).active ? (
                    <Zap className="w-5 h-5 text-violet-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-white/20" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold">{phase.title}</span>
                    {(phase as any).active && (
                      <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs">Active</Badge>
                    )}
                    {phase.completed && (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Complete</Badge>
                    )}
                  </div>
                  <div className="text-sm text-white/40">
                    {phase.duration} · {doneCount}/{phase.steps.length} steps
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-20">
                    <Progress value={phaseProgress} />
                  </div>
                  <ChevronRight className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-2">
                  {phase.steps.map((step, si) => (
                    <div
                      key={si}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        step.status === "done"
                          ? "bg-white/[0.02]"
                          : step.status === "in-progress"
                          ? "bg-violet-500/5 border border-violet-500/20"
                          : "bg-white/[0.01] opacity-50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.status === "done" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : step.status === "in-progress" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                        ) : step.status === "pending" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                        ) : (
                          <Lock className="w-4 h-4 text-white/10" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white/80">{step.title}</div>
                        {step.status === "in-progress" && "progress" in step && (
                          <Progress value={(step as any).progress} className="h-1 mt-1 w-40" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/30 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{step.hours > 0 ? `${step.hours}h` : "Ongoing"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-sm text-white/30">Next: DSA Champion — complete 50 LeetCode problems</p>
        <Button onClick={() => nav("learning")} className="rounded-xl font-medium">
          Find Learning Resources
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
