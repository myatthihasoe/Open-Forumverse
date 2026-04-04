"use client";
// import { signIn } from "@/auth";
import Button from "@/components/Button";
import ROUTES from "@/routes";
import { signIn } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

export default function AuthForm({ type }: { type: string }) {
  const oauthSignIn = async (oauthType: "google" | "github") => {
    try {
      await signIn(oauthType, {
        redirectTo: ROUTES.HOME,
      });
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };
  return (
    <div className="flex space-x-3 ">
      <Button
        icon={"/images/google.webp"}
        variant="outline"
        onClick={() => oauthSignIn("google")}
      >
        {type} with Google
      </Button>
      <Button
        icon={"/images/GItHubWhiteLogo.svg"}
        variant="outline"
        onClick={() => oauthSignIn("github")}
      >
        {type} with Github
      </Button>
    </div>
  );
}
