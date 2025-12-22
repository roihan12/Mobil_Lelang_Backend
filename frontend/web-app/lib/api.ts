const API_BASE_URL = "http://localhost:6001";

// Simulate delay untuk real experience
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface Auction {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  milage: number;
  imageUrl: string;
  reservePrice: number;
  seller: string;
  winner: string | null;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  endedAt: string;
  status: string;
}

export interface FormData {
  make: string;
  model: string;
  year: number;
  color: string;
  milage: number;
  imageUrl: string;
  reservePrice: number;
  endedAt: string;
  seller: string;
}

// Fetch all listings
export async function fetchListings(
  searchQuery?: string,
  filters?: any
): Promise<Auction[]> {
  try {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    if (filters) {
      if (filters.minPrice) {
        params.append("minPrice", filters.minPrice);
      }
      if (filters.maxPrice) {
        params.append("maxPrice", filters.maxPrice);
      }
      if (filters.year) {
        params.append("year", filters.year);
      }
    }

    const url = `${API_BASE_URL}/search${
      params.toString() ? "?" + params.toString() : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    throw error;
  }
}

// Fetch single listing
export async function fetchListing(id: string): Promise<Auction | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    throw error;
  }
}

// Create new listing
export async function createListing(data: FormData): Promise<Auction> {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Failed to create listing:", error);
    throw error;
  }
}

// Update listing
export async function updateListing(
  id: string,
  data: Partial<FormData> | Partial<Auction>
): Promise<Auction | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Failed to update listing:", error);
    throw error;
  }
}

// Delete listing
export async function deleteListing(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete listing:", error);
    throw error;
  }
}
