import express from "express";
import cors from "cors";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = createClient({
  projectId: "ifcs0hka",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-01",
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

app.get("/api/listings", async (req, res) => {
  try {
    const data = await client.fetch(`*[_type == "property"] | order(_createdAt desc){
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
    }`);

    const listings = data.map((d) => ({
      id: d._id,
      title: d.title || "",
      description: d.description || "",
      price: d.price ?? 0,
      priceDisplay: `₦${(d.price ?? 0).toLocaleString()}`,
      location: d.location || "Unknown",
      bedrooms: d.bedrooms ?? 0,
      bathrooms: d.bathrooms ?? 0,
      featured: !!d.featured,
      type: (d.type || "").toString(),
      status: (d.status || "").toString(),
      image: d.image ? urlFor(d.image).width(1600).auto("format").url() : "",
      gallery: d.gallery ? d.gallery.map((img) => urlFor(img).width(1200).url()) : [],
    }));

    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
