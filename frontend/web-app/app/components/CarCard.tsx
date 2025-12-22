"use client";

import { useState, useEffect } from "react";
import { Auction } from "@/lib/api";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import AuctionCountdown from "./AuctionCountdown";
import CardImage from "./CardImage";

interface CarCardProps {
  car: Auction;
  onEdit?: (car?: Auction) => void;
  onDelete?: (id: string) => Promise<void>;
  isDeleting?: boolean;
  showActions?: boolean;
}

const CarCard = ({
  car,
  onEdit,
  onDelete,
  isDeleting = false,
  showActions = true,
}: CarCardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage or session
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setIsAuthenticated(!!token);
  }, []);

  return (
    <a href="">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <CardImage imageUrl={car.imageUrl} />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {car.make} {car.model}
          </h3>

          {/* Year and Color */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-gray-600 font-semibold">{car.year}</span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {car.color}
            </span>
          </div>

          {/* Car Information */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-bold text-blue-600">
                Rp {car.reservePrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mileage:</span>
              <span className="font-semibold text-gray-800">
                {car.milage.toLocaleString()} km
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transmission:</span>
              <span className="font-semibold text-gray-800">{car.seller}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type:</span>
              <span className="font-semibold text-gray-800">{car.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Condition:</span>
              <span className="font-semibold text-gray-800">{car.year}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Countdown Timer */}
          <div className="mb-4">
            <AuctionCountdown endDate={car.endedAt} />
          </div>

          {/* Action Buttons - Only show if authenticated */}
          {showActions && isAuthenticated && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(car)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                <FiEdit size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete?.(car.id)}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiTrash size={16} />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default CarCard;
