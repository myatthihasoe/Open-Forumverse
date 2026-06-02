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
            <Image
              src={user?.image || profile}
              alt="profile"
              className="rounded-full object-cover aspect-square"
              width={45}
              height={45}
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
