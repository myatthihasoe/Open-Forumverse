"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaUsers, FaUserTag } from "react-icons/fa";

import ROUTES from "@/routes";
import { MdNewspaper, MdQuestionAnswer } from "react-icons/md";
import { RiBookMarkedLine, RiLoginCircleLine } from "react-icons/ri";

interface SidebarNavProps {
  isAuthenticated: boolean;
}

function SidebarNav({ isAuthenticated }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === ROUTES.HOME;
    }
    return pathname.startsWith(path);
  };

  return (
    <ul className="space-y-6">
      <li
        className={`rounded-xl p-3 ${
          isActive(ROUTES.HOME) ? "bg-main" : "bg-primary"
        }`}
      >
        <Link
          href={ROUTES.HOME}
          className="flex items-center space-x-4 text-[16px] font-bold"
        >
          <FaHome />
          <span>Home</span>
        </Link>
      </li>
      <li
        className={`rounded-xl p-3 ${
          isActive(ROUTES.TAGS) ? "bg-main" : "bg-primary"
        }`}
      >
        <Link
          href={ROUTES.TAGS}
          className="flex items-center space-x-4 text-[16px] font-bold"
        >
          <FaUserTag />
          <span>Tags</span>
        </Link>
      </li>
      <li
        className={`rounded-xl p-3 ${
          isActive(ROUTES.DISCUSSION) ? "bg-main" : "bg-primary"
        }`}
      >
        <Link
          href={ROUTES.DISCUSSION}
          className="flex items-center space-x-4 text-[16px] font-bold"
        >
          <MdQuestionAnswer />
          <span>Discussion</span>
        </Link>
      </li>
      <li
        className={`rounded-xl p-3 ${
          isActive(ROUTES.TECH_NEWS) ? "bg-main" : "bg-primary"
        }`}
      >
        <Link
          href={ROUTES.TECH_NEWS}
          className="flex items-center space-x-4 text-[16px] font-bold"
        >
          <MdNewspaper />
          <span>Tech News</span>
        </Link>
      </li>
      {isAuthenticated && (
        <li
          className={`rounded-xl p-3 ${
            isActive(ROUTES.BOOKMARKS) ? "bg-main" : "bg-primary"
          }`}
        >
          <Link
            href={ROUTES.BOOKMARKS}
            className="flex items-center space-x-4 text-[16px] font-bold"
          >
            <RiBookMarkedLine />
            <span>Bookmarks</span>
          </Link>
        </li>
      )}
      <li
        className={`rounded-xl p-3 ${
          isActive(ROUTES.COMMUNITY) ? "bg-main" : "bg-primary"
        }`}
      >
        <Link
          href={ROUTES.COMMUNITY}
          className="flex items-center space-x-4 text-[16px] font-bold"
        >
          <FaUsers />
          <span>Community</span>
        </Link>
      </li>
      {!isAuthenticated && (
        <li className="rounded-xl border-2 border-main p-3">
          <Link
            href={ROUTES.LOGIN}
            className="flex items-center space-x-4 text-[16px] font-bold"
          >
            <RiLoginCircleLine />
            <span>Login</span>
          </Link>
        </li>
      )}
    </ul>
  );
}

export default SidebarNav;
