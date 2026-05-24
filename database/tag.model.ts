import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface TagType {
  _id?: string | Types.ObjectId;
  name: string;
  questions: number;
  createdAt?: Date;
  updatedAt?: Date;
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
