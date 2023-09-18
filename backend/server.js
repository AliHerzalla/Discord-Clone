import "dotenv/config";
import * as fs from "fs";
import express from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import UserProfileModel from "./models/Profile.js";
import { v4 as uuid } from "uuid";
import ServerModel from "./models/Server.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const upload = multer();

const PORT = 3000 || process.env.PORT;

app.get("/find-unique-profile/:id", async (req, res) => {
  const { id } = req.params;

  const ProfileDoc = await UserProfileModel.findOne({ userId: id });
  if (ProfileDoc) {
    res.status(200).json({ message: "Profile found", data: ProfileDoc });
  } else {
    res.status(200).json({ message: "Profile not found!", data: null });
  }
});

app.post("/create-unique-profile", async (req, res) => {
  const { userId, username, imageUrl, email } = req.body;

  const newProfileDoc = await UserProfileModel.create({
    userId: userId,
    username: username,
    imageUrl: imageUrl,
    email: email
  });

  if (newProfileDoc) {
    await newProfileDoc.save();
    res.status(200).json({ message: "Profile created successfully", data: newProfileDoc });
  } else {
    res.status(400).json({ message: "Something went wrong!", data: null });
  }

});

app.get("/find-profile-servers/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
});

app.post("/create-server", upload.single('Image'), async (req, res) => {
  const { Image, serverName, userId } = req.body;

  const ProfileDoc = await UserProfileModel.findOne({ userId: userId });
  if (!ProfileDoc) {
    res.status(400).json({ message: "Profile not found" });
  } else {
    const ServerDoc = await ServerModel.create({
      profileId: ProfileDoc?._id,
      name: serverName,
      imageUrl: Image,
      inviteCode: uuid(),
      channels: [ProfileDoc?._id],
      members: [ProfileDoc?._id]
    });
    if (!ServerDoc) {
      res.status(400).json({ message: "Server not created" });
    } else {
      await ServerDoc.save();
      res.status(200).json({ message: "Server created" });
    }
  }
});

// DB connection
connectDB();

// server connection
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
