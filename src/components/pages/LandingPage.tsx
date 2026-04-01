import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Zap, Globe, ChevronRight, ArrowRight, Users, Star, BarChart2, Brain, Map, BookOpen, Building2, MessageCircle } from "lucide-react";
import type { Page } from "@/App";

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Careers", page: "careers" },
  { label: "Roadmap", page: "roadmap" },
  { label: "Resume", page: "resume" },
  { label: "Courses", page: "courses" },
  { label: "Centers", page: "centers" },
  { label: "Sattva", page: "sattva" },
];

const STATS = [
  { value: "50,000+", label: "Careers Mapped" },
  { value: "94%", label: "Match Accuracy" },
  { value: "24/7", label: "AI Guidance" },
  { value: "200+", label: "Explore Fields" },
];

const FEATURES: { icon: React.ElementType; title: string; desc: string; page: Page; gradient: string }[] = [
  {
    icon: Brain, title: "AI Path Mapping", page: "careers",
    desc: "Discover careers matched precisely to your unique skills and interests.",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    icon: BarChart2, title: "Skill Gap Analysis", page: "careers",
    desc: "Know exactly what to learn next to bridge the gap to your dream role.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle, title: "Sattva Mentor", page: "sattva",
    desc: "Get 24/7 personalized career guidance from Sattva, your AI counselor.",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    icon: Map, title: "Dynamic Roadmaps", page: "roadmap",
    desc: "Actionable 30/90 day plans to accelerate your career growth.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen, title: "Curated Courses", page: "courses",
    desc: "Free and premium learning resources curated for your career path.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Building2, title: "Training Centers", page: "centers",
    desc: "Find physical learning centers near you for hands-on training.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const FIELDS = [
  "Software Engineering", "Data Science", "AI & Machine Learning", "UX Design",
  "Product Management", "Digital Marketing", "Healthcare", "Finance & Banking",
  "Cybersecurity", "Cloud Computing", "Animation & VFX", "Law & Policy",
  "Education & Teaching", "Civil Engineering", "Biotechnology",
];

const MATCH_TYPES = [
  {
    label: "Safe Bet",
    desc: "Highly aligned with your current skills. Easy transition.",
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  {
    label: "Balanced Growth",
    desc: "Perfect mix of comfort and challenge. Great long-term value.",
    color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    dot: "bg-blue-400",
  },
  {
    label: "Dream Reach",
    desc: "Ambitious goal requiring upskilling, but massive rewards.",
    color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    dot: "bg-purple-400",
  },
];

export function LandingPage({ nav }: { nav: (p: Page) => void }) {
  const [activePage, setActivePage] = useState<Page>("home");
  const [search, setSearch] = useState("");

  const handleNav = (p: Page) => {
    setActivePage(p);
    if (p !== "home") nav(p);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <button onClick={() => handleNav("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">Sattva Navigator</span>
        </button>

        <div className="flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.page)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activePage === item.page
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label === "Sattva" ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {item.label}
                </span>
              ) : item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1.5 rounded-md hover:bg-white/5">
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          <Button onClick={() => nav("assessment")} size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-xs font-semibold px-4">
            Sign in
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-32 right-0 w-[350px] h-[350px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
            <span>🇮🇳</span>
            <span>Empowering India's Youth</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
            Navigate Your Future with{" "}
            <span className="text-gradient">AI Precision</span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover your perfect career, analyze your skills, and get a step-by-step roadmap to success.
            Your personal AI career counselor, available 24/7.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-purple-500/40 transition-all">
              <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && nav("careers")}
                placeholder="Search your dream career..."
                className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none"
              />
              <Button
                onClick={() => nav("careers")}
                size="sm"
                className="flex-shrink-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-semibold text-xs px-4"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center glass-panel rounded-xl py-3 px-2">
                <div className="text-xl font-bold text-white mb-0.5">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fields strip */}
      <section className="py-6 border-y border-white/5 overflow-hidden">
        <div className="mb-3 text-center">
          <h2 className="text-xl font-bold mb-1">Explore Fields</h2>
          <p className="text-white/40 text-sm">Find your passion across emerging industries</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 px-6 mt-4">
          {FIELDS.map((f) => (
            <button
              key={f}
              onClick={() => nav("careers")}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.07] transition-all"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">A Complete Career Ecosystem</h2>
            <p className="text-white/45 text-base">Everything you need to chart your course from learning to earning.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.title}
                  onClick={() => nav(f.page)}
                  className="group p-5 rounded-2xl glass-panel hover:bg-white/[0.07] transition-all text-left relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                  <ChevronRight className="absolute bottom-4 right-4 w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Match types explainer */}
      <section className="px-6 py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-5 text-center text-white/80">How We Match You</h3>
          <div className="grid grid-cols-3 gap-4">
            {MATCH_TYPES.map((m) => (
              <div key={m.label} className={`rounded-2xl border p-4 ${m.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                  <span className="font-semibold text-sm">{m.label}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-30 rounded-full" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">Ready to find your calling?</h2>
          <p className="text-white/50 mb-8">
            Join thousands of students mapping their future with AI Career Navigator.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => nav("assessment")}
              size="lg"
              className="rounded-xl px-8 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20"
            >
              Start Free Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-white/30 text-sm">
            <span className="flex items-center gap-2"><Users className="w-4 h-4" />2M+ students guided</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" />4.9 rating</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" />12 Indian languages</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-white/5 text-center text-xs text-white/20">
        <p>Designed by Team Sattva | Ignite 2K26</p>
      </footer>
    </div>
  );
}
