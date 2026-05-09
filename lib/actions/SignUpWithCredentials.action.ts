"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import validateData from "../validateData";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import SignUpSchema from "../schemas/SignupSchema";

export async function signUpWithCredentials(params: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  await dbConnect();
  console.log("db connected");
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validateData(params, SignUpSchema);
    const { name, email, username, password } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email Already Exists");
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      throw new Error("Username Already Exists");
    }

    const [newUser] = await User.create(
      [
        {
          name,
          username,
          email,
        },
      ],
      {
        session,
      }
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: await bcrypt.hash(password, 10),
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });
    return handleSuccessResponse(newUser);
  } catch (error) {
    await session.abortTransaction();
    return handleErrorResponse(error);
  } finally {
    await session.endSession();
  }
}
