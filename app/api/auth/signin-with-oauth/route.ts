import Account from "@/database/account.model";
import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import { SigninOauthSchema } from "@/lib/schemas/SigninOauthSchema";
import validateData from "@/lib/validateData";
import mongoose from "mongoose";
import slugify from "slugify";

export async function POST(req: Request) {
  const { provider, providerAccountId, user } = await req.json();
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validateData(
      {
        provider,
        providerAccountId,
        user,
      },
      SigninOauthSchema
    );
    const { username, email, name, image } = validatedData.data.user;
    let existingUser = await User.findOne({ email }).session(session);
    if (!existingUser) {
      [existingUser] = await User.create(
        [
          {
            email,
            name,
            image,
            username: slugify(username, {
              lower: true,
              strict: true,
              trim: true,
            }),
          },
        ],
        { session }
      );
    } else {
      await User.updateOne(
        {
          _id: existingUser._id,
        },
        {
          $set: {
            name,
            image,
          },
        }
      ).session(session);
    }

    const existingAccount = await Account.findOne({
      userId: existingUser?._id,
      provider,
      providerAccountId,
    }).session(session);
    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser?._id,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return handleSuccessResponse(existingUser);
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    // return handleErrorResponse(e);
  } finally {
    await session.endSession();
  }
}
