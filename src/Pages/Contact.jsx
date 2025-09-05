import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import "../styles/Contact.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, ease: "easeOut", duration: 0.5 },
  }),
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you shortly.");
  };

  const handleBookInspection = () => {
    window.open(
      "https://forms.zohopublic.com/YomaHomes/form/CLIENTREQUESTFORM/formperma/kldSD5KLZE0G2SzS8WQWv4GzPizIMD0KPEqS2LP_Evc",
      "_blank"
    );
  };

  return (
    <motion.main
      className="contact-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Page Heading */}
      <motion.h1
        className="page-title"
        variants={fadeUp}
        custom={0}
        tabIndex={-1}
      >
        Contact
      </motion.h1>

      {/* Info + Form Section */}
      <motion.section className="info-form-section" variants={fadeUp} custom={1}>
        <h2 className="section-subtitle info-text">
          For more information about our services, get in touch with our expert
          consultants. We're always eager to hear from you!
        </h2>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="contact-form"
          variants={fadeUp}
          custom={2}
        >
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            aria-label="First Name"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            aria-label="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Your Email"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            aria-label="Your Phone"
            required
            pattern="^\+?\d{7,15}$"
            title="Enter a valid phone number"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            aria-label="Subject"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            aria-label="Message"
            required
          ></textarea>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send Message"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Book Inspection Button */}
        <motion.button
          className="book-inspection-btn"
          onClick={handleBookInspection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Book an Inspection"
        >
          Book Inspection
        </motion.button>
      </motion.section>

      {/* Visit Office Section */}
      <motion.section
        className="visit-office-section"
        variants={fadeUp}
        custom={3}
      >
        <h2 className="section-subtitle">Visit our office</h2>
        <span className="office-address" aria-label="Office address">
          <FaMapMarkerAlt color="#d4af37" aria-hidden="true" />
          123 Luxury Estate Avenue, Abuja, Nigeria
        </span>

        <div className="map-container" aria-label="Office location on map">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.352828593085!2d7.513756715297146!3d9.066839892892993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a0a8c26a3e3%3A0x2f5b362e1d7c448f!2sAbuja%20Nigeria!5e0!3m2!1sen!2sus!4v1691669624000!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="contact-details">
          <div className="contact-info">
            <h3>Contact</h3>
            <p>
              <FaEnvelope color="#d4af37" aria-hidden="true" />{" "}
              <a href="mailto:info@yomahomes.com" tabIndex={0}>
                info@yomahomes.com
              </a>
            </p>
            <p>
              <FaPhoneAlt color="#d4af37" aria-hidden="true" />{" "}
              <a href="tel:+2348012345678" tabIndex={0}>
                +234 801 234 5678
              </a>
            </p>
          </div>

          <div className="hours-info">
            <h3>Hours of Operation</h3>
            <p>
              <FaClock color="#d4af37" aria-hidden="true" /> Mon - Fri: 9:00 AM -
              6:00 PM
            </p>
            <p>
              <FaClock color="#d4af37" aria-hidden="true" /> Sat: 10:00 AM - 3:00
              PM
            </p>
            <p>
              <FaClock color="#d4af37" aria-hidden="true" /> Sun: Closed
            </p>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Contact;
