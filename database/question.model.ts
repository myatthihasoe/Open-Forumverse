import { Document, Model, model, models, Schema, Types } from "mongoose";
import type { TagType } from "./tag.model";
import type { UserType } from "./user.model";

export interface QuestionType {
  _id?: string | Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type QuestionTagType = Pick<TagType, "_id" | "name">;
export type QuestionAuthorType = Pick<UserType, "_id" | "name" | "image">;

export interface QuestionWithTagsType extends Omit<QuestionType, "tags"> {
  tags: QuestionTagType[];
}

export interface QuestionWithTagsAndSavedType extends QuestionWithTagsType {
  saved: boolean;
}

export interface QuestionWithAuthorType extends Omit<QuestionType, "author"> {
  author: QuestionAuthorType;
}

export interface QuestionFullType extends Omit<
  QuestionType,
  "tags" | "author"
> {
  tags: QuestionTagType[];
  author: QuestionAuthorType;
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
