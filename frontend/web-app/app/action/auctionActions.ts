"use server";

import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, PagedResult } from "@/types";
import { FieldValues } from "react-hook-form";

const API_BASE_URL = "http://localhost:6001";

// Fetch all listings
export async function fetchListings(
  query: string
): Promise<PagedResult<Auction>> {
  return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest(): Promise<{
  status: number;
  message: string;
}> {
  const data = {
    milage: Math.floor(Math.random() * 100000) + 1,
  };

  return fetchWrapper.put(
    `auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654`,
    data
  );
}

export async function createAuction(data: FieldValues) {
  return fetchWrapper.post(`auctions`, data);
}

export async function getDetailsViewData(id: string): Promise<Auction> {
  return fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(id: string, data: FieldValues) {
  return fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
  return fetchWrapper.del(`auctions/${id}`);
}
