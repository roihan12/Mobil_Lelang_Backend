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
          res = await updateAuction(id, data);
          id = auction.id;
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
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="grid grid-cols-2 gap-3">
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
          <div className="grid grid-cols-2 gap-3">
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

      <div className="flex justify-between">
        <Button color={"alternative"} onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty}>
          {isSubmitting && <Spinner size="sm" className="me-3" light />}
          Submit
        </Button>
      </div>
    </form>
  );
}
