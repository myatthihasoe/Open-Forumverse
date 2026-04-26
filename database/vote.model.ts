import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface VoteType {
  author: Types.ObjectId;
  type_id: Types.ObjectId;
  type: "Question" | "Answer";
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
      refPath: "type",
    },
    type: {
      type: String,
      enum: ["Question", "Answer"],
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

VoteSchema.index({ author: 1, type_id: 1, type: 1 }, { unique: true });

const Vote: Model<VoteType> =
  (models.Vote as Model<VoteType>) || model<VoteType>("Vote", VoteSchema);

export default Vote;
