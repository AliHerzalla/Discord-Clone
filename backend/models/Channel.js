const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    channelType: {
        type: String,
        enum: ["TEXT", "AUDIO", "VIDEO"],
        default: "TEXT"
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId
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
        ref: "UserProfile"
    },
    serverId: {
        type: mongoose.Schema.Types.ObjectId
    },
    servers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Server"
    }
}, {
    timestamps: true,
});

const ChannelModel = mongoose.model("Channel", ChannelSchema);

module.exports = { ChannelModel };