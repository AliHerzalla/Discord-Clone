import UserProfileModel from "../models/Profile.js";
import MemberModel from "../models/Member.js";
import ChannelModel from "../models/Channel.js";
import ServerModel from "../models/Server.js";
import mongoose from "mongoose";

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
      profileId: profileDoc.id,
    });

    // Create a member record with ADMIN role for the user
    const member = new MemberModel({
      profileId: profileDoc.id,
      role: "ADMIN",
    });

    // Save the channel and member documents first
    await generalChannel.save();
    await member.save();

    // Create the server document with the profile ID
    const serverDoc = new ServerModel({
      profileId: profileDoc.id,
      name: serverName,
      imageUrl: ImagePath,
      inviteCode: uuid(),
      channels: [generalChannel.id], // Use the ID of the generalChannel
      members: [member.id], // Use the ID of the member
    });

    await serverDoc.save();

    // Update the user profile with the server, channels, and members
    profileDoc.servers.push(serverDoc); // Use the ID of the serverDoc
    profileDoc.channels.push(generalChannel); // Use the ID of the generalChannel
    profileDoc.members.push(member); // Use the ID of the member
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

  const ServersDoc = await UserProfileModel.find({ userId: id }).populate(
    "servers"
  );

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
// export const findServerByServerId = async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body.data;

//   try {
//     console.log(id);
//     const serverDoc = await ServerModel.findById(id).populate("members");

//     if (!serverDoc) {
//       return res.status(404).json({ message: "Server not found", data: null });
//     }

//     const userDoc = await UserProfileModel.findOne({ userId });

//     if (!userDoc) {
//       return res.status(404).json({ message: "User not found", data: null });
//     }

//     const isMember = serverDoc.members.some((member) =>
//       userDoc._id.equals(member.profileId)
//     );

//     if (isMember) {
//       return res.status(200).json({ message: "Member found", data: true });
//     } else {
//       return res.status(200).json({ message: "Member not found", data: false });
//     }
//   } catch (error) {
//     console.error("Error occurred in findServerByServerId:", error);
//     res.status(500).json({ message: "Internal Error", error: error.message });
//   }
// };

export const findServerByServerId = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body.data;

  try {
    if (id && userId) {
      console.log(`Finding server by ID: ${id}`);

      const serverDoc = await ServerModel.findById(id).populate("members");
      console.log(`Server Doc:`, serverDoc);

      console.log(`Finding user by ID: ${userId}`);
      const userDoc = await UserProfileModel.findOne({ userId });
      console.log(`User Doc:`, userDoc);

      if (!serverDoc) {
        return res.status(404).json({ message: "Server not found", data: null });
      }

      if (!userDoc) {
        return res.status(404).json({ message: "User not found", data: null });
      }

      const isMember =
        serverDoc.members &&
        serverDoc.members.some(
          (member) => member.profile && member.profile.equals(userDoc._id)
        );

      if (isMember) {
        return res.status(200).json({ message: "Member found", data: true });
      } else {
        return res.status(200).json({ message: "Member not found", data: false });
      }
    }
  } catch (error) {
    console.error("Error occurred in findServerByServerId:", error);
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

/**
cd  * Get
 * Find server by server id
 * ||
 * \/
 */
export const updateInviteCode = async (req, res) => {
  const { id } = req.params;
  // const { userId } = req.body.data;
  try {
    const updatedServer = await ServerModel.findByIdAndUpdate(
      id,
      {
        inviteCode: uuid(),
      },
      { new: true }
    );
    if (!updatedServer)
      throw new Error(
        "[Update Invite Code] Error , Error occurred while updating"
      );

    res.status(200).json({
      message: "Successfully updated server invite code",
      data: updatedServer,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Server not found", errorMessage: error, data: null });
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
    const ServerDoc = await ServerModel.find({ _id: id }).populate([
      { path: "members", options: { sort: { createdAt: -1 } } },
      { path: "channels", options: { sort: { createdAt: -1 } } },
    ]);

    if (!ServerDoc) {
      res.status(400).json({ message: "Server does not exist", data: null });
    } else {
      res.status(200).json({ message: "Server exists", data: ServerDoc[0] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", data: null });
  }
};

/**
cd  * Get
 * Find server by server id
 * ||
 * \/
 */
export const findUserInThatServer = async (req, res) => {
  try {
    const { inviteCode } = req.params;
    const { userId } = req.body.data;
    console.log(
      `findUserInThatServer ${inviteCode} for ${userId} is triggered`
    );
    if (userId) {
      // 1. Fetch the current user's profile.
      const userProfile = await UserProfileModel.findOne({ userId });
      console.log(`UserProfileModel.findOne({ userId }`, userProfile);

      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      // 2. Check if an invite code exists in the request.
      if (!inviteCode) {
        return res.status(400).json({ message: "Invite code not provided" });
      }

      // 3. Query the server using the invite code.
      const server = await ServerModel.findOne({ inviteCode }).populate(
        "members"
      );

      if (!server) {
        return res.status(404).json({ message: "Server not found" });
      }

      // 4. Check if the user is already a member.
      const isMember = server.members.some((member) =>
        member.profileId.equals(userProfile._id)
      );

      if (isMember) {
        return res
          .status(200)
          .json({ message: "User is already a member", serverId: server._id, navigate: true });
      }

      // 5. If the user is not a member, add them as a new member.
      const newMember = new MembersModel({
        profile: userProfile._id,
        server: server._id,
      });

      await newMember.save();

      // Update the server's members array with the new member.
      server.members.push(newMember);
      await server.save();

      // Update the profile's servers with the new member in that server
      userProfile.servers.push(server);
      await userProfile.save();

      return res
        .status(200)
        .json({ message: "User added as a member", serverId: server._id, navigate: true });
    }
  } catch (error) {
    console.error("Error occurred in joinServer:", error);
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};
