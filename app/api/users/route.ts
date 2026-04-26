import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return Response.json(
      {
        data: users,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch users",
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
}

//create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) throw new Error("Email already exists");
    const existingUsername = await User.findOne({ username: data.username });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(data);
    return NextResponse.json(
      {
        data: newUser,
        success: true,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create user",
        success: false,
        status: 400,
      },
      { status: 400 }
    );
  }
}
