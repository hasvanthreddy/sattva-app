import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import type { Page } from "@/App";

const SURVIVAL_METRICS = [
  { label: "Survival Score", value: 72, color: "text-violet-400", desc: "Long-term viability in this field" },
  { label: "Lifestyle Match", value: 85, color: "text-cyan-400", desc: "Alignment with lifestyle preferences" },
  { label: "Stress Compatibility", value: 68, color: "text-amber-400", desc: "Role stress vs. your tolerance" },
  { label: "Overall Progress", value: 58, color: "text-emerald-400", desc: "Journey toward readiness" },
];

const SKILL_GAPS = [
  { skill: "System Design", current: 30, required: 90, priority: "Critical" },
  { skill: "React / Next.js", current: 65, required: 90, priority: "High" },
  { skill: "Cloud (AWS/GCP)", current: 20, required: 80, priority: "Critical" },
  { skill: "Data Structures & Algorithms", current: 55, required: 85, priority: "High" },
  { skill: "Communication Skills", current: 75, required: 80, priority: "Low" },
  { skill: "Python", current: 80, required: 85, priority: "Low" },
];

const JOB_ROLES = [
  { title: "Junior Software Developer", company: "TCS Digital", match: 88, salary: "₹6–9 LPA", type: "Entry Level", ready: true },
  { title: "Software Engineer", company: "Infosys", match: 82, salary: "₹7–12 LPA", type: "Mid Level", ready: true },
  { title: "Full Stack Developer", company: "Startups", match: 76, salary: "₹8–15 LPA", type: "Mid Level", ready: false },
  { title: "Senior Engineer", company: "Product Co.", match: 68, salary: "₹15–25 LPA", type: "Senior", ready: false },
];

const DAILY_TASKS = [
  { time: "7:00 AM", task: "30-min coding practice on LeetCode", done: true, type: "Practice" },
  { time: "9:00 AM", task: "System Design course — Module 3: Load Balancers", done: true, type: "Learning" },
  { time: "2:00 PM", task: "Build a REST API project for portfolio", done: false, type: "Project" },
  { time: "5:00 PM", task: "Mock interview practice with AI", done: false, type: "Interview" },
  { time: "8:00 PM", task: "Review AWS concepts — EC2 & S3", done: false, type: "Learning" },
];

const TABS = [
  { id: "survival", label: "Survival Analysis" },
  { id: "gaps", label: "Skill Gap" },
  { id: "roles", label: "Job Roles" },
  { id: "daily", label: "Daily Plan" },
];

export function CareerProfile({ nav }: { nav: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("survival");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-8 py-5 border-b border-white/5 flex items-center gap-4">
        <button onClick={() => nav("matches")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 rounded-xl bg-white/5 text-2xl flex items-center justify-center">💻</div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Career Profile: Software Developer</h1>
          <p className="text-white/40 text-sm">Your personalized analysis and readiness report</p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-sm px-3 py-1">94% Match</Badge>
      </div>

      <div className="px-8 border-b border-white/5">
        <div className="flex gap-1 py-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-600/20 text-violet-300"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
        {activeTab === "survival" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {SURVIVAL_METRICS.map((m) => (
                <div key={m.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="text-xs text-white/30 uppercase tracking-wide mb-3">{m.label}</div>
                  <div className={`text-3xl font-bold mb-2 ${m.color}`}>{m.value}%</div>
                  <Progress value={m.value} className="mb-2" />
                  <p className="text-xs text-white/30">{m.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-400" />
                Role Description
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Software Developers design, build, and maintain software applications. The role demands strong logical
                thinking, continuous learning, and the ability to work in teams. High job security with excellent
                growth potential in India's booming tech sector.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Job Security", value: "Very High", icon: "🔒" },
                  { label: "Growth Potential", value: "Excellent", icon: "📈" },
                  { label: "Work-Life Balance", value: "Moderate", icon: "⚖️" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/[0.03] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-white/30 mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-white/80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "gaps" && (
          <div className="space-y-3">
            {SKILL_GAPS.map((sg) => (
              <div key={sg.skill} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{sg.skill}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      sg.priority === "Critical" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                      sg.priority === "High" ? "text-orange-400 bg-orange-500/10 border-orange-500/20" :
                      "text-green-400 bg-green-500/10 border-green-500/20"
                    }`}>
                      {sg.priority}
                    </span>
                  </div>
                  <span className="text-sm text-white/40">{sg.required - sg.current}% gap</span>
                </div>
                <div className="flex justify-between text-xs text-white/30 mb-1">
                  <span>Current: {sg.current}%</span>
                  <span>Required: {sg.required}%</span>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-white/10 rounded-full" style={{ width: `${sg.required}%` }} />
                  <div className="absolute inset-y-0 left-0 bg-violet-500 rounded-full transition-all" style={{ width: `${sg.current}%` }} />
                </div>
              </div>
            ))}
            <Button onClick={() => nav("learning")} className="mt-4 rounded-xl">
              Find Courses to Close Gaps
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="space-y-3">
            {JOB_ROLES.map((role, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${role.ready ? "bg-green-400" : "bg-white/20"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{role.title}</span>
                    <span className="text-xs text-white/30">at {role.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span>{role.type}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{role.salary}</span>
                    {role.ready && <span className="text-green-400">· Ready to apply</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-violet-400">{role.match}%</div>
                  <div className="text-xs text-white/30">match</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "daily" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Today's Learning Plan</h3>
              <span className="text-sm text-white/30">2/5 completed</span>
            </div>
            {DAILY_TASKS.map((task, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                  task.done ? "border-white/5 bg-white/[0.01] opacity-60" : "border-white/5 bg-white/[0.03]"
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  task.done ? "bg-green-500" : "border-2 border-white/20"
                }`}>
                  {task.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium mb-1 ${task.done ? "line-through text-white/30" : "text-white/80"}`}>
                    {task.task}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <Clock className="w-3 h-3" />
                    <span>{task.time}</span>
                    <span>·</span>
                    <span>{task.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
