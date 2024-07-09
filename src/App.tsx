import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/Herosection';
import ServicesSection from './components/ServiceSection/Service';
import ContactSection from './components/Contact/Contact';
import WhyChoose from './components/WhyChooseUs/choose';
import './App.scss';
import About from './components/AboutUs/About';
import SignIn from './components/Registration/LoginForm'; // Import your SignIn component
import SignUp from './components/Registration/RegisterForm'; // Import your SignUp component
// import AdminDashboard from './components/Dashboard/AdminDashboard'; // Import your AdminDashboard component
// import UserDashboard from './components/Dashboard/UserDashboard'; // Import your UserDashboard component
// import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component

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
          {/* <Footer /> */}
        </>} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
