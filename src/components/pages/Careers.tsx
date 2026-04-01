import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, RotateCcw, Search, SlidersHorizontal, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import type { Page } from "@/App";

const FILTER_TYPES = ["All", "Safe Bet", "Balanced Growth", "Dream Reach"];

const CAREERS = [
  {
    id: 1, title: "Software Developer", field: "Technology", icon: "💻",
    match: 94, demand: 97, salary: "₹8–25 LPA", growth: "+35% in 3 yrs",
    type: "Safe Bet", typeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    desc: "Highly aligned with your current skills. Easy transition.",
    skills: ["Python", "React", "System Design", "DSA"],
  },
  {
    id: 2, title: "Data Scientist", field: "Analytics & AI", icon: "📊",
    match: 89, demand: 93, salary: "₹10–30 LPA", growth: "+42% in 3 yrs",
    type: "Safe Bet", typeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    desc: "Highly aligned with your current skills. Easy transition.",
    skills: ["Python", "Statistics", "ML", "SQL"],
  },
  {
    id: 3, title: "Product Manager", field: "Business & Tech", icon: "🎯",
    match: 85, demand: 88, salary: "₹12–40 LPA", growth: "+28% in 3 yrs",
    type: "Balanced Growth", typeClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    desc: "Perfect mix of comfort and challenge. Great long-term value.",
    skills: ["Strategy", "Analytics", "Communication", "SQL"],
  },
  {
    id: 4, title: "UX Designer", field: "Design", icon: "🎨",
    match: 82, demand: 85, salary: "₹6–18 LPA", growth: "+22% in 3 yrs",
    type: "Balanced Growth", typeClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    desc: "Perfect mix of comfort and challenge. Great long-term value.",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 5, title: "AI / ML Engineer", field: "AI & Research", icon: "🤖",
    match: 78, demand: 99, salary: "₹15–50 LPA", growth: "+68% in 3 yrs",
    type: "Dream Reach", typeClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    desc: "Ambitious goal requiring upskilling, but massive rewards.",
    skills: ["Deep Learning", "PyTorch", "MLOps", "Math"],
  },
  {
    id: 6, title: "Cybersecurity Analyst", field: "Security", icon: "🔐",
    match: 74, demand: 92, salary: "₹8–22 LPA", growth: "+50% in 3 yrs",
    type: "Dream Reach", typeClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    desc: "Ambitious goal requiring upskilling, but massive rewards.",
    skills: ["Networking", "Ethical Hacking", "Linux"],
  },
];

export function Careers({ nav }: { nav: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = CAREERS.filter(
    c => (filter === "All" || c.type === filter) &&
         c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold">AI Matched For You</h1>
            <p className="text-xs text-white/35">{filtered.length} careers based on your profile</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => nav("assessment")} className="text-white/35 gap-1.5 text-xs rounded-lg">
          <RotateCcw className="w-3.5 h-3.5" />
          Retake
        </Button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-white/5 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filter === t
                  ? "bg-purple-600/20 text-purple-300 border-purple-500/30"
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
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-32"
          />
        </div>
      </div>

      {/* Career cards */}
      <div className="px-6 py-5 space-y-3">
        {filtered.map(career => (
          <div
            key={career.id}
            className={`rounded-2xl border transition-all cursor-pointer ${
              expanded === career.id
                ? "border-purple-500/30 bg-purple-500/[0.04]"
                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
            }`}
            onClick={() => setExpanded(expanded === career.id ? null : career.id)}
          >
            <div className="flex items-center gap-4 p-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                {career.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm">{career.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${career.typeClass}`}>
                    {career.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{career.field}</span>
                  <span>·</span>
                  <span className="text-emerald-400">{career.salary}</span>
                  <span>·</span>
                  <span className="text-green-400">{career.growth}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs text-white/25 mb-0.5">Match</div>
                  <div className="text-lg font-bold text-purple-400">{career.match}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/25 mb-0.5">Demand</div>
                  <div className="text-lg font-bold text-cyan-400">{career.demand}%</div>
                </div>
                <ChevronRight className={`w-4 h-4 text-white/25 transition-transform ${expanded === career.id ? "rotate-90" : ""}`} />
              </div>
            </div>

            {expanded === career.id && (
              <div className="px-4 pb-4 pt-0 border-t border-white/5">
                <div className="grid grid-cols-3 gap-3 mb-4 pt-4">
                  <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-white/30 mb-1.5">Match Score</div>
                    <Progress value={career.match} className="mb-1.5" />
                    <div className="text-base font-bold text-purple-400">{career.match}%</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-white/30 mb-1.5">Market Demand</div>
                    <Progress value={career.demand} className="mb-1.5" />
                    <div className="text-base font-bold text-cyan-400">{career.demand}%</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-3">
                    <div className="text-xs text-white/30 mb-1">Salary Range</div>
                    <div className="text-base font-bold text-emerald-400 mt-2">{career.salary}</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 mb-3 italic">{career.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.skills.map(s => (
                    <span key={s} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/60">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => nav("roadmap")} className="rounded-lg text-xs bg-gradient-to-r from-purple-600 to-blue-600">
                    View Roadmap <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => nav("courses")} className="rounded-lg text-xs text-white/40">
                    Find Courses
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
