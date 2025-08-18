import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBed, FaBath } from "react-icons/fa";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "../styles/Home.css";
import HeroBg from "../Assets/Hero-Image.webp";
import sample1 from "../Assets/house1.webp";
import sample2 from "../Assets/Hero-Image.webp";
import sample3 from "../Assets/Hero-Image.webp";

/*
  Key fixes & improvements:
  - Use useReducedMotion to respect user preference and reduce animation intensity.
  - Normalize property.type to safe CSS class names (spaces -> hyphens).
  - Defensive cleanup for IntersectionObserver in AnimatedCounter.
  - Lazy-loading for blog images, improved keys for blog list.
  - Minor performance / readability improvements without removing features.
*/

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
            const duration = 1500; // ms
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
      // fallback if IntersectionObserver not supported
      setCount(target);
    }

    return () => {
      // cleanup rAF and observer defensively
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.45, ease: "easeIn" } },
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const [listingType, setListingType] = useState("sale");
  const [filter, setFilter] = useState("All");
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

  // Dummy blog post data
  const blogPosts = [
    {
      image: sample1,
      title: "How to Find the Perfect Abuja Home",
      excerpt: "Discover essential tips and insights to land your dream home in the Nigerian capital.",
      url: "/blog/perfect-abuja-home",
    },
    {
      image: sample2,
      title: "Maximizing ROI With Property Management",
      excerpt: "Learn how professional property management can boost returns and tenant satisfaction.",
      url: "/blog/roi-property-management",
    },
    {
      image: sample3,
      title: "Top Neighborhoods in Abuja for Shortlets",
      excerpt: "Explore the hottest areas for short-term rentals in Abuja for smart investing.",
      url: "/blog/abuja-shortlet-neighborhoods",
    },
  ];

  // Properties (kept intact; only used as dummy data)
  const properties = [
    {
      id: 1,
      type: "Sale",
      featured: true,
      price: "₦150,000,000",
      description: "4 Bedroom Detached Duplex in Maitama",
      bedrooms: 4,
      bathrooms: 5,
      image: sample1,
      location: "Abuja",
    },
    {
      id: 2,
      type: "Rent",
      featured: true,
      price: "₦8,000,000/year",
      description: "3 Bedroom Apartment in Wuse II",
      bedrooms: 3,
      bathrooms: 4,
      image: sample2,
      location: "Abuja",
    },
    {
      id: 3,
      type: "Short Let",
      featured: true,
      price: "₦120,000/night",
      description: "Luxury 2 Bedroom in Asokoro",
      bedrooms: 2,
      bathrooms: 3,
      image: sample3,
      location: "Abuja",
    },
    {
      id: 4,
      type: "Rent",
      featured: true,
      price: "₦8,000,000/year",
      description: "3 Bedroom Apartment in Wuse II",
      bedrooms: 3,
      bathrooms: 4,
      image: sample2,
      location: "Abuja",
    },
    {
      id: 5,
      type: "Short Let",
      featured: true,
      price: "₦120,000/night",
      description: "Luxury 2 Bedroom in Asokoro",
      bedrooms: 2,
      bathrooms: 3,
      image: sample3,
      location: "Abuja",
    },
    {
      id: 6,
      type: "Sale",
      featured: true,
      price: "₦150,000,000",
      description: "4 Bedroom Detached Duplex in Maitama",
      bedrooms: 4,
      bathrooms: 5,
      image: sample1,
      location: "Abuja",
    },
    // ... (kept your note)
  ];

  const topRentalsDummy = [
    {
      id: 101,
      type: "Rent",
      featured: true,
      price: "₦5,500,000/year",
      description: "3 Bedroom Apartment in Wuse 2, Abuja",
      bedrooms: 3,
      bathrooms: 3,
      image: sample2,
      location: "Abuja",
    },
    {
      id: 102,
      type: "Rent",
      featured: true,
      price: "₦6,800,000/year",
      description: "4 Bedroom Duplex in Garki, Abuja",
      bedrooms: 4,
      bathrooms: 4,
      image: sample1,
      location: "Abuja",
    },
    {
      id: 103,
      type: "Rent",
      featured: false,
      price: "₦4,200,000/year",
      description: "2 Bedroom Flat in Kubwa, Abuja",
      bedrooms: 2,
      bathrooms: 2,
      image: sample3,
      location: "Abuja",
    },
    {
      id: 104,
      type: "Rent",
      featured: false,
      price: "₦7,000,000/year",
      description: "5 Bedroom Detached House in Jabi, Abuja",
      bedrooms: 5,
      bathrooms: 5,
      image: sample1,
      location: "Abuja",
    },
    {
      id: 105,
      type: "Rent",
      featured: false,
      price: "₦7,000,000/year",
      description: "5 Bedroom Detached House in Jabi, Abuja",
      bedrooms: 5,
      bathrooms: 5,
      image: sample1,
      location: "Abuja",
    },
    {
      id: 106,
      type: "Rent",
      featured: false,
      price: "₦7,000,000/year",
      description: "5 Bedroom Detached House in Jabi, Abuja",
      bedrooms: 5,
      bathrooms: 5,
      image: sample1,
      location: "Abuja",
    },
  ];

  const shortletsDummy = [
    {
      id: 201,
      type: "Short Let",
      featured: true,
      price: "₦100,000/night",
      description: "Luxury 1 Bedroom Apartment in Maitama",
      bedrooms: 1,
      bathrooms: 1,
      image: sample3,
      location: "Abuja",
    },
    {
      id: 202,
      type: "Short Let",
      featured: false,
      price: "₦150,000/night",
      description: "Cozy Studio in Asokoro, Abuja",
      bedrooms: 0,
      bathrooms: 1,
      image: sample2,
      location: "Abuja",
    },
    {
      id: 203,
      type: "Short Let",
      featured: false,
      price: "₦120,000/night",
      description: "Modern 2 Bedroom Flat in Wuse 1",
      bedrooms: 2,
      bathrooms: 2,
      image: sample1,
      location: "Abuja",
    },
  ];

  // Filter properties by selected filter button
  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter(
          (property) => property.type.toLowerCase() === filter.toLowerCase()
        );

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setFormData((prev) => ({ ...prev, price: parseInt(e.target.value, 10) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({ listingType, ...formData }).toString();
    navigate(`/properties?${query}`);
  };

  // small helper to make CSS-safe class names (so "Short Let" -> "short-let")
  const toSafeClass = (str) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // reduced-motion variants (if user prefers reduced motion)
  const heroMotion = shouldReduceMotion
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
      };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        style={{ backgroundImage: `url(${HeroBg})` }}
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-overlay" />
        <motion.div
          className="hero-container"
          {...heroMotion}
        >
          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Ideal Home with <span className="gold">YomaHomes</span>
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
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

      {/* Featured Properties Section */}
      <section className="featured-section" aria-label="Best Luxury Listings in Abuja">
        <div className="featured-header">
          <h2 className="featured-title">Best Luxury Listings in Abuja</h2>
          <div className="filter-toggle" role="group" aria-label="Filter properties">
            {["All", "Sale", "Rent", "Short Let"].map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="featured-grid"
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          layout
        >
          <AnimatePresence initial={false}>
            {filteredProperties.map((property) => {
              const safeType = toSafeClass(property.type);
              return (
                <motion.article
                  key={property.id}
                  className="property-card"
                  style={{ backgroundImage: `url(${property.image})` }}
                  variants={cardVariants}
                  exit="exit"
                  layout
                  role="group"
                  aria-label={`${property.type} - ${property.description}`}
                  tabIndex={0}
                >
                  <div className="overlay" />
                  <div className="property-tags">
                    {property.featured && (
                      <span className={`feature-tag ${safeType}`} aria-label="Featured property">
                        Featured
                      </span>
                    )}
                    <span className={`property-status ${safeType}`} aria-label={`Property type: ${property.type}`}>
                      {property.type}
                    </span>
                  </div>
                  <div className="property-info">
                    <h3 className="property-price">{property.price}</h3>
                    <p className="property-description">{property.description}</p>
                    <hr className="description-separator" />
                    <div className="property-details">
                      <span>
                        <FaBed aria-hidden="true" /> {property.bedrooms} Beds
                      </span>
                      <span>
                        <FaBath aria-hidden="true" /> {property.bathrooms} Baths
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Asokoro Luxury Listing */}
      <section className="featured-section" aria-label="Asokoro Luxury Listing">
        <div className="featured-header">
          <h2 className="featured-title">Asokoro Luxury Listing</h2>
          <button className="see-all-btn" onClick={() => navigate("/properties")} type="button" aria-label="View all properties">
            View All Properties
          </button>
        </div>

        <motion.div className="featured-grid" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" layout>
          <AnimatePresence initial={false}>
            {properties
              .filter((property) => property.type.toLowerCase() === "sale")
              .map((property) => {
                const safeType = toSafeClass(property.type);
                return (
                  <motion.article
                    key={property.id}
                    className="property-card"
                    style={{ backgroundImage: `url(${property.image})` }}
                    variants={cardVariants}
                    exit="exit"
                    layout
                    role="group"
                    aria-label={`${property.type} - ${property.description}`}
                    tabIndex={0}
                  >
                    <div className="overlay" />
                    <div className="property-tags">
                      {property.featured && <span className={`feature-tag ${safeType}`}>Featured</span>}
                      <span className={`property-status ${safeType}`}>{property.type}</span>
                    </div>
                    <div className="property-info">
                      <h3 className="property-price">{property.price}</h3>
                      <p className="property-description">{property.description}</p>
                      <hr className="description-separator" />
                      <div className="property-details">
                        <span>
                          <FaBed aria-hidden="true" /> {property.bedrooms} Beds
                        </span>
                        <span>
                          <FaBath aria-hidden="true" /> {property.bathrooms} Baths
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Katampe Extension Luxury Listing */}
      <section className="featured-section" aria-label="Katampe Extension Luxury Listing">
        <div className="featured-header">
          <h2 className="featured-title">Katampe Extension Luxury Listing</h2>
          <button className="see-all-btn" onClick={() => navigate("/properties")} type="button" aria-label="View all properties">
            View All Properties
          </button>
        </div>

        <motion.div className="featured-grid" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" layout>
          <AnimatePresence initial={false}>
            {properties
              .filter((property) => property.type.toLowerCase() === "rent")
              .map((property) => {
                const safeType = toSafeClass(property.type);
                return (
                  <motion.article
                    key={property.id}
                    className="property-card"
                    style={{ backgroundImage: `url(${property.image})` }}
                    variants={cardVariants}
                    exit="exit"
                    layout
                    role="group"
                    aria-label={`${property.type} - ${property.description}`}
                    tabIndex={0}
                  >
                    <div className="overlay" />
                    <div className="property-tags">
                      {property.featured && <span className={`feature-tag ${safeType}`}>Featured</span>}
                      <span className={`property-status ${safeType}`}>{property.type}</span>
                    </div>
                    <div className="property-info">
                      <h3 className="property-price">{property.price}</h3>
                      <p className="property-description">{property.description}</p>
                      <hr className="description-separator" />
                      <div className="property-details">
                        <span>
                          <FaBed aria-hidden="true" /> {property.bedrooms} Beds
                        </span>
                        <span>
                          <FaBath aria-hidden="true" /> {property.bathrooms} Baths
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Top Rentals in Abuja - Horizontal Scroll Section */}
      <section className="top-rentals-section" aria-label="Top Rentals in Abuja">
        <div className="section-header">
          <h2>Top Rentals in Abuja</h2>
          <button className="see-all-btn" onClick={() => navigate("/properties?type=rent&city=abuja")} type="button">
            View All Rentals
          </button>
        </div>

        <div className="horizontal-scroll-wrapper" tabIndex={0} aria-label="Scrollable list of top rentals">
          <motion.div className="horizontal-scroll-container" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" layout>
            <AnimatePresence initial={false}>
              {topRentalsDummy.map((property) => {
                const safeType = toSafeClass(property.type);
                return (
                  <motion.article
                    key={property.id}
                    className="property-card"
                    style={{ backgroundImage: `url(${property.image})` }}
                    variants={cardVariants}
                    exit="exit"
                    layout
                    role="group"
                    aria-label={`${property.type} - ${property.description}`}
                    tabIndex={0}
                  >
                    <div className="overlay" />
                    <div className="property-tags">
                      {property.featured && <span className={`feature-tag ${safeType}`}>Featured</span>}
                      <span className={`property-status ${safeType}`}>{property.type}</span>
                    </div>
                    <div className="property-info">
                      <h3 className="property-price">{property.price}</h3>
                      <p className="property-description">{property.description}</p>
                      <hr className="description-separator" />
                      <div className="property-details">
                        <span>
                          <FaBed aria-hidden="true" /> {property.bedrooms} Beds
                        </span>
                        <span>
                          <FaBath aria-hidden="true" /> {property.bathrooms} Baths
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Shortlets in Abuja - Responsive Grid Section */}
      <section className="shortlets-section featured-section" aria-label="Shortlets in Abuja">
        <div className="featured-header section-header">
          <h2 className="featured-title">Shortlets in Abuja</h2>
          <button className="see-all-btn" onClick={() => navigate("/properties?type=shortlet&city=abuja")} type="button">
            View All Shortlets
          </button>
        </div>

        <motion.div className="featured-grid" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" layout>
          <AnimatePresence initial={false}>
            {shortletsDummy.map((property) => {
              const safeType = toSafeClass(property.type);
              return (
                <motion.article
                  key={property.id}
                  className="property-card"
                  style={{ backgroundImage: `url(${property.image})` }}
                  variants={cardVariants}
                  exit="exit"
                  layout
                  role="group"
                  aria-label={`${property.type} - ${property.description}`}
                  tabIndex={0}
                >
                  <div className="overlay" />
                  <div className="property-tags">
                    {property.featured && <span className={`feature-tag ${safeType}`}>Featured</span>}
                    <span className={`property-status ${safeType}`}>{property.type}</span>
                  </div>
                  <div className="property-info">
                    <h3 className="property-price">{property.price}</h3>
                    <p className="property-description">{property.description}</p>
                    <hr className="description-separator" />
                    <div className="property-details">
                      <span>
                        <FaBed aria-hidden="true" /> {property.bedrooms} Beds
                      </span>
                      <span>
                        <FaBath aria-hidden="true" /> {property.bathrooms} Baths
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

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













// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaBed, FaBath } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import "../styles/Home.css";
// import HeroBg from "../Assets/Hero-Image.webp";
// import sample1 from "../Assets/house1.webp";
// import sample2 from "../Assets/Hero-Image.webp";
// import sample3 from "../Assets/Hero-Image.webp";




// const AnimatedCounter = ({ target }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started.current) {
//           started.current = true;
//           let start = 0;
//           const duration = 1500;
//           const step = (timestamp) => {
//             start += target / (duration / 16);
//             if (start < target) {
//               setCount(Math.floor(start));
//               requestAnimationFrame(step);
//             } else {
//               setCount(target);
//             }
//           };
//           requestAnimationFrame(step);
//         }
//       },
//       { threshold: 0.3 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [target]);

//   return <h3 ref={ref}>{count}</h3>;
// };


// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   exit: { opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeIn" } },
// };

// const Home = () => {
//   const [listingType, setListingType] = useState("sale");
//   const [filter, setFilter] = useState("All");
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [formData, setFormData] = useState({
//     propertyType: "",
//     keyword: "",
//     city: "",
//     bedrooms: "",
//     bathrooms: "",
//     price: 4000000000,
//   });

//   const navigate = useNavigate();

//   // Dummy blog post data
//     const blogPosts = [
//       {
//         image: sample1,
//         title: "How to Find the Perfect Abuja Home",
//         excerpt: "Discover essential tips and insights to land your dream home in the Nigerian capital.",
//         url: "/blog/perfect-abuja-home",
//       },
//       {
//         image: sample2,
//         title: "Maximizing ROI With Property Management",
//         excerpt: "Learn how professional property management can boost returns and tenant satisfaction.",
//         url: "/blog/roi-property-management",
//       },
//       {
//         image: sample3,
//         title: "Top Neighborhoods in Abuja for Shortlets",
//         excerpt: "Explore the hottest areas for short-term rentals in Abuja for smart investing.",
//         url: "/blog/abuja-shortlet-neighborhoods",
//       },
//     ];


//   // Your existing properties array
//   const properties = [
//     {
//       id: 1,
//       type: "Sale",
//       featured: true,
//       price: "₦150,000,000",
//       description: "4 Bedroom Detached Duplex in Maitama",
//       bedrooms: 4,
//       bathrooms: 5,
//       image: sample1,
//       location: "Abuja",
//     },
//     {
//       id: 2,
//       type: "Rent",
//       featured: true,
//       price: "₦8,000,000/year",
//       description: "3 Bedroom Apartment in Wuse II",
//       bedrooms: 3,
//       bathrooms: 4,
//       image: sample2,
//       location: "Abuja",
//     },
//     {
//       id: 3,
//       type: "Short Let",
//       featured: true,
//       price: "₦120,000/night",
//       description: "Luxury 2 Bedroom in Asokoro",
//       bedrooms: 2,
//       bathrooms: 3,
//       image: sample3,
//       location: "Abuja",
//     },
//     {
//       id: 4,
//       type: "Rent",
//       featured: true,
//       price: "₦8,000,000/year",
//       description: "3 Bedroom Apartment in Wuse II",
//       bedrooms: 3,
//       bathrooms: 4,
//       image: sample2,
//       location: "Abuja",
//     },
//     {
//       id: 5,
//       type: "Short Let",
//       featured: true,
//       price: "₦120,000/night",
//       description: "Luxury 2 Bedroom in Asokoro",
//       bedrooms: 2,
//       bathrooms: 3,
//       image: sample3,
//       location: "Abuja",
//     },
//     {
//       id: 6,
//       type: "Sale",
//       featured: true,
//       price: "₦150,000,000",
//       description: "4 Bedroom Detached Duplex in Maitama",
//       bedrooms: 4,
//       bathrooms: 5,
//       image: sample1,
//       location: "Abuja",
//     },
//     // ... (Add all other existing property entries here)
//   ];

//   // Dummy data for new sections, all Abuja location
//   const topRentalsDummy = [
//     {
//       id: 101,
//       type: "Rent",
//       featured: true,
//       price: "₦5,500,000/year",
//       description: "3 Bedroom Apartment in Wuse 2, Abuja",
//       bedrooms: 3,
//       bathrooms: 3,
//       image: sample2,
//       location: "Abuja",
//     },
//     {
//       id: 102,
//       type: "Rent",
//       featured: true,
//       price: "₦6,800,000/year",
//       description: "4 Bedroom Duplex in Garki, Abuja",
//       bedrooms: 4,
//       bathrooms: 4,
//       image: sample1,
//       location: "Abuja",
//     },
//     {
//       id: 103,
//       type: "Rent",
//       featured: false,
//       price: "₦4,200,000/year",
//       description: "2 Bedroom Flat in Kubwa, Abuja",
//       bedrooms: 2,
//       bathrooms: 2,
//       image: sample3,
//       location: "Abuja",
//     },
//     {
//       id: 104,
//       type: "Rent",
//       featured: false,
//       price: "₦7,000,000/year",
//       description: "5 Bedroom Detached House in Jabi, Abuja",
//       bedrooms: 5,
//       bathrooms: 5,
//       image: sample1,
//       location: "Abuja",
//     },
//     {
//       id: 105,
//       type: "Rent",
//       featured: false,
//       price: "₦7,000,000/year",
//       description: "5 Bedroom Detached House in Jabi, Abuja",
//       bedrooms: 5,
//       bathrooms: 5,
//       image: sample1,
//       location: "Abuja",
//     },
//     {
//       id: 106,
//       type: "Rent",
//       featured: false,
//       price: "₦7,000,000/year",
//       description: "5 Bedroom Detached House in Jabi, Abuja",
//       bedrooms: 5,
//       bathrooms: 5,
//       image: sample1,
//       location: "Abuja",
//     },
//   ];

//   const shortletsDummy = [
//     {
//       id: 201,
//       type: "Short Let",
//       featured: true,
//       price: "₦100,000/night",
//       description: "Luxury 1 Bedroom Apartment in Maitama",
//       bedrooms: 1,
//       bathrooms: 1,
//       image: sample3,
//       location: "Abuja",
//     },
//     {
//       id: 202,
//       type: "Short Let",
//       featured: false,
//       price: "₦150,000/night",
//       description: "Cozy Studio in Asokoro, Abuja",
//       bedrooms: 0,
//       bathrooms: 1,
//       image: sample2,
//       location: "Abuja",
//     },
//     {
//       id: 203,
//       type: "Short Let",
//       featured: false,
//       price: "₦120,000/night",
//       description: "Modern 2 Bedroom Flat in Wuse 1",
//       bedrooms: 2,
//       bathrooms: 2,
//       image: sample1,
//       location: "Abuja",
//     },
//   ];

//   // Filter properties by selected filter button
//   const filteredProperties =
//     filter === "All"
//       ? properties
//       : properties.filter(
//           (property) => property.type.toLowerCase() === filter.toLowerCase()
//         );

//   // Handle form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePriceChange = (e) => {
//     setFormData((prev) => ({ ...prev, price: parseInt(e.target.value, 10) }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams({ listingType, ...formData }).toString();
//     navigate(`/properties?${query}`);
//   };

  

//   return (
//     <>
//       {/* Hero Section */}
//       <motion.section
//         className="hero-section"
//         style={{ backgroundImage: `url(${HeroBg})` }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="hero-overlay" />
//         <motion.div
//           className="hero-container"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Discover Your Ideal Home with <span className="gold">YomaHomes</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             Buy, Rent or Shortlet Premium Properties Anywhere in Nigeria.
//           </motion.p>

//           {/* Listing Type Toggle */}
//           <motion.div
//             className="listing-toggle"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             {["sale", "rent", "shortlet"].map((type) => (
//               <motion.button
//                 key={type}
//                 className={listingType === type ? "active" : ""}
//                 onClick={() => setListingType(type)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-pressed={listingType === type}
//                 type="button"
//               >
//                 {type === "sale"
//                   ? "For Sale"
//                   : type === "rent"
//                   ? "For Rent"
//                   : "Shortlet"}
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Search Form */}
//           <motion.form
//             className="search-controls joined-search-controls"
//             onSubmit={handleSubmit}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//           >
//             <div className="hero-search-bar">
//               <div className="search-field">
//                 <label htmlFor="propertyType">Property Type</label>
//                 <select
//                   id="propertyType"
//                   name="propertyType"
//                   value={formData.propertyType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Property Type</option>
//                   <option value="bungalow">Bungalow</option>
//                   <option value="duplex">Duplex</option>
//                   <option value="flat">Flat</option>
//                   <option value="land">Land</option>
//                   <option value="studio">Studio Apartment</option>
//                   <option value="office">Office Space</option>
//                   <option value="warehouse">Warehouse</option>
//                   <option value="shop">Shop</option>
//                   <option value="hotel">Hotel / Guest House</option>
//                   <option value="event">Event Center / Hall</option>
//                 </select>
//               </div>

//               <div className="search-field keyword-field">
//                 <label htmlFor="keyword">Keyword</label>
//                 <input
//                   type="text"
//                   id="keyword"
//                   name="keyword"
//                   placeholder="Search by location or keyword"
//                   value={formData.keyword}
//                   onChange={handleChange}
//                   className="keyword-input"
//                   autoComplete="off"
//                 />
//               </div>

//               <button
//                 type="button"
//                 className="advanced-toggle inline"
//                 onClick={() => setShowAdvanced((prev) => !prev)}
//                 aria-expanded={showAdvanced}
//                 aria-controls="advanced-filters"
//               >
//                 <FaPlus /> Advanced Search
//               </button>

//               <button type="submit" className="btn-submit">
//                 Search
//               </button>
//             </div>

//             <button
//               type="button"
//               className="advanced-toggle mobile"
//               onClick={() => setShowAdvanced((prev) => !prev)}
//               aria-expanded={showAdvanced}
//               aria-controls="advanced-filters"
//             >
//               <FaPlus /> Advanced Search
//             </button>

//             <AnimatePresence>
//               {showAdvanced && (
//                 <motion.div
//                   id="advanced-filters"
//                   className="advanced-filters"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="search-field">
//                     <label htmlFor="city">City</label>
//                     <select
//                       id="city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select City</option>
//                       <option value="lagos">Lagos</option>
//                       <option value="abuja">Abuja</option>
//                       <option value="portharcourt">Port Harcourt</option>
//                       <option value="ibadan">Ibadan</option>
//                       <option value="enugu">Enugu</option>
//                     </select>
//                   </div>

//                   <div className="search-field">
//                     <label htmlFor="bedrooms">Bedrooms</label>
//                     <select
//                       id="bedrooms"
//                       name="bedrooms"
//                       value={formData.bedrooms}
//                       onChange={handleChange}
//                     >
//                       <option value="">Any</option>
//                       {[1, 2, 3, 4, 5].map((n) => (
//                         <option key={n} value={n}>
//                           {n}+ Bedroom{n > 1 ? "s" : ""}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="search-field">
//                     <label htmlFor="bathrooms">Bathrooms</label>
//                     <select
//                       id="bathrooms"
//                       name="bathrooms"
//                       value={formData.bathrooms}
//                       onChange={handleChange}
//                     >
//                       <option value="">Any</option>
//                       {[1, 2, 3, 4, 5].map((n) => (
//                         <option key={n} value={n}>
//                           {n}+ Bathroom{n > 1 ? "s" : ""}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="price-range-wrapper">
//                     <label htmlFor="price">Price Range (₦)</label>
//                     <input
//                       type="range"
//                       id="price"
//                       name="price"
//                       min="0"
//                       max="8000000000"
//                       step="10000000"
//                       value={formData.price}
//                       onChange={handlePriceChange}
//                     />
//                     <div className="price-display">
//                       ₦{formData.price.toLocaleString()}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.form>
//         </motion.div>
//       </motion.section>

//       {/* Featured Properties Section */}
//       <section className="featured-section" aria-label="Best Luxury Listings in Abuja">
//         <div className="featured-header">
//           <h2 className="featured-title">Best Luxury Listings in Abuja</h2>
//           <div className="filter-toggle" role="group" aria-label="Filter properties">
//             {["All", "Sale", "Rent", "Short Let"].map((category) => (
//               <button
//                 key={category}
//                 className={`filter-btn ${filter === category ? "active" : ""}`}
//                 onClick={() => setFilter(category)}
//                 aria-pressed={filter === category}
//                 type="button"
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <motion.div
//           className="featured-grid"
//           key={filter}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           layout
//         >
//           <AnimatePresence>
//             {filteredProperties.map((property) => (
//               <motion.article
//                 key={property.id}
//                 className="property-card"
//                 style={{ backgroundImage: `url(${property.image})` }}
//                 variants={cardVariants}
//                 exit="exit"
//                 layout
//                 role="group"
//                 aria-label={`${property.type} - ${property.description}`}
//                 tabIndex={0}
//               >
//                 <div className="overlay"></div>
//                 <div className="property-tags">
//                   {property.featured && (
//                     <span
//                       className={`feature-tag ${property.type.toLowerCase()}`}
//                       aria-label="Featured property"
//                     >
//                       Featured
//                     </span>
//                   )}
//                   <span
//                     className={`property-status ${property.type.toLowerCase()}`}
//                     aria-label={`Property type: ${property.type}`}
//                   >
//                     {property.type}
//                   </span>
//                 </div>
//                 <div className="property-info">
//                   <h3 className="property-price">{property.price}</h3>
//                   <p className="property-description">{property.description}</p>
//                   <hr className="description-separator" />
//                   <div className="property-details">
//                     <span>
//                       <FaBed aria-hidden="true" /> {property.bedrooms} Beds
//                     </span>
//                     <span>
//                       <FaBath aria-hidden="true" /> {property.bathrooms} Baths
//                     </span>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>

//       {/* Asokoro Luxury Listing */}
//       <section className="featured-section" aria-label="Asokoro Luxury Listing">
//         <div className="featured-header">
//           <h2 className="featured-title">Asokoro Luxury Listing</h2>
//           <button
//             className="see-all-btn"
//             onClick={() => navigate("/properties")}
//             type="button"
//             aria-label="View all properties"
//           >
//             View All Properties
//           </button>
//         </div>

//         <motion.div
//           className="featured-grid"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           layout
//         >
//           <AnimatePresence>
//             {properties
//               .filter((property) => property.type.toLowerCase() === "sale")
//               .map((property) => (
//                 <motion.article
//                   key={property.id}
//                   className="property-card"
//                   style={{ backgroundImage: `url(${property.image})` }}
//                   variants={cardVariants}
//                   exit="exit"
//                   layout
//                   role="group"
//                   aria-label={`${property.type} - ${property.description}`}
//                   tabIndex={0}
//                 >
//                   <div className="overlay"></div>
//                   <div className="property-tags">
//                     {property.featured && (
//                       <span className={`feature-tag ${property.type.toLowerCase()}`}>
//                         Featured
//                       </span>
//                     )}
//                     <span className={`property-status ${property.type.toLowerCase()}`}>
//                       {property.type}
//                     </span>
//                   </div>
//                   <div className="property-info">
//                     <h3 className="property-price">{property.price}</h3>
//                     <p className="property-description">{property.description}</p>
//                     <hr className="description-separator" />
//                     <div className="property-details">
//                       <span>
//                         <FaBed aria-hidden="true" /> {property.bedrooms} Beds
//                       </span>
//                       <span>
//                         <FaBath aria-hidden="true" /> {property.bathrooms} Baths
//                       </span>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>

//       {/* Katampe Extension Luxury Listing */}
//       <section className="featured-section" aria-label="Katampe Extension Luxury Listing">
//         <div className="featured-header">
//           <h2 className="featured-title">Katampe Extension Luxury Listing</h2>
//           <button
//             className="see-all-btn"
//             onClick={() => navigate("/properties")}
//             type="button"
//             aria-label="View all properties"
//           >
//             View All Properties
//           </button>
//         </div>

//         <motion.div
//           className="featured-grid"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           layout
//         >
//           <AnimatePresence>
//             {properties
//               .filter((property) => property.type.toLowerCase() === "rent")
//               .map((property) => (
//                 <motion.article
//                   key={property.id}
//                   className="property-card"
//                   style={{ backgroundImage: `url(${property.image})` }}
//                   variants={cardVariants}
//                   exit="exit"
//                   layout
//                   role="group"
//                   aria-label={`${property.type} - ${property.description}`}
//                   tabIndex={0}
//                 >
//                   <div className="overlay"></div>
//                   <div className="property-tags">
//                     {property.featured && (
//                       <span className={`feature-tag ${property.type.toLowerCase()}`}>
//                         Featured
//                       </span>
//                     )}
//                     <span className={`property-status ${property.type.toLowerCase()}`}>
//                       {property.type}
//                     </span>
//                   </div>
//                   <div className="property-info">
//                     <h3 className="property-price">{property.price}</h3>
//                     <p className="property-description">{property.description}</p>
//                     <hr className="description-separator" />
//                     <div className="property-details">
//                       <span>
//                         <FaBed aria-hidden="true" /> {property.bedrooms} Beds
//                       </span>
//                       <span>
//                         <FaBath aria-hidden="true" /> {property.bathrooms} Baths
//                       </span>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>

//       {/* Top Rentals in Abuja - Horizontal Scroll Section */}
//       <section className="top-rentals-section" aria-label="Top Rentals in Abuja">
//         <div className="section-header">
//           <h2>Top Rentals in Abuja</h2>
//           <button
//             className="see-all-btn"
//             onClick={() => navigate("/properties?type=rent&city=abuja")}
//             type="button"
//           >
//             View All Rentals
//           </button>
//         </div>

//         <div className="horizontal-scroll-wrapper" tabIndex={0} aria-label="Scrollable list of top rentals">
//           <motion.div
//             className="horizontal-scroll-container"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             layout
//           >
//             <AnimatePresence>
//               {topRentalsDummy.map((property) => (
//                 <motion.article
//                   key={property.id}
//                   className="property-card"
//                   style={{ backgroundImage: `url(${property.image})` }}
//                   variants={cardVariants}
//                   exit="exit"
//                   layout
//                   role="group"
//                   aria-label={`${property.type} - ${property.description}`}
//                   tabIndex={0}
//                 >
//                   <div className="overlay"></div>
//                   <div className="property-tags">
//                     {property.featured && (
//                       <span className={`feature-tag ${property.type.toLowerCase()}`}>
//                         Featured
//                       </span>
//                     )}
//                     <span className={`property-status ${property.type.toLowerCase()}`}>
//                       {property.type}
//                     </span>
//                   </div>
//                   <div className="property-info">
//                     <h3 className="property-price">{property.price}</h3>
//                     <p className="property-description">{property.description}</p>
//                     <hr className="description-separator" />
//                     <div className="property-details">
//                       <span>
//                         <FaBed aria-hidden="true" /> {property.bedrooms} Beds
//                       </span>
//                       <span>
//                         <FaBath aria-hidden="true" /> {property.bathrooms} Baths
//                       </span>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </section>

//       {/* Shortlets in Abuja - Responsive Grid Section */}
//       <section className="shortlets-section featured-section" aria-label="Shortlets in Abuja">
//         <div className="featured-header section-header">
//           <h2 className="featured-title">Shortlets in Abuja</h2>
//           <button
//             className="see-all-btn"
//             onClick={() => navigate("/properties?type=shortlet&city=abuja")}
//             type="button"
//           >
//             View All Shortlets
//           </button>
//         </div>

//         <motion.div
//           className="featured-grid"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           layout
//         >
//           <AnimatePresence>
//             {shortletsDummy.map((property) => (
//               <motion.article
//                 key={property.id}
//                 className="property-card"
//                 style={{ backgroundImage: `url(${property.image})` }}
//                 variants={cardVariants}
//                 exit="exit"
//                 layout
//                 role="group"
//                 aria-label={`${property.type} - ${property.description}`}
//                 tabIndex={0}
//               >
//                 <div className="overlay"></div>
//                 <div className="property-tags">
//                   {property.featured && (
//                     <span className={`feature-tag ${property.type.toLowerCase()}`}>
//                       Featured
//                     </span>
//                   )}
//                   <span className={`property-status ${property.type.toLowerCase()}`}>
//                     {property.type}
//                   </span>
//                 </div>
//                 <div className="property-info">
//                   <h3 className="property-price">{property.price}</h3>
//                   <p className="property-description">{property.description}</p>
//                   <hr className="description-separator" />
//                   <div className="property-details">
//                     <span>
//                       <FaBed aria-hidden="true" /> {property.bedrooms} Beds
//                     </span>
//                     <span>
//                       <FaBath aria-hidden="true" /> {property.bathrooms} Baths
//                     </span>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>
//       {/* Stats Section */}


//             {/* Stats Section */}
//       <section
//         className="stats-section"
//         aria-label="Company Achievements"
//       >
//         <motion.div
//           className="stats-container"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="stat-item">
//             <AnimatedCounter target={50} /> 
//             <p>Property Sales</p>
//           </div>
//           <motion.div
//             className="stat-item"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <h3>30+</h3>
//             <p>Property Management Clients</p>
//           </motion.div>
//           <motion.div
//             className="stat-item"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <h3>50%</h3>
//             <p>Increased property management portfolio</p>
//           </motion.div>
//           <motion.div
//             className="stat-item"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h3>95%</h3>
//             <p>Client Satisfaction Rating</p>
//           </motion.div>
//         </motion.div>
//       </section>


//       {/* Blog Section */}
//       <section className="blog-section">
//         <div className="container">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="blog-title"
//           >
//             {/* Blog Section Heading */}
//             <h2 className="blog-section-title">
//               Check Out Recent News &amp; Articles
//             </h2>
//           </motion.h2>

//           <div className="blog-grid">
//             {blogPosts.map((post, index) => (
//               <motion.div
//                 key={index}
//                 className="blog-card"
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//               >
//                 <img src={post.image} alt={post.title} className="blog-image" />
//                 <div className="blog-content">
//                   <h3>{post.title}</h3>
//                   <p className="blog-excerpt">{post.excerpt}</p>
//                   <span
//                     className="learn-more"
//                     onClick={() => navigate(post.url)}
//                   >
//                     Learn more →
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// export default Home;
