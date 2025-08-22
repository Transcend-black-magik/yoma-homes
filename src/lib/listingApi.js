// src/lib/listingApi.js
import client, { urlFor } from "./sanity";

// Helper to normalize listing data
function normalizeListing(item) {
  return {
    ...item,
    id: item._id,
    imageUrl: item.image ? urlFor(item.image).url() : null,
    gallery: item.gallery ? item.gallery.map((img) => urlFor(img).url()) : [],
  };
}

// Fetch all properties
export async function fetchAllListings() {
  const query = `*[_type == "property"] | order(_createdAt desc){
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
  const listings = await client.fetch(query);
  return listings.map(normalizeListing);
}

// Fetch featured properties
export async function fetchFeaturedListings() {
  const query = `*[_type == "property" && featured == true] | order(_createdAt desc){
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
  const listings = await client.fetch(query);
  return listings.map(normalizeListing);
}

// Fetch properties by type (sale, rent, shortlet)
export async function fetchListingsByType(type) {
  const query = `*[_type == "property" && type == $type] | order(_createdAt desc){
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
  const listings = await client.fetch(query, { type });
  return listings.map(normalizeListing);
}














// // src/lib/listingApi.js
// import { client, urlFor } from "./sanity";

// // Fetch all properties
// export async function fetchAllListings() {
//   const query = `*[_type == "property"] | order(_createdAt desc) {
//     _id,
//     title,
//     description,
//     price,
//     location,
//     bedrooms,
//     bathrooms,
//     featured,
//     type,
//     status,
//     "imageUrl": image.asset->_ref,
//     gallery
//   }`;
//   const listings = await client.fetch(query);

//   // resolve image urls
//   return listings.map(item => ({
//     ...item,
//     imageUrl: item.imageUrl ? urlFor(item.imageUrl).url() : null,
//     gallery: item.gallery
//       ? item.gallery.map(img => urlFor(img).url())
//       : []
//   }));
// }

// // Fetch featured properties
// export async function fetchFeaturedListings() {
//   const query = `*[_type == "property" && featured == true] | order(_createdAt desc) {
//     _id,
//     title,
//     description,
//     price,
//     location,
//     bedrooms,
//     bathrooms,
//     featured,
//     type,
//     status,
//     "imageUrl": image.asset->_ref,
//     gallery
//   }`;
//   const listings = await client.fetch(query);

//   return listings.map(item => ({
//     ...item,
//     imageUrl: item.imageUrl ? urlFor(item.imageUrl).url() : null,
//     gallery: item.gallery
//       ? item.gallery.map(img => urlFor(img).url())
//       : []
//   }));
// }

// // Fetch properties by type (sale, rent, shortlet)
// export async function fetchListingsByType(type) {
//   const query = `*[_type == "property" && type == $type] | order(_createdAt desc) {
//     _id,
//     title,
//     description,
//     price,
//     location,
//     bedrooms,
//     bathrooms,
//     featured,
//     type,
//     status,
//     "imageUrl": image.asset->_ref,
//     gallery
//   }`;
//   const listings = await client.fetch(query, { type });

//   return listings.map(item => ({
//     ...item,
//     imageUrl: item.imageUrl ? urlFor(item.imageUrl).url() : null,
//     gallery: item.gallery
//       ? item.gallery.map(img => urlFor(img).url())
//       : []
//   }));
// }
