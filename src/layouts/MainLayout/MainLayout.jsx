import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { BackToTop } from "./index";

export default function MainLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Reset scroll position when location changes (page transition)
    window.scrollTo(0, 0);
  }, [location]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header />

      <Outlet />

      <Footer />

      {showBackToTop && (
        <BackToTop onClick={handleBackToTop} className="back-to-top-button">
          <ExpandLessIcon sx={{ fontSize: "80px" }} />
        </BackToTop>
      )}
    </div>
  );
}
