import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Plus, Zap, Bot, User, MoreHorizontal, ArrowLeft } from "lucide-react";
import type { Page } from "@/App";

type Message = { id: number; role: "user" | "assistant"; text: string; time: string };

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1, role: "assistant",
    text: "Namaste! I'm Sattva, your AI career mentor. I've analysed your assessment results and I'm ready to help you navigate your path to becoming a Software Developer.\n\nWhat would you like to know? I can help with career questions, skill planning, interview prep, or just talk through your concerns.",
    time: "9:41 AM",
  },
];

const SUGGESTIONS = [
  "What skills should I learn first?",
  "How long to become job-ready?",
  "Best companies to apply to?",
  "How to prepare for interviews?",
];

const RESPONSES: Record<string, string> = {
  "What skills should I learn first?":
    "Based on your assessment, I recommend starting with Data Structures & Algorithms — it's the foundation for software engineering interviews.\n\nYour priority order:\n1. DSA (Python) — 6 weeks\n2. React/Next.js — 4 weeks\n3. System Design basics — 3 weeks\n4. Cloud fundamentals (AWS free tier) — ongoing\n\nWould you like me to create a detailed week-by-week plan?",
  "How long to become job-ready?":
    "Based on your current skill level, you're looking at approximately 8–10 months to be competitive for mid-level software developer roles.\n\nFor TCS/Infosys-level roles: 4–5 months with focused effort.\n\nKey milestones:\n• Month 2: DSA proficiency\n• Month 5: Full-stack project portfolio\n• Month 7: System design basics\n• Month 9: Interview-ready\n\nShall I adjust your roadmap to hit these targets?",
  "Best companies to apply to?":
    "Based on your profile, here are tiered recommendations:\n\nTier 1 — Apply Now:\n• TCS Digital, Infosys (strong match, 88%)\n• Wipro, Cognizant (good entry point)\n\nTier 2 — Ready in 3 months:\n• Mid-size product startups\n\nTier 3 — Dream targets in 8+ months:\n• Flipkart, Paytm, Zomato\n• MNCs like Microsoft, Google (Hyderabad)\n\nWould you like to see specific job openings?",
  "How to prepare for interviews?":
    "Here's a structured interview prep plan:\n\nTechnical Round:\n• Practice 50+ LeetCode problems (Easy → Medium)\n• Study OS, DBMS, and Networking basics\n• Prepare 2–3 system design answers\n\nHR Round:\n• Prepare your story using the STAR method\n• Practice common questions\n• Research company culture\n\nPortfolio:\n• Build 2–3 full-stack projects with clean GitHub repos\n\nWant me to schedule mock interviews in your daily plan?",
};

const CHAT_HISTORY = [
  { id: 1, title: "Career path discussion", time: "Yesterday" },
  { id: 2, title: "DSA learning resources", time: "2 days ago" },
  { id: 3, title: "Resume review tips", time: "Last week" },
];

export function AIMentorChat({ nav }: { nav: (p: Page) => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim() || isTyping) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text, time: now }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response =
        RESPONSES[text] ||
        "That's a great question! Based on your profile and goals, I'd recommend focusing on the skills with the highest impact for software developer roles. Consistency is key — small daily progress compounds into big results. Would you like me to break this down further or adjust your learning plan?";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#0a0a0f] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-white/5">
          <button onClick={() => nav("home")} className="flex items-center gap-2 mb-4 text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back to Home</span>
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">Sattva Career Mentor</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="w-full bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/20 rounded-xl gap-2 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            New Session
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="text-xs text-white/30 uppercase tracking-wide mb-2 px-1">Recent Chats</div>
          {CHAT_HISTORY.map((chat) => (
            <button key={chat.id} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors mb-1">
              <div className="text-sm text-white/70 truncate">{chat.title}</div>
              <div className="text-xs text-white/30 mt-0.5">{chat.time}</div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">RK</div>
            <div>
              <div className="text-xs font-medium">Student User</div>
              <div className="text-xs text-white/30">Pro Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">Meet Sattva</div>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · Speaks 12 languages
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/30 rounded-lg">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.role === "assistant" ? "bg-gradient-to-br from-violet-500 to-purple-600" : "bg-white/10"
              }`}>
                {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/70" />}
              </div>
              <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "assistant"
                    ? "bg-white/[0.04] border border-white/5 text-white/80"
                    : "bg-violet-600 text-white"
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-white/20 px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white/[0.04] border border-white/5 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-5 py-2 flex gap-2 overflow-x-auto">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/[0.02] hover:bg-white/[0.05]"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-violet-500/40 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask Sattva anything about your career path..."
              className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none"
            />
            <Button
              size="icon"
              onClick={() => send(input)}
              disabled={!input.trim() || isTyping}
              className="w-8 h-8 rounded-xl flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-center text-xs text-white/20 mt-2">Start New Conversation · Ask Sattva for career advice</p>
        </div>
      </div>
    </div>
  );
}
