import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBed, FaBath, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllListings, fetchListingsByType } from "../lib/listingApi";
import "../styles/ListingDetails.css";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [similarProperties, setSimilarProperties] = useState([]);

  // Fetch listing
  useEffect(() => {
    let mounted = true;
    const loadListing = async () => {
      try {
        const allListings = await fetchAllListings();
        const found = allListings.find((l) => l.id === id);
        if (mounted && found) {
          setListing(found);
          setMainImage(found.imageUrl || found.gallery?.[0]);
        }
      } catch (err) {
        console.error("Failed to fetch listing:", err);
      } finally {
        mounted && setLoading(false);
      }
    };
    loadListing();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Fetch similar properties
  useEffect(() => {
    if (!listing) return;
    const loadSimilar = async () => {
      try {
        const allSimilar = await fetchListingsByType(listing.type || "unknown");
        setSimilarProperties(allSimilar.filter((p) => p.id !== listing.id).slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch similar properties:", err);
      }
    };
    loadSimilar();
  }, [listing]);

  if (loading) return <p>Loading property details…</p>;
  if (!listing) return <p>Property not found.</p>;

  const galleryImages = [listing.image || listing.imageUrl, ...(listing.gallery || [])];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setMainImage(galleryImages[index]);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // Button action logic
  const getPrimaryAction = () => {
    const status = listing.status?.toLowerCase();
    if (status === "for sale") {
      return {
        label: "Get More Inquiries",
        link: "https://forms.zohopublic.com/YomaHomes/form/LETTEROFINTENTTOBUY/formperma/HM1ONVKUerZeEZXSQeY12eiP-k9q9Ep23YBGRRuhnWQ",
      };
    } else if (status === "for rent") {
      return {
        label: "Book Inspection",
        link: "https://forms.zohopublic.com/YomaHomes/form/AppointmentBookingForm/formperma/F0hOs2DzNFdDfoMWb8qCVW4PtvzZ_BSTys3pxAOXeSI",
      };
    }
    return { label: "Contact Us", link: "/contact" };
  };

  return (
    <motion.div
      className="listing-details-page container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Listings
      </button>

      <div className="listing-layout">
        {/* Gallery */}
        <div className="listing-gallery">
          <div className="main-image-wrapper">
            <img src={mainImage} alt={listing.title} className="main-image" />
          </div>

          {galleryImages.length > 0 && (
            <div className="thumbnail-gallery">
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img || "https://via.placeholder.com/1600x900?text=No+Image"}
                  alt={`${listing.title} ${idx + 1}`}
                  onClick={() => openLightbox(idx)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="listing-sidebar">
          <h1>{listing.title}</h1>
          <p className="listing-price">
            {listing.priceDisplay || `₦${(listing.price || 0).toLocaleString()}`}
          </p>
          <div className="listing-features">
            <span>
              <FaBed /> {listing.bedrooms || 0} Beds
            </span>
            <span>
              <FaBath /> {listing.bathrooms || 0} Baths
            </span>
          </div>
          <p>
            <strong>Location:</strong> {listing.location || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {listing.type || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {listing.status || "N/A"}
          </p>

          {/* Dynamic button */}
          {(() => {
            const action = getPrimaryAction();
            return (
              <button
                className="btn primary"
                onClick={() => window.open(action.link, "_blank")}
              >
                {action.label}
              </button>
            );
          })()}

          <button className="btn secondary" onClick={() => window.print()}>
            Print / Save
          </button>
        </div>
      </div>

      {/* Description & Metadata */}
      <div className="listing-details-content">
        <section className="description">
          <h2>Description</h2>
          <p>{listing.description || "No description available."}</p>
        </section>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="similar-properties">
          <h2>Similar Properties</h2>
          <div className="similar-grid">
            {similarProperties.map((prop) => (
              <div
                key={prop.id}
                className="similar-card"
                style={{ backgroundImage: `url(${prop.imageUrl})` }}
                onClick={() => navigate(`/listing/${prop.id}`)}
              >
                <div className="overlay" />
                <div className="similar-info">
                  <p className="price">
                    {prop.priceDisplay || `₦${(prop.price || 0).toLocaleString()}`}
                  </p>
                  <p className="title">{prop.title}</p>
                  <p className="status">{prop.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && galleryImages.length > 0 && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="lightbox-next" onClick={nextImage}>
              <FaChevronRight />
            </button>
            <motion.img
              key={galleryImages[lightboxIndex]}
              src={galleryImages[lightboxIndex]}
              alt={`Slide ${lightboxIndex + 1}`}
              className="lightbox-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ListingDetails;


























// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaBed, FaBath, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchAllListings, fetchListingsByType } from "../lib/listingApi";
// import "../styles/ListingDetails.css";

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [listing, setListing] = useState(null);
//   const [mainImage, setMainImage] = useState(""); // will set after fetch
//   const [loading, setLoading] = useState(true);

//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxIndex, setLightboxIndex] = useState(0);
//   const [similarProperties, setSimilarProperties] = useState([]);

//   // Fetch listing
//   useEffect(() => {
//     let mounted = true;
//     const loadListing = async () => {
//       try {
//         const allListings = await fetchAllListings();
//         const found = allListings.find(l => l.id === id);
//         if (mounted && found) {
//           setListing(found);
//           setMainImage(found.imageUrl || (found.gallery?.[0]));
//         }
//       } catch (err) {
//         console.error("Failed to fetch listing:", err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     };
//     loadListing();
//     return () => { mounted = false; };
//   }, [id]);

//   // Fetch similar properties
//   useEffect(() => {
//     if (!listing) return;
//     const loadSimilar = async () => {
//       try {
//         const allSimilar = await fetchListingsByType(listing.type || "unknown");
//         setSimilarProperties(allSimilar.filter(p => p.id !== listing.id).slice(0, 6));
//       } catch (err) {
//         console.error("Failed to fetch similar properties:", err);
//       }
//     };
//     loadSimilar();
//   }, [listing]);

//   if (loading) return <p>Loading property details…</p>;
//   if (!listing) return <p>Property not found.</p>;

//   const galleryImages = [listing.image || listing.imageUrl, ...(listing.gallery || [])];

//   const openLightbox = (index) => {
//     setLightboxIndex(index);
//     setLightboxOpen(true);
//     setMainImage(galleryImages[index]);
//   };
//   const closeLightbox = () => setLightboxOpen(false);
//   const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
//   const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
//     const handleBookInspection = () => {
//     window.open("https://forms.zohopublic.com/YomaHomes/form/AppointmentBookingForm/formperma/F0hOs2DzNFdDfoMWb8qCVW4PtvzZ_BSTys3pxAOXeSI");
//   };
// //   const excludeFields = ["id", "gallery", "image", "imageUrl", "priceDisplay", "title", "description"];
// //   const metadataFields = Object.keys(listing).filter((key) => !excludeFields.includes(key));

//   return (
//     <motion.div
//       className="listing-details-page container"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <button className="back-btn" onClick={() => navigate(-1)}>
//         <FaArrowLeft /> Back to Listings
//       </button>

//       <div className="listing-layout">
//         {/* Gallery */}
//         <div className="listing-gallery">
//           <div className="main-image-wrapper">
//             <img src={mainImage} alt={listing.title} className="main-image" />
//           </div>

//           {galleryImages.length > 0 && (
//             <div className="thumbnail-gallery">
//               {galleryImages.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img || "https://via.placeholder.com/1600x900?text=No+Image"}
//                   alt={`${listing.title} ${idx + 1}`}
//                   onClick={() => openLightbox(idx)}
//                   style={{ cursor: "pointer" }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="listing-sidebar">
//           <h1>{listing.title}</h1>
//           <p className="listing-price">{listing.priceDisplay || `₦${(listing.price || 0).toLocaleString()}`}</p>
//           <div className="listing-features">
//             <span><FaBed /> {listing.bedrooms || 0} Beds</span>
//             <span><FaBath /> {listing.bathrooms || 0} Baths</span>
//           </div>
//           <p><strong>Location:</strong> {listing.location || "N/A"}</p>
//           <p><strong>Type:</strong> {listing.type || "N/A"}</p>
//           <p><strong>Status:</strong> {listing.status || "N/A"}</p>
//           <button className="btn primary" onClick={handleBookInspection}>
//             Book Inspection
//           </button>
//           <button className="btn secondary" onClick={() => window.print()}>
//             Print / Save
//           </button>
//         </div>
//       </div>

//       {/* Description & Metadata */}
//       <div className="listing-details-content">
//         <section className="description">
//           <h2>Description</h2>
//           <p>{listing.description || "No description available."}</p>
//         </section>
//       </div>

//       {/* Similar Properties */}
//       {similarProperties.length > 0 && (
//         <section className="similar-properties">
//           <h2>Similar Properties</h2>
//           <div className="similar-grid">
//             {similarProperties.map(prop => (
//               <div
//                 key={prop.id}
//                 className="similar-card"
//                 style={{ backgroundImage: `url(${prop.imageUrl})` }}
//                 onClick={() => navigate(`/listing/${prop.id}`)}
//               >
//                 <div className="overlay" />
//                 <div className="similar-info">
//                   <p className="price">{prop.priceDisplay || `₦${(prop.price || 0).toLocaleString()}`}</p>
//                   <p className="title">{prop.title}</p>
//                   <p className="status">{prop.status}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxOpen && galleryImages.length > 0 && (
//           <motion.div className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <button className="lightbox-close" onClick={closeLightbox}><FaTimes /></button>
//             <button className="lightbox-prev" onClick={prevImage}><FaChevronLeft /></button>
//             <button className="lightbox-next" onClick={nextImage}><FaChevronRight /></button>
//             <motion.img
//               key={galleryImages[lightboxIndex]}
//               src={galleryImages[lightboxIndex]}
//               alt={`Slide ${lightboxIndex + 1}`}
//               className="lightbox-image"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default ListingDetails;
