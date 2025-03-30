import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard";
import Profile from "../pages/Profile";
import ContestDetails from "../components/ContestDetails";
import AdminContest from "../pages/AdminContest";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// ✅ Handles Navbar color change & layout management
const MainLayout = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar isScrolled={isScrolled} isHome={location.pathname === "/"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="/admin" element={<AdminContest />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
