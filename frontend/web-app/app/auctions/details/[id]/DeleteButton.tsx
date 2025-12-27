"use client";
import { deleteAuction } from "@/app/action/auctionActions";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleDelete() {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        router.push("/");
      })
      .catch((error) => toast.error(error.status + " " + error.message))
      .finally(() => setLoading(false));
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 sm:px-6 py-2 sm:py-3 bg-red-700 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base border-0 disabled:opacity-50"
    >
      {loading && <Spinner size="sm" className="mr-2 sm:mr-3" />}
      Hapus Lelang
    </Button>
  );
}
