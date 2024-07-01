import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: {
        type: String,
        default: "",
    },
    occupation: {
        type: String,
        default: "",
    },
    viewedProfile: {
        type: Number,
        default: 0
    },
    impressions: {
        type: Number,
        default: 0
    }
}, { timestamps : true }
);

const User = mongoose.model('User', userSchema);
export default User;