 // declare the empty library array
 myLibrary = [];
// constructor for Book objects
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    
  }
}
// function to add books to the library array
function addBookToLibrary() {
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
   bookTitle = 'Title: ' + document.querySelector('input[name="title"]').value;
   bookAuthor = 'Author: ' + document.querySelector('input[name="author"]').value;
   // TODO this could probably be changed to a forEach loop TODO
for (let i=0; i<myLibrary.length; i++) {
  if (bookTitle === myLibrary[i].title) {
    console.log("You already have this book!");
    return null;
  }
}
  // creating the book object using the user-inputted data
  newBook = new Book(bookid, bookTitle, bookAuthor);
  // first we push the data into the library array
    myLibrary.push(newBook);
  // then we run the showBooks function to put the new book in the DOM
    showBooks();
    console.log(myLibrary);

  // remove the 'Add New Book' button, and then re-create it
  /* 
document.querySelector(".addNewBook").remove();
let addNewBook = document.createElement("div");
addNewBook.classList.add("addNewBook");
addNewBook.onclick = () => openForm();
let addNewBookText = document.createElement("p");
addNewBookText.innerText = "Add New Book...";
addNewBook.appendChild(addNewBookText);
document.querySelector("#library").appendChild(addNewBook);
*/
document.querySelector(".form-container").reset();

}
  // the showBooks function to display books to the user
function showBooks() {
  const bookContainer = document.querySelector("#library");
  let bookSlot = document.createElement('div');
  bookSlot.classList.add('book')
  bookSlot.dataset.id = bookid;
  let newBookTitleSlot = document.createElement("div");
  let newBookAuthorSlot = document.createElement("div");
  let deleteSlot = document.createElement('div');
  deleteSlot.classList.add('delete');
  deleteSlot.dataset.id = bookid;
  deleteSlot.onclick = () => {
    
    if (bookSlot.dataset.id === deleteSlot.dataset.id) {
      myLibrary.splice(deleteSlot.dataset.id, 1);
      bookSlot.remove();
      deleteSlot.remove();
      books = document.querySelectorAll('.book');
      myLibrary.forEach((value, index) => {
        myLibrary[index].id = index;
      });
      books.forEach((value, index) => {
        books[index].dataset.id = index;
        
      });
      deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach((value, index) => {
        deleteButtons[index].dataset.id = index;
      })
      
      console.log("book deleted");
      console.log(myLibrary);
    }
    }
    
    
  newBookTitleSlot.classList.add("title");
  newBookAuthorSlot.classList.add("author");
  let newBookTitle = document.createElement("p");
  newBookTitle.innerText = bookTitle;
  let newBookAuthor = document.createElement("p");
  newBookAuthor.innerText = bookAuthor;
  let deleteBook = document.createElement('p');
  deleteBook.innerText = 'Delete';
  newBookTitleSlot.appendChild(newBookTitle);
  newBookAuthorSlot.appendChild(newBookAuthor);
  bookSlot.appendChild(deleteSlot);
  deleteSlot.appendChild(deleteBook);
  bookSlot.appendChild(newBookTitleSlot);
  bookSlot.appendChild(newBookAuthorSlot);
  
  bookContainer.appendChild(bookSlot);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
