import { Schema, model } from "mongoose";

const UserProfileSchema = new Schema({
    userId: {
        // gonna come from "Clerk" and every profile gonna have a unique id
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    servers: [{
        type: Schema.Types.ObjectId,
        ref: "Server",
    }, ],
    members: {
        type: [Schema.Types.ObjectId],
        ref: "Members",
    },
    channels: {
        type: [Schema.Types.ObjectId],
        ref: "Channel",
    },
}, {
    timestamps: true,
});

const UserProfileModel = model("UserProfile", UserProfileSchema);

export default {
    UserProfileModel
};