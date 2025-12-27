import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-100">
      <Heading
        title="Ayo Lelang Mobilmu Sekarang!"
        subtitle="Tolong isi detail tentang mobil kamu dengan lengkap"
        center
      />
      <AuctionForm />
    </div>
  );
}
