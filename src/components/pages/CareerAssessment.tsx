import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Sparkles, CheckCircle, ArrowLeft, Zap } from "lucide-react";
import type { Page } from "@/App";

const STEPS = [
  {
    id: "passion",
    label: "Passion",
    question: "What are you passionate about?",
    options: [
      "Building products and solving technical problems",
      "Helping people and making a social impact",
      "Analysing data and deriving insights",
      "Creating art, design, and visual experiences",
      "Teaching, training, and mentoring others",
    ],
  },
  {
    id: "skills",
    label: "Skills",
    question: "What are your current skills?",
    options: [
      "Programming and software development",
      "Communication and leadership",
      "Mathematics, statistics, and analysis",
      "Design tools and creative software",
      "Research, writing, and content creation",
    ],
  },
  {
    id: "goals",
    label: "Goals",
    question: "What are your career goals?",
    options: [
      "Build a high-paying technical career",
      "Start my own company or freelance",
      "Work in research or academia",
      "Climb the corporate leadership ladder",
      "Create meaningful social or environmental impact",
    ],
  },
  {
    id: "future",
    label: "Future",
    question: "Where do you see yourself in 5 years? What kind of impact do you want to make?",
    options: [
      "Leading a team at a top tech company",
      "Running my own startup",
      "Working remotely from anywhere in the world",
      "Mastering my craft as a specialist",
      "Contributing to large-scale societal projects",
    ],
  },
  {
    id: "workstyle",
    label: "Work Style",
    question: "How do you prefer to work?",
    options: [
      "Collaborating closely with a team every day",
      "Working independently with clear goals",
      "Mix of both — flexible and adaptive",
      "Structured environment with defined processes",
      "Fast-paced, startup-like culture",
    ],
  },
];

export function CareerAssessment({ nav }: { nav: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const current = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  const handleNext = () => {
    if (!selected) return;
    const updated = { ...answers, [current.id]: selected };
    setAnswers(updated);
    setSelected(null);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      setTimeout(() => nav("careers"), 2800);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-3">AI is analyzing your profile...</h2>
          <p className="text-white/50 text-sm mb-8">Processing your responses across 5 dimensions</p>
          <div className="space-y-3 text-left">
            {[
              "Mapping your interests and personality...",
              "Calculating skill alignment scores...",
              "Analysing market demand and salary data...",
              "Generating your career matches...",
            ].map((msg, i) => (
              <div key={msg} className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-white/60">{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <button onClick={() => nav("home")} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-white">Career Assessment</span>
          </div>
        </button>
        <span className="text-sm text-white/30">{step + 1} of {STEPS.length}</span>
      </div>

      {/* Progress */}
      <div className="px-6 pt-3 pb-2">
        <Progress value={progress} />
        <div className="flex justify-between mt-2">
          {STEPS.map((s, i) => (
            <span key={s.id} className={`text-xs font-medium transition-colors ${i <= step ? "text-purple-400" : "text-white/20"}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-3">
            Question {step + 1}
          </p>
          <h2 className="text-2xl font-bold mb-8 leading-snug">{current.question}</h2>

          <div className="space-y-2.5 mb-10">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all ${
                  selected === opt
                    ? "border-purple-500 bg-purple-500/10 text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-white/65 hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                    selected === opt ? "border-purple-400 bg-purple-500" : "border-white/20"
                  }`} />
                  {opt}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => { setStep(Math.max(0, step - 1)); setSelected(null); }}
              disabled={step === 0}
              className="rounded-xl text-white/40"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selected}
              className="rounded-xl px-8 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-30"
            >
              {step === STEPS.length - 1 ? "See My Careers" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
