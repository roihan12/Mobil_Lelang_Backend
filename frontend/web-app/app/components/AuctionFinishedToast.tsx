import { numberWithCommas } from "@/lib/numberWithComma";
import { Auction, AuctionFinished } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  finishedAuction: AuctionFinished;
  auction: Auction;
};

export default function AuctionFinishedToast({
  auction,
  finishedAuction,
}: Props) {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={auction.imageUrl}
          alt={auction.make}
          width={80}
          height={80}
          className="w-auto h-auto rounded-lg"
        />
        <div className="flex flex-col">
          <span>
            Lelang selesai untuk {auction.make} {auction.model}
            {finishedAuction.itemSold && finishedAuction.amount ? (
              <p>
                Selman telah memenangi lelang ini {finishedAuction.winner}{" "}
                dengan penawaran Rp {numberWithCommas(finishedAuction.amount)}.
              </p>
            ) : (
              <p>Item tidak terjual</p>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
