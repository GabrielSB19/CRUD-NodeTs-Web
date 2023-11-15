import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.MONGO_URL || "";

export const db = mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
