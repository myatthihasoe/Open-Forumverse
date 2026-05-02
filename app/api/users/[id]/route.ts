import User, { UserType } from "@/database/user.model";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateData from "@/lib/validateData";
import { Types } from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id!");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found!");
    }
    return handleSuccessResponse(user);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

//Delete API
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id!");
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found!");
    }
    return handleSuccessResponse(user);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

//Update API
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id!");
    }
    const validatedData = validateData(data, UserSchema, true); //zod validation to update user
    const user = await User.findByIdAndUpdate(
      id,
      validatedData.data as UserType,
      {
        new: true,
      }
    );
    if (!user) {
      throw new Error("User not found!");
    }
    return handleSuccessResponse(user);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
