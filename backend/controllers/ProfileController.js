import UserProfileModel from "../models/Profile.js";

/**
 * Get
 * Unique Profile bt ID
 * ||
 * \/
 */
export const getUniqueProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("backend ", id);
    const profileDoc = await UserProfileModel.findOne({ userId: id });
    if (!profileDoc)
      throw new Error(`An Error occurred while getting the profile`);
    res.status(200).json({ message: "Profile found", data: profileDoc });
  } catch (error) {
    console.log("Error occurred in get Unique Profile", error);
    res.status(404).json({ message: "Profile not found!", data: null });
  }
  // const { id } = req.params;
  // if (profileDoc) {
  //   res.status(200).json({ message: "Profile found", data: profileDoc });
  // }
  // else {
  //   res.status(200).json({ message: "Profile not found!", data: null });
  // }
};

/**
 * Post
 * Unique Profile
 * ||
 * \/
 */
export const CreateUniqueProfile = async (req, res) => {
  try {
    const { userId, username, imageUrl, email } = req.body;
    console.log(userId);
    const newProfileDoc = await UserProfileModel.create({
      userId: userId,
      username: username,
      imageUrl: imageUrl,
      email: email,
    });

    if (!newProfileDoc)
      throw new Error("Ann error occurred while creating profile");

    await newProfileDoc.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", data: newProfileDoc });
  } catch (error) {
    console.log("Error occurred in create Unique Profile", error);
    res.status(400).json({ message: "Something went wrong!", data: null });
  }
  // const { userId, username, imageUrl, email } = req.body;

  // const newProfileDoc = await UserProfileModel.create({
  //   userId: userId,
  //   username: username,
  //   imageUrl: imageUrl,
  //   email: email,
  // });

  // if (newProfileDoc) {
  //   await newProfileDoc.save();
  //   res
  //     .status(200)
  //     .json({ message: "Profile created successfully", data: newProfileDoc });
  // } else {
  //   res.status(400).json({ message: "Something went wrong!", data: null });
  // }
};
