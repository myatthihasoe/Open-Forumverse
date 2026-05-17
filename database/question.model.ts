import { Document, Model, model, models, Schema, Types } from "mongoose";
import { TagType } from "./tag.model";

export interface QuestionType {
  _id: string | Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionWithTagsType extends Omit<QuestionType, "tags"> {
  tags: (TagType & { _id: string | Types.ObjectId })[];
}

// export interface QuestionDocument extends QuestionType, Document {}

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    answers: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Question: Model<QuestionType> =
  (models.Question as Model<QuestionType>) ||
  model<QuestionType>("Question", QuestionSchema);

export default Question;
