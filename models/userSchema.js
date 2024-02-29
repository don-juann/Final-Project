const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    age: {
        type: Number,
    },
    country: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('users', userSchema);
