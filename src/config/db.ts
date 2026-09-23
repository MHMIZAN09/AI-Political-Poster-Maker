import mongoose from "mongoose";
import { config } from "./env";


const connectDB = async () => {
  try {
    const mongoURI = config.mongoURI;
    if(!mongoURI) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
