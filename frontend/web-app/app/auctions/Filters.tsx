import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeOptions = [6, 12, 24];

const orderButtons = [
  { label: "Alphabetical", icon: AiOutlineSortAscending, value: "make" },
  { label: "End date", icon: AiOutlineClockCircle, value: "endingSoon" },
  { label: "Recently added", icon: BsFillStopCircleFill, value: "new" },
];

const filterButtons = [
  { label: "Live Autions", icon: GiFlame, value: "live" },
  { label: "End < 6 hours", icon: GiFinishLine, value: "endingSoon" },
  { label: "Completed", icon: BsStopwatchFill, value: "finished" },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);

  const setParams = useParamsStore((state) => state.setParams);

  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
      <div className="w-full sm:w-auto">
        <span className="uppercase text-xs sm:text-sm font-bold text-gray-600 mr-2 sm:mr-3 block sm:inline mb-2 sm:mb-0">
          Filter
        </span>
        <ButtonGroup>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? "info" : "light"}`}
              className={`focus:ring-0 text-xs sm:text-sm ${
                filterBy === value
                  ? "bg-blue-700 text-white border-0"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              <Icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{label}</span>
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="w-full sm:w-auto">
        <span className="uppercase text-xs sm:text-sm font-bold text-gray-600 mr-2 sm:mr-3 block sm:inline mb-2 sm:mb-0">
          Urutkan
        </span>
        <ButtonGroup>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "info" : "light"}`}
              className={`focus:ring-0 text-xs sm:text-sm ${
                orderBy === value
                  ? "bg-orange-600 text-white border-0"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              <Icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{label}</span>
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="w-full sm:w-auto">
        <span className="uppercase text-xs sm:text-sm font-bold text-gray-600 mr-2 sm:mr-3 block sm:inline mb-2 sm:mb-0">
          Per Halaman
        </span>
        <ButtonGroup>
          {pageSizeOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => setParams({ pageSize: option })}
              color={`${pageSize === option ? "info" : "light"}`}
              className={`focus:ring-0 text-xs sm:text-sm px-3 sm:px-4 ${
                pageSize === option
                  ? "bg-emerald-600 text-white border-0"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
