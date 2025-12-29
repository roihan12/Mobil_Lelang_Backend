import { numberWithCommas } from "@/lib/numberWithComma";
import { Bid } from "@/types";
import { format } from "date-fns";

type Props = {
  bid: Bid;
};

export default function BidItem({ bid }: Props) {
  function getBidInfo() {
    let bgColor = "";
    let text = "";

    switch (bid.bidStatus) {
      case "Accepted":
        bgColor = "bg-green-600";
        text = "Diterima";
        break;
      case "AcceptedBelowReserve":
        bgColor = "bg-amber-600";
        text = "Diterima di bawah reserve";
        break;
      case "TooLow":
        bgColor = "bg-red-600";
        text = "Tidak diterima";
        break;
      default:
        bgColor = "bg-gray-600";
        text = "Belum diterima";
        break;
    }

    return {
      bgColor,
      text,
    };
  }

  return (
    <div
      className={`border-gray-300 border-2 px-3 py-2 rounded-lg flex justify-between items-center mb-2 ${
        getBidInfo().bgColor
      }`}
    >
      <div className="flex flex-col">
        <span>Bidder: {bid.bidder}</span>
        <span className="text-gray-700 text-sm">
          Time : {format(bid.bidTime, "dd MMM yyyy hh:mm:ss a")}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">
          Rp {numberWithCommas(bid.amount)}
        </div>
        <div className="flex flex-row items-center">
          <span>{getBidInfo().text}</span>
        </div>
      </div>
    </div>
  );
}
