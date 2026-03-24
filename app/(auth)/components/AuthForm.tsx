"use client";
// import { signIn } from "@/auth";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

export default function AuthForm({ type }: { type: string }) {
  const oauthSignIn = async () => {
    try {
      await signIn("github", {
        redirectTo: "/",
      });
      toast.info("Login Successfully!", {
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
      <Button icon={"/images/profile.jpg"} variant="outline">
        {type} with Google
      </Button>
      <Button
        icon={"/images/profile.jpg"}
        variant="outline"
        onClick={oauthSignIn}
      >
        {type} with Github
      </Button>
    </div>
  );
}
