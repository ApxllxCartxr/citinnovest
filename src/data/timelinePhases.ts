import { FileText, Filter, Video, CheckCircle, Trophy } from "lucide-react";
import { TimelinePhase } from "../components/InnovestHack/Timeline";

export const timelinePhases: TimelinePhase[] = [
  {
    icon: FileText,
    title: "Registration Opens",
    description:
      "Submit team details along with chosen domain, problem statement, and proposed solution.",
    color: "from-blue-500 to-blue-600",
    date: "19/7/2025",
  },
  {
    icon: Filter,
    title: "Preliminary Shortlisting",
    description:
      "Top 100 entries will be selected based on identified problem , proposed solution , clarity, relevance, and innovation.",
    color: "from-purple-500 to-purple-600",
    date: "5/8/2025",
  },
  {
    icon: Video,
    title: "Online Review Round",
    description:
      "Selected ideas go through expert online screening and mentoring.",
    color: "from-green-500 to-green-600",
    date: "6/8/2025 11/8/2025",
  },
  {
    icon: CheckCircle,
    title: "Final Selection",
    description:
      "Around 30 top teams will be chosen for on-site hackathon participation.",
    color: "from-orange-500 to-orange-600",
    date: "12/8/2025",
  },
  {
    icon: Trophy,
    title: "Hackathon Day",
    description: "1-day onsite event at Chennai Institute of Technology.",
    color: "from-red-500 to-red-600",
    date: "19/8/2025",
  },
];
