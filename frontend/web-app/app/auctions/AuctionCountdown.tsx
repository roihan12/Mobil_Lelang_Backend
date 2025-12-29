"use client";

import { useBidStore } from "@/hooks/useBidStore";
import { usePathname } from "next/navigation";
import Countdown from "react-countdown";

interface AuctionCountdownProps {
  endDate: string;
}

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return (
      <div className="text-center py-2 sm:py-3 bg-red-100 rounded-xl border border-red-200">
        <p className="text-red-700 font-bold text-sm sm:text-base">
          Lelang Selesai
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-2 sm:p-3 border border-gray-300">
      <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2 font-semibold">
        Sisa Waktu:
      </p>
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        <div className="bg-white rounded-lg p-1 sm:p-2 text-center border border-gray-300">
          <p className="font-bold text-blue-700 text-xs sm:text-sm md:text-base">
            {days}
          </p>
          <p className="text-xs text-gray-600">hari</p>
        </div>
        <div className="bg-white rounded-lg p-1 sm:p-2 text-center border border-gray-300">
          <p className="font-bold text-blue-700 text-xs sm:text-sm md:text-base">
            {hours}
          </p>
          <p className="text-xs text-gray-600">jam</p>
        </div>
        <div className="bg-white rounded-lg p-1 sm:p-2 text-center border border-gray-300">
          <p className="font-bold text-blue-700 text-xs sm:text-sm md:text-base">
            {minutes}
          </p>
          <p className="text-xs text-gray-600">min</p>
        </div>
        <div className="bg-white rounded-lg p-1 sm:p-2 text-center border border-gray-300">
          <p className="font-bold text-blue-700 text-xs sm:text-sm md:text-base">
            {seconds}
          </p>
          <p className="text-xs text-gray-600">det</p>
        </div>
      </div>
    </div>
  );
};

const AuctionCountdown = ({ endDate }: AuctionCountdownProps) => {
  const setOpen = useBidStore((state) => state.setOpen);
  const pathname = usePathname();

  function auctionFinished() {
    if (pathname.startsWith("auctions/details")) {
      setOpen(false);
    }
  }

  return (
    <div>
      <Countdown
        date={new Date(endDate)}
        renderer={renderer}
        onComplete={auctionFinished}
      />
      ;
    </div>
  );
};

export default AuctionCountdown;
