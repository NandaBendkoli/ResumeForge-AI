import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,

    },

    name: {
        type: String,
        required: true,


    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    token: {
        type: String

    },
    isDeleted: {
        type: Boolean,
        default: false
    }


},
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;