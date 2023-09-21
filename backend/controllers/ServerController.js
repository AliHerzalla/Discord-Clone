import UserProfileModel from "../models/Profile.js";
import ServerModel from "../models/Server.js";
import MemberModel from "../models/Member.js";
import ChannelModel from "../models/Channel.js";

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
    const profileDoc = await UserProfileModel.findOne({
      userId: userId,
    });

    if (!profileDoc)
      return res.status(404).json({
        message: `User ${userId} does not exist`,
      });
    console.log("profileDoc => ", profileDoc);

    // Create a default "general" channel for the server
    const generalChannel = new ChannelModel({
      name: "general",
      profileId: profileDoc._id,
    });

    // Create a member record with ADMIN role for the user
    const member = new MemberModel({
      profileId: profileDoc._id,
      role: "ADMIN",
    });

    // Save the channel and member documents first
    await generalChannel.save();
    await member.save();

    // Create the server document with the profile ID
    const serverDoc = new ServerModel({
      profileId: profileDoc._id,
      name: serverName,
      imageUrl: ImagePath,
      inviteCode: uuid(),
      channels: [generalChannel._id], // Use the ID of the generalChannel
      members: [member._id], // Use the ID of the member
    });

    await serverDoc.save();

    // Update the user profile with the server, channels, and members
    profileDoc.servers.push(serverDoc._id); // Use the ID of the serverDoc
    profileDoc.channels.push(generalChannel._id); // Use the ID of the generalChannel
    profileDoc.members.push(member._id); // Use the ID of the member
    await profileDoc.save();

    res.status(200).json({
      message: "Server created",
      server: serverDoc,
    });
  } catch (error) {
    console.log("Error occurred in Create Server", error.message);
    res.status(500).json({
      message: "Internal Error",
      error: error.message,
    });
  }
};
