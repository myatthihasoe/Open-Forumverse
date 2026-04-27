import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleSuccessResponse, handleErrorResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateData from "@/lib/validateData";

//get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return handleSuccessResponse(users);
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}

//create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    validateData(data, UserSchema);

    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) throw new Error("Email already exists");
    const existingUsername = await User.findOne({ username: data.username });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(data);

    return handleSuccessResponse(newUser, 201);
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}
