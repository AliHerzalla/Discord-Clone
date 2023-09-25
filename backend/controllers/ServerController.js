import UserProfileModel from "../models/Profile.js";
import MemberModel from "../models/Member.js";
import ChannelModel from "../models/Channel.js";
import ServerModel from "../models/Server.js";
import mongoose from 'mongoose';

import { v4 as uuid } from "uuid";
import MembersModel from "../models/Member.js";

/**
 * Post
 * Create Server
 * ||
 * \/
 */
export const createServer = async (req, res) => {
  try {
    const { serverName, userId } = req.body;
    const { filename: ImageName, path: ImagePath } = req.file;
    const profileDoc = await UserProfileModel.findOne({
      userId: userId,
    });

    if (!profileDoc)
      return res.status(404).json({
        message: `User ${userId} does not exist`,
      });

    // Create a default "general" channel for the server
    const generalChannel = new ChannelModel({
      name: "general",
      profileId: profileDoc._id,
    });

    // Create a member record with ADMIN role for the user
    const member = new MemberModel({
      profileId: profileDoc._id,
      role: "ADMIN",
      _id: profileDoc._id
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

/**
cd  * Get 
 * Find server by user id
 * ||
 * \/
 */
export const findServerByUserId = async (req, res) => {
  const { id } = req.params;

  const ServersDoc = await UserProfileModel.find({ userId: id }).populate("servers");

  if (!ServersDoc) {
    res.status(400).json({ message: "Servers not found", data: null });
  }
  res.status(200).json({ message: "Servers found", data: ServersDoc });
};

/**
cd  * Get
 * Find server by server id
 * ||
 * \/
 */
export const findServerByServerId = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body.data;
  try {
    const ServerDoc = await ServerModel.find({ _id: id }).populate("members");;
    if (!ServerDoc) {
      res.status(200).json({ message: 'Server not found', data: null });
    } else {
      const UserDoc = await UserProfileModel.find({ userId });
      ServerDoc[0].members.map((member) => {
        if (UserDoc[0]._id.equals(member.profileId)) {
          res.status(200).json({ message: "Member found", data: true });
        } else {
          res.status(200).json({ message: "Member not found", data: false });
        }
      });
    };
  } catch (error) {
    res.status(200).json({ message: 'Server not found', data: null });
  }
};

/**
cd  * Get
 * Find server by server id
 * ||
 * \/
 */
export const findServerInfoByServerId = async (req, res) => {
  const { id } = req.params;

  try {
    const ServerDoc = await ServerModel.find({ _id: id })
      .populate([
        { path: "members", options: { sort: { createdAt: -1 } } },
        { path: "channels", options: { sort: { createdAt: -1 } } }
      ]);

    if (!ServerDoc) {
      res.status(400).json({ message: 'Server does not exist', data: null });
    } else {
      res.status(200).json({ message: "Server exists", data: ServerDoc[0] });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', data: null });
  }
};

/**
cd  * Get
 * Find server by server id
 * ||
 * \/
 */
export const findUserInThatServer = async (req, res) => {
  const { inviteCode } = req.params;
  const { userId } = req.body.data;
  try {
    const ServerDoc = await ServerModel.findOne({ inviteCode: inviteCode }, ["members", "_id"]);
    const UserDoc = await UserProfileModel.findOne({ userId: userId }, "_id");

    ServerDoc.members.map(member => {
      if (member.equals(UserDoc._id)) {
        res.status(200).json({ message: "User has been already in that server", data: UserDoc._id });
      }
    });

    // should be add the user to the server
    // there is an error in this block `const member = new MemberModel({...`
    const member = new MemberModel({
      profileId: profileDoc._id,
      role: "GUEST",
      _id: profileDoc._id
    });

    ServerDoc.members.push(member);
    await ServerDoc.save();

    return res.status(200).json({ message: "User added as a member of the server", data: UserDoc._id });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', data: null });
  }
};