const express = require('express');
const app = express();
const path = require('path');
const {db_connection} = require('./config/connect_to_db');
const port = process.env.PORT;
require('dotenv').config()

//ADD APIs here

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get('/books', async(req, res) => {
    res.render('books'); // Renders login_register.ejs
});

app.get('/cart', async(req, res) => {
    res.render('shopping_cart'); // Renders admin_panel.ejs
});

app.get('/login', async(req, res) => {
    res.render('login_register'); // Renders login_register.ejs
});

app.get('/admin', async(req, res) => {
    res.render('admin_panel'); // Renders admin_panel.ejs
});

app.get('/profile', async(req, res) => {
    res.render('profile'); // Renders admin_panel.ejs
});

db_connection()
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});