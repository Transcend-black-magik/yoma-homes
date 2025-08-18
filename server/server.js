// server/server.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "..", "client", "public", "data", "listings.json");

function readData() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  try { return JSON.parse(raw); } catch (err) { console.error("parse error", err); return []; }
}

// meta route for UI choices
app.get("/api/listings/meta", (req, res) => {
  const data = readData();
  const locations = Array.from(new Set(data.map((d) => d.location))).sort();
  const prices = data.map((d) => Number(d.price || 0)).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1000000000;
  res.json({ locations, minPrice, maxPrice });
});

// main route
app.get("/api/listings", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const location = req.query.location || "";
  const type = req.query.type || "";
  const status = req.query.status || "";
  const beds = Number(req.query.beds || 0);
  const baths = Number(req.query.baths || 0);
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.max(1, Number(req.query.limit || 6));

  let all = readData();
  let filtered = all.filter((p) => {
    if (q) {
      const inText =
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q));
      if (!inText) return false;
    }
    if (location && p.location !== location) return false;
    if (type && p.type !== type) return false;
    if (status && p.status !== status) return false;
    if (beds && Number(p.bedrooms) < beds) return false;
    if (baths && Number(p.bathrooms) < baths) return false;
    if (minPrice != null && Number(p.price) < minPrice) return false;
    if (maxPrice != null && Number(p.price) > maxPrice) return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  res.json({ total, items });
});

// optional static JSON route
app.get("/data/listings.json", (req, res) => {
  if (fs.existsSync(DATA_PATH)) res.sendFile(DATA_PATH);
  else res.status(404).send("listings.json not found");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API server running on http://localhost:${port}`));
