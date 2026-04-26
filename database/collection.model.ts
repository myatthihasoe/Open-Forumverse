import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface CollectionType {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

export interface CollectionDocument extends CollectionType, Document {}

const CollectionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

CollectionSchema.index({ author: 1, question: 1 }, { unique: true });

const Collection: Model<CollectionType> =
  (models.Collection as Model<CollectionType>) ||
  model<CollectionType>("Collection", CollectionSchema);

export default Collection;
