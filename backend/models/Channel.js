import { Schema, model } from 'mongoose';

const ChannelSchema = new Schema({
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
        type: Schema.Types.ObjectId
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
        ref: "UserProfile"
    },
    serverId: {
        type: Schema.Types.ObjectId
    },
    servers: {
        type: [Schema.Types.ObjectId],
        ref: "Server"
    }
}, {
    timestamps: true,
});

const ChannelModel = model("Channel", ChannelSchema);

export default { ChannelModel };