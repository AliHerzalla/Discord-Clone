import MembersModel from "../models/Member.js";

/**
cd  * Get 
 * Find server by user id
 * ||
 * \/
 */
export const findAllMembers = async (req, res) => {
  try {
    const members = await MembersModel.findOne()
      .sort({ _id: -1 })
      .populate("profile")
      .populate("server");

    res.status(200).json(members);
  } catch (error) {
    res.status(404).json(error);
  }
};
