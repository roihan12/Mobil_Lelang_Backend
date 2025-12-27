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
    <div className="flex items-center border-2 border-white/20 rounded-full py-2 px-3 sm:px-4 bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/15 transition-all duration-300 w-full">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Cari mobil..."
        className="grow px-2 py-1 focus:outline-none text-sm sm:text-base bg-transparent text-white placeholder-white/70"
      />
      <button
        onClick={handleSearch}
        className="px-3 sm:px-4 py-2 bg-orange-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs sm:text-sm whitespace-nowrap"
      >
        Cari
      </button>
    </div>
  );
}
