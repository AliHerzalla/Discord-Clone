import { Schema, model } from "mongoose";

const MembersSchema = new Schema({
    role: {
        type: String,
        enum: ["ADMIN", "MODERATOR", "GUEST"],
        default: "GUEST",
    },
    profileId: {
        type: Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },

    profile: {
        type: [Schema.Types.ObjectId],
        ref: "UserProfile",
    },
    serverId: {
        type: Schema.Types.ObjectId,
    },
    servers: {
        type: [Schema.Types.ObjectId],
        ref: "Server",
    },
});

const MembersModel = model("Members", MembersSchema);

export default {
    MembersModel
};