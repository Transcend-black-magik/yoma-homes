import React, { useRef, useEffect } from 'react';
import '../styles/About.css';

const teamMembers = [
  { name: 'GABRIEL I. IBANGA', title: 'Founder & CEO', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Gabriel-1.jpg' },
  { name: 'PAGABIO JONAH', title: 'Head of Operation & Finance', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Pagabio-1.jpg' },
  { name: 'ADESEWA M. FAGBOHUNN', title: 'HR Officer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Adesewa-1.jpg' },
  { name: 'RITA ANULI', title: 'Company Lawyer / Facility Manager', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Rita-1.jpg' },
  { name: 'ODEOMENNA CHIAMAKA', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Odeomenna-1.jpg' },
  { name: 'EBUKA SIMON', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Ebuka-1.jpg' },
  { name: 'GABRIELLA EKWEM', title: 'Investment Advisor / Contents', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Gabriella-1.jpg' },
  { name: 'MARTINS NWANAGU', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Martins-1.jpg' },
  { name: 'ADAMU BABA', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Adamu-1.jpg' },
  { name: 'REBECCA AWANTAYE', title: 'Sales Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Rebecca-1.jpg' },
  { name: 'TARELADE FRANCES EBIKONBOERE', title: 'Sales Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Tarelade-1.jpg' },
  { name: 'BUSOLA OLADUNJOYE', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Busola-1.jpg' },
  { name: 'SAAJIDA AMIKELO MOHAMMED', title: 'Lead Interior Designer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Saadija-1.jpg' },
  { name: 'ENEH NNEKA JULIET', title: 'Telemarketer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Eneh-1.jpg' },
  { name: 'EMMANUEL ANYAELE AGU', title: 'Website Administrator', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Emmanuel-1.jpg' },
  { name: 'FAITFUL OTORO', title: 'Front Desk Officer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Faitful-1.jpg' },
];

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

      {/* Meet The Team Slider Section */}
      <section className="meet-team-section">
        <h2>Meet the Team</h2>
        <div className="slider-wrapper">
          <button className="arrow left-arrow" onClick={scrollLeft} aria-label="Scroll Left">&#10094;</button>
          <div className="team-slider" ref={sliderRef}>
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="image-wrapper">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
              </div>
            ))}
          </div>
          <button className="arrow right-arrow" onClick={scrollRight} aria-label="Scroll Right">&#10095;</button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;






















// import React, { useRef, useEffect } from 'react';
// import '../styles/About.css';

// const teamMembers = [
//   { name: 'GABRIEL I. IBANGA', title: 'Founder & CEO', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Gabriel-1.jpg' },
//   { name: 'PAGABIO JONAH', title: 'Head of Operation & Finance', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Pagabio-1.jpg' },
//   { name: 'ADESEWA M. FAGBOHUNN', title: 'HR Officer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Adesewa-1.jpg' },
//   { name: 'RITA ANULI', title: 'Company Lawyer / Facility Manager', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Rita-1.jpg' },
//   { name: 'ODEOMENNA CHIAMAKA', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Odeomenna-1.jpg' },
//   { name: 'EBUKA SIMON', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Ebuka-1.jpg' },
//   { name: 'GABRIELLA EKWEM', title: 'Investment Advisor / Contents', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Gabriella-1.jpg' },
//   { name: 'MARTINS NWANAGU', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Martins-1.jpg' },
//   { name: 'ADAMU BABA', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Adamu-1.jpg' },
//   { name: 'REBECCA AWANTAYE', title: 'Sales Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Rebecca-1.jpg' },
//   { name: 'TARELADE FRANCES EBIKONBOERE', title: 'Sales Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Tarelade-1.jpg' },
//   { name: 'BUSOLA OLADUNJOYE', title: 'Investment Advisor', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Busola-1.jpg' },
//   { name: 'SAAJIDA AMIKELO MOHAMMED', title: 'Lead Interior Designer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Saadija-1.jpg' },
//   { name: 'ENEH NNEKA JULIET', title: 'Telemarketer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Eneh-1.jpg' },
//   { name: 'EMMANUEL ANYAELE AGU', title: 'Website Administrator', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Emmanuel-1.jpg' },
//   { name: 'FAITFUL OTORO', title: 'Front Desk Officer', image: 'https://comfortpropertiesltd.com/wp-content/uploads/2022/07/Faitful-1.jpg' },
// ];

// const TeamPage = () => {
//   const sliderRef = useRef(null);
//   const scrollAmount = 280; // width of one card + gap approx

//   // Auto scroll every 3 seconds
//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const interval = setInterval(() => {
//       if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
//         // Scroll back to start if reached end
//         slider.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const scrollLeft = () => {
//     sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   };

//   return (
//     <div className="team-container">
//       {/* Top Banner Section */}
//       <section className="banner-section">
//         <div className="banner-overlay">
//           <h1>Meet Our Team</h1>
//           <p>Our team of professionals are dedicated to helping you.</p>
//         </div>
//       </section>

//       {/* Meet The Team Slider Section */}
//       <section className="meet-team-section">
//         <h2>Meet the Team</h2>

//         <div className="slider-wrapper">
//           <button className="arrow left-arrow" onClick={scrollLeft} aria-label="Scroll Left">&#10094;</button>
//           <div className="team-slider" ref={sliderRef}>
//             {teamMembers.map((member, idx) => (
//               <div key={idx} className="team-card">
//                 <div className="image-wrapper">
//                   <img src={member.image} alt={member.name} />
//                 </div>
//                 <h3>{member.name}</h3>
//                 <p>{member.title}</p>
//               </div>
//             ))}
//           </div>
//           <button className="arrow right-arrow" onClick={scrollRight} aria-label="Scroll Right">&#10095;</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default TeamPage;
