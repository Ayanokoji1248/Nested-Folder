import mongoose from "mongoose";

async function dbConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/NestedDB");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
}

export default dbConnection;
