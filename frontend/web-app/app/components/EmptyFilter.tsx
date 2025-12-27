"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import Heading from "./Heading";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "Tidak ada hasil untuk filter ini",
  subtitle = "Coba ubah atau hapus beberapa filter Anda.",
  showReset,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.resetParams);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center min-h-[40vh] sm:min-h-[50vh] shadow-lg rounded-2xl bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 py-8 sm:py-10 px-4">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 sm:mt-6 flex flex-col gap-2">
        {showReset && (
          <Button
            outline
            onClick={reset}
            className="px-6 sm:px-8 py-2 sm:py-3 font-bold text-sm sm:text-base border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all"
          >
            Reset Filter
          </Button>
        )}

        {showLogin && (
          <Button
            outline
            onClick={() => signIn("id-server", { redirectTo: "/" })}
            className="px-6 sm:px-8 py-2 sm:py-3 font-bold text-sm sm:text-base border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
