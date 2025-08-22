import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ data, compact = false }) {
  const [mainImage, setMainImage] = useState(data.image);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/listing/${data.id}`); // ✅ details route
  };

  const handleBookInspection = () => {
    navigate(`/inspection/${data.id}`); // ✅ inspection route
  };

  return (
    <div className={`listing-card ${compact ? "compact" : ""}`}>
      {/* Main image */}
      <div
        className="thumb"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        {data.status && (
          <span
            className={`badge ${
              data.status.toLowerCase() === "for sale"
                ? "for-sale"
                : data.status.toLowerCase() === "shortlet"
                ? "shortlet"
                : ""
            }`}
          >
            {data.status}
          </span>
        )}
      </div>

      {/* Gallery thumbnails */}
      {!compact && data.gallery && data.gallery.length > 0 && (
        <div className="gallery-thumbnails">
          {data.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${data.title} gallery ${idx + 1}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      {/* Card Body */}
      <div className="card-body">
        <h3 className="title">{data.title}</h3>
        <p className="desc">{data.description}</p>
        <p>
          <strong>{data.priceDisplay}</strong> — {data.bedrooms} Beds / {data.bathrooms} Baths
        </p>
        <p className="meta">{data.location}</p>
        <p className="meta">
          Type: {data.type || "N/A"} | Status: {data.status || "N/A"}
        </p>

        {/* Action buttons */}
        <div className="actions">
          <button className="btn" onClick={handleViewDetails}>
            View Details
          </button>
          <button className="btn primary" onClick={handleBookInspection}>
            Book Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
