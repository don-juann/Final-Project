require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require("./models/userSchema");
const Book = require("./models/bookSchema");
const { render } = require('ejs');

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

app.use(session({
  secret: 'keypass', // Change this to a random string
  resave: false,
  saveUninitialized: true
}));

app.get('/', async(req, res) => {
    res.render('index');
})
app.get('/login', async(req, res) => {
    res.render('login');
})
app.get('/register', async(req, res) => {
    res.render('register');
})
app.get('/allbooks', async(req, res) => {
    res.render('books');
})

app.get('/profile', async (req, res) => {
  try {
      // Check if user is logged in
      if (!req.session.isLoggedIn) {
          // Redirect to login if not logged in
          return res.redirect('/login');
      }

      // Fetch the currently logged-in user's data
      const userId = req.session.userId;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if it's an API call (Accept header)
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
          // If it's an API call, send JSON response
          res.json({
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              country: user.country,
              gender: user.gender
          });
      } else {
          // Otherwise, render the profile template with user data
          res.render('profile', { user });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/background', async (req, res) => {
  const description = req.query.description;
  try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${description}&orientation=landscape&client_id=${'SOA6Q1M5Q4FzVBAWGg0JhyNIHjKfqGzbbDljY5GGfJY'}`);
      if (!response.ok) {
          throw new Error('Failed to fetch image from Unsplash API');
      }
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error('Error fetching background image:', error.message); // Log the error
      res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
  }
});


app.get('/check_login_status', (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  res.json({ isLoggedIn });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Logout failed' });
      }
      res.redirect('/');
  });
});

app.post('/register', async (req, res) => {
    try {
      const { fullName, dob, country, gender, email, username, password, isAdmin } = req.body;
  
      // Check if username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        fullName,
        dob,
        country,
        gender,
        email,
        username,
        password: hashedPassword,
        isAdmin,
      });
  
      const savedUser = await newUser.save();
      register_nodemail()
      res.render('login');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        // Send login notification email
        login_nodemail(email);
        
        if (user.isAdmin) {
          res.render('admin_panel');
        }else{
          res.render('index');
        }

        

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.set(req.body);
  
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

function register_nodemail(recipient) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        to: recipient,
        subject: "Welcome!",
        text: "Welcome to our lovely Online Bookstore, we hope you have a great experience using our service!"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function login_nodemail(recipient) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        to: recipient,
        subject: "Warning!",
        text: "Someone has just signed in by using your email and password, was it you?"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

mongoose.connect(process.env.MONGO_LINK)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// Create a new book
app.post("/books", async (req, res) => {
  try {
      const { name, author, publishedYear } = req.body;

      const existingBook = await Book.findOne({ name });
      if (existingBook) {
          return res.status(400).json({ message: 'Book already exists' });
      }

      const newBook = new Book({
          name,
          author,
          publishedYear,
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
      const { name, author, publishedYear } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          { name, author, publishedYear },
          { new: true }
      );
      if (!updatedBook) {
          return res.status(404).json({ message: "Book not found" });
      }
      res.json(updatedBook);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

app.get('/books-search', async (req, res) => {
    const searchValue = req.query.search;

    try {
        let books;
        if (searchValue) {
            // If there is a search value, find books that match the search
            books = await Book.find({
                name: { $regex: searchValue, $options: 'i' }  // Case-insensitive search for book name
            });
        } else {
            // If no search value provided, return all books
            books = await Book.find();
        }

        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
      const books = await Book.find();
      res.json(books);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get a single book by ID
app.get("/books/:id", async (req, res) => {
  try {
      const book = await Book.findById(req.params.id);
      if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
          return res.status(404).json({ message: "Book not found" });
      }
      res.json({ message: "Book deleted" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
