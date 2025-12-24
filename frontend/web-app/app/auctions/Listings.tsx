import { fetchListings } from "@/lib/api";
import CarCard from "@/app/components/CarCard";
import { Auction, PagedResult } from "@/types";
import AppPagination from "../components/AppPagination";

const Listings = async () => {
  let listings: PagedResult<Auction> = {
    results: [],
    pageCount: 0,
    totalCount: 0,
  };
  let error: string | null = null;

  try {
    const data = await fetchListings();
    listings = data || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching listings:", err);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-8">Auction Listings</h1>
        {listings.results.length === 0 ? (
          <p className="text-gray-600 text-lg">No listings available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.results.map((listing: Auction) => (
              <CarCard key={listing.id} car={listing} showActions={false} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <AppPagination currentPage={1} pageCount={listings.pageCount} />
      </div>
    </>
  );
};

export default Listings;
