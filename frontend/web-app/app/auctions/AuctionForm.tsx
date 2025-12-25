"use client";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import { useEffect } from "react";
import DateInput from "../components/DateInput";
import { createAuction } from "../action/auctionActions";

export default function AuctionForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm();

  useEffect(() => setFocus("make"), [setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      const res = await createAuction(data);
      if (res.error) {
        throw new Error(res.error);
      }
      router.push(`/auctions/details/${res.id}`);
    } catch (error) {
      console.log(error);
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
