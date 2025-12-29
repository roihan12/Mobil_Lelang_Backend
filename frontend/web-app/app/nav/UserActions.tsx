"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";
type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") {
      router.push("/");
    }
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathname !== "/") {
      router.push("/");
    }
  }

  return (
    <Dropdown
      inline
      label={
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="hidden sm:block text-white font-semibold text-sm">
            {user.name}
          </span>
        </div>
      }
      className="cursor-pointer"
      placement="bottom"
    >
      <div className="px-2 py-1">
        <DropdownItem
          icon={HiUser}
          onClick={setSeller}
          className="text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span className="font-medium">Lelang Saya</span>
        </DropdownItem>
        <DropdownItem
          icon={AiFillTrophy}
          onClick={setWinner}
          className="text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span className="font-medium">Lelang Juara</span>
        </DropdownItem>
        <DropdownItem
          icon={AiFillCar}
          className="text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Link href={"/auctions/create"} className="font-medium">
            Jual Mobil
          </Link>
        </DropdownItem>
        <DropdownItem
          icon={HiCog}
          className="text-gray-700 hover:bg-purple-50 rounded-lg transition-colors text-xs"
        >
          <Link href={"/session"} className="font-medium">
            Session (dev)
          </Link>
        </DropdownItem>
      </div>
      <DropdownDivider className="my-1" />
      <div className="px-2 py-1">
        <DropdownItem
          icon={AiOutlineLogout}
          onClick={() => signOut({ redirectTo: "/" })}
          className="text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="font-medium">Sign Out</span>
        </DropdownItem>
      </div>
    </Dropdown>
  );
}
