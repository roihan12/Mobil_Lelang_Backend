"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import { use, useEffect, useState } from "react";

export default function Search() {
  const setParams = useParamsStore((state) => state.setParams);

  const searchTerm = useParamsStore((state) => state.searchTerm);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (searchTerm === "") setValue("");
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    setParams({ searchTerm: value });
  };

  return (
    <div className="flex items-center border-2 border-gray-300 rounded-full py-2 px-4 bg-white">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Search car now"
        className="grow px-2 py-1 focus:outline-none text-sm"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </div>
  );
}
