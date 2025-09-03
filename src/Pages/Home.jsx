import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBed, FaBath } from "react-icons/fa";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "../styles/Home.css";
import HeroBg from "../Assets/Hero-Image.webp";
import sample1 from "../Assets/house1.webp";
import sample2 from "../Assets/Hero-Image.webp";
import sample3 from "../Assets/Hero-Image.webp";

// ✅ Import your listingApi functions
import { fetchFeaturedListings, fetchListingsByType } from "../lib/listingApi";

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let current = 0;
            const duration = 1500;
            const increment = Math.max(1, Math.round(target / (duration / 16)));

            const step = () => {
              current += increment;
              if (current < target) {
                setCount(Math.floor(current));
                rafRef.current = requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            rafRef.current = requestAnimationFrame(step);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) observer.observe(ref.current);
    } else {
      setCount(target);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observer && typeof observer.disconnect === "function") observer.disconnect();
    };
  }, [target]);

  return (
    <h3 ref={ref} aria-live="polite" className="animated-counter">
      {count}
    </h3>
  );
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const [listingType, setListingType] = useState("sale");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "",
    keyword: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    price: 4000000000,
  });

  const navigate = useNavigate();

  // ✅ States for listings
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [forSale, setForSale] = useState([]);
  const [forRent, setForRent] = useState([]);
  const [shortlets, setShortlets] = useState([]);

  // ✅ Fetch listings via listingApi.js
  useEffect(() => {
    let mounted = true;

    async function loadListings() {
      try {
        const [featured, sale, rent, shortlet] = await Promise.all([
          fetchFeaturedListings(),
          fetchListingsByType("sale"),
          fetchListingsByType("rent"),
          fetchListingsByType("shortlet"),
        ]);

        if (!mounted) return;

        setFeaturedProperties(featured);
        setForSale(sale);
        setForRent(rent);
        setShortlets(shortlet);
      } catch (err) {
        console.error("Failed to fetch listings from Sanity", err);
      }
    }

    loadListings();
    return () => {
      mounted = false;
    };
  }, []);

  // Dummy blog post data
  const blogPosts = [
    { image: sample1, title: "How to Find the Perfect Abuja Home", excerpt: "Discover essential tips and insights to land your dream home in the Nigerian capital.", url: "/blog/perfect-abuja-home" },
    { image: sample2, title: "Maximizing ROI With Property Management", excerpt: "Learn how professional property management can boost returns and tenant satisfaction.", url: "/blog/roi-property-management" },
    { image: sample3, title: "Top Neighborhoods in Abuja for Shortlets", excerpt: "Explore the hottest areas for short-term rentals in Abuja for smart investing.", url: "/blog/abuja-shortlet-neighborhoods" },
  ];

  // Hero motion
  const heroMotion = shouldReduceMotion ? { initial: {}, animate: {}, transition: {} } : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };

  // Form handlers
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePriceChange = (e) => setFormData((prev) => ({ ...prev, price: parseInt(e.target.value, 10) || 0 }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({ listingType, ...formData }).toString();
    navigate(`/properties?${query}`);
  };

  // Reusable property grid renderer
  const renderGrid = (items) => (
    <div className="featured-grid">
      {items.slice(0, 8).map((property) => (
        <article key={property.id} className="property-card" style={{ backgroundImage: `url(${property.imageUrl})` }}>
          <div className="overlay" />
          <div className="property-tags">
            {property.featured && <span className="feature-tag">Featured</span>}
            <span className="property-status">{property.status}</span>
          </div>
          <div className="property-info">
            <h3 className="property-price">₦{(property.price ?? 0).toLocaleString()}</h3>
            <p className="property-description">{property.title}</p>
            {(property.bedrooms || property.bathrooms) && (
              <div className="property-details">
                {property.bedrooms && <span><FaBed /> {property.bedrooms} Beds</span>}
                {property.bathrooms && <span><FaBath /> {property.bathrooms} Baths</span>}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <>
      {/* Hero & Search unchanged */}
      <motion.section className="hero-section" style={{ backgroundImage: `url(${HeroBg})` }} initial={shouldReduceMotion ? {} : { opacity: 0 }} animate={shouldReduceMotion ? {} : { opacity: 1 }} exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
        <div className="hero-overlay" />
        <motion.div className="hero-container" {...heroMotion}>
          <motion.h1 initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }} animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            Let us guide you to the keys of your <span className="gold">Dream Home</span>
          </motion.h1>
          <motion.p initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }} animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            Buy, Rent or Shortlet Premium Properties Anywhere in Nigeria.
          </motion.p>

          {/* Listing Type Toggle */}
          <motion.div
            className="listing-toggle"
            initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["sale", "rent", "shortlet"].map((type) => (
              <motion.button
                key={type}
                className={listingType === type ? "active" : ""}
                onClick={() => setListingType(type)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                aria-pressed={listingType === type}
                type="button"
              >
                {type === "sale" ? "For Sale" : type === "rent" ? "For Rent" : "Shortlet"}
              </motion.button>
            ))}
          </motion.div>

          {/* Search Form */}
          <motion.form
            className="search-controls joined-search-controls"
            onSubmit={handleSubmit}
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="hero-search-bar">
              <div className="search-field">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="">Select Property Type</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="duplex">Duplex</option>
                  <option value="flat">Flat</option>
                  <option value="land">Land</option>
                  <option value="studio">Studio Apartment</option>
                  <option value="office">Office Space</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="shop">Shop</option>
                  <option value="hotel">Hotel / Guest House</option>
                  <option value="event">Event Center / Hall</option>
                </select>
              </div>

              <div className="search-field keyword-field">
                <label htmlFor="keyword">Keyword</label>
                <input
                  type="text"
                  id="keyword"
                  name="keyword"
                  placeholder="Search by location or keyword"
                  value={formData.keyword}
                  onChange={handleChange}
                  className="keyword-input"
                  autoComplete="off"
                />
              </div>

              <button
                type="button"
                className="advanced-toggle inline"
                onClick={() => setShowAdvanced((prev) => !prev)}
                aria-expanded={showAdvanced}
                aria-controls="advanced-filters"
              >
                <FaPlus /> Advanced Search
              </button>

              <button type="submit" className="btn-submit">
                Search
              </button>
            </div>

            <button
              type="button"
              className="advanced-toggle mobile"
              onClick={() => setShowAdvanced((prev) => !prev)}
              aria-expanded={showAdvanced}
              aria-controls="advanced-filters"
            >
              <FaPlus /> Advanced Search
            </button>

            <AnimatePresence initial={false}>
              {showAdvanced && (
                <motion.div
                  id="advanced-filters"
                  className="advanced-filters"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="search-field">
                    <label htmlFor="city">City</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange}>
                      <option value="">Select City</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="portharcourt">Port Harcourt</option>
                      <option value="ibadan">Ibadan</option>
                      <option value="enugu">Enugu</option>
                    </select>
                  </div>

                  <div className="search-field">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <select id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}+ Bedroom{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="search-field">
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <select id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}+ Bathroom{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="price-range-wrapper">
                    <label htmlFor="price">Price Range (₦)</label>
                    <input
                      type="range"
                      id="price"
                      name="price"
                      min="0"
                      max="8000000000"
                      step="10000000"
                      value={formData.price}
                      onChange={handlePriceChange}
                    />
                    <div className="price-display">₦{Number(formData.price).toLocaleString()}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </motion.section>

      {/* Featured Properties */}
      <section className="featured-section" aria-label="Best Luxury Listings in Abuja">
        <h2 className="featured-title">Best Luxury Listings in Abuja</h2>
        {featuredProperties.length > 0 ? renderGrid(featuredProperties) : <p>No featured properties available.</p>}
      </section>

      {/* For Sale */}
      <section className="featured-section" aria-label="Asokoro Luxury Listing">
        <h2 className="featured-title">Asokoro Luxury Listing</h2>
        {forSale.length > 0 ? renderGrid(forSale) : <p>No properties for sale available.</p>}
        {/* <button className="view-all-btn" onClick={() => navigate("/listings?status=sale")}>View All For Sale</button> */}
      </section>

      {/* For Rent */}
      <section className="featured-section" aria-label="Katampe Extension Luxury Listing">
        <h2 className="featured-title">Wuye Luxury Listing</h2>
        {forRent.length > 0 ? renderGrid(forRent) : <p>No rental properties available.</p>}
        {/* <button className="view-all-btn" onClick={() => navigate("/listings?status=rent")}>View All For Rent</button> */}
      </section>

      {/* Shortlets */}
      <section className="featured-section" aria-label="Shortlets in Abuja">
        <h2 className="featured-title">Shortlets in Abuja</h2>
        {shortlets.length > 0 ? renderGrid(shortlets) : <p>No shortlets available right now.</p>}
        {/* <button className="view-all-btn" onClick={() => navigate("/listings?status=shortlet")}>View All Shortlets</button> */}
      </section>

      {/* ... keep your stats and blog code here ... */}
      {/* Stats Section */}
      <section className="stats-section" aria-label="Company Achievements">
        <motion.div className="stats-container" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="stat-item">
            <AnimatedCounter target={50} />
            <p>Property Sales</p>
          </div>
          <motion.div className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}>
            <h3>30+</h3>
            <p>Property Management Clients</p>
          </motion.div>
          <motion.div className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
            <h3>50%</h3>
            <p>Increased property management portfolio</p>
          </motion.div>
          <motion.div className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} viewport={{ once: true }}>
            <h3>95%</h3>
            <p>Client Satisfaction Rating</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="blog-title">
            <h2 className="blog-section-title">Check Out Recent News &amp; Articles</h2>
          </motion.div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <motion.div key={post.title} className="blog-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <img src={post.image} alt={post.title} className="blog-image" loading="lazy" />
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <span className="learn-more" role="link" tabIndex={0} onClick={() => navigate(post.url)} onKeyDown={(e) => e.key === "Enter" && navigate(post.url)}>
                    Learn more →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;