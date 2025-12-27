"use client";

import { Auction } from "@/types";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";

type Props = {
  auction: Auction;
};
export default function DetailedSpecs({ auction }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-lg">
      <Table striped={true} className="divide-y-2 divide-blue-200">
        <TableBody className="divide-y-2 divide-blue-200">
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-blue-100 to-blue-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Penjual
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-medium">
              {auction.seller}
            </TableCell>
          </TableRow>
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-purple-100 to-purple-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Merek
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-medium">
              {auction.make}
            </TableCell>
          </TableRow>
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-orange-100 to-orange-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Model
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-medium">
              {auction.model}
            </TableCell>
          </TableRow>
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-red-100 to-red-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Tahun Diproduksi
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-medium">
              {auction.year}
            </TableCell>
          </TableRow>
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-green-100 to-green-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Jarak Tempuh
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 font-medium">
              {auction.milage?.toLocaleString() || "0"} km
            </TableCell>
          </TableRow>
          <TableRow className="bg-white hover:bg-blue-50 transition-colors">
            <TableCell className="whitespace-nowrap font-bold text-gray-900 bg-gradient-to-r from-pink-100 to-pink-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              Ada Harga Cadangan?
            </TableCell>
            <TableCell className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              <span
                className={`px-3 py-1 rounded-full font-bold ${
                  auction.reservePrice > 0
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {auction.reservePrice > 0 ? "Ya" : "Tidak"}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
