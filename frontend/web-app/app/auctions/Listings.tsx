"use client";

import { fetchListings } from "@/app/action/auctionActions";
import AuctionCard from "@/app/auctions/AuctionCard";
import { Auction, PagedResult } from "@/types";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import qs from "query-string";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import EmptyFilter from "../components/EmptyFilter";

const Listings = () => {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }))
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl(
    { url: "", query: params },
    { skipEmptyString: true }
  );

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings(url)
      .then((data: PagedResult<Auction>) => {
        setData(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      });
  }, [url]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Filters />
{data?.totalCount === 0 ? (
  <EmptyFilter showReset/>
  
): ( <><div className="p-6">
          <h1 className="text-4xl font-bold mb-8">Auction Listings</h1>
          {data && data.results.length === 0 ? (
            <p className="text-gray-600 text-lg">No listings available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.results.map((listing: Auction) => (
                <AuctionCard key={listing.id} car={listing} />
              ))}
            </div>
          )}
        </div><div className="flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data?.pageCount || 1}
              onPageChange={setPageNumber} />
          </div></>) }

     
    </>
  );
};

export default Listings;
