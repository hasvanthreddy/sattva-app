import { useState } from "react";
import { LandingPage } from "./components/pages/LandingPage";
import { CareerAssessment } from "./components/pages/CareerAssessment";
import { Careers } from "./components/pages/Careers";
import { CareerRoadmap } from "./components/pages/CareerRoadmap";
import { ResumeIntelligence } from "./components/pages/ResumeIntelligence";
import { Courses } from "./components/pages/Courses";
import { Centers } from "./components/pages/Centers";
import { SattvaChat } from "./components/pages/SattvaChat";

export type Page =
  | "home"
  | "assessment"
  | "careers"
  | "roadmap"
  | "resume"
  | "courses"
  | "centers"
  | "sattva";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const nav = (p: Page) => { setPage(p); window.scrollTo(0, 0); };

  switch (page) {
    case "home":       return <LandingPage nav={nav} />;
    case "assessment": return <CareerAssessment nav={nav} />;
    case "careers":    return <Careers nav={nav} />;
    case "roadmap":    return <CareerRoadmap nav={nav} />;
    case "resume":     return <ResumeIntelligence nav={nav} />;
    case "courses":    return <Courses nav={nav} />;
    case "centers":    return <Centers nav={nav} />;
    case "sattva":     return <SattvaChat nav={nav} />;
    default:           return <LandingPage nav={nav} />;
  }
}
