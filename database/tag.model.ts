import { Document, Model, model, models, Schema } from "mongoose";

export interface TagType {
  name: string;
  questions: number;
}

export interface TagDocument extends TagType, Document {}

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    questions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tag: Model<TagType> =
  (models.Tag as Model<TagType>) || model<TagType>("Tag", TagSchema);

export default Tag;
