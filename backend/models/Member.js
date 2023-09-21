import {
    Schema,
    model
} from "mongoose";

const MembersSchema = new Schema({
    role: {
        type: String,
        enum: ["ADMIN", "MODERATOR", "GUEST"],
        default: "GUEST",
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
});

const MembersModel = model("Members", MembersSchema);

export default MembersModel;