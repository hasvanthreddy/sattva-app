import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight, ChevronRight, RotateCcw, Filter, Search, ArrowLeft, Zap,
} from "lucide-react";
import type { Page } from "@/App";

const MATCH_TYPES = ["All", "Safe Bet", "Balanced Growth", "Dream Reach", "High Impact"];

const CAREERS = [
  {
    id: 1, title: "Software Developer", field: "Technology",
    match: 94, marketDemand: 96, salary: "₹8–25 LPA", type: "Safe Bet",
    typeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    skills: ["Python", "React", "System Design"], icon: "💻", growth: "+35% in 3 years",
  },
  {
    id: 2, title: "Data Scientist", field: "Analytics",
    match: 89, marketDemand: 91, salary: "₹10–30 LPA", type: "High Impact",
    typeColor: "text-red-400 bg-red-500/10 border-red-500/20",
    skills: ["Statistics", "ML", "SQL"], icon: "📊", growth: "+42% in 3 years",
  },
  {
    id: 3, title: "Product Manager", field: "Business & Tech",
    match: 85, marketDemand: 88, salary: "₹12–40 LPA", type: "Balanced Growth",
    typeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    skills: ["Strategy", "Analytics", "Communication"], icon: "🎯", growth: "+28% in 3 years",
  },
  {
    id: 4, title: "UX Designer", field: "Design",
    match: 82, marketDemand: 84, salary: "₹6–18 LPA", type: "Balanced Growth",
    typeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    skills: ["Figma", "Research", "Prototyping"], icon: "🎨", growth: "+22% in 3 years",
  },
  {
    id: 5, title: "AI/ML Engineer", field: "AI & Research",
    match: 78, marketDemand: 98, salary: "₹15–50 LPA", type: "Dream Reach",
    typeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    skills: ["Deep Learning", "PyTorch", "MLOps"], icon: "🤖", growth: "+68% in 3 years",
  },
  {
    id: 6, title: "Digital Marketing Lead", field: "Marketing",
    match: 76, marketDemand: 79, salary: "₹5–15 LPA", type: "Safe Bet",
    typeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    skills: ["SEO", "Analytics", "Content"], icon: "📣", growth: "+18% in 3 years",
  },
];

export function CareerMatches({ nav }: { nav: (p: Page) => void }) {
  const [activeType, setActiveType] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = CAREERS.filter(
    (c) =>
      (activeType === "All" || c.type === activeType) &&
      c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
        <button onClick={() => nav("home")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-base text-white">Your Career Matches</span>
          </div>
        </button>
        <Button variant="ghost" size="sm" onClick={() => nav("assessment")} className="text-white/40 gap-2">
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>
      <div className="px-8 py-3 border-b border-white/5 text-sm text-white/40">
        Based on your psychometric profile — {filtered.length} matches found
      </div>

      <div className="px-8 py-4 border-b border-white/5 flex flex-wrap items-center gap-3">
        <Filter className="w-4 h-4 text-white/30 flex-shrink-0" />
        <div className="flex flex-wrap gap-2">
          {MATCH_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeType === t
                  ? "bg-violet-600/20 text-violet-300 border-violet-500/30"
                  : "text-white/40 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-1.5">
          <Search className="w-3.5 h-3.5 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers..."
            className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-40"
          />
        </div>
      </div>

      <div className="px-8 py-6 space-y-3">
        {filtered.map((career) => (
          <div
            key={career.id}
            className={`rounded-2xl border transition-all cursor-pointer ${
              expanded === career.id
                ? "border-violet-500/30 bg-violet-500/[0.05]"
                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
            }`}
            onClick={() => setExpanded(expanded === career.id ? null : career.id)}
          >
            <div className="flex items-center gap-5 p-5">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                {career.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-base">{career.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${career.typeColor}`}>
                    {career.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span>{career.field}</span>
                  <span>·</span>
                  <span>{career.salary}</span>
                  <span>·</span>
                  <span className="text-green-400">{career.growth}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs text-white/30 mb-1">Match Score</div>
                  <div className="text-xl font-bold text-violet-400">{career.match}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/30 mb-1">Market Demand</div>
                  <div className="text-xl font-bold text-cyan-400">{career.marketDemand}%</div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-white/30 transition-transform ${expanded === career.id ? "rotate-90" : ""}`}
                />
              </div>
            </div>

            {expanded === career.id && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-white/[0.03] rounded-xl p-4">
                    <div className="text-xs text-white/30 mb-2 uppercase tracking-wide">Match Score</div>
                    <Progress value={career.match} className="mb-2" />
                    <div className="text-lg font-bold text-violet-400">{career.match}%</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4">
                    <div className="text-xs text-white/30 mb-2 uppercase tracking-wide">Market Demand</div>
                    <Progress value={career.marketDemand} className="mb-2" />
                    <div className="text-lg font-bold text-cyan-400">{career.marketDemand}%</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4">
                    <div className="text-xs text-white/30 mb-2 uppercase tracking-wide">Salary Range</div>
                    <div className="text-lg font-bold text-emerald-400">{career.salary}</div>
                    <div className="text-xs text-white/30 mt-1">median at 5 years</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs text-white/30 uppercase tracking-wide">Key Skills</span>
                  {career.skills.map((s) => (
                    <span key={s} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" onClick={() => nav("profile")} className="rounded-lg font-medium">
                    Explore Full Career Path
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => nav("roadmap")} className="rounded-lg">
                    View Roadmap
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
