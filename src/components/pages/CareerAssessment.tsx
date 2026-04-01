import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Brain, Sparkles, CheckCircle, ArrowLeft, Zap } from "lucide-react";
import type { Page } from "@/App";

const STEPS = ["Interests", "Skills", "Values", "Personality", "Lifestyle"];

const QUESTIONS: Record<string, { question: string; options: string[] }[]> = {
  Interests: [
    {
      question: "Which of these activities excites you most?",
      options: [
        "Building and creating things from scratch",
        "Helping people solve their problems",
        "Analysing data and finding patterns",
        "Communicating and persuading others",
        "Teaching and mentoring others",
      ],
    },
    {
      question: "What kind of work environment do you prefer?",
      options: [
        "Collaborative team environment",
        "Independent, focused work",
        "Dynamic and ever-changing",
        "Structured with clear processes",
        "Creative and expressive",
      ],
    },
  ],
  Skills: [
    {
      question: "What is your strongest technical skill area?",
      options: [
        "Programming & Software Development",
        "Data Analysis & Statistics",
        "Design & Visual Communication",
        "Writing & Content Creation",
        "Sales & Negotiation",
      ],
    },
  ],
  Values: [
    {
      question: "What matters most to you in a career?",
      options: [
        "High earning potential",
        "Work-life balance",
        "Making a positive impact",
        "Intellectual challenge",
        "Job security and stability",
      ],
    },
  ],
  Personality: [
    {
      question: "How do you recharge after a draining day?",
      options: [
        "Socializing with friends and family",
        "Spending time alone quietly",
        "Physical activity or sports",
        "Creative hobbies",
        "Learning something new",
      ],
    },
  ],
  Lifestyle: [
    {
      question: "What lifestyle do you envision in 5 years?",
      options: [
        "Living in a metro city with a fast-paced career",
        "Working remotely from anywhere",
        "Running my own business",
        "Stable 9-to-5 with family time",
        "Travelling and exploring new places",
      ],
    },
  ],
};

export function CareerAssessment({ nav }: { nav: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = STEPS[step];
  const questions = QUESTIONS[currentStep] || [];
  const question = questions[qIndex];
  const totalQuestions = Object.values(QUESTIONS).reduce((a, b) => a + b.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleNext = () => {
    if (!selected) return;
    const key = `${currentStep}-${qIndex}`;
    setAnswers((prev) => ({ ...prev, [key]: selected }));
    setSelected(null);
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else if (step < STEPS.length - 1) {
      setStep(step + 1);
      setQIndex(0);
    }
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    } else if (step > 0) {
      setStep(step - 1);
      const prevStep = STEPS[step - 1];
      setQIndex((QUESTIONS[prevStep]?.length || 1) - 1);
    }
    setSelected(null);
  };

  const isComplete = answeredCount === totalQuestions;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
        <button onClick={() => nav("home")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-base text-white">Career Assessment</span>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40">{answeredCount}/{totalQuestions} answered</span>
          <div className="w-32">
            <Progress value={progress} />
          </div>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-white/5">
        <div className="flex gap-2">
          {STEPS.map((s, i) => {
            const stepQuestions = QUESTIONS[s] || [];
            const stepAnswered = stepQuestions.filter((_, qi) => answers[`${s}-${qi}`]).length;
            const isDone = stepAnswered === stepQuestions.length;
            return (
              <div
                key={s}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === step
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : isDone
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "text-white/30 border border-white/5"
                }`}
              >
                {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                {s}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        {isComplete ? (
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Assessment Complete!</h2>
            <p className="text-white/50 mb-8">
              Analysing your responses across all 5 dimensions to generate your personalized career profile...
            </p>
            <div className="mb-8 space-y-3">
              {[
                "Processing interest patterns...",
                "Calculating skill alignment...",
                "Mapping lifestyle preferences...",
                "Generating career matches...",
              ].map((msg) => (
                <div key={msg} className="flex items-center gap-3 text-sm text-left">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-white/60">{msg}</span>
                </div>
              ))}
            </div>
            <Button onClick={() => nav("matches")} size="lg" className="rounded-xl px-8 font-semibold">
              View My Career Matches
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <div className="mb-2 text-sm text-white/40 font-medium uppercase tracking-widest">
              {currentStep} — Question {qIndex + 1} of {questions.length}
            </div>
            <h2 className="text-2xl font-bold mb-8 leading-snug">{question?.question}</h2>

            <div className="space-y-3 mb-10">
              {question?.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${
                    selected === opt
                      ? "border-violet-500 bg-violet-500/10 text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                        selected === opt ? "border-violet-400 bg-violet-500" : "border-white/20"
                      }`}
                    />
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 0 && qIndex === 0}
                className="rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selected}
                className="rounded-xl px-8 font-semibold"
              >
                {step === STEPS.length - 1 && qIndex === questions.length - 1 ? "Complete" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
