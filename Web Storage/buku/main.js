const inputBookForm = document.getElementById('inputBookForm');
const inputBookTitle = document.getElementById('inputBookTitle');
const inputBookAuthor = document.getElementById('inputBookAuthor');
const inputBookYear = document.getElementById('inputBookYear');
const inputBookIsComplete = document.getElementById('inputBookIsComplete');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');

// Function to add a book to the shelf
function addBookToShelf(title, author, year, isComplete) {
  const bookId = +new Date(); // Generate a unique ID using timestamp
  const book = {
    id: bookId,
    title,
    author,
    year,
    isComplete,
  };

  const bookList = isComplete ? completeBookList : incompleteBookList;
  
  const bookItem = document.createElement('div');
  bookItem.classList.add('bookItem');
  bookItem.innerHTML = `
    <h3>${title}</h3>
    <p>Penulis: ${author}</p>
    <p>Tahun: ${year}</p>
    <div class="actions">
      <button class="btn-move" data-id="${bookId}">${isComplete ? 'Belum Selesai' : 'Selesai'}</button>
      <button class="btn-delete" data-id="${bookId}">Hapus</button>
    </div>
  `;

  bookList.appendChild(bookItem);

  // Save the book to local storage
  saveBookToLocalStorage(book);
}

// Function to remove a book from the shelf
function removeBookFromShelf(bookId, isComplete) {
  const bookList = isComplete ? completeBookList : incompleteBookList;
  const bookItem = bookList.querySelector(`[data-id="${bookId}"]`);
  
  if (bookItem) {
    bookList.removeChild(bookItem);
    // Remove the book from local storage
    removeBookFromLocalStorage(bookId);
  }
}

// Function to change the status of a book (move between shelves)
function changeBookStatus(bookId, isComplete) {
  const sourceBookList = isComplete ? completeBookList : incompleteBookList;
  const destinationBookList = isComplete ? incompleteBookList : completeBookList;
  const bookItem = sourceBookList.querySelector(`[data-id="${bookId}"]`);
  
  if (bookItem) {
    sourceBookList.removeChild(bookItem);
    destinationBookList.appendChild(bookItem);
    
    // Update the book status in local storage
    updateBookStatusInLocalStorage(bookId, !isComplete);
  }
}

// Function to save a book to local storage
function saveBookToLocalStorage(book) {
  const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
  storedBooks.push(book);
  localStorage.setItem('books', JSON.stringify(storedBooks));
}

// Function to remove a book from local storage
function removeBookFromLocalStorage(bookId) {
  let storedBooks = JSON.parse(localStorage.getItem('books')) || [];
  storedBooks = storedBooks.filter(book => book.id !== bookId);
  localStorage.setItem('books', JSON.stringify(storedBooks));
}

