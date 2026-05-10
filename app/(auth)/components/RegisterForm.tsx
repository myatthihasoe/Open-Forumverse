"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { signUpWithCredentials } from "@/lib/actions/SignUpWithCredentials.action";
import ROUTES from "@/routes";
import router from "next/router";
import { useRouter } from "next/navigation";
interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface FormErrors {
  name?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
}
export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FormData", formData);
    const result = await signUpWithCredentials(formData);
    console.log("Form result", result);
    if (result.success) {
      console.log("Success");
      setErrors(null);
      router.push(ROUTES.HOME);
    } else {
      if ("details" in result && result.details)
        setErrors(result.details as FormErrors);
      // console.log("Form Error", result.details);
      if ("message" in result && result.message === "Email Already Exists") {
        setErrors({
          email: [result.message],
        });
      } else if (
        "message" in result &&
        result.message === "Username Already Exists"
      ) {
        setErrors({
          username: [result.message],
        });
      }
    }
  };
  return (
    <form className="w-4/5 space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold">
        Register to Open <span className="text-main">Forumverse</span>
      </h3>
      <div>
        <Input
          placeholder="Enter your Name"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors?.name && (
          <p className="my-2 text-xs text-red-400">{errors.name[0]}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Enter your username"
          label="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errors?.username && (
          <p className="my-2 text-xs text-red-400">{errors.username[0]}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Enter your email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors?.email && (
          <p className="my-2 text-xs text-red-400">{errors.email[0]}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Enter your password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors?.password && (
          <p className="my-2 text-xs text-red-400">{errors.password[0]}</p>
        )}
      </div>
      <div>
        <Button type="submit">Register</Button>
      </div>
      <AuthForm type="Register" />
    </form>
  );
}
