"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineCar } from "react-icons/ai";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  const reset = useParamsStore((state) => state.resetParams);

  function handleReset() {
    if (pathname !== "/") {
      router.push("/");
    }
    reset();
  }
  return (
    <Link
      onClick={handleReset}
      href="/"
      className="flex items-center gap-2 group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
        <AiOutlineCar size={24} className="sm:size-28 text-white font-bold" />
      </div>
      <span className="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-lg">
        LeMobil
      </span>
    </Link>
  );
}
