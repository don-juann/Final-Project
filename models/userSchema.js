const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    dob: {
        type: Date,
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
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{
    collection: "users",
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);
