import React from "react";
import { Clock, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";

const Schedule = () => {
  const maxEvents = 5; // max events in any day for balance

  const days = [
    {
      date: "August 18, 2025",
      day: "Day 1",
      theme: "IgniteX",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Inauguration Ceremony",
          speaker:
            "Thirumathi Kalai Selvi Mohan (Kanchipuram Collector), MR Sivarajah Ramanathan",
          venue: "Main Lobby",
        },
        {
          time: "10:00 - 15:00",
          title: "Pitchathon",
          venue: "Main Auditorium",
        },
        {
          time: "14:00 - 15:00",
          title: "Student Project Showcase",
          venue: "Innovation Theater",
        },
      ],
    },
    {
      date: "August 19, 2025",
      day: "Day 2",
      theme: "Deep Sprint 2025",
      events: [
        {
          time: "08:00 - 08:30",
          title: "Hackathon Inauguration",
          speaker: "MRS. Selevarani (IIC), MR Ravikumar (MSME)",
          venue: "Main Auditorium",
        },
        {
          time: "08:30 - 11:00",
          title: "Round Judgement - 1",
          venue: "Workshop Room B",
        },
        {
          time: "11:00 - 13:00",
          title: "Round Judgement - 2",
          venue: "Exhibition Hall",
        },
        {
          time: "13:00 - 15:00",
          title: "Pitching Session",
          venue: "Fireside Lounge",
        },
      ],
    },
    {
      date: "August 20, 2025",
      day: "Day 3",
      theme: "Innovation Drive",
      events: [
        {
          time: "10:00 - 11:00",
          title: "Product Showcase",
          speaker:
            "MR Anand (IIC), MR R. Ambalavenan (IA & AS Director of EDII)",
          venue: "Tech Theater",
        },
        {
          time: "11:30 - 12:30",
          title: "Demo Day",
          venue: "Sustainability Hub",
        },
        {
          time: "14:00 - 15:00",
          title: "CITIL Innovation Drive",
          venue: "Main Auditorium",
        },
        {
          time: "15:30 - 16:30",
          title: "Innovation Grant Challenge",
          venue: "Grand Ballroom",
        },
        {
          time: "17:00 - 18:00",
          title: "Closing Ceremony",
          venue: "Main Auditorium",
        },
      ],
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Event Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three days packed with inspiring sessions, networking, and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {days.map((day, index) => {
            const paddedEvents = [...day.events];
            while (paddedEvents.length < maxEvents) {
              paddedEvents.push(null); // fill remaining with placeholders
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white rounded-t-2xl relative">
                  <h3 className="text-2xl font-bold mb-1">{day.day}</h3>
                  <p className="text-sm text-blue-100 mb-1">{day.date}</p>
                  <p className="text-orange-300 text-sm font-medium">
                    {day.theme}
                  </p>
                </div>

                <div className="flex-1 p-6 space-y-6">
                  {paddedEvents.map((event, idx) =>
                    event ? (
                      <div
                        key={idx}
                        className="border-l-4 border-yellow-400 pl-4 hover:bg-gray-50 transition duration-200 p-2 rounded-r-xl"
                      >
                        <div className="flex items-center text-sm text-blue-600 mb-1">
                          <Clock size={16} className="mr-2" />
                          {event.time}
                        </div>
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        {event.speaker && (
                          <div className="flex items-center text-sm text-purple-600">
                            <User size={16} className="mr-2" />
                            {event.speaker}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={16} className="mr-2" />
                          {event.venue}
                        </div>
                      </div>
                    ) : (
                      // Empty placeholder to maintain height balance
                      <div key={idx} className="invisible h-[80px]" />
                    )
                  )}
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => console.log(`Register for ${day.day}`)}
                    className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                  >
                    Register for {day.day}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
