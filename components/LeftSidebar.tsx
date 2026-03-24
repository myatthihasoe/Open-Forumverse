import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { GiNewspaper } from "react-icons/gi";
import { FaUserTag } from "react-icons/fa";
import { MdOutlinePostAdd, MdQuestionAnswer } from "react-icons/md";
import ROUTES from "@/routes";
export default function LeftSidebar() {
  return (
    <div className="md:w-1/5 px-5 py-2">
      <ul className="flex flex-col justify-center space-y-5">
        <li className="bg-main rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.HOME}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li className="bg-primary rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.POPULAR}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <FaStar />
            <span>Popular</span>
          </Link>
        </li>
        <li className="bg-primary rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.NEWS}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <GiNewspaper className="size-5" />
            <span>News</span>
          </Link>
        </li>
        <li className="bg-primary rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.TAGS}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <FaUserTag />
            <span>Tags</span>
          </Link>
        </li>
        <li className="bg-primary rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.DISCUSSION}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <MdQuestionAnswer />
            <span>Discussions</span>
          </Link>
        </li>
        <li className="bg-primary rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.POSTS}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <MdOutlinePostAdd />
            <span>Posts</span>
          </Link>
        </li>
        <li className="bg-red-500/70 rounded-xl px-3 py-3 ">
          <Link
            href={ROUTES.LOGOUT}
            className="flex items-center text-[16px] font-bold space-x-4"
          >
            <RiLogoutCircleLine />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
