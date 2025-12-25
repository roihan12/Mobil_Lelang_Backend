"use server";

import { auth } from "@/auth";
import { Auction, PagedResult } from "@/types";

const API_BASE_URL = "http://localhost:6001";

// Fetch all listings
export async function fetchListings(
  query: string
): Promise<PagedResult<Auction>> {
  try {
    const url = `${API_BASE_URL}/search${query}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    throw error;
  }
}

export async function updateAuctionTest(): Promise<{
  status: number;
  message: string;
}> {
  const data = {
    milage: Math.floor(Math.random() * 100000) + 1,
  };

  const session = await auth();

  console.log(session);

  const res = await fetch(
    `${API_BASE_URL}/auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return { status: res.status, message: res.statusText };
  }

  return { status: res.status, message: res.statusText };
}
