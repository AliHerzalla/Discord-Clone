import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(
      process.env.DB_ATLAS_CONNECTION_STRING_URI
    );
    console.log(`Database connection established on ${connect.connection.host}.`);
  } catch (error) {
    console.log(`database connection error: ${error.message}`);
  }
};

export default connectDB;
