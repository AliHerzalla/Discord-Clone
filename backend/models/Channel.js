import {
    Schema,
    model
} from "mongoose";

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    channelType: {
        type: String,
        enum: ["TEXT", "AUDIO", "VIDEO"],
        default: "TEXT",
    },
    profileId: {
        type: Schema.Types.ObjectId,
    },
    serverId: {
        type: Schema.Types.ObjectId,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: "Server",
    },
}, {
    timestamps: true,
});

const ChannelModel = model("Channel", ChannelSchema);

export default ChannelModel;