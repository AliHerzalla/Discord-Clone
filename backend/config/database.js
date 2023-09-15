const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

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
    console.log(error);
  }
};

module.exports = connectDB;
