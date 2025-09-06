import React, { useRef, useEffect } from 'react';
import '../styles/About.css';
import CEOImage from '../Assets/Pic.JPG';
const TeamPage = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 280;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="team-container">
      {/* Top Banner Section */}
      <section className="banner-section">
        <div className="banner-overlay">
          <h1>About Us</h1>
          <p>Connecting people to their dream homes in Abuja.</p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content">
        <div className="about-wrapper">
          <p>
            At <strong>Yoma Homes Nig. Ltd.</strong>, we don’t just sell houses — we connect people to their dream homes. 
            Based in the heart of Abuja, we are a customer-centric real estate company driven by integrity, professionalism, and results.
          </p>
          <p>
            <strong>Our mission:</strong> To help you find the keys to the lifestyle you deserve. Whether you’re buying your first home, investing in property, or seeking expert property management, 
            Yoma Homes ensures every step of your journey is seamless and stress-free.
          </p>

          <h3>Our Vision</h3>
          <p>
            To be Abuja’s most trusted and innovative real estate company, unlocking the keys to dream homes while redefining luxury, comfort, and value in every property we touch.
          </p>

          <p>
            We believe a home is more than walls and a roof — it’s where your story begins. 
            That’s why we go beyond listings to offer personalized guidance, market insight, and unmatched dedication to turning your real estate dreams into reality.
          </p>
          <p>
            With Yoma Homes, you’re not just getting a realtor; you’re gaining a trusted partner who understands that your dream home is closer than you think.
          </p>
        </div>
      </section>

      {/* Meet The CEO Section */}
      <section className="meet-team-section">
        <h2>Meet the CEO</h2>
        <div className="ceo-card">
          <div className="ceo-image-wrapper">
            <img src={CEOImage} alt="Sandra - CEO of YomaHomes" />
          </div>
          <h3>Diru Chioma Vanessa</h3>
          <p>CEO</p>
        </div>
      </section>

    </div>
  );
};

export default TeamPage;