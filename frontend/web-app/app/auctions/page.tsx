"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Auction,
  fetchListings,
  createListing,
  updateListing,
  deleteListing,
} from "@/lib/api";
import CarCard from "@/app/components/CarCard";
import CarFormModal from "@/app/components/CarFormModal";
import SearchFilter, { FilterOptions } from "@/app/components/SearchFilter";
import { FiPlus, FiLoader } from "react-icons/fi";

interface FormData {
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

const ListingsPage = () => {
  const [cars, setCars] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Auction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Load cars on mount and when search/filters change
  const loadCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchListings(searchTerm || undefined, filters);
      setCars(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cars");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filters]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleOpenModal = (car?: Auction) => {
    if (car) {
      setEditingCar(car);
    } else {
      setEditingCar(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleSubmitForm = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      if (editingCar) {
        await updateListing(editingCar.id, formData);
        setSuccessMessage("Mobil berhasil diperbarui!");
      } else {
        await createListing(formData);
        setSuccessMessage("Mobil berhasil ditambahkan!");
      }
      setTimeout(() => setSuccessMessage(""), 3000);
      await loadCars();
      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus mobil ini?")) return;

    try {
      setDeletingId(id);
      await deleteListing(id);
      setSuccessMessage("Mobil berhasil dihapus!");
      setTimeout(() => setSuccessMessage(""), 3000);
      await loadCars();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete car");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Daftar Mobil
            </h1>
            <p className="text-gray-600">
              Kelola dan cari mobil lelang dengan mudah
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <FiPlus size={20} />
            Tambah Mobil
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold">
            {error}
          </div>
        )}

        {/* Search and Filter */}
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="flex flex-col items-center gap-4">
              <FiLoader className="text-4xl text-blue-500 animate-spin" />
              <p className="text-gray-600 font-semibold">
                Memuat data mobil...
              </p>
            </div>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tidak ada mobil ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Coba ubah pencarian atau filter Anda, atau tambahkan mobil baru
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-2 bg-linear-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <FiPlus size={18} />
              Tambah Mobil Pertama
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Ditemukan{" "}
              <span className="font-bold text-gray-800">{cars.length}</span>{" "}
              mobil
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteCar}
                  isDeleting={deletingId === car.id}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <CarFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
        initialData={editingCar || undefined}
        title={editingCar ? "Edit Mobil" : "Tambah Mobil Baru"}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ListingsPage;
