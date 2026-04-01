import { useState } from "react";
import { LandingPage } from "./components/pages/LandingPage";
import { CareerAssessment } from "./components/pages/CareerAssessment";
import { CareerMatches } from "./components/pages/CareerMatches";
import { CareerProfile } from "./components/pages/CareerProfile";
import { CareerRoadmap } from "./components/pages/CareerRoadmap";
import { ResumeIntelligence } from "./components/pages/ResumeIntelligence";
import { LearningHub } from "./components/pages/LearningHub";
import { AIMentorChat } from "./components/pages/AIMentorChat";

export type Page =
  | "home"
  | "assessment"
  | "matches"
  | "profile"
  | "roadmap"
  | "resume"
  | "learning"
  | "mentor";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => setPage(p);

  switch (page) {
    case "home":
      return <LandingPage nav={nav} />;
    case "assessment":
      return <CareerAssessment nav={nav} />;
    case "matches":
      return <CareerMatches nav={nav} />;
    case "profile":
      return <CareerProfile nav={nav} />;
    case "roadmap":
      return <CareerRoadmap nav={nav} />;
    case "resume":
      return <ResumeIntelligence nav={nav} />;
    case "learning":
      return <LearningHub nav={nav} />;
    case "mentor":
      return <AIMentorChat nav={nav} />;
    default:
      return <LandingPage nav={nav} />;
  }
}
