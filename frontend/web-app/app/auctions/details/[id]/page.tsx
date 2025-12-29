import {
  getBidsForAuction,
  getDetailsViewData,
} from "@/app/action/auctionActions";
import Heading from "@/app/components/Heading";
import AuctionCountdown from "../../AuctionCountdown";
import CardImage from "@/app/components/CardImage";
import DetailedSpecs from "./DetailedSpecs";
import EditButton from "./EditButton";
import { getCurrentUser } from "@/app/action/authActions";
import DeleteButton from "./DeleteButton";
import BidItem from "./BidItem";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getDetailsViewData(id);

  const user = await getCurrentUser();

  const bids = await getBidsForAuction(id);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-700">
            Sisa Waktu:
          </h3>
          <div className="w-full sm:w-auto">
            <AuctionCountdown endDate={data.endedAt} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="lg:col-span-2 relative w-full h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-125 bg-gray-300 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg">
          <CardImage imageUrl={data.imageUrl} />
        </div>
        <div className="border-2 border-blue-200 rounded-2xl p-4 sm:p-6 bg-linear-to-br from-blue-50 to-purple-50 shadow-lg">
          <Heading title="Penawaran" />
          {bids.map((bid) => (
            <BidItem key={bid.id} bid={bid} />
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 rounded-2xl overflow-hidden shadow-xl">
        <DetailedSpecs auction={data} />
      </div>
    </>
  );
}
