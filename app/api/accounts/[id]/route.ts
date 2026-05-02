import Account, { AccountType } from "@/database/account.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";
import validateData from "@/lib/validateData";
import { Types } from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid account id!");
    }
    const account = await Account.findById(id);
    if (!account) {
      throw new Error("Account not found!");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid account id!");
    }
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      throw new Error("Account not found!");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid account id!");
    }
    const validatedData = validateData(data, AccountSchema, true);
    const account = await Account.findByIdAndUpdate(
      id,
      validatedData.data as AccountType,
      {
        new: true,
      }
    );
    if (!account) {
      throw new Error("Account not found!");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
