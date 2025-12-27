import { getDetailsViewData } from "@/app/action/auctionActions";
import Heading from "@/app/components/Heading";
import AuctionForm from "../../AuctionForm";

export default async function Update({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getDetailsViewData(id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update Lelang"
        subtitle="Tolong update detail tentang mobil kamu"
      />

      <AuctionForm auction={data} />
    </div>
  );
}
