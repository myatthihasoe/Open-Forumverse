import mongoose from "mongoose";
import z from "zod";

const GetUserVoteSchema = z.object({
  type: z.enum(["answer", "question"]),
  typeId: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    }),
});

export default GetUserVoteSchema;
