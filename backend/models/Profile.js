import { Schema, model } from "mongoose";

const UserProfileSchema = new Schema({
    userId: {
        // gonna come from "Clerk" and every profile gonna have a unique id
        // from a google account id
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    servers: {
        type: [Schema.Types.ObjectId],
        ref: "Server",
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: "Member",
    },
    channels: {
        type: [Schema.Types.ObjectId],
        ref: "Channel",
    },
}, {
    timestamps: true,
});

const UserProfileModel = model("UserProfile", UserProfileSchema);

export default UserProfileModel;