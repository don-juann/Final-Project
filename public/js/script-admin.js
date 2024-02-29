document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
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

// Create User Card
function createUserCard(user) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    const userName = document.createElement('h3');
    userName.textContent = user.name;

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
    })
    .catch(error => {
        console.error('Error adding book:', error);
    });
}
