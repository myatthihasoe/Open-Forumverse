import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface VoteType {
  author: Types.ObjectId;
  type_id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export interface VoteDocument extends VoteType, Document {}

const VoteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type_id: {
      type: Schema.Types.ObjectId,
      required: true,
    //   refPath: "type",
    },
    type: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

const Vote: Model<VoteType> =
  (models.Vote as Model<VoteType>) || model<VoteType>("Vote", VoteSchema);

export default Vote;
