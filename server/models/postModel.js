import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500
    },
    picturePath: {
        type: String,
        default: ""
    },
    userPicturePath: {
        type: String,
        default: ""
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    },
    location: {
        type: String,
        default: ""
    },
}, { timestamps: true });
