 myLibrary = [];

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    
  }
}

function addBookToLibrary() {
  closeForm();
  if (myLibrary.length === 0) {
     bookid = 0;
  } else {
     bookid = myLibrary.length;

  }
   bookTitle = document.querySelector('input[name="title"]').value;
   bookAuthor = document.querySelector('input[name="author"]').value;
for (let i=0; i<myLibrary.length; i++) {
  if (bookTitle === myLibrary[i].title) {
    console.log("You already have this book!");
    return null;
  }
}
  newBook = new Book(bookid, bookTitle, bookAuthor);
    myLibrary.push(newBook);
    showBooks();
    console.log(myLibrary);


document.querySelector(".addNewBook").remove();
let addNewBook = document.createElement("div");
addNewBook.classList.add("addNewBook");
addNewBook.onclick = () => openForm();
let addNewBookText = document.createElement("p");
addNewBookText.innerText = "Add New Book...";

addNewBook.appendChild(addNewBookText);
document.querySelector("#books").appendChild(addNewBook);
document.querySelector(".form-container").reset();

}
function showBooks() {
  const bookContainer = document.querySelector("#books");
  let newBookTitleSlot = document.createElement("div");
  let newBookAuthorSlot = document.createElement("div");
  newBookTitleSlot.dataset.id = bookid;
  newBookAuthorSlot.dataset.id = bookid;
  let deleteSlot = document.createElement('div');
  deleteSlot.classList.add('delete');
  deleteSlot.dataset.id = bookid;
  deleteSlot.onclick = () => {
    
    if (newBookTitleSlot.dataset.id === deleteSlot.dataset.id) {
      myLibrary.splice(deleteSlot.dataset.id, 1);
      newBookTitleSlot.remove();
      newBookAuthorSlot.remove();
      deleteSlot.remove();
      books = document.querySelectorAll('.title');
      myLibrary.forEach((value, index) => {
        myLibrary[index].id = index;
      });
      books.forEach((value, index) => {
        books[index].dataset.id = index;
      });
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
  deleteSlot.appendChild(deleteBook);
  bookContainer.appendChild(newBookTitleSlot);
  bookContainer.appendChild(newBookAuthorSlot);
  bookContainer.appendChild(deleteSlot);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
