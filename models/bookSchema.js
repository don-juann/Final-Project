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
    }    
},{
    collection: "books",
    timestamps: true
});


module.exports = mongoose.model('Book', bookSchema);
