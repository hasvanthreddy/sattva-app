import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Plus, Zap, Bot, User, MoreHorizontal, ArrowLeft, Sparkles } from "lucide-react";
import type { Page } from "@/App";

type Msg = { id: number; role: "user" | "bot"; text: string; time: string };

const INITIAL: Msg[] = [
  {
    id: 1, role: "bot",
    text: "Namaste! I'm Sattva, your AI career counselor 🙏\n\nI've analysed your profile and I'm ready to guide you. I can help with career questions, skill planning, interview prep, course recommendations, or anything on your mind.\n\nWhat would you like to explore today?",
    time: now(),
  },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const SUGGESTIONS = [
  "How do I get into software engineering?",
  "What skills should I learn for data science?",
  "How to prepare for campus placements?",
  "Which career suits an introvert?",
];

const RESPONSES: Record<string, string> = {
  "How do I get into software engineering?":
    "Great choice! Here's a focused path:\n\n1. Start with Python or JavaScript — pick one and master it\n2. Learn Data Structures & Algorithms (LeetCode Easy → Medium)\n3. Build 2–3 real projects (put them on GitHub)\n4. Learn System Design basics\n5. Apply to TCS, Infosys, Wipro to start, then product companies\n\nAt your current skill level, you could be interview-ready in 6–8 months with consistent daily effort. Want me to create a week-by-week plan?",
  "What skills should I learn for data science?":
    "For data science in India, here's the priority stack:\n\n🔢 Core: Python, Statistics, SQL\n📊 Tools: Pandas, NumPy, Matplotlib, Scikit-learn\n🤖 Advanced: Machine Learning, TensorFlow/PyTorch\n☁️ Deployment: Flask APIs, AWS basics\n\nTop certifications: Google Data Analytics (Coursera), IBM Data Science, or Andrew Ng's ML Specialization.\n\nSalary range: ₹6–15 LPA as fresher, ₹20–40 LPA with 3 years experience. Want course recommendations?",
  "How to prepare for campus placements?":
    "Campus placement prep in 3 months:\n\nMonth 1 — Technical:\n• 50 LeetCode problems (Easy/Medium)\n• Core CS subjects: OS, DBMS, Networking, OOP\n• 1 good project on GitHub\n\nMonth 2 — Practice:\n• Mock interviews on Pramp or Interviewing.io\n• Company-specific questions (GFG)\n• Resume polish with quantified impact\n\nMonth 3 — Apply:\n• Apply early to mass recruiters (TCS, Infosys, Wipro)\n• Target product companies for better packages\n\nWant a specific company's interview breakdown?",
  "Which career suits an introvert?":
    "Many high-paying careers are perfect for introverts:\n\n💻 Software Development — deep focused work, low social pressure\n📊 Data Science / Analytics — mostly solo analysis work\n🎨 UX Design — research-heavy, independent work\n✍️ Technical Writing — solo, high-paying, remote-friendly\n🔐 Cybersecurity — focused, analytical, few meetings\n\nYour assessment profile suggests Software Developer or Data Scientist would suit you best — both offer remote work, deep problem-solving, and excellent salaries in India.\n\nWant a roadmap for any of these?",
};

const HISTORY = [
  { id: 1, title: "Career path discussion", time: "Yesterday" },
  { id: 2, title: "DSA learning strategy", time: "2 days ago" },
  { id: 3, title: "Resume review tips", time: "Last week" },
];

export function SattvaChat({ nav }: { nav: (p: Page) => void }) {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: Msg = { id: Date.now(), role: "user", text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = RESPONSES[text] ||
        "Great question! Based on your profile, I'd focus on the skills with highest market demand in your target role. Consistency beats intensity — 2 hours every day will take you further than 10-hour weekend sprints. Which specific area would you like me to break down further?";
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: reply, time: now() }]);
      setTyping(false);
    }, 1400);
  };

  return (
    <div className="h-screen bg-[#0a0a0f] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 border-r border-white/5 flex flex-col flex-shrink-0 bg-[#0a0a0f]">
        <div className="p-4 border-b border-white/5">
          <button onClick={() => nav("home")} className="flex items-center gap-1.5 mb-4 text-white/35 hover:text-white transition-colors text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">Sattva</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => setMessages(INITIAL)}
            className="w-full bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/20 rounded-xl gap-1.5 text-xs"
            variant="ghost"
          >
            <Plus className="w-3.5 h-3.5" />
            New Session
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="text-xs text-white/25 uppercase tracking-widest mb-2 px-1">Recent</div>
          {HISTORY.map(h => (
            <button key={h.id} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors mb-1">
              <div className="text-xs text-white/60 truncate">{h.title}</div>
              <div className="text-xs text-white/25 mt-0.5">{h.time}</div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">S</div>
            <div>
              <div className="text-xs font-medium">Student User</div>
              <div className="text-xs text-white/25">Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">Sattva Mentor</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online · Speaks 12 languages
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/25 rounded-lg">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.role === "bot" ? "bg-gradient-to-br from-purple-500 to-blue-600" : "bg-white/10"
              }`}>
                {msg.role === "bot" ? <Sparkles className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/60" />}
              </div>
              <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "bot"
                    ? "glass-panel text-white/80"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-white/20 px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="glass-panel rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-none">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/45 hover:text-white hover:border-white/20 transition-all bg-white/[0.02] hover:bg-white/[0.05]"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 glass-panel rounded-2xl px-4 py-3 focus-within:border-purple-500/35 transition-all">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask Sattva anything about your career..."
              className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none"
            />
            <Button
              size="icon"
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              className="w-8 h-8 rounded-xl flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-30"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-center text-xs text-white/15 mt-2">Designed by Team Sattva | Ignite 2K26</p>
        </div>
      </div>
    </div>
  );
}
