const mongoose = require('mongoose');
require('dotenv').config()

async function db_connection(){
    const con = await mongoose.connect(process.env.MONGO_LINK)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
} 

module.exports = {db_connection};