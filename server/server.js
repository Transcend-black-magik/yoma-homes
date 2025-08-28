import express from "express";
import cors from "cors";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sanity client
const client = createClient({
  projectId: "ifcs0hka",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-01",
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// 🔹 Transform listings to normalized data
const transformListings = (data) =>
  data.map((d) => ({
    id: d._id,
    title: d.title || "",
    description: d.description || "",
    price: d.price ?? 0,
    priceDisplay: `₦${(d.price ?? 0).toLocaleString()}`,
    location: d.location || "Unknown",
    bedrooms: d.bedrooms ?? 0,
    bathrooms: d.bathrooms ?? 0,
    featured: !!d.featured,
    type: d.type ? String(d.type).toLowerCase() : "unknown",
    status: d.status ? String(d.status).toLowerCase() : "unknown",
    image: d.image
      ? urlFor(d.image).width(1600).auto("format").url()
      : "https://via.placeholder.com/1600x900?text=No+Image",
    gallery: d.gallery ? d.gallery.map((img) => urlFor(img).width(1200).url()) : [],
  }));

// 🔹 Generic listing fetch
const fetchListings = async (filter = "") => {
  const query = `*[_type == "property" ${filter}] | order(_createdAt desc){
    _id,
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    featured,
    type,
    status,
    image,
    gallery
  }`;
  const data = await client.fetch(query);
  return transformListings(data);
};

// 🔹 All Listings
app.get("/api/listings", async (req, res) => {
  try {
    const data = await fetchListings();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// 🔹 Home Listings (latest 4)
app.get("/api/listings/home", async (req, res) => {
  try {
    const data = await fetchListings().then((arr) => arr.slice(0, 4));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch home listings" });
  }
});

// 🔹 For Sale Listings
app.get("/api/listings/for-sale", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "for sale"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch for sale listings" });
  }
});

// 🔹 For Rent Listings
app.get("/api/listings/for-rent", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "for rent"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch for rent listings" });
  }
});

// 🔹 Shortlets Listings
app.get("/api/listings/shortlets", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "shortlet"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch shortlets" });
  }
});

// 🔹 Featured Listings
app.get("/api/listings/featured", async (req, res) => {
  try {
    const data = await fetchListings(`&& featured == true`);
    res.json(data.slice(0, 8));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch featured listings" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));