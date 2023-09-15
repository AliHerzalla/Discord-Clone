const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    inviteCode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    profile: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "UserProfile"
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Members"
    },
    channels: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Channel"
    }
}, {
    timestamps: true,
});

const ServerModel = mongoose.model("Server", ServerSchema);

module.exports = { ServerModel };