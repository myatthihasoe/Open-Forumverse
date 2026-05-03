import Account from "@/database/account.model";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";

//api/accounts/provider/route POST method to find account by providerAccountId
export async function POST(request: Request) {
  try {
    const { providerAccountId } = await request.json();
    const account = await Account.findOne({providerAccountId})
    if (!account) {
      throw new Error("Account not found!");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
