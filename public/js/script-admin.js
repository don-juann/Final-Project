document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
    fetchBooks();
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', addBook);
});

// Fetch Users
function fetchUsers() {
    fetch('/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            users.forEach(user => {
                const userCard = createUserCard(user);
                userList.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

// Fetch Books
function fetchBooks() {
    fetch('/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        })
        .then(books => {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';
            books.forEach(book => {
                const bookCard = createBookCard(book);
                bookList.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

// Create User Card
function createUserCard(user) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    const userName = document.createElement('h3');
    userName.textContent = user.fullName;

    const userEmail = document.createElement('p');
    userEmail.textContent = user.email;

    const isAdmin = document.createElement('p');
    isAdmin.textContent = `Admin: ${user.isAdmin ? 'Yes' : 'No'}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteUser(user._id));

    const makeAdminButton = document.createElement('button');
    makeAdminButton.textContent = 'Make Admin';
    makeAdminButton.classList.add('make-admin-btn');
    makeAdminButton.addEventListener('click', () => makeAdmin(user._id));

    userCard.appendChild(userName);
    userCard.appendChild(userEmail);
    userCard.appendChild(isAdmin);
    userCard.appendChild(deleteButton);
    userCard.appendChild(makeAdminButton);

    return userCard;
}

// Create Book Card
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookName = document.createElement('h3');
    bookName.textContent = book.name;

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${book.author}`;

    const publishedYear = document.createElement('p');
    publishedYear.textContent = `Published Year: ${book.publishedYear}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteBook(book._id));

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('update-btn');
    updateButton.addEventListener('click', () => updateBook(book));

    bookCard.appendChild(bookName);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(publishedYear);
    bookCard.appendChild(deleteButton);
    bookCard.appendChild(updateButton);

    return bookCard;
}

// Delete User
function deleteUser(userId) {
    fetch(`/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        fetchUsers(); // Refresh user list after deletion
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}

// Make Admin
function makeAdmin(userId) {
    fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAdmin: true }) // Update isAdmin to true
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        fetchUsers(); // Refresh user list after making admin
    })
    .catch(error => {
        console.error('Error making user admin:', error);
    });
}

// Delete Book
function deleteBook(bookId) {
    fetch(`/books/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        fetchBooks(); // Refresh book list after deletion
    })
    .catch(error => {
        console.error('Error deleting book:', error);
    });
}

// Update Book
function updateBook(book) {
    const newName = prompt('Enter new name:', book.name);
    const newAuthor = prompt('Enter new author:', book.author);
    const newPublishedYear = prompt('Enter new published year:', book.publishedYear);

    if (newName && newAuthor && newPublishedYear) {
        fetch(`/books/${book._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, author: newAuthor, publishedYear: newPublishedYear })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update book');
            }
            alert('Book updated successfully!');
            fetchBooks(); // Refresh book list after updating book
        })
        .catch(error => {
            console.error('Error updating book:', error);
        });
    } else {
        alert('Invalid input. Book not updated.');
    }
}

// Add Book
function addBook(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const publishedYear = document.getElementById('publishedYear').value;

    fetch('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, author, publishedYear })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        alert('Book added successfully!');
        document.getElementById('add-book-form').reset(); // Reset form after successful submission
        fetchBooks(); // Refresh book list after adding book
    })
    .catch(error => {
        console.error('Error adding book:', error);
    });
}
