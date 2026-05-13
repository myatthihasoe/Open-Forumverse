"use client";

import ROUTES from "@/routes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function LogoutNavLink() {
  const router = useRouter();
  const logout = async () => {
    await signOut({ redirect: false });
    return router.push(ROUTES.LOGIN);
  };
  return (
    <li className="cursor-pointer rounded-xl bg-red-500 p-3" onClick={logout}>
      <div className="flex items-center space-x-4 text-[16px] font-bold">
        <RiLogoutCircleLine />
        <span>Logout</span>
      </div>
    </li>
  );
}
