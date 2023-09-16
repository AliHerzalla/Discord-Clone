import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import connectDB from "./config/database.js";

const app = express();

const PORT = 3000 || process.env.PORT;

connectDB();
// server connection
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
