import mongoose from "mongoose";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
  groups?: string[];
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "users" }
);

export const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
