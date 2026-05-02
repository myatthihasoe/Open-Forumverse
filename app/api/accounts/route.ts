import Account from "@/database/account.model";
import dbConnect from "@/lib/dbConnect";
import { handleSuccessResponse, handleErrorResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";
import validateData from "@/lib/validateData";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return handleSuccessResponse(accounts);
  } catch (e:unknown) {
    return handleErrorResponse(e);
  }
}

//create account
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    console.log("Account data:", data);
    const { provider, providerAccountId } = data;
    validateData(data, AccountSchema);

    //check if account already exists
    const existingAcc = await Account.findOne({
      provider,
      providerAccountId,
    });
    if (existingAcc) throw new Error("Account already exists!");

    const newAcc = await Account.create(data);
    return handleSuccessResponse(newAcc, 201);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
