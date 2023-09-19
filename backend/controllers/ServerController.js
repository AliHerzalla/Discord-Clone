/**
 * Get
 * Find Profile Servers by ID
 * ||
 * \/
 */
export const getProfileServers = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
  } catch (error) {}

  const { id } = req.params;
  // console.log(id);
};

/**
 * Post
 * Create Server
 * ||
 * \/
 */
export const CreateServer = async (req, res) => {
  try {
    const { Image, serverName, userId } = req.body;
    const ProfileDoc = await UserProfileModel.findOne({ userId: userId });

    if (!ProfileDoc) throw new Error(`User ${userId} does not exist`);

    const ServerDoc = await ServerModel.create({
      profileId: ProfileDoc?._id,
      name: serverName,
      imageUrl: Image,
      inviteCode: uuid(),
      channels: [ProfileDoc?._id],
      members: [ProfileDoc?._id],
    });

    if (!ServerDoc) throw new Error("Error while creating the server document");

    await ServerDoc.save();
    res.status(200).json({ message: "Server created" });
  } catch (error) {
    console.log("Error occurred in Create Server", error);
    res.status(400).json({ message: "Something went wrong!", data: null });
  }
  // const { Image, serverName, userId } = req.body;

  // const ProfileDoc = await UserProfileModel.findOne({ userId: userId });
  // if (!ProfileDoc) {
  //   res.status(400).json({ message: "Profile not found" });
  // } else {
  //   const ServerDoc = await ServerModel.create({
  //     profileId: ProfileDoc?._id,
  //     name: serverName,
  //     imageUrl: Image,
  //     inviteCode: uuid(),
  //     channels: [ProfileDoc?._id],
  //     members: [ProfileDoc?._id],
  //   });
  //   if (!ServerDoc) {
  //     res.status(400).json({ message: "Server not created" });
  //   } else {
  //     await ServerDoc.save();
  //     res.status(200).json({ message: "Server created" });
  //   }
  // }
};
