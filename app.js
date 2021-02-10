// declare the empty library array
myLibrary = [];
// constructor for Book objects
class Book {
  constructor(id, title, author, publisher, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.read = read;
    this.hasRead = (value) => {
      this.read = value;
    };
  }
}
// function to add books to the library array
function addBookToLibrary() {
  if (
    document.querySelector('input[name="title"]').value === "" ||
    document.querySelector('input[name="author"]').value === ""
  ) {
    return null;
  }
  // first we close the form
  closeForm();
  // if the library has no books in it, declare the first book's id to be 0
  if (myLibrary.length === 0) {
    bookid = 0;
    // otherwise it's just the length of the array (so second book is 1, third book is 2, and so on)
  } else {
    bookid = myLibrary.length;
  }
  // declaring the book's title and author to be what the user wrote in the form
  bookTitle = "Title: " + document.querySelector('input[name="title"]').value;
  bookAuthor =
    "Author: " + document.querySelector('input[name="author"]').value;
  bookPublisher =
    "Publisher: " + document.querySelector('input[name="publisher"]').value;
  bookRead = false;
  // TODO this could probably be changed to a forEach loop TODO
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      bookTitle === myLibrary[i].title &&
      bookAuthor === myLibrary[i].author
    ) {
      alert("You already have this book!");
      return null;
    }
  }
  // creating the book object using the user-inputted data
  newBook = new Book(bookid, bookTitle, bookAuthor, bookPublisher, bookRead);
  // first we push the data into the library array
  myLibrary.push(newBook);
  // then we run the showBooks function to put the new book in the DOM
  showBooks();
  console.log(myLibrary);
  // reset the form once a book has been submitted
  document.querySelector(".form-container").reset();
}
// the showBooks function to display books to the user
function showBooks() {
  // declarations of variables
  const bookContainer = document.querySelector("#library");
  let bookSlot = document.createElement("div");
  bookSlot.classList.add("book");
  // assign the book an id
  bookSlot.dataset.id = bookid;
  // create the elements for the book card
  let newBookTitleSlot = document.createElement("div");
  let newBookAuthorSlot = document.createElement("div");

  let deleteSlot = document.createElement("div");
  deleteSlot.classList.add("delete");
  deleteSlot.dataset.id = bookid;
  deleteSlot.onclick = () => {
    // so the delete button only deletes the book associated with it
    if (bookSlot.dataset.id === deleteSlot.dataset.id) {
      // cut it out of the array and remove the DOM elements
      myLibrary.splice(deleteSlot.dataset.id, 1);
      bookSlot.remove();
      deleteSlot.remove();
      // the ids now need to be reassigned because there is a hole
      books = document.querySelectorAll(".book");
      myLibrary.forEach((value, index) => {
        myLibrary[index].id = index;
      });
      books.forEach((value, index) => {
        books[index].dataset.id = index;
      });
      deleteButtons = document.querySelectorAll(".delete");
      deleteButtons.forEach((value, index) => {
        deleteButtons[index].dataset.id = index;
      });

      console.log("book deleted");
      console.log(myLibrary);
    }
  };

  // making the elements for the book info
  newBookTitleSlot.classList.add("title");
  newBookAuthorSlot.classList.add("author");

  let newBookTitle = document.createElement("p");
  newBookTitle.innerText = bookTitle;
  let newBookAuthor = document.createElement("p");
  newBookAuthor.innerText = bookAuthor;

  let deleteBook = document.createElement("p");
  deleteBook.innerText = "X";
  newBookTitleSlot.appendChild(newBookTitle);
  newBookAuthorSlot.appendChild(newBookAuthor);

  bookSlot.appendChild(deleteSlot);
  deleteSlot.appendChild(deleteBook);
  bookSlot.appendChild(newBookTitleSlot);
  bookSlot.appendChild(newBookAuthorSlot);

  let newBookPublisherSlot = document.createElement("div");
  newBookPublisherSlot.classList.add("publisher");
  let newBookPublisher = document.createElement("p");
  if (bookPublisher != "Publisher: ") {
    newBookPublisher.innerText = bookPublisher;
  } else {
    newBookPublisher.innerText = "Publisher: N/A";
  }
  newBookPublisherSlot.appendChild(newBookPublisher);
  bookSlot.appendChild(newBookPublisherSlot);

  let hasReadButtonSlot = document.createElement('div')
  hasReadButtonSlot.classList.add('hasReadCheckbox');
  let hasReadText = document.createElement('label');
  hasReadText.htmlFor = 'read';
  hasReadText.appendChild(document.createTextNode('Mark as read '));
  let hasReadButton = document.createElement('input');
  hasReadButton.setAttribute('type', 'checkbox');
  hasReadButton.classList.add('checkbox')
  hasReadButton.dataset.id = bookid;
  hasReadButton.onchange = () => {
    if (hasReadButton.checked === true && hasReadButton.dataset.id === bookSlot.dataset.id) {
      myLibrary[bookSlot.dataset.id].read = true;
      console.log(myLibrary)
    } else {
      myLibrary[bookSlot.dataset.id].read = false;
      console.log(myLibrary)
    }
  }
  hasReadButtonSlot.appendChild(hasReadText);
  hasReadButtonSlot.appendChild(hasReadButton);
  bookSlot.appendChild(hasReadButtonSlot);
  bookContainer.appendChild(bookSlot);
}
// to open the form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
// to close the form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
