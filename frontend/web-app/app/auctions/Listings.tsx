"use client";

import { fetchListings } from "@/app/action/auctionActions";
import AuctionCard from "@/app/auctions/AuctionCard";
import { Auction, PagedResult } from "@/types";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import FilterPageSize from "./FilterPageSize";

const Listings = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    fetchListings(pageNumber, pageSize)
      .then((data: PagedResult<Auction>) => {
        setAuctions(data.results || []);
        setPageCount(data.pageCount);
      })
      .catch((err: Error) => {
        setError(err.message);
      });
  }, [pageNumber, pageSize]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <FilterPageSize pageSize={pageSize} onPageSizeChange={setPageSize} />
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-8">Auction Listings</h1>
        {auctions.length === 0 ? (
          <p className="text-gray-600 text-lg">No listings available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((listing: Auction) => (
              <AuctionCard key={listing.id} car={listing} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={pageNumber}
          pageCount={pageCount}
          onPageChange={setPageNumber}
        />
      </div>
    </>
  );
};

export default Listings;
