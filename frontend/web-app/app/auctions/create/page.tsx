import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Ayo lelang mobilmu sekarang!"
        subtitle="Tolong isi detail tentang mobil kamu"
      />
      <AuctionForm />
    </div>
  );
}
