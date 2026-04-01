import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Upload, FileText, Clipboard, Sparkles, CheckCircle, AlertTriangle,
  XCircle, ArrowRight, ArrowLeft,
} from "lucide-react";
import type { Page } from "@/App";

const ANALYSIS = {
  bestMatch: "Software Developer",
  matchScore: 87,
  overallScore: 74,
  skills: [
    { name: "Python", found: true, strength: 85 },
    { name: "Machine Learning", found: true, strength: 70 },
    { name: "Data Analysis", found: true, strength: 65 },
    { name: "React / Frontend", found: false, strength: 0 },
    { name: "System Design", found: false, strength: 0 },
    { name: "Cloud (AWS/GCP)", found: false, strength: 0 },
  ],
  strengths: [
    "Strong Python programming background",
    "Machine learning project experience",
    "Good academic credentials (CGPA 8.5)",
    "Internship experience at mid-size company",
  ],
  improvements: [
    "Add quantified achievements (% improvements, numbers)",
    "Include a skills section with tech stack clearly listed",
    "Add links to GitHub portfolio and projects",
    "Mention cloud platform experience",
  ],
  keywords: {
    found: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    missing: ["AWS", "Docker", "React", "System Design", "CI/CD", "Kubernetes"],
  },
};

export function ResumeIntelligence({ nav }: { nav: (p: Page) => void }) {
  const [mode, setMode] = useState<"upload" | "paste" | "analyzed">("upload");
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-8 py-5 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <FileText className="w-5 h-5 text-violet-400" />
        <div>
          <h1 className="text-xl font-bold">Resume Intelligence</h1>
          <p className="text-white/40 text-sm">Upload or paste your resume for instant career fit analysis</p>
        </div>
      </div>

      {mode === "analyzed" ? (
        <div className="px-8 py-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-5">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Best Career Match</div>
              <div className="text-lg font-bold mb-1">{ANALYSIS.bestMatch}</div>
              <div className="text-3xl font-black text-violet-400">{ANALYSIS.matchScore}%</div>
              <Progress value={ANALYSIS.matchScore} className="mt-2" />
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Resume Quality</div>
              <div className="text-3xl font-black text-cyan-400 mb-2">{ANALYSIS.overallScore}/100</div>
              <Progress value={ANALYSIS.overallScore} />
              <p className="text-xs text-white/30 mt-2">Room for improvement</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Skill Analysis</div>
              <div className="text-3xl font-black text-emerald-400 mb-2">3/6</div>
              <p className="text-sm text-white/50">key skills found</p>
              <p className="text-xs text-orange-400 mt-1">3 critical skills missing</p>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/40">Skill Analysis</h3>
            <div className="grid grid-cols-2 gap-2">
              {ANALYSIS.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                  {skill.found ? (
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400/60 flex-shrink-0" />
                  )}
                  <span className={`text-sm flex-1 ${skill.found ? "text-white/70" : "text-white/30"}`}>
                    {skill.name}
                  </span>
                  {skill.found && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${skill.strength}%` }} />
                      </div>
                      <span className="text-xs text-white/30">{skill.strength}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
              <h4 className="font-medium text-sm text-green-400 flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-2">
                {ANALYSIS.strengths.map((s) => (
                  <li key={s} className="text-xs text-white/60 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
              <h4 className="font-medium text-sm text-orange-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" /> Improvements
              </h4>
              <ul className="space-y-2">
                {ANALYSIS.improvements.map((s) => (
                  <li key={s} className="text-xs text-white/60 flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-5">
            <h4 className="font-medium text-sm mb-3">Keyword Analysis</h4>
            <div className="mb-3">
              <div className="text-xs text-green-400 mb-2">Found in resume</div>
              <div className="flex flex-wrap gap-2">
                {ANALYSIS.keywords.found.map((k) => (
                  <span key={k} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full">
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-red-400 mb-2">Missing keywords</div>
              <div className="flex flex-wrap gap-2">
                {ANALYSIS.keywords.missing.map((k) => (
                  <span key={k} className="text-xs bg-red-500/10 text-red-400/60 border border-red-500/20 px-2 py-1 rounded-full">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => nav("learning")} className="rounded-xl font-medium">
              View Learning Path to Fix Gaps
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button variant="ghost" onClick={() => setMode("upload")} className="rounded-xl text-white/40">
              Analyze Another Resume
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 mb-6">
              {[
                { id: "upload", label: "Upload File", icon: Upload },
                { id: "paste", label: "Paste Text", icon: Clipboard },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMode(id as "upload" | "paste")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    mode === id
                      ? "bg-violet-600/20 text-violet-300 border-violet-500/30"
                      : "text-white/40 border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {mode === "upload" ? (
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-16 text-center hover:border-violet-500/40 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-violet-500/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Upload className="w-7 h-7 text-white/30 group-hover:text-violet-400 transition-colors" />
                </div>
                <h3 className="font-semibold mb-2">Input Your Resume</h3>
                <p className="text-white/40 text-sm mb-6">Drag and drop your PDF or Word file here</p>
                <Button variant="outline" className="rounded-xl">Upload File</Button>
              </div>
            ) : (
              <div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-64 bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm text-white/70 placeholder:text-white/20 outline-none focus:border-violet-500/40 resize-none transition-colors"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-white/30">{text.length} characters</span>
                  <span className="text-xs text-white/30">Awaiting Resume</span>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button
                onClick={() => setMode("analyzed")}
                size="lg"
                className="rounded-xl px-8 font-semibold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
