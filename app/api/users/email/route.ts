import User from "@/database/user.model";
import { handleSuccessResponse, handleErrorResponse } from "@/lib/response";

//find user by /api/users/email/route POST method
export async function POST(
  request: Request,
) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found!");
    }
    return handleSuccessResponse(user);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
