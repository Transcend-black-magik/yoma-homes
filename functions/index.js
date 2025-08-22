// =====================================
// functions/index.js
// =====================================

import express from "express";
import cors from "cors";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {onRequest} from "firebase-functions/v2/https";

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Sanity client
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID || "ifcs0hka",
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2025-01-01",
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// Transform listings
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
    image: d.image ?
      urlFor(d.image).width(1600).auto("format").url() :
      "https://via.placeholder.com/1600x900?text=No+Image",
    gallery: d.gallery ?
      d.gallery.map((img) => urlFor(img).width(1200).url()) :
      [],
  }));

// Generic fetch
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

// Routes
app.get("/api/listings", async (req, res) => {
  try {
    const data = await fetchListings();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch listings"});
  }
});

app.get("/api/listings/home", async (req, res) => {
  try {
    const data = await fetchListings();
    res.json(data.slice(0, 4));
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch home listings"});
  }
});

app.get("/api/listings/for-sale", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "for sale"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch for sale listings"});
  }
});

app.get("/api/listings/for-rent", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "for rent"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch for rent listings"});
  }
});

app.get("/api/listings/shortlets", async (req, res) => {
  try {
    const data = await fetchListings(`&& status match "shortlet"`);
    res.json(data.slice(0, 6));
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch shortlets"});
  }
});

app.get("/api/listings/featured", async (req, res) => {
  try {
    const data = await fetchListings(`&& featured == true`);
    res.json(data.slice(0, 8));
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to fetch featured listings"});
  }
});

// Export Express app as Firebase Function
export const api = onRequest(app);
