/* ========================
   src/components/ListingCard.jsx
   (Card component for each listing)
   ======================== */

import React from 'react';

export default function ListingCard({data, compact}){
  return (
    <article className={"listing-card " + (compact? 'compact':'') }>
      <div className="thumb" style={{backgroundImage:`url(${data.image})`}}>
        <span className={`badge ${data.status.replace(/\s+/g,'-')}`}>{data.status}</span>
      </div>

      <div className="card-body">
        <h4 className="title">{data.title}</h4>
        <div className="meta">{data.location} • ₦{numberWithCommas(data.price)}</div>
        {!compact && <p className="desc">{data.description}</p>}

        <div className="specs">
          <span>{data.beds} Br</span>
          <span>{data.baths} Ba</span>
          <span>{data.size} sqft</span>
        </div>

        {!compact && <div className="actions">
          <button className="btn primary">View details</button>
          <button className="btn">Contact</button>
        </div>}
      </div>
    </article>
  );
}

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}