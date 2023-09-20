import UserProfileModel from "../models/Profile.js";
import ServerModel from "../models/Server.js";
import { v4 as uuid } from "uuid";
import fs from "fs";



/**
 * Post
 * Create Server
 * ||
 * \/
 */
export const CreateServer = async (req, res) => {
  try {
    console.log("req.body => ", req.body);
    console.log(req.file);
    const { serverName, userId } = req.body;
    const { filename: ImageName, path: ImagePath } = req.file;
    const ProfileDoc = await UserProfileModel.findOne({ userId: userId });
    // const populatedProfileDoc = await ProfileDoc.populate("server")

    if (!ProfileDoc) throw new Error(`User ${userId} does not exist`);

    console.log("profileDoc => ", ProfileDoc);

    // const imageUrl = fs.readFileSync(req.file.path, { encoding: "base64" });
    // console.log(`Image URL: ${imageUrl}`);
    const imageUrl = fs.readFileSync(req.file.path);

    const ServerDoc = new ServerModel({
      profileId: ProfileDoc?._id,
      name: serverName,
      // imageUrl: Image,
      imageUrl: ImagePath,
      inviteCode: uuid(),
      profile: ProfileDoc,
      channels: [],
      members: [],
    });

    if (!ServerDoc) throw new Error("Error while creating the server document");

    await ServerDoc.save();

    ProfileDoc.servers.push(ServerDoc);
    await ProfileDoc.save();
    res.status(200).json({ message: "Server created" });
  } catch (error) {
    console.log("Error occurred in Create Server", error.message);
    res.status(400).json({ message: "Something went wrong!", data: null });
  }
};
