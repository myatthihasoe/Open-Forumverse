import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button";
import AuthForm from "../components/AuthForm";
import Link from "next/link";
import ROUTES from "@/routes";

export default function page() {
  return (
    <div className="flex ">
      <div className="md:w-2/4 p-10 bg-primary h-screen flex items-center">
        <div className="space-y-10">
          <Link href={ROUTES.HOME} className="flex items-center space-x-4">
            <Image
              src={"/images/profile.jpg"}
              alt="login-image"
              width={100}
              height={100}
            />
            <h1 className="text-5xl font-semibold">
              Open <span className="text-main">Forumverse</span>
            </h1>
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            porro at libero! Officia accusantium quo, et veniam nam magni.
            Tenetur consequuntur repudiandae ipsum incidunt temporibus quae
            quos, veritatis animi laborum?
          </p>
          <Button variant="outline">Create New Account?</Button>
        </div>
      </div>
      <div className="md:w-2/4 h-screen flex items-center justify-center">
        <div className="w-4/5 space-y-6">
          <h3 className="text-xl font-semibold">
            Sign in to Open <span className="text-main">Forumverse</span>
          </h3>
          <div>
            <Input placeholder="Enter your email" label="Email Address" />
          </div>
          <div>
            <Input placeholder="Enter your password" label="Password" />
          </div>
          <div>
            <Button>Login</Button>
          </div>
          <AuthForm type="Login" />
        </div>
      </div>
    </div>
  );
}
