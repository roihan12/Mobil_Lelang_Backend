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
    <Button color="failure" onClick={handleDelete} disabled={loading}>
      {loading && <Spinner size="sm" className="mr-3" />}
      Hapus Lelang
    </Button>
  );
}
