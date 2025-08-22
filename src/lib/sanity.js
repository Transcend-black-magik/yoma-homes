// src/lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configure your Sanity client
const client = createClient({
  projectId: "ifcs0hka", // <-- replace with your Sanity project ID
  dataset: "production",        // <-- or your dataset name
  useCdn: false, 
  token: "skFtxx2xOaMz7zKsQfIsDjCngEUtjfElmgS8woigftLcSVixEzr9S33JLkOsLcTjM9nLgWDJKoEkmqUFWjHp0U8oMux23OfFx7y6xW4kbR8yHtzV6LpRSyWZSCyqnG7aVrfH3Vpk2NpxFgkmFuPFYZD0b6RVueKFEqWu7iIfnVnKjOmL2xKV",                // `false` if you want fresh data
  apiVersion: "2025-08-21",     // use today's date in YYYY-MM-DD format
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Default export for the client
export default client;
