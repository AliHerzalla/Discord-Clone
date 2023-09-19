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

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
import profileRoutes from "./routes/ProfileRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";

/* -------------------------------------------------------------------*/

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const upload = multer();

const PORT = 3000 || process.env.PORT;

// DB connection
connectDB();

app.use("/", profileRoutes);
app.use("/", serverRoutes);

// server connection
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

/*

app.post("/create-server", upload.single("Image"), async (req, res) => {
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
      members: [ProfileDoc?._id],
    });
    if (!ServerDoc) {
      res.status(400).json({ message: "Server not created" });
    } else {
      await ServerDoc.save();
      res.status(200).json({ message: "Server created" });
    }
  }
});


*/
