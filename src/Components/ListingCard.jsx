import React, { useState } from "react";
import "../styles/ListingCard.css";

export default function ListingCard({ data, compact = false }) {
  const [mainImage, setMainImage] = useState(data.image);

  return (
    <div className={`listing-card ${compact ? "compact" : ""}`}>
      <img src={mainImage} alt={data.title} className="listing-main-image" />

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

      <div className="listing-info">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <p>
          <strong>{data.priceDisplay}</strong> — {data.bedrooms} Beds / {data.bathrooms} Baths
        </p>
        <p>{data.location}</p>
        <p>Type: {data.type || "N/A"} | Status: {data.status || "N/A"}</p>
      </div>
    </div>
  );
}
