
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/Herosection';
import ServicesSection from './components/ServiceSection/Service';
import ContactSection from './components/Contact/Contact';
import WhyChoose from './components/WhyChooseUs/choose';
import About from './components/AboutUs/About';
import SignIn from './components/Registration/LoginForm';
import SignUp from './components/Registration/RegisterForm';
import DashboardLayout from './components/DashBoards/UserDashBoard/UserDashBoardLayout';

import Dashboard from './components/DashBoards/UserDashBoard/Dashboard';
import BookVehicle from './components/DashBoards/UserDashBoard/bookedvehicles';
import BookedVehicles from './components/DashBoards/UserDashBoard/BookTheVehicles';
import MyTickets from './components/DashBoards/UserDashBoard/Mytickets';
import NewTicket from './components/DashBoards/UserDashBoard/NewTicket';
import ManageVehicles from './components/DashBoards/AdminDashBoard/managevehicle';
import ManageUsers from './components/DashBoards/AdminDashBoard/manageuser';
import Reports from './components/DashBoards/AdminDashBoard/reports';
import Locations from './components/DashBoards/AdminDashBoard/location';
import CustomerSupportTickets from './components/DashBoards/AdminDashBoard/customersupporttickets';
import FleetManagement from './components/DashBoards/AdminDashBoard/FleetManagement';
import Footer from './components/Footer/Footer';
import AdminDashboardLayout from './components/DashBoards/AdminDashBoard/admin.dash';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <About />
            <WhyChoose />
            <ServicesSection />
            <ContactSection />
            <Footer />
          </>
        } />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/dashboard/*" element={
          <DashboardLayout>
            <Routes> 
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="book-vehicle" element={<BookVehicle />} />
            <Route path="booked-vehicles" element={<BookedVehicles />} />
            <Route path="my-tickets" element={<MyTickets />} />
            <Route path="new-ticket" element={<NewTicket />} />
            </Routes>
          </DashboardLayout>
        } />
        <Route path="/admin/dashboard/*" element={
     
          <AdminDashboardLayout>
                 <Routes>
            <Route index element={<ManageVehicles />} />
            <Route path="manage-vehicles" element={<ManageVehicles />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="locations" element={<Locations />} />
            <Route path="support-tickets" element={<CustomerSupportTickets />} />
            <Route path="fleet-management" element={<FleetManagement />} />
            </Routes>
          </AdminDashboardLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
