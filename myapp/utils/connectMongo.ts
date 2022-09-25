import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(process.env.MONGO_DB_URI || "");

export default connectMongo;
