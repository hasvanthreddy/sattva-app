import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Star, Phone, Globe, Search, ArrowLeft, ChevronRight } from "lucide-react";
import type { Page } from "@/App";

const CENTERS = [
  {
    id: 1, name: "NIIT Hyderabad — Ameerpet", area: "Ameerpet, Hyderabad",
    courses: ["Full Stack Development", "Data Science", "Cloud Computing"],
    distance: "2.3 km", rating: 4.5, reviews: 312, phone: "+91 40 2340 1234",
    website: "niit.com", hours: "Mon–Sat 9AM–7PM", fee: "₹45,000–₹90,000",
    badge: "Top Rated",
  },
  {
    id: 2, name: "APTECH Learning — Kukatpally", area: "Kukatpally, Hyderabad",
    courses: ["Software Engineering", "Digital Marketing", "Python Programming"],
    distance: "4.1 km", rating: 4.3, reviews: 205, phone: "+91 40 2312 5678",
    website: "aptech.in", hours: "Mon–Sat 9AM–8PM", fee: "₹30,000–₹70,000",
    badge: null,
  },
  {
    id: 3, name: "Simplilearn Center — Gachibowli", area: "Gachibowli, Hyderabad",
    courses: ["Cloud & DevOps", "Data Science", "Cybersecurity"],
    distance: "6.8 km", rating: 4.6, reviews: 428, phone: "+91 40 2987 3456",
    website: "simplilearn.com", hours: "Mon–Sun 8AM–9PM", fee: "₹60,000–₹1,20,000",
    badge: "Premium",
  },
  {
    id: 4, name: "Jspiders Training — SR Nagar", area: "SR Nagar, Hyderabad",
    courses: ["Java Full Stack", "Python Full Stack", "Testing & QA"],
    distance: "3.5 km", rating: 4.4, reviews: 187, phone: "+91 40 2355 7890",
    website: "jspiders.com", hours: "Mon–Sat 8AM–8PM", fee: "₹25,000–₹55,000",
    badge: null,
  },
  {
    id: 5, name: "Naresh IT — Ameerpet", area: "Ameerpet, Hyderabad",
    courses: ["AWS DevOps", "Full Stack React", "Machine Learning"],
    distance: "2.7 km", rating: 4.2, reviews: 142, phone: "+91 40 2340 9876",
    website: "nareshit.in", hours: "Mon–Sat 7AM–9PM", fee: "₹20,000–₹50,000",
    badge: null,
  },
];

export function Centers({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = CENTERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.courses.some(course => course.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => nav("home")} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Building2 className="w-5 h-5 text-purple-400" />
        <div>
          <h1 className="text-base font-bold">Training Centers</h1>
          <p className="text-xs text-white/35">Physical learning centers near you — sorted by distance</p>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search centers or courses..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
          <MapPin className="w-3.5 h-3.5 text-purple-400" />
          Hyderabad
        </div>
      </div>

      <div className="px-6 py-5 space-y-3">
        {filtered.map(center => (
          <div
            key={center.id}
            className={`rounded-2xl border transition-all cursor-pointer ${
              selected === center.id
                ? "border-purple-500/30 bg-purple-500/[0.04]"
                : "border-white/5 glass-panel hover:border-white/10"
            }`}
            onClick={() => setSelected(selected === center.id ? null : center.id)}
          >
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-lg">🏫</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-sm">{center.name}</span>
                  {center.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {center.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/35 mb-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{center.area}</span>
                  <span>·</span>
                  <span className="text-purple-400">{center.distance}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{center.rating} ({center.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {center.courses.map(c => (
                    <span key={c} className="text-xs bg-white/5 border border-white/8 px-2 py-0.5 rounded-full text-white/45">{c}</span>
                  ))}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-white/25 flex-shrink-0 mt-1 transition-transform ${selected === center.id ? "rotate-90" : ""}`} />
            </div>

            {selected === center.id && (
              <div className="px-4 pb-4 border-t border-white/5 pt-3">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Timings", value: center.hours },
                    { label: "Fee Range", value: center.fee },
                    { label: "Distance", value: center.distance },
                  ].map(item => (
                    <div key={item.label} className="bg-white/[0.03] rounded-xl p-3">
                      <div className="text-xs text-white/30 mb-1">{item.label}</div>
                      <div className="text-sm font-medium text-white/80">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-lg text-xs bg-gradient-to-r from-purple-600 to-blue-600 gap-1.5">
                    <Phone className="w-3 h-3" />
                    {center.phone}
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-lg text-xs text-white/35 gap-1.5">
                    <Globe className="w-3 h-3" />
                    {center.website}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
