import React, { useMemo, useState, useEffect } from "react";
import ListingCard from "../Components/ListingCard";
import { fetchAllListings } from "../lib/listingApi";
import "../styles/Listings.css";

const PAGE_SIZE = 8;

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [beds, setBeds] = useState("any");
  const [baths, setBaths] = useState("any");
  const [priceMax, setPriceMax] = useState("");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  // Fetch all listings from Sanity
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchAllListings()
      .then((data) => {
        if (mounted) {
          setListings(data);
        }
      })
      .catch((err) => console.error("Failed to fetch listings:", err))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
  let mounted = true;
  setLoading(true);

  const formatPrice = (price) => price ? "₦" + Number(price).toLocaleString() : "₦0";

  fetchAllListings()
    .then((data) => {
      if (mounted) {
        const formatted = data.map(item => ({
          ...item,
          priceDisplay: formatPrice(item.price),
        }));
        setListings(formatted);
      }
    })
    .catch(err => console.error("Failed to fetch listings:", err))
    .finally(() => mounted && setLoading(false));

  return () => { mounted = false; };
}, []);

  const locations = useMemo(
    () => ["all", ...Array.from(new Set(listings.map((l) => l.location || "Unknown")))],
    [listings]
  );
  const types = useMemo(
    () => ["all", ...Array.from(new Set(listings.map((l) => l.type || "Unknown")))],
    [listings]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((item) => {
      if (location !== "all" && item.location.toLowerCase() !== location.toLowerCase()) return false;
      if (type !== "all" && item.type.toLowerCase() !== type.toLowerCase()) return false;
      if (status !== "all" && item.status.toLowerCase() !== status.toLowerCase()) return false;
      if (beds !== "any" && Number(item.bedrooms) < Number(beds)) return false;
      if (baths !== "any" && Number(item.bathrooms) < Number(baths)) return false;
      if (priceMax !== "" && Number(item.price) > Number(priceMax)) return false;
      if (q) {
        const hay = `${item.title} ${item.description} ${item.location}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [listings, query, location, type, status, beds, baths, priceMax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  useEffect(() => setPage(1), [query, location, type, status, beds, baths, priceMax]);

  if (loading) return <p>Loading listings…</p>;

  if (!listings.length) {
    return (
      <div className="listings-page container">
        <p>No properties available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="listings-page container">
      {/* ==== Search Panel ==== */}
      <section className="search-panel">
        <h2>Find your home</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search title, area or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === "all" ? "All Locations" : loc}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All Types" : t}
              </option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Any Status</option>
            <option value="for rent">For Rent</option>
            <option value="for sale">For Sale</option>
            <option value="shortlet">Shortlet</option>
          </select>

          <select value={beds} onChange={(e) => setBeds(e.target.value)}>
            <option value="any">Any Beds</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>

          <select value={baths} onChange={(e) => setBaths(e.target.value)}>
            <option value="any">Any Baths</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>

          <input
            type="text"
            className="price-input"
            placeholder="Max price (₦)"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value.replace(/[^0-9]/g, ""))}
          />

          <div className="view-toggle">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={view === "grid" ? "active" : ""}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={view === "list" ? "active" : ""}
            >
              List
            </button>
          </div>
        </div>
      </section>

      {/* ==== Featured ==== */}
      <section className="featured">
        <h3>Featured Properties</h3>
        <div className="featured-grid">
          {listings
            .filter((l) => l.featured)
            .slice(0, 4) 
            .map((item) => (
              <ListingCard key={item.id} data={item} compact />
            ))}
        </div>
      </section>

      {/* ==== Results ==== */}
      <section className="results">
        <h3>
          Results <small>({filtered.length})</small>
        </h3>
        <div
          className={`results-grid ${
            view === "list" ? "list-view" : "grid-view"
          }`}
        >
          {paged.map((item) => (
            <ListingCard key={item.id} data={item} />
          ))}
        </div>

        <div className="pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            &raquo;
          </button>
        </div>
      </section>
    </div>
  );
}