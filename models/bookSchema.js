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
    },
});


module.exports = mongoose.model('books', bookSchema);
