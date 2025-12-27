import { Button } from "flowbite-react";
import Link from "next/link";

type Props = {
  id: string;
};

export default function EditButton({ id }: Props) {
  return (
    <Link href={`/auctions/update/${id}`}>
      <Button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base border-0">
        Update Lelang
      </Button>
    </Link>
  );
}
