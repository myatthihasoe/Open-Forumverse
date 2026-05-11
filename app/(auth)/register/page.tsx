import Image from "next/image";
import Button from "@/components/Button";
import ROUTES from "@/routes";
import Link from "next/link";
import AuthenticationForm from "../components/AuthenticationForm";
import { signUpWithCredentials } from "@/lib/actions/SignUpWithCredentials.action";

export default function page() {
  return (
    <div className="flex ">
      <div className="md:w-2/4 p-10 bg-primary h-screen flex items-center">
        <div className="space-y-10">
          <Link href={ROUTES.HOME} className="flex items-center space-x-4">
            <Image
              src={"/images/Copilot_Icon_White.svg"}
              alt="register-image"
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
          <Button variant="outline">Login Account?</Button>
        </div>
      </div>
      <div className="md:w-2/4 h-screen flex items-center justify-center">
        <AuthenticationForm type="register" submitAction={signUpWithCredentials} />
      </div>
    </div>
  );
}
