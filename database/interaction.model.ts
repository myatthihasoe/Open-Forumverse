import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface InteractionType {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

export interface InteractionDocument extends InteractionType, Document {}

const InteractionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      required: true,
    //   refPath: "actionType",
    },
    actionType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
  },
  { timestamps: true }
);

const Interaction: Model<InteractionType> =
  (models.Interaction as Model<InteractionType>) ||
  model<InteractionType>("Interaction", InteractionSchema);

export default Interaction;
