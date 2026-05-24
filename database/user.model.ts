import { Document, Model, model, models, Schema, Types } from "mongoose";

export interface UserType {
  _id?: string | Types.ObjectId;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface UserDocument extends UserType, Document {}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },

    image: {
      type: String,
    },
    location: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User: Model<UserType> =
  (models.User as Model<UserType>) || model<UserType>("User", UserSchema);
export default User;
