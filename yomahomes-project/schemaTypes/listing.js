// sanity studio: schemas/property.js
export default {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price", type: "number" },
    { name: "location", title: "Location", type: "string" },
    { name: "bedrooms", title: "Bedrooms", type: "number" },
    { name: "bathrooms", title: "Bathrooms", type: "number" },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "image", title: "Main Image", type: "image", options: { hotspot: true } },
    { name: "type", title: "Type", type: "string", options: { list: [ {title: 'For Sale', value: 'sale'}, {title: 'For Rent', value: 'rent'}, {title:'Short Let', value:'shortlet'} ] } },
    { name: "status", title: "Status", type: "string" }, // optional
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }
  ]
}
