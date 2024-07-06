
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/Herosection';
import ServicesSection from './components/ServiceSection/Service';
import ContactSection from './components/Contact/Contact';
import WhyChoose from './components/WhyChooseUs/choose';
import './App.scss';
import About from './components/AboutUs/About';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<>
          <HeroSection />
          <About />
          <WhyChoose />
          <ServicesSection />
          <ContactSection />
        
        </>} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Router>
  );
};

export default App;
