"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "@/lib/response";
import validateData from "../validateData";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import SignInSchema from "../schemas/SignInSchema";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}) {
  await dbConnect();

  try {
    const validatedData = validateData(params, SignInSchema);
    const { email, password } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found!");
    }
    const account = await Account.findOne({ provider: "credentials", providerAccountId: email });
    if (!account) {
      throw new Error("Account not found!");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      account.password as string
    );

    if (!isPasswordValid) {
      throw new Error("Password is incorrect!");
    }

    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
