const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["ADMIN", "MODERATOR", "GUEST"],
        default: "GUEST",
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "UserProfile",
    },
    serverId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    servers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Server",
    },
});

const MembersModel = mongoose.model("Members", MembersSchema);

module.exports = {
    MembersModel
};