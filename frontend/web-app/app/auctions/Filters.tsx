import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill } from "react-icons/bs";

const pageSizeOptions = [6, 12, 24];

const orderButtons = [
  { label: "Alphabetical", icon: AiOutlineSortAscending, value: "make" },
  { label: "End date", icon: AiOutlineClockCircle, value: "endingSoon" },
  { label: "Recently added", icon: BsFillStopCircleFill, value: "new" },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);

  const setParams = useParamsStore((state) => state.setParams);

  const orderBy = useParamsStore((state) => state.orderBy);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>
        <ButtonGroup>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              <Icon className="mr-3 h-4 w-4 " /> {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page Size</span>
        <ButtonGroup>
          {pageSizeOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => setParams({ pageSize: option })}
              color={`${pageSize === option ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
