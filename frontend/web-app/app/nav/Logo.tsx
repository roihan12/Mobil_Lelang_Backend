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
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
        <span className="text-white font-bold text-lg">
          <AiOutlineCar size={30} />
        </span>
      </div>
      <span className="text-xl font-bold text-gray-800 inline">Lemobil</span>
    </Link>
  );
}
