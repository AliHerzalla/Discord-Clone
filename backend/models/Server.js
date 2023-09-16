import { Schema, model } from 'mongoose';

const ServerSchema = new Schema({
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
    profileId: {
        type: Schema.Types.ObjectId,
    },
    profile: {
        type: [Schema.Types.ObjectId],
        ref: "UserProfile"
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: "Members"
    },
    channels: {
        type: [Schema.Types.ObjectId],
        ref: "Channel"
    }
}, {
    timestamps: true,
});

const ServerModel = model("Server", ServerSchema);

export default ServerModel;