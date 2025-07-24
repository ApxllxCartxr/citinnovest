import { useState, useEffect, useRef } from "react";
import {
  Target,
  Lightbulb,
  Users,
  Award,
  Menu,
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Rocket,
} from "lucide-react";

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
  const [animatedStats, setAnimatedStats] = useState({
    funding: 0,
    partnerships: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description:
        "To create a platform where innovative ideas meet strategic investments, fostering the next generation of breakthrough technologies and sustainable solutions.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Focus",
      description:
        "Showcasing cutting-edge technologies in AI, IoT, Blockchain, Sustainable Energy, and emerging tech sectors that will shape our future.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Networking Hub",
      description:
        "Connect with industry leaders, successful entrepreneurs, venture capitalists, and fellow innovators in an environment designed for meaningful collaborations.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Recognition Platform",
      description:
        "Celebrate and reward outstanding innovations through our prestigious awards program, recognizing excellence across multiple categories.",
      color: "from-pink-500 to-red-600",
    },
  ];

  const events = [
    {
      title: "Opening Ceremony",
      time: "9:00 AM - 10:00 AM",
      location: "Main Auditorium",
      date: "March 15, 2025",
      icon: <Rocket className="h-4 w-4" />,
    },
    {
      title: "Startup Pitch Competition",
      time: "10:30 AM - 12:30 PM",
      location: "Innovation Hall",
      date: "March 15, 2025",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      title: "Investor Panel Discussion",
      time: "2:00 PM - 3:30 PM",
      location: "Conference Room A",
      date: "March 15, 2025",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Technology Showcase",
      time: "4:00 PM - 6:00 PM",
      location: "Exhibition Center",
      date: "March 15, 2025",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      title: "Networking Dinner",
      time: "7:00 PM - 9:00 PM",
      location: "Grand Ballroom",
      date: "March 15, 2025",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "AI & Machine Learning Workshop",
      time: "9:00 AM - 11:00 AM",
      location: "Tech Lab 1",
      date: "March 16, 2025",
      icon: <Target className="h-4 w-4" />,
    },
    {
      title: "Blockchain Summit",
      time: "11:30 AM - 1:00 PM",
      location: "Innovation Hall",
      date: "March 16, 2025",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      title: "Awards Ceremony",
      time: "6:00 PM - 8:00 PM",
      location: "Main Auditorium",
      date: "March 16, 2025",
      icon: <Award className="h-4 w-4" />,
    },
  ];

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counter for statistics
  const animateValue = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void,
  ) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === aboutRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === featuresRef.current && entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 300);
            });
          }
          if (entry.target === statsRef.current && entry.isIntersecting) {
            // Animate statistics
            setTimeout(() => {
              animateValue(0, 10, 2000, (value) => {
                setAnimatedStats((prev) => ({ ...prev, funding: value }));
              });
            }, 500);
            setTimeout(() => {
              animateValue(0, 200, 2500, (value) => {
                setAnimatedStats((prev) => ({ ...prev, partnerships: value }));
              });
            }, 800);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Animated Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-spin-slow blur-2xl"></div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse delay-1000"></div>
        </div>

        {/* Interactive Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-orange-100 to-transparent rounded-full opacity-20 pointer-events-none transition-all duration-1000 ease-out blur-2xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        aria-label="Toggle events menu"
      >
        <div className="relative">
          {isMenuOpen ? (
            <X className="h-6 w-6 animate-in spin-in-180 duration-300" />
          ) : (
            <Menu className="h-6 w-6 animate-in fade-in duration-300 group-hover:rotate-180 transition-transform duration-500" />
          )}
        </div>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping"></div>
      </button>

      {/* Events Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in duration-300 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Events Menu */}
          <div className="fixed top-20 right-6 w-80 max-h-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-right-5 duration-500 border border-orange-100">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-50 animate-pulse"></div>
              <h3 className="text-lg font-bold flex items-center animate-in slide-in-from-left-3 duration-500 relative z-10">
                <Calendar className="h-5 w-5 mr-2 animate-bounce" />
                <span className="animate-in fade-in duration-700 delay-300">
                  Event Schedule
                </span>
              </h3>
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 transform hover:translate-x-2 animate-in slide-in-from-right-3 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-orange-500 mt-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors duration-200 group-hover:animate-pulse">
                        {event.title}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center group/item">
                          <Clock className="h-4 w-4 mr-2 text-orange-500 group-hover/item:animate-spin transition-transform duration-300" />
                          <span className="group-hover:text-orange-600 transition-colors duration-200">
                            {event.time}
                          </span>
                        </div>
                        <div className="flex items-center group/item">
                          <MapPin className="h-4 w-4 mr-2 text-orange-500 group-hover/item:animate-bounce transition-transform duration-300" />
                          <span className="group-hover:text-orange-600 transition-colors duration-200">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center group/item">
                          <Calendar className="h-4 w-4 mr-2 text-orange-500 group-hover/item:animate-pulse transition-transform duration-300" />
                          <span className="group-hover:text-orange-600 transition-colors duration-200">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-gray-50 to-orange-50 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <button className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-all duration-300 hover:scale-105 transform relative z-10 group">
                <span className="group-hover:animate-pulse">
                  View Full Schedule
                </span>
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={aboutRef}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-in slide-in-from-top duration-800">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative animate-gradient-x">
              Chennai Innovation and Incubation Cell
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 transform scale-x-0 animate-in slide-in-from-left duration-1000 delay-500 animate-gradient-x"></div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-orange-400 animate-spin-slow" />
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 transform scale-x-0 animate-in slide-in-from-left duration-800 delay-300 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-700">
            <span className="animate-in slide-in-from-left duration-800 delay-800 inline-block">
              The Chennai Innovation and Incubation Cell aims to foster
              entrepreneurship among students, faculty, and young technocrats.
              Located on campus, it leverages existing resources like labs,
              workshops, internet, library, and expert human capital.
              The cell also connects incubates with a strong network of
              professionals, academicians, investors, and an advisory board to
              support and guide innovative ventures.
            </span>
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center mb-20 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 animate-in slide-in-from-left duration-800 delay-500 relative">
              <span className="relative z-10">Innovest offers</span>
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 transform scale-y-0 animate-in slide-in-from-top duration-1000 delay-700 origin-top"></div>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed animate-in slide-in-from-left duration-800 delay-700 hover:text-gray-800 transition-colors duration-300">
              Since its inception, Innovest has been at the forefront of
              fostering innovation and facilitating meaningful connections
              between entrepreneurs and investors. Our summit serves as a
              catalyst for groundbreaking collaborations that drive
              technological advancement and economic growth.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-in slide-in-from-left duration-800 delay-900 hover:text-gray-800 transition-colors duration-300">
              This year, we're expanding our focus to include sustainable
              technologies, digital transformation, and emerging markets,
              ensuring that innovation serves not just business interests but
              also contributes to a better, more sustainable future for all.
            </p>

            {/* Key Statistics */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-in slide-in-from-bottom duration-800 delay-1000 group border border-orange-100">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 animate-in zoom-in duration-600 delay-1200 group-hover:animate-pulse">
                  ₹{animatedStats.funding}Cr+
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  Total Funding Facilitated
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-in slide-in-from-bottom duration-800 delay-1100 group border border-green-100">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2 animate-in zoom-in duration-600 delay-1300 group-hover:animate-pulse">
                  {animatedStats.partnerships}+
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  Successful Partnerships
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-1000 delay-600">
            <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 relative overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-5 rounded-full animate-ping group-hover:animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400 opacity-10 rounded-full animate-pulse group-hover:animate-bounce"></div>

              <h4 className="text-2xl font-bold mb-6 animate-in slide-in-from-top duration-600 delay-800 relative z-10 group-hover:text-orange-200 transition-colors duration-300">
                Why Attend Innovest 2025?
                <Zap className="inline-block ml-2 h-6 w-6 text-orange-400 animate-pulse" />
              </h4>
              <ul className="space-y-4 relative z-10">
                {[
                  "Access to exclusive investor networks and funding opportunities",
                  "Learn from industry leaders and successful entrepreneurs",
                  "Showcase your innovations to a global audience",
                  "Network with like-minded innovators and thought leaders",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 animate-in slide-in-from-left duration-600 group/item hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${1000 + index * 200}ms` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 flex-shrink-0 animate-pulse group-hover/item:animate-bounce"></div>
                    <span className="hover:text-orange-200 transition-colors duration-300 group-hover/item:font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 group relative overflow-hidden border border-gray-100 ${
                visibleFeatures[index]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 300}ms`,
              }}
            >
              {/* Animated background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-300 transition-all duration-500">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`text-orange-500 mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 group-hover:bg-opacity-20`}
                >
                  {feature.icon}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl animate-ping"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 group-hover:animate-pulse">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                      animationDelay: `${i * 200}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default About;
