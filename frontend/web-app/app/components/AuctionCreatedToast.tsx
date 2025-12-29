import { Auction } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  auction: Auction;
};

export default function AuctionCreatedToast({ auction }: Props) {
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
        <span>
          Cek Lelang baru berhasil dibuat untuk {auction.make} {auction.model}
        </span>
      </div>
    </Link>
  );
}
