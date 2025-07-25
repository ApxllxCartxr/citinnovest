import React from "react";
import { Building, Handshake } from "lucide-react";

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

// Import partner logos from the assets directory
import kukaLogo from "../../../assest/spi_link-kuka.png";
import amtzLogo from "../../../assest/Amtz-removebg-preview.png";
import ieeeLogo from "../../../assest/IEEE-removebg-preview.png";
import mrubyLogo from "../../../assest/murby.jpeg";
import meityLogo from "../../../assest/m.jpeg";
import froniusLogo from "../../../assest/Fronius.jpg";
import startupTnLogo from "../../../assest/StartupTN.jpg";
import idealabLogo from "../../../assest/idealab.png";
import ediiLogo from "../../../assest/edii.png";
import aicteLogo from "../../../assest/AICTE.jpg";
import msmeLogo from "../../../assest/MSME.jpg";
import indiaLogo from "../../../assest/StartupIndia.jpg";
import Itnt from "../../../assest/ITNT-logo.jpg";
import bisleriLogo from "../../../assest/bisleri-logo.jpg";

const partners = [
  { name: "KUKA", type: "Technology Partner", logo: kukaLogo },
  { name: "AMTZ", type: "Innovation Partner", logo: amtzLogo },
  { name: "IEEE", type: "Academic Partner", logo: ieeeLogo },
  { name: "Mruby", type: "Development Partner", logo: mrubyLogo },
  { name: "MeitY", type: "Startup Ecosystem Partner", logo: meityLogo },
  { name: "Fronius", type: "Industry Partner", logo: froniusLogo },
  { name: "StartupTN", type: "Startup Ecosystem Partner", logo: startupTnLogo },
  { name: "Idealab", type: "Technology Partner", logo: idealabLogo },
  { name: "EdIIITN", type: "Startup Ecosystem Partner", logo: ediiLogo },
  { name: "AICTE", type: "Startup Ecosystem Partner", logo: aicteLogo },
  { name: "MSME", type: "Startup Ecosystem Partner", logo: msmeLogo },
  { name: "Startup India", type: "Startup Ecosystem Partner", logo: indiaLogo },
  { name: "iTNT", type: "Startup Ecosystem Partner", logo: Itnt },
  { name: "Bisleri", type: "Startup Ecosystem Partner", logo: bisleriLogo },
];

const Partners = () => {
  return (
    <section
      id="partners"
      className="py-20 bg-gradient-to-b from-[#ffffff] via-[#f8f9ff] to-[#f0f4fa] pattern-dots relative overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>

        {/* Animated floating shapes */}
        <div className="floating-shape absolute top-[65%] right-[5%] w-16 h-16 bg-yellow-100/40 rounded-full backdrop-blur-md border border-yellow-200"></div>
        <div className="floating-shape absolute top-[15%] left-[5%] w-24 h-24 bg-purple-100/30 rounded-full backdrop-blur-md border border-purple-200"></div>
        <div className="floating-shape absolute bottom-[10%] left-[20%] w-20 h-20 bg-yellow-100/40 rounded-md rotate-45 backdrop-blur-md border border-yellow-200"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Partners & <span className="text-[#0c0d5f]">Sponsors</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powered by industry leaders who believe in fostering innovation and
            supporting the next generation of tech pioneers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 hover:-translate-y-1"
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 bg-white rounded-xl shadow">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name + " logo"}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <Building className="w-8 h-8 text-blue-400" />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                {partner.name}
              </h3>
              <p className="text-sm text-slate-600 text-center">
                {partner.type}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <Handshake className="w-12 h-12 mr-4" />
            <h3 className="text-2xl md:text-3xl font-bold">
              Join Our Partnership Network
            </h3>
          </div>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-6">
            Be part of India's most innovative hackathon ecosystem. Connect with
            brilliant minds, discover breakthrough technologies, and shape the
            future of tech education.
          </p>
          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-orange-600 transition-all duration-300">
            <span>Partner With Us</span>
            <Building className="w-5 h-5" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Partners;
