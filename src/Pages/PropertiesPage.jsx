// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// const PropertiesPage = ({ properties }) => {
//   const location = useLocation();
//   const [listingTypeFilter, setListingTypeFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProperties, setFilteredProperties] = useState(properties);

//   // Read query param on page load or URL change
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const typeFromQuery = params.get("listingType"); // 'sale' or 'rent'
//     if (typeFromQuery) {
//       setListingTypeFilter(typeFromQuery.toLowerCase());
//     } else {
//       setListingTypeFilter("");
//     }
//   }, [location.search]);

//   // Apply both query-based filter + search filter
//   useEffect(() => {
//     let result = [...properties];

//     if (listingTypeFilter) {
//       result = result.filter(
//         (p) => p.type.toLowerCase() === listingTypeFilter
//       );
//     }

//     if (searchTerm.trim() !== "") {
//       result = result.filter((p) =>
//         p.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredProperties(result);
//   }, [listingTypeFilter, searchTerm, properties]);

//   return (
//     <div>
//       <h1>All Properties</h1>

//       {/* Filter Controls */}
//       <div style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Search properties..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: 8, marginRight: 10 }}
//         />

//         <select
//           value={listingTypeFilter}
//           onChange={(e) => setListingTypeFilter(e.target.value)}
//         >
//           <option value="">All Types</option>
//           <option value="sale">Sale</option>
//           <option value="rent">Rent</option>
//         </select>
//       </div>

//       {/* Properties List */}
//       <div className="properties-grid">
//         {filteredProperties.map((property) => (
//           <div key={property.id} className="property-card">
//             <img src={property.image} alt={property.title} />
//             <h2>{property.title}</h2>
//             <p>{property.type}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertiesPage;
