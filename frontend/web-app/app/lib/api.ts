const API_URL = "http://localhost:6001";

export interface Auction {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  milage: number;
  imageUrl: string;
  reservePrice: number;
  currentHighBid: number;
  soldAmount: number;
  seller: string;
  winner: string | null;
  status: "Live" | "Ended" | "Sold";
  createdAt: string;
  updatedAt: string;
  endedAt: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  condition?: string;
  description?: string;
  image?: string;
}

// Fetch all cars with search and filters
export async function fetchCars(
  search?: string,
  filters?: {
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }
) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filters?.minYear) params.append("minYear", filters.minYear.toString());
    if (filters?.maxYear) params.append("maxYear", filters.maxYear.toString());
    if (filters?.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters?.condition) params.append("condition", filters.condition);

    const res = await fetch(`${API_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch cars");
    return await res.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
}

// Fetch single car by ID
export async function fetchCarById(id: string) {
  try {
    const res = await fetch(`${API_URL}/cars/${id}`);
    if (!res.ok) throw new Error("Failed to fetch car");
    return await res.json();
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
}

// Create new car
export async function createCar(car: Omit<Car, "id">) {
  try {
    const res = await fetch(`${API_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error("Failed to create car");
    return await res.json();
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}

// Update car
export async function updateCar(id: string, car: Partial<Car>) {
  try {
    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error("Failed to update car");
    return await res.json();
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
}

// Delete car
export async function deleteCar(id: string) {
  try {
    const res = await fetch(`${API_URL}/cars/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete car");
    return await res.json();
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
}
