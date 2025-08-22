// src/lib/sanity.js
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: "2023-01-01", // keep this stable
  useCdn: true,
  token: process.env.REACT_APP_SANITY_API_TOKEN, // optional, only if you need write access
});

// image URL builder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);






// import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// // Replace with your own values from Sanity project settings
// const client = createClient({
//   projectId: "ifcs0hka",   // e.g. "abcd1234"
//   dataset: "production",          // default dataset
//   useCdn: true,                   // `true` for faster read-only queries
//   apiVersion: "2025-01-01",       // use a UTC date string
// });

// const builder = imageUrlBuilder(client);
// export const urlFor = (source) => builder.image(source);

// export default client;
