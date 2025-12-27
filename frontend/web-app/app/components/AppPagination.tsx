"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";

type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
};

export default function AppPagination({
  currentPage,
  pageCount,
  onPageChange,
}: Props) {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center py-4 sm:py-6">
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={pageCount}
        layout="pagination"
        showIcons={true}
        className="flex flex-wrap justify-center gap-1 sm:gap-2"
      />
    </div>
  );
}
