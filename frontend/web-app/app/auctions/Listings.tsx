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
      seller: state.seller,
      winner: state.winner,
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
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 mb-6 sm:mb-8">
              Lelang Mobil
            </h1>
            {data && data.results.length === 0 ? (
              <p className="text-gray-600 text-base sm:text-lg md:text-xl">
                Tidak ada daftar tersedia
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {data?.results.map((listing: Auction) => (
                  <AuctionCard key={listing.id} car={listing} />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data?.pageCount || 1}
              onPageChange={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Listings;
