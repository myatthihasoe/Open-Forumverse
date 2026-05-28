import mongoose from "mongoose";
import z from "zod";

const VoteActionSchema = z.object({
  typeId: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    }),
  type: z.enum(["question", "answer"]),
  voteType: z.enum(["upvote", "downvote"]),
});

export default VoteActionSchema;
