import Image from "next/image";
import logo from "@/public/images/logo.svg";
import profile from "@/public/images/profile.jpg";
export default function Navbar() {
  return (
    <nav className="flex justify-between px-10 py-4">
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
      <div className="flex items-center justify-center space-x-4">
        <input
          type="text"
          className="bg-primary px-4 py-2 md:w-[600px] sm:w-[400px] lg:w-[800px] rounded-md"
          placeholder="Search anything with AI"
        />
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Image
          src={profile}
          alt="profile"
          className="rounded-full object-cover aspect-square"
          width={45}
          height={45}
        />
      </div>
    </nav>
  );
}
