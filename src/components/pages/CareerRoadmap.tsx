import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Lock, ChevronRight, ArrowRight, ArrowLeft, Zap, Map } from "lucide-react";
import type { Page } from "@/App";

const PHASES = [
  {
    id: 1, phase: "30-Day Plan", subtitle: "Foundation & Quick Wins", icon: "🚀", done: true,
    steps: [
      { title: "Python fundamentals & OOP", status: "done", hours: 20 },
      { title: "HTML, CSS & JavaScript basics", status: "done", hours: 15 },
      { title: "Git & GitHub workflow", status: "done", hours: 8 },
      { title: "SQL fundamentals", status: "done", hours: 10 },
    ],
  },
  {
    id: 2, phase: "90-Day Plan", subtitle: "Core Engineering Skills", icon: "⚡", active: true,
    steps: [
      { title: "Data Structures & Algorithms", status: "in-progress", hours: 40, progress: 55 },
      { title: "React & Next.js", status: "in-progress", hours: 35, progress: 25 },
      { title: "Node.js & REST APIs", status: "pending", hours: 30 },
      { title: "Database design (PostgreSQL)", status: "pending", hours: 18 },
    ],
  },
  {
    id: 3, phase: "6-Month Plan", subtitle: "Advanced & Specialisation", icon: "🏗️",
    steps: [
      { title: "System Design fundamentals", status: "locked", hours: 45 },
      { title: "Cloud services (AWS free tier)", status: "locked", hours: 40 },
      { title: "DevOps & Docker basics", status: "locked", hours: 25 },
      { title: "Build 3 full-stack projects", status: "locked", hours: 60 },
    ],
  },
  {
    id: 4, phase: "Job Ready", subtitle: "Interview Prep & Landing Offers", icon: "🎯",
    steps: [
      { title: "50+ LeetCode problems", status: "locked", hours: 30 },
      { title: "Mock interview practice", status: "locked", hours: 20 },
      { title: "Resume & LinkedIn polish", status: "locked", hours: 8 },
      { title: "Apply to target companies", status: "locked", hours: 0 },
    ],
  },
];

export function CareerRoadmap({ nav }: { nav: (p: Page) => void }) {
  const [expanded, setExpanded] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Map className="w-5 h-5 text-purple-400" />
        <div>
          <h1 className="text-base font-bold">Roadmap to Software Developer</h1>
          <p className="text-xs text-white/35">Actionable 30/90 day plans to accelerate your career growth.</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-white/30">Progress</div>
            <div className="text-sm font-bold text-purple-400">42%</div>
          </div>
          <div className="w-20">
            <Progress value={42} />
          </div>
        </div>
      </div>

      <div className="px-6 py-5 space-y-3">
        {PHASES.map(phase => {
          const doneCount = phase.steps.filter(s => s.status === "done").length;
          const phaseProgress = (doneCount / phase.steps.length) * 100;
          const isExpanded = expanded === phase.id;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border transition-all ${
                (phase as any).active
                  ? "border-purple-500/30 bg-purple-500/[0.05]"
                  : phase.done
                  ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <button
                className="w-full flex items-center gap-4 p-4 text-left"
                onClick={() => setExpanded(isExpanded ? null : phase.id)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${
                  phase.done ? "bg-emerald-500/20" : (phase as any).active ? "bg-purple-500/20" : "bg-white/5"
                }`}>
                  {(phase as any).done ? "✅" : phase.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm">{phase.phase}</span>
                    {(phase as any).active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 font-medium">Active</span>
                    )}
                    {phase.done && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">Complete</span>
                    )}
                  </div>
                  <div className="text-xs text-white/35">{phase.subtitle} · {doneCount}/{phase.steps.length} steps</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-20">
                    <Progress value={phaseProgress} />
                  </div>
                  <ChevronRight className={`w-4 h-4 text-white/25 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                  {phase.steps.map((step, si) => (
                    <div key={si} className={`flex items-center gap-3 p-3 rounded-xl ${
                      step.status === "in-progress" ? "bg-purple-500/5 border border-purple-500/15" : "bg-white/[0.02]"
                    } ${step.status === "locked" ? "opacity-40" : ""}`}>
                      <div className="flex-shrink-0">
                        {step.status === "done" ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : step.status === "in-progress" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                        ) : step.status === "pending" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                        ) : (
                          <Lock className="w-4 h-4 text-white/20" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white/80">{step.title}</div>
                        {step.status === "in-progress" && "progress" in step && (
                          <Progress value={(step as any).progress} className="h-1 mt-1.5 w-36" />
                        )}
                      </div>
                      {step.hours > 0 && (
                        <div className="flex items-center gap-1 text-xs text-white/25 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{step.hours}h</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-xs text-white/30">Next milestone: Complete 50 LeetCode problems</p>
        <Button size="sm" onClick={() => nav("courses")} className="rounded-lg text-xs bg-gradient-to-r from-purple-600 to-blue-600">
          Find Courses <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
