import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Events from "../components/Events";
import Domains from "../components/Domains";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Events />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
