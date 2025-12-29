"use client";

import { Auction } from "@/types";
import AuctionCountdown from "./AuctionCountdown";
import CardImage from "../components/CardImage";
import Link from "next/link";
import CurrentBid from "./CurrentBid";

interface AuctionCardProps {
  car: Auction;
}

const AuctionCard = ({ car }: AuctionCardProps) => {
  return (
    <Link href={`/auctions/details/${car.id}`}>
      <div className="group h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400 hover:scale-105">
        {/* Image Container */}
        <div className="relative h-40 sm:h-48 md:h-52 bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden">
          <CardImage imageUrl={car.imageUrl} />
          <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-bl-lg font-bold text-sm sm:text-base shadow-lg">
            {car.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-all duration-300 line-clamp-2">
            {car.make} {car.model}
          </h3>

          {/* Year and Color */}
          <div className="flex justify-between items-start gap-2">
            <span className="text-gray-600 font-semibold text-sm sm:text-base">
              {car.color}
            </span>
            <span className="text-xs sm:text-sm text-white bg-emerald-600 px-2 sm:px-3 py-1 rounded-full font-semibold whitespace-nowrap">
              {car.status}
            </span>
          </div>

          {/* Car Information */}
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Harga:</span>
              <span className="font-bold text-amber-700 text-sm sm:text-base">
                Rp {car.reservePrice?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">KM:</span>
              <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                {car.milage?.toLocaleString() || "0"} km
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1 sm:my-2"></div>

          {/* Countdown Timer */}
          <div>
            <AuctionCountdown endDate={car.endedAt} />
          </div>
          <div>
            <CurrentBid
              amount={car.currentHighBid}
              reservePrice={car.reservePrice}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
