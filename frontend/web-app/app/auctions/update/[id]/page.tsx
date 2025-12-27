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
    <div className="mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white to-purple-50 rounded-2xl border-2 border-purple-100">
      <Heading
        title="Update Lelang"
        subtitle="Tolong update detail tentang mobil kamu"
        center
      />

      <AuctionForm auction={data} />
    </div>
  );
}
