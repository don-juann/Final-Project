document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});

function fetchBooks() {
    fetch('/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        })
        .then(books => {
            const bookContainer = document.getElementById('book-container');
            bookContainer.innerHTML = '';
            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');
                bookCard.innerHTML = `
                    <h2>${book.name}</h2>
                    <p>Author: ${book.author}</p>
                    <p>Published Year: ${book.publishedYear}</p>
                `;
                bookContainer.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

function searchBooks() {
    const searchValue = document.getElementById("search-input").value;

    if(searchValue.length != 0){
        document.getElementById('clearButton').style.display = 'inline-block';
        document.getElementById('searched-book').style.display = 'grid';
        document.getElementById('book-container').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';

        fetch(`/books-search?search=${searchValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to search books');
                }
                return response.json();
            })
            .then(books => {
                const searchedbook = document.getElementById('searched-book');
                searchedbook.innerHTML = '';
                books.forEach(book => {
                    const bookCard = document.createElement('div');
                    bookCard.classList.add('book-card');
                    bookCard.innerHTML = `
                        <h2>${book.name}</h2>
                        <p>Author: ${book.author}</p>
                        <p>Published Year: ${book.publishedYear}</p>
                    `;
                    searchedbook.appendChild(bookCard);
                });
            })
            .catch(error => {
                console.error('Error searching books:', error);
            });
    } else {
        alert("Enter a valid word");
    }
}

function clearSearchBar() {
    document.getElementById('clearButton').style.display = 'none';
    document.querySelector('.footer').style.display = 'flex';
    document.getElementById('search-input').value = '';
    document.getElementById('searched-book').style.display = 'none';
    document.getElementById('book-container').style.display = 'grid';
    fetchBooks(); // Clear search and fetch all books
}
