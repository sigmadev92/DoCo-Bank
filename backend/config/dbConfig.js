import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoURI = process.env.MONGOOSE_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected!!");
  } catch (err) {
    console.log(`Error in connecting to the database: ${err}`);
    console.error("Error in DB Connection!");  // Changed console.log to console.error for better clarity
  }
};

export default dbConnection;
