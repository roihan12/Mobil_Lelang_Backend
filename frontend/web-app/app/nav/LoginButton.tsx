"use client";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <Button
      onClick={() =>
        signIn("id-server", { redirectTo: "/" }, { prompt: "login" })
      }
      className="px-4 sm:px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all text-sm sm:text-base border-0"
    >
      Login
    </Button>
  );
}
