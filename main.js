let books = JSON.parse(localStorage.getItem("books")) || [];
document.addEventListener("DOMContentLoaded", function () {

  
  function addBook(book) {
    book.id = +new Date();
    books.push(book);
    updateLocalStorage();
    renderBooks();
  }
  function updateLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function renderBooks() {
    const incompleteBookshelfList = document.getElementById(
      "incompleteBookshelfList"
    );
    const completeBookshelfList = document.getElementById(
      "completeBookshelfList"
    );

    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    books.forEach(function (book, index) {
      const bookItem = document.createElement("div");
      bookItem.className = "book_item";
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = "Penulis: " + book.author;
      const bookYear = document.createElement("p");
      bookYear.textContent = "Tahun: " + book.year;

      const bookAction = document.createElement("div");
      bookAction.className = "action";
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.className = "red";
      deleteButton.addEventListener("click", function () {
        const confirmDelete = confirm(
          "Apakah Anda yakin ingin menghapus buku ini?"
        );
        if (confirmDelete) {
          books.splice(index, 1);
          updateLocalStorage();
          renderBooks();
        }
      });

      function editBook(index) {
        const book = books[index];

        const updatedTitle = prompt("Edit Title:", book.title);
        const updatedAuthor = prompt("Edit Author:", book.author);
        const updatedYear = prompt("Edit Year:", book.year);
        const updatedIsComplete = confirm("Is it complete?");

        if (
          updatedTitle !== null &&
          updatedAuthor !== null &&
          updatedYear !== null
        ) {
          book.title = updatedTitle;
          book.author = updatedAuthor;
          book.year = parseInt(updatedYear);
          book.isComplete = updatedIsComplete;

          updateLocalStorage();

          renderBooks();
        }
      }

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "green";
      editButton.addEventListener("click", function () {
        editBook(index);
      });
      bookAction.appendChild(editButton);

      bookAction.appendChild(deleteButton);

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);
      bookItem.appendChild(bookAction);

      if (book.isComplete) {
        const markAsIncompleteButton = document.createElement("button");
        markAsIncompleteButton.textContent = "Belum selesai dibaca";
        markAsIncompleteButton.className = "green";
        markAsIncompleteButton.addEventListener("click", function () {
          book.isComplete = false;
          updateLocalStorage();
          renderBooks();
        });
        bookAction.appendChild(markAsIncompleteButton);
        completeBookshelfList.appendChild(bookItem);
      } else {
        const markAsCompleteButton = document.createElement("button");
        markAsCompleteButton.textContent = "Selesai dibaca";
        markAsCompleteButton.className = "green";
        markAsCompleteButton.addEventListener("click", function () {
          book.isComplete = true;
          updateLocalStorage();
          renderBooks();
        });

        bookAction.appendChild(markAsCompleteButton);
        incompleteBookshelfList.appendChild(bookItem);
      }
    });
  }
  renderBooks();

  const inputBookForm = document.getElementById("inputBook");
  inputBookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("inputBookTitle");
    const authorInput = document.getElementById("inputBookAuthor");
    const yearInput = document.getElementById("inputBookYear");
    const isCompleteInput = document.getElementById("inputBookIsComplete");

    const newBook = {
      id: +new Date(),
      title: titleInput.value,
      author: authorInput.value,
      year: parseInt(yearInput.value, 10),
      isComplete: isCompleteInput.checked,
    };

    books.push(newBook);
    updateLocalStorage();
    renderBooks();

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    isCompleteInput.checked = false;
  });
});

function openEditForm(bookIndex) {
  const book = books[bookIndex];

  const titleInput = document.getElementById("inputBookTitle");
  const authorInput = document.getElementById("inputBookAuthor");
  const yearInput = document.getElementById("inputBookYear");
  const isCompleteInput = document.getElementById("inputBookIsComplete");

  titleInput.value = book.title;
  authorInput.value = book.author;
  yearInput.value = book.year;
  isCompleteInput.checked = book.isComplete;

  const inputBookForm = document.getElementById("inputBook");
  inputBookForm.dataset.editIndex = bookIndex;
}

const inputBookForm = document.getElementById("inputBook");
inputBookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("inputBookTitle");
  const authorInput = document.getElementById("inputBookAuthor");
  const yearInput = document.getElementById("inputBookYear");
  const isCompleteInput = document.getElementById("inputBookIsComplete");

  const bookIndex = inputBookForm.dataset.editIndex;

  books[bookIndex] = {
    title: titleInput.value,
    author: authorInput.value,
    year: yearInput.value,
    isComplete: isCompleteInput.checked,
  };

  updateLocalStorage();

  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
  delete inputBookForm.dataset.editIndex;
  renderBooks();
});

const toggleDarkModeButton = document.getElementById("toggleDarkMode");
toggleDarkModeButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
  updateToggleButton();
}
function updateToggleButton() {
  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  toggleDarkModeButton.textContent =
    currentTheme === "dark" ? "Light Mode" : "Dark Mode";
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
updateToggleButton();

function renderSearchResults(results) {
  const searchResultsList = document.getElementById("searchResultsList");
  searchResultsList.innerHTML = "";

  results.forEach(function (book) {
    const bookItem = document.createElement("div");
    bookItem.className = "book_shelf";
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "Penulis: " + book.author;
    const bookYear = document.createElement("p");
    bookYear.textContent = "Tahun: " + book.year;
    const bookIsComplete = document.createElement("p");
    bookIsComplete.textContent = "Selesai dibaca: " + book.isComplete;

    const bookAction = document.createElement("div");
    bookAction.className = "action";
    
   

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);
    bookItem.appendChild(bookAction);
    bookItem.appendChild(bookIsComplete);

    searchResultsList.appendChild(bookItem);
  });

  if (results.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "Tidak ada hasil yang ditemukan";
    searchResultsList.appendChild(noResultsMessage);
  }
}

function searchByTitle(judul) {
  const hasilPencarian = books.filter(buku => buku.title.toLowerCase().includes(judul.toLowerCase()));
  renderSearchResults(hasilPencarian);
}
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    searchByTitle(searchTerm);
  } else {
    renderSearchResults(books);
  }
});
