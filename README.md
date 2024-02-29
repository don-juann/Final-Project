##Online Bookstore
Welcome to the Online Bookstore project! This is a web application built with Node.js, Express.js, MongoDB, and EJS. It provides a platform for users to browse a collection of books, search for specific titles, and view details about each book.

##Features
-Browse all available books
-Search for books by name
-View information about each book
-Add new books to the collection (as an administrator)
-Update existing book details (as an administrator)
-Delete books from the collection (as an administrator)

##Technologies Used
-Node.js: JavaScript runtime
-Express.js: Web application framework for Node.js
-MongoDB: NoSQL database for storing book information
-Mongoose: MongoDB object modeling for Node.js
-EJS: Embedded JavaScript templates for rendering views
-HTML: Structure of web pages
-CSS: Styling for the web application
-Quotes API and Unsplash API

##Installation
Clone the repository:
```
git clone https://github.com/your-username/online-bookstore.git
```
Install dependencies:
```
npm install
```
Set up MongoDB:
-Make sure MongoDB is installed on your system.
-Create a .env file in the root directory.
-Add your MongoDB connection URI to the .env file:
```
MONGO_LINK=your_mongodb_connection_uri
```
Run the application:
```
npm run dev
```

The app will be running at http://localhost:3000.

##Usage
-Visit http://localhost:3000 in your browser to access the Online Bookstore.
-Navigate through the different pages using the links in the navbar:
-Home: Main page with general information
-All Books: Browse all books in the collection
-Profile: User profile page (feature in development)
-Use the search bar to search for specific books by name or author.
-Click on a book card to view detailed information.
-Add new books by clicking on the "Add Book" button and filling out the form.
-Update or delete existing books by clicking on the respective buttons in the book details page.

##Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

##Author
-Zhan Kazikhanov (Astana IT)
