import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";

const pageSizeOptions = [6, 12, 24];

export default function FilterPageSize() {
  const pageSize = useParamsStore((state) => state.pageSize);

  const onPageSizeChange = useParamsStore((state) => state.setParams);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page Size</span>
        <ButtonGroup>
          {pageSizeOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => onPageSizeChange({ pageSize: option })}
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
