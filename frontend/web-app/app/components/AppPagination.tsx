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

  console.log(pageCount);

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
}
