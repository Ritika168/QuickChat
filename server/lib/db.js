import mongoose from "mongoose";

//function to connect to the mongoDB
const connectDB = async () => {
  try {
    const db = mongoose.connection;

    db.once("connected", () => {
      console.log("✅ MongoDB connected successfully!");
    });

    db.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    db.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected.");
    });
    
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ Initial DB connection error:", error.message);
  }
};

export default connectDB;
