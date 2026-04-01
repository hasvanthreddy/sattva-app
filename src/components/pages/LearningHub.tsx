import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, Clock, MapPin, Search, Filter, Play, ExternalLink, Lock, ArrowLeft } from "lucide-react";
import type { Page } from "@/App";

const FREE_COURSES = [
  { id: 1, title: "Complete Python Bootcamp", provider: "freeCodeCamp", duration: "40h", rating: 4.8, students: "2.3M", level: "Beginner", tags: ["Python", "Programming"], relevance: 94, icon: "🐍" },
  { id: 2, title: "DSA in Python — Full Course", provider: "YouTube · CS50", duration: "28h", rating: 4.9, students: "890K", level: "Intermediate", tags: ["DSA", "Algorithms"], relevance: 91, icon: "📊" },
  { id: 3, title: "React — The Complete Guide", provider: "Scrimba (Free)", duration: "22h", rating: 4.7, students: "1.1M", level: "Intermediate", tags: ["React", "Frontend"], relevance: 87, icon: "⚛️" },
  { id: 4, title: "AWS Cloud Practitioner", provider: "AWS Training", duration: "12h", rating: 4.6, students: "450K", level: "Beginner", tags: ["AWS", "Cloud"], relevance: 82, icon: "☁️" },
];

const PREMIUM_COURSES = [
  { id: 1, title: "System Design Interview", provider: "Educative", price: "₹999", duration: "35h", rating: 4.9, students: "320K", level: "Advanced", tags: ["System Design"], relevance: 96, icon: "🏗️" },
  { id: 2, title: "Full Stack Web Dev Bootcamp", provider: "Udemy", price: "₹499", duration: "65h", rating: 4.7, students: "680K", level: "All Levels", tags: ["Full Stack", "React", "Node"], relevance: 89, icon: "🌐" },
  { id: 3, title: "Machine Learning A–Z", provider: "Coursera", price: "₹1,299/mo", duration: "45h", rating: 4.8, students: "925K", level: "Intermediate", tags: ["ML", "Python", "AI"], relevance: 85, icon: "🤖" },
];

const CENTERS = [
  { name: "NIIT Hyderabad", area: "Ameerpet", courses: "Full Stack, Data Science", distance: "2.3 km", rating: 4.5 },
  { name: "APTECH Learning", area: "Kukatpally", courses: "Software Engineering", distance: "4.1 km", rating: 4.3 },
  { name: "Simplilearn Center", area: "Gachibowli", courses: "Cloud, DevOps, DS", distance: "6.8 km", rating: 4.6 },
];

function CourseCard({ course, premium = false }: { course: any; premium?: boolean }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 rounded-2xl p-4 transition-all cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
          {course.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-sm leading-snug">{course.title}</h3>
            <Badge className="text-xs bg-violet-500/10 text-violet-300 border-violet-500/20 flex-shrink-0">
              {course.relevance}% match
            </Badge>
          </div>
          <p className="text-xs text-white/40 mb-2">{course.provider}</p>
          <div className="flex items-center gap-3 text-xs text-white/40 mb-2">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{course.rating}</span>
            <span>{course.students} enrolled</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-white/50">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
        {premium ? (
          <span className="text-sm font-semibold text-emerald-400">{course.price}</span>
        ) : (
          <span className="text-sm font-medium text-green-400">Free</span>
        )}
        <Button size="sm" variant="ghost" className="text-violet-400 hover:text-violet-300 text-xs gap-1 rounded-lg">
          {premium ? <><Lock className="w-3 h-3" />Paid Training</> : <><Play className="w-3 h-3" />Free Training</>}
        </Button>
      </div>
    </div>
  );
}

export function LearningHub({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-8 py-5 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <BookOpen className="w-5 h-5 text-violet-400" />
        <div>
          <h1 className="text-xl font-bold">Learning Hub</h1>
          <p className="text-white/40 text-sm">Curated courses sorted by relevance to your career goals</p>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, skills, providers..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="px-8 py-6">
        <Tabs defaultValue="free">
          <TabsList className="mb-6">
            <TabsTrigger value="free">Free Courses</TabsTrigger>
            <TabsTrigger value="premium">Premium Courses</TabsTrigger>
            <TabsTrigger value="centers">Physical Centers</TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <div className="grid grid-cols-2 gap-3">
              {FREE_COURSES.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid grid-cols-2 gap-3">
              {PREMIUM_COURSES.map((c) => <CourseCard key={c.id} course={c} premium />)}
            </div>
          </TabsContent>

          <TabsContent value="centers">
            <div className="mb-4 text-sm text-white/40">Training centers near you in Hyderabad — sorted by distance</div>
            <div className="space-y-3">
              {CENTERS.map((center, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg flex-shrink-0">🏫</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium">{center.name}</span>
                      <span className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="w-3 h-3" />{center.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{center.area}</span>
                      <span>·</span><span>{center.distance}</span>
                    </div>
                    <p className="text-xs text-white/30 mt-1">{center.courses}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-violet-400 text-xs gap-1 flex-shrink-0 rounded-lg">
                    Find Centers
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
