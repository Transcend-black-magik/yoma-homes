const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Sanity client
const client = sanityClient({
  projectId: "ifcs0hka", // replace with your project ID
  dataset: "production",
  apiVersion: "2025-08-23",
  useCdn: true,
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
    image: d.image ?
      urlFor(d.image).width(1600).auto("format").url() :
      "https://via.placeholder.com/1600x900?text=No+Image",
    gallery: d.gallery ?
      d.gallery.map((img) => urlFor(img).width(1200).auto("format").url()) :
      [],
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

// ====== ROUTES ======

// All Listings
app.get("/listings", async (req, res) => {
  try {
    const data = await fetchListings();
    res.json(data);
  } catch (err) {
    console.error("Error fetching all listings:", err);
    res.status(500).json({error: "Failed to fetch listings"});
  }
});

// Featured Listings
app.get("/listings/featured", async (req, res) => {
  try {
    const data = await fetchListings(`&& featured == true`);
    res.json(data.slice(0, 8));
  } catch (err) {
    console.error("Error fetching featured listings:", err);
    res.status(500).json({error: "Failed to fetch featured listings"});
  }
});

// Listings by Type (for-sale, for-rent, shortlets, etc.)
app.get("/listings/type/:type", async (req, res) => {
  try {
    const type = req.params.type.toLowerCase();
    const data = await fetchListings(`&& status match "${type}"`);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching ${req.params.type} listings:`, err);
    res.status(500).json({error:
      `Failed to fetch ${req.params.type} listings`});
  }
});

// Home Listings (latest 4)
app.get("/listings/home", async (req, res) => {
  try {
    const data = await fetchListings();
    res.json(data.slice(0, 4));
  } catch (err) {
    console.error("Error fetching home listings:", err);
    res.status(500).json({error: "Failed to fetch home listings"});
  }
});

// ====== EXPORT ======
exports.api = functions.https.onRequest(app);
