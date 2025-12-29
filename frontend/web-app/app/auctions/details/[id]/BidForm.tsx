"use client";

import { placeBidforAuction } from "@/app/action/auctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { numberWithCommas } from "@/lib/numberWithComma";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        `Penawaran minimal saat ini adalah Rp ${numberWithCommas(highBid + 1)}`
      );
    }
    placeBidforAuction(auctionId, +data.amount)
      .then((res) => {
        if (res.error) {
          reset();
          throw new Error(res.error);
        }
        addBid(res);
        reset();
      })
      .catch((error) => toast.error(error.status + " " + error.message));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        className="grow px-2 py-1 focus:outline-none text-sm sm:text-base bg-transparent text-black placeholder-white/70"
        {...register("amount")}
        placeholder={`Masukkan penawaran minimal Rp${numberWithCommas(
          highBid + 1
        )}`}
      />
    </form>
  );
}
