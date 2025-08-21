export async function fetchAllListings() {
  const res = await fetch("http://localhost:5000/api/listings");
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}
