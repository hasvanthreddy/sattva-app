import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, Clock, Search, Play, Lock, ExternalLink, ArrowLeft } from "lucide-react";
import type { Page } from "@/App";

const FREE_COURSES = [
  { id: 1, icon: "🐍", title: "Complete Python Bootcamp", provider: "freeCodeCamp", duration: "40h", rating: 4.8, students: "2.3M", level: "Beginner", tags: ["Python", "Programming"], match: 94 },
  { id: 2, icon: "📊", title: "DSA in Python — Full Course", provider: "YouTube · CS50", duration: "28h", rating: 4.9, students: "890K", level: "Intermediate", tags: ["DSA", "Algorithms"], match: 91 },
  { id: 3, icon: "⚛️", title: "React — The Complete Guide", provider: "Scrimba (Free)", duration: "22h", rating: 4.7, students: "1.1M", level: "Intermediate", tags: ["React", "Frontend"], match: 87 },
  { id: 4, icon: "☁️", title: "AWS Cloud Practitioner", provider: "AWS Training", duration: "12h", rating: 4.6, students: "450K", level: "Beginner", tags: ["AWS", "Cloud"], match: 82 },
  { id: 5, icon: "🗃️", title: "SQL for Beginners", provider: "SQLiteOnline", duration: "8h", rating: 4.7, students: "680K", level: "Beginner", tags: ["SQL", "Databases"], match: 78 },
];

const PREMIUM_COURSES = [
  { id: 1, icon: "🏗️", title: "System Design Interview", provider: "Educative", price: "₹999", duration: "35h", rating: 4.9, students: "320K", level: "Advanced", tags: ["System Design"], match: 96 },
  { id: 2, icon: "🌐", title: "Full Stack Web Dev Bootcamp", provider: "Udemy", price: "₹499", duration: "65h", rating: 4.7, students: "680K", level: "All Levels", tags: ["Full Stack", "React"], match: 89 },
  { id: 3, icon: "🤖", title: "Machine Learning A–Z", provider: "Coursera", price: "₹1,299/mo", duration: "45h", rating: 4.8, students: "925K", level: "Intermediate", tags: ["ML", "Python"], match: 85 },
  { id: 4, icon: "🔐", title: "Complete Ethical Hacking", provider: "Udemy", price: "₹399", duration: "32h", rating: 4.6, students: "520K", level: "Beginner", tags: ["Security", "Networking"], match: 74 },
];

function CourseCard({ course, premium = false }: { course: any; premium?: boolean }) {
  return (
    <div className="glass-panel rounded-2xl p-4 hover:bg-white/[0.06] transition-all cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">{course.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-medium text-sm leading-snug">{course.title}</h3>
            <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full flex-shrink-0">{course.match}%</span>
          </div>
          <p className="text-xs text-white/35 mb-2">{course.provider}</p>
          <div className="flex items-center gap-3 text-xs text-white/35 mb-2">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{course.rating}</span>
            <span>{course.students} enrolled</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.tags.map((t: string) => (
              <span key={t} className="text-xs bg-white/5 border border-white/8 px-2 py-0.5 rounded-full text-white/45">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        {premium
          ? <span className="text-sm font-semibold text-emerald-400">{course.price}</span>
          : <span className="text-sm font-medium text-green-400">Free</span>
        }
        <Button size="sm" variant="ghost" className="text-purple-400 text-xs gap-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {premium ? <><Lock className="w-3 h-3" />Enroll</> : <><Play className="w-3 h-3" />Start Free</>}
        </Button>
      </div>
    </div>
  );
}

export function Courses({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <BookOpen className="w-5 h-5 text-purple-400" />
        <div>
          <h1 className="text-base font-bold">Courses</h1>
          <p className="text-xs text-white/35">Curated courses sorted by relevance to your career</p>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="pl-9" />
        </div>
      </div>

      <div className="px-6 py-5">
        <Tabs defaultValue="free">
          <TabsList className="mb-5">
            <TabsTrigger value="free">Free Courses</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <div className="grid grid-cols-2 gap-3">
              {FREE_COURSES.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map(c => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid grid-cols-2 gap-3">
              {PREMIUM_COURSES.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map(c => (
                <CourseCard key={c.id} course={c} premium />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
