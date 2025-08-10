import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../Components/Styles/Footer.css";
import LogoImage from "../Assets/logo-image.png";

const Footer = () => {
  const navigate = useNavigate();

  const handlePopularSearchClick = (type) => {
    navigate("/properties", { state: { scrollToTop: true, filter: type } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.17, 0.67, 0.83, 0.67], // bounce ease
      }}
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="footer-container">
        {/* Left Section: Logo & Contact Info */}
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src={LogoImage} alt="Logo" className="footer-logo" />
            <h2>YomaHomes</h2>
          </div>
          <div className="footer-contact-info">
            <p>123 Yoma Street, Lagos, Nigeria</p>
            <p>+234 800 123 4567</p>
            <p>support@yomahomes.com</p>
          </div>
        </div>

        {/* Middle: Popular Searches & Quick Links */}
        <div className="footer-middle">
          <div className="footer-section">
            <h3>Popular Searches</h3>
            <ul>
              <li>
                <button onClick={() => handlePopularSearchClick("rent")}>
                  House for Rent
                </button>
              </li>
              <li>
                <button onClick={() => handlePopularSearchClick("sale")}>
                  House for Sale
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Right: Newsletter */}
        <div className="footer-newsletter">
          <h3>Sign Up for Our Newsletter</h3>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>

          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YomaHomes. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
