import Image from "next/image";
import logo from "@/public/images/logo.svg";
import profile from "@/public/images/profile.jpg";
import SearchInput from "./SearchInput";
import { auth } from "@/auth";
import Link from "next/link";
import ROUTES from "@/routes";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const hasProfileImage = user?.image && user.image.trim() !== "";
  
  return (
    <nav className="flex justify-between px-10 py-7">
      <div className="flex items-center justify-center space-x-4">
        <Image
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h1 className="font-bold">
          Open <span className="text-main">Forumverse</span>
        </h1>
      </div>
      <div className="md:w-[600px] sm:w-[300px]">
        <SearchInput />
      </div>
      <div>
        {user && (
          <Link href={ROUTES.PROFILE(user.id as string)}>
            {hasProfileImage ? (
              <Image
                src={user.image as string}
                width={45}
                height={45}
                className="aspect-square rounded-full object-cover"
                alt="user profile"
              />
            ) : (
              <div className="w-[45px] h-[45px] rounded-full bg-primary flex items-center justify-center border-2 border-main">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}
