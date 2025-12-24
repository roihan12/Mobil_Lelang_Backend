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
