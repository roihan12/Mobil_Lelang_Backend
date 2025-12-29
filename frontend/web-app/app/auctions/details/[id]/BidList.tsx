"use client";
import { getBidsForAuction } from "@/app/action/auctionActions";
import Heading from "@/app/components/Heading";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";
import { numberWithCommas } from "@/lib/numberWithComma";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "./BidForm";

type Props = {
  user: User | null;
  auction: Auction;
};

export default function BidList({ user, auction }: Props) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);

  const setOpen = useBidStore((state) => state.setOpen);
  const openForBids = new Date(auction.endedAt) > new Date();

  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
        ? current.amount
        : prev,
    0
  );

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        }
        setBids(res as Bid[]);
      })
      .catch((error) => toast.error(error.status + " " + error.message))
      .finally(() => setLoading(false));
  }, [auction.id, setBids]);

  useEffect(() => {
    setOpen(openForBids);
  }, [openForBids, setOpen]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="border-2 border-blue-200 rounded-2xl p-4 sm:p-6 bg-linear-to-br from-blue-50 to-purple-50 shadow-lg">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading
            title={`Penawaran Terbesar saat ini : Rp ${numberWithCommas(
              highBid
            )}`}
          />
        </div>
      </div>
      <div className="overflow-auto h-87.5 flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter title="Tidak ada penawaran untuk item ini" subtitle="" />
        ) : (
          <>
            <Heading title="Penawaran" />
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className=" flex items-center justify-center p-2 text-lg font-semibold">
            Penawaran ditutup
          </div>
        ) : !user ? (
          <div className=" flex items-center justify-center p-2 text-lg font-semibold">
            Silahkan login untuk melakukan penawaran
          </div>
        ) : user && user.username === auction.seller ? (
          <div className=" flex items-center justify-center p-2 text-lg font-semibold">
            Anda adalah penjual, tidak dapat melakukan penawaran
          </div>
        ) : (
          <div className=" flex items-center justify-center p-2 text-lg font-semibold">
            Silahkan melakukan penawaran
            <BidForm auctionId={auction.id} highBid={highBid} />
          </div>
        )}
      </div>
    </div>
  );
}
