"use client";
import { Button, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import { use, useEffect } from "react";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../action/auctionActions";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, year, milage } = auction;
      reset({ make, model, color, year, milage });
    }

    setFocus("make");
  }, [setFocus, auction, reset]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;

      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          id = auction.id;
          res = await updateAuction(id, data);
        }
      }

      if (res.error) {
        throw new Error(res.error);
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  return (
    <form
      className="flex flex-col mt-4 sm:mt-6 gap-3 sm:gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is requred" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is requred" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is requred" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input
          label="Year"
          name="year"
          type="number"
          control={control}
          rules={{ required: "Year is requred" }}
        />
        <Input
          label="Milage"
          name="milage"
          control={control}
          rules={{ required: "Milage is requred" }}
        />
      </div>

      {pathname === "/auctions/create" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              label="Reserve Price (enter 0 for no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Reserve Price is requred" }}
            />
            <DateInput
              name="endedAt"
              label="Auction end date/time"
              control={control}
              showTimeSelect
              dateFormat={"dd MMMM yyyy h:mm a"}
              rules={{ required: "Auction end is required" }}
            />
          </div>

          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image is requred" }}
          />
        </>
      )}

      <div className="flex justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
        <Button
          color={"light"}
          onClick={() => router.push("/")}
          className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 hover:bg-gray-100 transition-all font-semibold text-sm sm:text-base"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 hover:shadow-lg text-white font-bold text-sm sm:text-base transition-all disabled:opacity-50"
        >
          {isSubmitting && <Spinner size="sm" className="me-3" light />}
          Kirim
        </Button>
      </div>
    </form>
  );
}
