import mongoose from "mongoose";
// import("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(
      process.env.DB_ATLAS_CONNECTION_STRING_URI
    );
    // console.log(connect.connection.host);
    console.log(
      `Database connection established on ${connect.connection.host}.`
    );
  } catch (error) {
    console.log(`database connection error: ${error.message}`);
  }
};

export default connectDB;
