"use client";

import { useState } from "react";
import { Auction } from "@/lib/api";
import { FiX } from "react-icons/fi";

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

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (car: FormData) => Promise<void>;
  initialData?: Auction;
  title: string;
  isLoading?: boolean;
}

const CarFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  isLoading = false,
}: CarFormModalProps) => {
  const getInitialFormData = () => {
    if (initialData) {
      return {
        make: initialData.make,
        model: initialData.model,
        year: initialData.year,
        color: initialData.color || "",
        milage: initialData.milage || 0,
        imageUrl: initialData.imageUrl || "",
        reservePrice: initialData.reservePrice || 0,
        endedAt: initialData.endedAt || "",
        seller: initialData.seller || "",
      };
    }
    return {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      milage: 0,
      imageUrl: "",
      reservePrice: 0,
      endedAt: "",
      seller: "",
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)
      newErrors.year = "Year is invalid";
    if (!formData.color.trim()) newErrors.color = "Color is required";
    if (formData.milage < 0)
      newErrors.milage = "Mileage must be greater than or equal to 0";
    if (formData.reservePrice <= 0)
      newErrors.reservePrice = "Reserve price must be greater than 0";
    if (!formData.endedAt) newErrors.endedAt = "Auction end date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "milage" || name === "reservePrice"
          ? parseFloat(value)
          : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b bg-linear-to-r from-sky-50 to-blue-50">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Make and Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Make *
              </label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g., Toyota"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.make ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.make && (
                <p className="text-red-500 text-sm mt-1">{errors.make}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., Camry"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.model ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">{errors.model}</p>
              )}
            </div>
          </div>

          {/* Year and Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.year ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color *
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., White"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.color ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.color && (
                <p className="text-red-500 text-sm mt-1">{errors.color}</p>
              )}
            </div>
          </div>

          {/* Mileage and Reserve Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mileage (km) *
              </label>
              <input
                type="number"
                name="milage"
                value={formData.milage}
                onChange={handleChange}
                min="0"
                step="100"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.milage ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.milage && (
                <p className="text-red-500 text-sm mt-1">{errors.milage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reserve Price (Rp) *
              </label>
              <input
                type="number"
                name="reservePrice"
                value={formData.reservePrice}
                onChange={handleChange}
                min="0"
                step="1000"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.reservePrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.reservePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reservePrice}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Auction End Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Auction End Date *
            </label>
            <input
              type="datetime-local"
              name="endedAt"
              value={formData.endedAt}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.endedAt ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.endedAt && (
              <p className="text-red-500 text-sm mt-1">{errors.endedAt}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-linear-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Saving..." : "Save Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFormModal;
