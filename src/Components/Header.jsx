import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../Components/Styles/Header.css";
import LogoImage from "../Assets/logo-image.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRefs = useRef({});

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Contact", path: "/contact" },
  ];

  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 });

  // Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Update active tab indicator
  useEffect(() => {
    const currentLink = navRefs.current[location.pathname];
    if (currentLink) {
      const { offsetLeft, offsetWidth } = currentLink;
      setIndicatorProps({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname, navRefs.current]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img
            src={LogoImage}
            alt="Logo"
            className={`logo-image ${scrolled ? "shrink" : ""}`}
          />
          <div className="logo-text">
            <h1 className="logo">YomaHomes</h1>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                ref={(el) => (navRefs.current[link.path] = el)}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Gold animated underline */}
          <motion.div
            className="active-indicator"
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            animate={indicatorProps}
          />
        </ul>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>

      {/* Mobile Nav */}
      <ul className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;














// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import "../styles/Header.css";

// const Header = () => {
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     setMenuOpen(false); // Close menu on route change
//   }, [location]);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Properties", path: "/properties" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header className="header">
//       <motion.div
//         className="logo-container"
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <span className="title">YomaHomes</span>
//       </motion.div>

//       <nav className={`nav ${menuOpen ? "open" : ""}`}>
//         {navLinks.map((link, i) => (
//           <motion.div
//             key={link.name}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * i }}
//           >
//             <Link
//               to={link.path}
//               className={`nav-link ${
//                 location.pathname === link.path ? "active" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           </motion.div>
//         ))}
//       </nav>

//       <div
//         className={`hamburger ${menuOpen ? "open" : ""}`}
//         onClick={() => setMenuOpen((prev) => !prev)}
//       >
//         <span />
//         <span />
//         <span />
//       </div>
//     </header>
//   );
// };

// export default Header;
