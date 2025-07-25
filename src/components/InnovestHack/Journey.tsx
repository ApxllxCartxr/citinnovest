import React from "react";
import { FileText, Filter, Video, CheckCircle, Trophy } from "lucide-react";

// Animation styles
const animationStyles = `
  .pattern-dots {
    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 2px);
    background-size: 30px 30px;
  }
  
  .floating-shape {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Journey = () => {
  const phases = [
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

  return (
    <section
      id="journey"
      className="py-20 bg-gradient-to-b from-[#f0f4fa] via-[#f8f9ff] to-[#ffffff] pattern-dots relative overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>

        {/* Animated floating shapes */}
        <div className="floating-shape absolute top-[15%] left-[10%] w-16 h-16 bg-yellow-100/40 rounded-full backdrop-blur-md border border-yellow-200"></div>
        <div className="floating-shape absolute top-[25%] right-[15%] w-24 h-24 bg-purple-100/30 rounded-full backdrop-blur-md border border-purple-200"></div>
        <div className="floating-shape absolute bottom-[30%] left-[20%] w-20 h-20 bg-yellow-100/40 rounded-md rotate-45 backdrop-blur-md border border-yellow-200"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Hackathon <span className="text-[#0c0d5f]">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From idea to implementation - follow the complete journey to
            InnovestHack 2025. Each step is designed to refine your concept and
            prepare you for the ultimate challenge.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full hidden md:block -z-10"></div>

          {phases.map((phase, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0
                    ? "md:text-right md:pr-8"
                    : "md:text-left md:pl-8"
                }`}
              >
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>

              {/* Centered and styled date for desktop and mobile */}
              <div className="w-2/12 flex flex-col items-center justify-center">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold text-base md:text-lg px-4 py-2 rounded-xl shadow-lg border-2 border-yellow-300 md:my-0 my-4 text-center animate-pulse">
                  {phase.date}
                </div>
                {/* Timeline icon for desktop */}
                <div className="hidden md:flex mt-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <phase.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                {/* Timeline icon for mobile */}
                <div className="md:hidden w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg mt-4">
                  <phase.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="w-full md:w-5/12"></div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            🚀 Ready to Begin Your Journey?
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            The path to innovation starts with a single step. Join us in
            building the future, one breakthrough at a time.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Journey;
