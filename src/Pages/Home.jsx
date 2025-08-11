import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBed, FaBath } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.css";
import HeroBg from "../Assets/Hero-Image.webp";
import sample1 from "../Assets/Hero-Image.webp";
import sample2 from "../Assets/Hero-Image.webp";
import sample3 from "../Assets/Hero-Image.webp";

/* Animation Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

const Home = () => {
  const [listingType, setListingType] = useState("sale");
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    propertyType: "",
    keyword: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    price: 4000000000,
  });

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
    },
    {
      id: 4,
      type: "Sale",
      featured: true,
      price: "₦150,000,000",
      description: "4 Bedroom Detached Duplex in Maitama",
      bedrooms: 4,
      bathrooms: 5,
      image: sample1,
    },
    {
      id: 5,
      type: "Rent",
      featured: true,
      price: "₦120,000/night",
      description: "Luxury 2 Bedroom in Asokoro",
      bedrooms: 2,
      bathrooms: 3,
      image: sample3,
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
    },
    {
      id: 7,
      type: "Rent",
      featured: true,
      price: "₦120,000/night",
      description: "Luxury 2 Bedroom in Asokoro",
      bedrooms: 2,
      bathrooms: 3,
      image: sample3,
    },
    {
      id: 8,
      type: "Short Let",
      featured: true,
      price: "₦120,000/night",
      description: "Luxury 2 Bedroom in Asokoro",
      bedrooms: 2,
      bathrooms: 3,
      image: sample3,
    },
  ];

  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  /* ===== Form Handlers ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setFormData((prev) => ({ ...prev, price: parseInt(e.target.value, 10) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({ listingType, ...formData }).toString();
    navigate(`/properties?${query}`);
  };


  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((property) => property.type === filter);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <AnimatePresence>
        <motion.section
          className="hero-section"
          style={{ backgroundImage: `url(${HeroBg})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-overlay" />
          <motion.div
            className="hero-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Discover Your Ideal Home with{" "}
              <span className="gold">YomaHomes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Buy, Rent or Shortlet Premium Properties Anywhere in Nigeria.
            </motion.p>

            <motion.div
              className="listing-toggle"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {["sale", "rent", "shortlet"].map((type) => (
                <motion.button
                  key={type}
                  className={listingType === type ? "active" : ""}
                  onClick={() => setListingType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type === "sale"
                    ? "For Sale"
                    : type === "rent"
                    ? "For Rent"
                    : "Shortlet"}
                </motion.button>
              ))}
            </motion.div>

            <motion.form
              className="search-controls joined-search-controls"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="hero-search-bar">
                <div className="search-field">
                  <label>Property Type</label>
                  <select
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
                  <label>Keyword</label>
                  <input
                    type="text"
                    name="keyword"
                    placeholder="Search by location or keyword"
                    value={formData.keyword}
                    onChange={handleChange}
                    className="keyword-input"
                  />
                </div>

                <button
                  type="button"
                  className="advanced-toggle inline"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                >
                  <FaPlus /> Advanced Search
                </button>

                <button type="submit">Search</button>
              </div>

              <button
                type="button"
                className="advanced-toggle mobile"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                <FaPlus /> Advanced Search
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    className="advanced-filters"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="search-field">
                      <label>City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value="">Select City</option>
                        <option value="lagos">Lagos</option>
                        <option value="abuja">Abuja</option>
                        <option value="portharcourt">Port Harcourt</option>
                        <option value="ibadan">Ibadan</option>
                        <option value="enugu">Enugu</option>
                      </select>
                    </div>

                    <div className="search-field">
                      <label>Bedrooms</label>
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}+ Bedroom{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="search-field">
                      <label>Bathrooms</label>
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}+ Bathroom{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="price-range-wrapper">
                      <label>Price Range (₦)</label>
                      <input
                        type="range"
                        name="price"
                        min="0"
                        max="8000000000"
                        step="10000000"
                        value={formData.price}
                        onChange={handlePriceChange}
                      />
                      <div className="price-display">
                        ₦{formData.price.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* ===== Featured Properties Section ===== */}
      <section className="featured-section">
        {/* Header with title & filter toggle */}
        <div className="featured-header">
          <h2 className="featured-title">Best Luxury Listings in Abuja</h2>
          <div className="filter-toggle">
            {["All", "Sale", "Rent", "Short Let"].map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards with staggered animation */}
        <motion.div
          className="featured-grid"
          key={filter} // trigger remount to reset animation on filter change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          layout
        >
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="property-card"
                style={{ backgroundImage: `url(${property.image})` }}
                variants={cardVariants}
                exit="exit"
                layout
              >
                <div className="overlay"></div>

                <div className="property-tags">
                  {property.featured && (
                    <span
                      className={`feature-tag ${property.type.toLowerCase()}`}
                    >
                      Featured
                    </span>
                  )}
                  <span
                    className={`property-status ${property.type.toLowerCase()}`}
                  >
                    {property.type}
                  </span>
                </div>

                <div className="property-info">
                  <h3 className="property-price">{property.price}</h3>

                  <p className="property-description">{property.description}</p>
                  <hr className="description-separator" />

                  <div className="property-details">
                    <span>
                      <FaBed /> {property.bedrooms} Beds
                    </span>
                    <span>
                      <FaBath /> {property.bathrooms} Baths
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See All Properties Button */}
        <div
          className="see-all-container"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          <button
            className="see-all-btn"
            onClick={() => navigate("/properties")}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#d4af37",
              color: "#fff",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#b8972f")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#d4af37")
            }
          >
            See All Properties
          </button>
        </div>
      </section>
      {/* ===== For Sale Properties Section ===== */}
<section className="featured-section">
  <div className="featured-header">
    <h2 className="featured-title">Properties For Sale</h2>
    <button
      className="see-all-btn"
      onClick={() => navigate("/properties")}
      style={{
        padding: "10px 20px",
        fontSize: "1rem",
        cursor: "pointer",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#d4af37",
        color: "#fff",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b8972f")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d4af37")}
    >
      View All Properties
    </button>
  </div>

  <motion.div
    className="featured-grid"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    layout
  >
    <AnimatePresence>
      {properties
        .filter((property) => property.type === "Sale")
        .map((property) => (
          <motion.div
            key={property.id}
            className="property-card"
            style={{ backgroundImage: `url(${property.image})` }}
            variants={cardVariants}
            exit="exit"
            layout
          >
            <div className="overlay"></div>

            <div className="property-tags">
              {property.featured && (
                <span
                  className={`feature-tag ${property.type.toLowerCase()}`}
                >
                  Featured
                </span>
              )}
              <span
                className={`property-status ${property.type.toLowerCase()}`}
              >
                {property.type}
              </span>
            </div>

            <div className="property-info">
              <h3 className="property-price">{property.price}</h3>
              <p className="property-description">{property.description}</p>
              <hr className="description-separator" />
              <div className="property-details">
                <span>
                  <FaBed /> {property.bedrooms} Beds
                </span>
                <span>
                  <FaBath /> {property.bathrooms} Baths
                </span>
              </div>
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  </motion.div>
</section>

      
      
    </>
  );
};

export default Home;




















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import "../styles/Home.css";
// import HeroBg from "../Assets/Hero-Image.webp";

// const Hero = () => {
//   const [listingType, setListingType] = useState("sale");
//   const [formData, setFormData] = useState({
//     propertyType: "",
//     keyword: "",
//     city: "",
//     bedrooms: "",
//     bathrooms: "",
//     price: 4000000000,
//   });
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const navigate = useNavigate();

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
//     <AnimatePresence>
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
//               >
//                 {type === "sale"
//                   ? "For Sale"
//                   : type === "rent"
//                   ? "For Rent"
//                   : "Shortlet"}
//               </motion.button>
//             ))}
//           </motion.div>

//           <motion.form
//             className="search-controls joined-search-controls"
//             onSubmit={handleSubmit}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//           >
//             <div className="hero-search-bar">
//               <div className="search-field">
//                 <label>Property Type</label>
//                 <select
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
//                 <label>Keyword</label>
//                 <input
//                   type="text"
//                   name="keyword"
//                   placeholder="Search by location or keyword"
//                   value={formData.keyword}
//                   onChange={handleChange}
//                   className="keyword-input"
//                 />
//               </div>

//               <button
//                 type="button"
//                 className="advanced-toggle inline"
//                 onClick={() => setShowAdvanced((prev) => !prev)}
//               >
//                 <FaPlus /> Advanced Search
//               </button>

//               <button type="submit">Search</button>
//             </div>

//             <button
//               type="button"
//               className="advanced-toggle mobile"
//               onClick={() => setShowAdvanced((prev) => !prev)}
//             >
//               <FaPlus /> Advanced Search
//             </button>

//             <AnimatePresence>
//               {showAdvanced && (
//                 <motion.div
//                   className="advanced-filters"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="search-field">
//                     <label>City</label>
//                     <select
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
//                     <label>Bedrooms</label>
//                     <select
//                       name="bedrooms"
//                       value={formData.bedrooms}
//                       onChange={handleChange}
//                     >
//                       <option value="">Any</option>
//                       {[1, 2, 3, 4, 5].map((n) => (
//                         <option key={n} value={n}>{n}+ Bedroom{n > 1 ? "s" : ""}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="search-field">
//                     <label>Bathrooms</label>
//                     <select
//                       name="bathrooms"
//                       value={formData.bathrooms}
//                       onChange={handleChange}
//                     >
//                       <option value="">Any</option>
//                       {[1, 2, 3, 4, 5].map((n) => (
//                         <option key={n} value={n}>{n}+ Bathroom{n > 1 ? "s" : ""}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="price-range-wrapper">
//                     <label>Price Range (₦)</label>
//                     <input
//                       type="range"
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
//     </AnimatePresence>
//   );
// };

// export default Hero;
