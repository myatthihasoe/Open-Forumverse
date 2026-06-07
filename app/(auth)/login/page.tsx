import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button";
import AuthForm from "../components/AuthForm";
import Link from "next/link";
import ROUTES from "@/routes";
import AuthenticationForm from "../components/AuthenticationForm";
import { signInWithCredentials } from "@/lib/actions/SignInWithCredentials";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (session) {
    redirect(ROUTES.HOME);
  }
  return (
    <div className="flex ">
      <div className="md:w-2/4 p-10 bg-primary h-screen flex items-center">
        <div className="space-y-10">
          <Link href={ROUTES.HOME} className="flex items-center space-x-4">
            <Image
              src={"/images/Copilot_Icon_White.svg"}
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
          <Link href={ROUTES.REGISTER} className="block">
            <Button variant="outline">Create a new account ?</Button>
          </Link>
        </div>
      </div>
      <div className="md:w-2/4 h-screen flex items-center justify-center">
        <AuthenticationForm type="login" submitAction={signInWithCredentials} />
      </div>
    </div>
  );
}
