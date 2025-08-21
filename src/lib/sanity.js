import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});

import imageUrlBuilder from "@sanity/image-url";
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
