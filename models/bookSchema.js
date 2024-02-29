const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    author: {
        type: String,
    },
    publishedYear: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    }
},{
    collection: "books",
    timestamps: true
});


module.exports = mongoose.model('Book', bookSchema);
