"use client";

import Countdown from "react-countdown";

interface AuctionCountdownProps {
  endDate: string;
}

const AuctionCountdown = ({ endDate }: AuctionCountdownProps) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <div className="text-center py-3 bg-red-100 rounded-lg">
          <p className="text-red-600 font-bold">Auction Ended</p>
        </div>
      );
    }

    return (
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-sm text-gray-600 mb-2 font-semibold">
          Time Remaining:
        </p>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">{days}</p>
            <p className="text-xs text-gray-600">days</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">{hours}</p>
            <p className="text-xs text-gray-600">hrs</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">{minutes}</p>
            <p className="text-xs text-gray-600">min</p>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <p className="font-bold text-blue-600">{seconds}</p>
            <p className="text-xs text-gray-600">sec</p>
          </div>
        </div>
      </div>
    );
  };

  return <Countdown date={new Date(endDate)} renderer={renderer} />;
};

export default AuctionCountdown;
