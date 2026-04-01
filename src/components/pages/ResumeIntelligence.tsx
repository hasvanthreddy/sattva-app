import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Clipboard, Sparkles, CheckCircle, AlertTriangle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import type { Page } from "@/App";

const RESULT = {
  match: 87, quality: 74, bestCareer: "Software Developer",
  skills: [
    { name: "Python", found: true, score: 85 },
    { name: "Data Analysis", found: true, score: 70 },
    { name: "Machine Learning", found: true, score: 65 },
    { name: "React / Frontend", found: false, score: 0 },
    { name: "System Design", found: false, score: 0 },
    { name: "Cloud (AWS/GCP)", found: false, score: 0 },
  ],
  strengths: [
    "Strong Python programming background",
    "Machine learning project experience shown",
    "Good academic credentials (CGPA 8.5+)",
    "Internship experience mentioned",
  ],
  improvements: [
    "Add quantified achievements (%, numbers, impact)",
    "Add a clear skills section with tech stack",
    "Include GitHub repo and project links",
    "Mention any cloud or DevOps exposure",
  ],
  keywordsFound: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
  keywordsMissing: ["AWS", "Docker", "React", "System Design", "CI/CD", "Kubernetes"],
};

export function ResumeIntelligence({ nav }: { nav: (p: Page) => void }) {
  const [mode, setMode] = useState<"upload" | "paste" | "analyzing" | "done">("upload");
  const [text, setText] = useState("");

  const analyze = () => {
    setMode("analyzing");
    setTimeout(() => setMode("done"), 2000);
  };

  if (mode === "analyzing") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto mb-5 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-semibold mb-2">Sattva is analyzing your resume...</p>
          <p className="text-white/40 text-sm">This takes just a moment</p>
        </div>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <FileText className="w-5 h-5 text-purple-400" />
          <h1 className="text-base font-bold">Resume Analysis Results</h1>
        </div>

        <div className="px-6 py-5">
          {/* Score cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="glass-panel rounded-2xl p-4 border border-purple-500/20 bg-purple-500/[0.05]">
              <div className="text-xs text-white/35 uppercase tracking-wide mb-2">Best Match</div>
              <div className="text-sm font-semibold mb-1">{RESULT.bestCareer}</div>
              <div className="text-3xl font-black text-purple-400">{RESULT.match}%</div>
              <Progress value={RESULT.match} className="mt-2" />
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-xs text-white/35 uppercase tracking-wide mb-2">Resume Quality</div>
              <div className="text-3xl font-black text-cyan-400 mb-1">{RESULT.quality}<span className="text-base font-normal text-white/30">/100</span></div>
              <Progress value={RESULT.quality} />
              <p className="text-xs text-white/30 mt-1.5">Room for improvement</p>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-xs text-white/35 uppercase tracking-wide mb-2">Skills Detected</div>
              <div className="text-3xl font-black text-emerald-400 mb-1">3/6</div>
              <p className="text-xs text-white/50 mt-1">key skills found</p>
              <p className="text-xs text-orange-400 mt-0.5">3 critical missing</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-3">Skill Detection</h3>
            <div className="grid grid-cols-2 gap-2">
              {RESULT.skills.map(skill => (
                <div key={skill.name} className="flex items-center gap-2.5 glass-panel rounded-xl p-3">
                  {skill.found
                    ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-400/50 flex-shrink-0" />
                  }
                  <span className={`text-sm flex-1 ${skill.found ? "text-white/75" : "text-white/25"}`}>{skill.name}</span>
                  {skill.found && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-14 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${skill.score}%` }} />
                      </div>
                      <span className="text-xs text-white/25">{skill.score}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
              <h4 className="text-sm font-medium text-emerald-400 flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-2">
                {RESULT.strengths.map(s => (
                  <li key={s} className="text-xs text-white/55 flex gap-2"><span className="text-emerald-400 flex-shrink-0 mt-0.5">•</span>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
              <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" /> Improve
              </h4>
              <ul className="space-y-2">
                {RESULT.improvements.map(s => (
                  <li key={s} className="text-xs text-white/55 flex gap-2"><span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keywords */}
          <div className="glass-panel rounded-xl p-4 mb-5">
            <h4 className="text-sm font-medium mb-3">Keyword Analysis</h4>
            <div className="mb-3">
              <p className="text-xs text-emerald-400 mb-1.5">Found</p>
              <div className="flex flex-wrap gap-1.5">
                {RESULT.keywordsFound.map(k => (
                  <span key={k} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{k}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-red-400/70 mb-1.5">Missing</p>
              <div className="flex flex-wrap gap-1.5">
                {RESULT.keywordsMissing.map(k => (
                  <span key={k} className="text-xs bg-red-500/10 text-red-400/60 border border-red-500/20 px-2 py-0.5 rounded-full">{k}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => nav("courses")} className="rounded-xl text-sm bg-gradient-to-r from-purple-600 to-blue-600 font-medium">
              Find Courses to Fix Gaps <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
            <Button variant="ghost" onClick={() => setMode("upload")} className="rounded-xl text-white/35 text-sm">
              Analyze Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <FileText className="w-5 h-5 text-purple-400" />
        <div>
          <h1 className="text-base font-bold">Resume Intelligence</h1>
          <p className="text-xs text-white/35">Upload or paste your resume for instant career fit analysis</p>
        </div>
      </div>

      <div className="px-6 py-8 max-w-xl mx-auto">
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
                  ? "bg-purple-600/15 text-purple-300 border-purple-500/25"
                  : "text-white/40 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {mode === "upload" ? (
          <div
            className="border-2 border-dashed border-white/10 rounded-2xl p-14 text-center hover:border-purple-500/35 transition-colors cursor-pointer group"
            onClick={analyze}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-purple-500/10 flex items-center justify-center mx-auto mb-4 transition-colors">
              <Upload className="w-6 h-6 text-white/25 group-hover:text-purple-400 transition-colors" />
            </div>
            <h3 className="font-semibold mb-1.5 text-sm">Upload Your Resume</h3>
            <p className="text-white/35 text-xs mb-5">Drag & drop or click to upload PDF / Word / TXT</p>
            <Button size="sm" variant="outline" className="rounded-xl">Choose File</Button>
          </div>
        ) : (
          <div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full h-56 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white/70 placeholder:text-white/20 outline-none focus:border-purple-500/35 resize-none transition-colors"
            />
            <div className="flex justify-between text-xs text-white/25 mt-1 mb-5">
              <span>{text.length} characters</span>
              <span>Paste your full resume for best results</span>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <Button
            onClick={analyze}
            size="lg"
            className="rounded-xl px-8 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Analyze Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
