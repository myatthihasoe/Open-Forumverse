import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface TagQuestionType {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

export interface TagQuestionDocument extends TagQuestionType, Document {}

const TagQuestionSchema = new Schema(
  {
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

TagQuestionSchema.index({ tag: 1, question: 1 }, { unique: true });

const TagQuestion: Model<TagQuestionType> =
  (models.TagQuestion as Model<TagQuestionType>) ||
  model<TagQuestionType>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
