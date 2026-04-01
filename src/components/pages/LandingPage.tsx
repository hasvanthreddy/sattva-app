import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Target,
  MapPin,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Globe,
  Zap,
} from "lucide-react";
import type { Page } from "@/App";

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Assessment", page: "assessment" },
  { label: "Careers", page: "matches" },
  { label: "Roadmap", page: "roadmap" },
  { label: "Resume", page: "resume" },
  { label: "Learning", page: "learning" },
  { label: "Mentor", page: "mentor" },
];

const STATS = [
  { value: "50,000+", label: "Careers Mapped" },
  { value: "94%", label: "Match Accuracy" },
  { value: "200+", label: "Explore Fields" },
  { value: "12 Languages", label: "Multilingual AI" },
];

const FEATURES: { icon: React.ElementType; title: string; desc: string; color: string; page: Page }[] = [
  {
    icon: Brain, page: "assessment",
    title: "AI Career Assessment",
    desc: "Deep psychometric analysis across interests, skills, values, and personality to find your true calling.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Target, page: "matches",
    title: "Skill Gap Analysis",
    desc: "Precise gap analysis comparing your current skills against target role requirements with action plans.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MapPin, page: "roadmap",
    title: "Dynamic Roadmaps",
    desc: "Personalized learning paths that adapt as you grow, with daily milestones and weekly check-ins.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: BookOpen, page: "learning",
    title: "Learning Hub",
    desc: "Curated free and premium courses, offline training centers, and peer learning communities.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: MessageSquare, page: "mentor",
    title: "Sattva Mentor AI",
    desc: "24/7 AI career counselor that speaks your language — Hindi, Tamil, Telugu, and 9 more.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: TrendingUp, page: "resume",
    title: "Resume Intelligence",
    desc: "Upload or paste your resume for instant career fit scoring and improvement recommendations.",
    color: "from-teal-500 to-cyan-600",
  },
];

const CAREER_TAGS = [
  { label: "High Impact", color: "text-red-400 bg-red-500/10 border-red-500/30" },
  { label: "Safe Bet", color: "text-green-400 bg-green-500/10 border-green-500/30" },
  { label: "Dream Reach", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
  { label: "Balanced Growth", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
];

export function LandingPage({ nav }: { nav: (p: Page) => void }) {
  const [activeNav, setActiveNav] = useState<Page>("assessment");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <button onClick={() => nav("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Sattva Navigator</span>
        </button>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.page); nav(item.page); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeNav === item.page
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/50 cursor-pointer hover:text-white transition-colors">Sign In</span>
          <Button onClick={() => nav("assessment")} size="sm" className="rounded-lg">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-20 w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-full px-4 py-1 text-sm font-medium">
            🇮🇳 Empowering India
          </Badge>
          <h1 className="text-6xl font-black leading-[1.05] tracking-tight mb-6">
            Navigate Your Future with{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Career Intelligence
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            India's most advanced AI-powered career guidance platform — built for students, designed for success,
            powered by deep psychometric science and real market data.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button onClick={() => nav("assessment")} size="lg" className="rounded-xl px-8 py-3 font-semibold shadow-lg shadow-violet-500/25">
              Start Free Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 py-3">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything you need to find your path</h2>
            <p className="text-white/50">Six powerful tools, one unified platform</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.title}
                  onClick={() => nav(f.page)}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all text-left cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                  <ChevronRight className="absolute bottom-5 right-5 w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Tags */}
      <section className="px-8 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Your Career Matches</h3>
            <p className="text-white/40 text-sm">AI categorizes opportunities by your readiness level</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CAREER_TAGS.map((tag) => (
              <span key={tag.label} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${tag.color}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-8 py-10 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Users className="w-4 h-4" />
              <span>2M+ students guided</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.9 rating from 50k+ reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Globe className="w-4 h-4" />
              <span>Available in 12 Indian languages</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/30">Select Language</span>
            <div className="text-sm bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-white/70">
              English ▾
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/5 text-center text-sm text-white/20">
        <p>© 2025 Sattva Navigator · AI-powered career guidance for India</p>
      </footer>
    </div>
  );
}
