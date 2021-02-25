// declare empty library array
let myLibrary = localStorage.getItem("books")
  ? JSON.parse(localStorage.getItem("books"))
  : [];
console.log(myLibrary);
// book constructor
class Book {
  constructor(id, title, author, publisher, read, pinned) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.read = read;
    this.pinned = pinned;
  }
  hasRead() {
    this.read = !this.read;
  }
  hasPinned() {
    this.pinned = !this.pinned;
  }
}
myLibrary.forEach((value, index) => {
  pullFromStorage(index);
});
// function for adding books
function addBookToLibrary() {
  if (
    document.querySelector('input[name="title"]').value === "" ||
    document.querySelector('input[name="author"]').value === ""
  ) {
    return null;
  }

  myLibrary.length === 0 ? (bookid = 1) : (bookid = myLibrary.length + 1);

  bookTitle = document.querySelector('input[name="title"]').value;
  bookAuthor = document.querySelector('input[name="author"]').value;
  bookPublisher = document.querySelector('input[name="publisher"]').value;
  bookRead = false;
  bookPinned = false;

  myLibrary.forEach((value, index) => {
    if (
      bookTitle === myLibrary[index].title &&
      bookAuthor === myLibrary[index].author
    ) {
      alert("You already have this book.");
    }
  });

  newBook = new Book(
    bookid,
    bookTitle,
    bookAuthor,
    bookPublisher,
    bookRead,
    bookPinned
  );

  myLibrary.push(newBook);
  localStorage.setItem("books", JSON.stringify(myLibrary));
  showBooks();

  document.querySelector(".form-container").reset();
  // console.log(myLibrary);
}

function showBooks() {
  const bookContainer = document.querySelector("#library");
  let newBookSlot = document.createElement("div");
  newBookSlot.classList.add("book");
  newBookSlot.dataset.id = bookid;

  //row 1
  idNumber = document.createElement("div");
  idNumber.classList.add("id-number");
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delete");
  idNumber.innerText = bookid;
  idNumber.dataset.id = bookid;
  deleteButton.innerText = "X";
  deleteButton.dataset.id = bookid;
  deleteButton.onclick = () => {
    if (newBookSlot.dataset.id === deleteButton.dataset.id) {
      myLibrary.splice(deleteButton.dataset.id - 1, 1);
      newBookSlot.remove();

      myLibrary.forEach((value, index) => {
        myLibrary[index].id = index + 1;
      });
      let books = document.querySelectorAll(".book");
      books.forEach((value, index) => {
        books[index].dataset.id = index + 1;
      });
      let deleteButtons = document.querySelectorAll(".delete");
      deleteButtons.forEach((value, index) => {
        deleteButtons[index].dataset.id = index + 1;
      });
      let idNumbers = document.querySelectorAll(".id-number");
      idNumbers.forEach((value, index) => {
        idNumbers[index].dataset.id = index + 1;
        idNumbers[index].innerText = idNumbers[index].dataset.id;
      });

      console.log(myLibrary);
    }
  };

  newBookSlot.appendChild(idNumber);
  newBookSlot.appendChild(deleteButton);

  //row 2
  let newBookTitleSlot = document.createElement("div");
  newBookTitleSlot.classList.add("bookinfo", "title");
  let newBookTitle = document.createElement("p");
  newBookTitle.innerText = bookTitle;
  newBookTitleSlot.appendChild(newBookTitle);

  //row 3
  let newBookAuthorSlot = document.createElement("div");
  newBookAuthorSlot.classList.add("bookinfo", "author");
  let newBookAuthor = document.createElement("p");
  newBookAuthor.innerText = bookAuthor;
  newBookAuthorSlot.appendChild(newBookAuthor);

  //row 4
  let newBookPublisherSlot = document.createElement("div");
  newBookPublisherSlot.classList.add("bookinfo", "publisher");
  let newBookPublisher = document.createElement("p");
  newBookPublisher.innerText = bookPublisher;
  newBookPublisherSlot.appendChild(newBookPublisher);

  //row 5
  let pinButton = document.createElement("div");
  pinButton.classList.add('pinbutton')
  let pinImg = document.createElement("img");
  pinImg.src = "pin.png";
  pinButton.appendChild(pinImg);
  pinButton.onclick = () => {
    pinButton.parentElement.classList.contains("pinned")
      ? (pinButton.parentElement.classList.remove("pinned"),
        (pinButton.style.backgroundColor = ""))
      : (pinButton.parentElement.classList.add("pinned"),
        (pinButton.style.backgroundColor = "green"));
  };

  let readButtonSlot = document.createElement("div");
  readButtonSlot.setAttribute("id", "readbuttonslot");
  readButtonSlot.innerText = "Read?";
  let readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.name = "read";
  readCheckbox.value = "value";
  readCheckbox.onchange = () => {
    readCheckbox.checked === true
      ? (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = true)
      : (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = false);
    readButtonSlot.parentElement.classList.contains("read")
      ? readButtonSlot.parentElement.classList.remove("read")
      : readButtonSlot.parentElement.classList.add("read");
    console.log(myLibrary);
  };
  readButtonSlot.appendChild(readCheckbox);

  newBookSlot.appendChild(newBookTitleSlot);
  newBookSlot.appendChild(newBookAuthorSlot);
  newBookSlot.appendChild(newBookPublisherSlot);
  newBookSlot.appendChild(pinButton);
  newBookSlot.appendChild(readButtonSlot);
  bookContainer.appendChild(newBookSlot);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openPinned() {
  let books = document.querySelectorAll(".book");
  books.forEach((value, index) => {
    books[index].style.display = "none";
  });

  let pinned = document.querySelectorAll(".pinned");
  pinned.forEach((value, index) => {
    pinned[index].style.display = "grid";
  });
  document.querySelector(".form-popup").style.display = "none";
}

function openBookList() {
  let books = document.querySelectorAll(".book");
  books.forEach((value, index) => {
    books[index].style.display = "grid";
  });
}

function openRead() {
  let books = document.querySelectorAll(".book");
  books.forEach((value, index) => {
    books[index].style.display = "none";
  });

  let read = document.querySelectorAll(".read");
  read.forEach((value, index) => {
    read[index].style.display = "grid";
  });
}

function pullFromStorage(index) {
  const bookContainer = document.querySelector("#library");
  let newBookSlot = document.createElement("div");
  newBookSlot.classList.add("book");
  let books = document.querySelectorAll(".book");
  books.forEach((value, index) => {
    if (myLibrary[index].read === true) {
      books[index].classList.add("read");
    }
  });
  newBookSlot.dataset.id = myLibrary[index].id;
  myLibrary.length === 0 ? (bookid = 1) : (bookid = myLibrary[index].id);

  bookTitle = myLibrary[index].title;
  bookAuthor = myLibrary[index].author;
  bookPublisher = myLibrary[index].publisher;
  bookRead = false;

  idNumber = document.createElement("div");
  idNumber.classList.add("id-number");
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delete");
  idNumber.innerText = bookid;
  idNumber.dataset.id = bookid;
  deleteButton.innerText = "X";
  deleteButton.dataset.id = bookid;
  deleteButton.onclick = () => {
    if (newBookSlot.dataset.id === deleteButton.dataset.id) {
      myLibrary.splice(deleteButton.dataset.id - 1, 1);
      newBookSlot.remove();

      myLibrary.forEach((value, index) => {
        myLibrary[index].id = index + 1;
      });
      let books = document.querySelectorAll(".book");
      books.forEach((value, index) => {
        books[index].dataset.id = index + 1;
      });
      let deleteButtons = document.querySelectorAll(".delete");
      deleteButtons.forEach((value, index) => {
        deleteButtons[index].dataset.id = index + 1;
      });
      let idNumbers = document.querySelectorAll(".id-number");
      idNumbers.forEach((value, index) => {
        idNumbers[index].dataset.id = index + 1;
        idNumbers[index].innerText = idNumbers[index].dataset.id;
      });

      console.log(myLibrary);
    }
  };

  newBookSlot.appendChild(idNumber);
  newBookSlot.appendChild(deleteButton);

  //row 2
  let newBookTitleSlot = document.createElement("div");
  newBookTitleSlot.classList.add("bookinfo", "title");
  let newBookTitle = document.createElement("p");
  newBookTitle.innerText = bookTitle;
  newBookTitleSlot.appendChild(newBookTitle);

  //row 3
  let newBookAuthorSlot = document.createElement("div");
  newBookAuthorSlot.classList.add("bookinfo", "author");
  let newBookAuthor = document.createElement("p");
  newBookAuthor.innerText = bookAuthor;
  newBookAuthorSlot.appendChild(newBookAuthor);

  //row 4
  let newBookPublisherSlot = document.createElement("div");
  newBookPublisherSlot.classList.add("bookinfo", "publisher");
  let newBookPublisher = document.createElement("p");
  newBookPublisher.innerText = bookPublisher;
  newBookPublisherSlot.appendChild(newBookPublisher);

  //row 5
  let pinButton = document.createElement("div");
  pinButton.classList.add("pinbutton");
  let pinImg = document.createElement("img");
  pinImg.src = "pin.png";
  pinButton.appendChild(pinImg);
  console.log(books);
  if (myLibrary[index].pinned === true) {
      books.forEach((value, index) => {
        books[index].classList.add('pinned');
        books[index].children[5].style.backgroundColor = 'green'
      })
    
} 

  pinButton.onclick = () => {
    pinButton.parentElement.classList.contains("pinned")
      ? (pinButton.parentElement.classList.remove("pinned"),
        (pinButton.style.backgroundColor = ""),
        (myLibrary[pinButton.parentElement.dataset.id - 1].pinned = false))
      : (pinButton.parentElement.classList.add("pinned"),
        (pinButton.style.backgroundColor = "green"),
        (myLibrary[pinButton.parentElement.dataset.id - 1].pinned = true));
    localStorage.setItem("books", JSON.stringify(myLibrary));
  };

  let readButtonSlot = document.createElement("div");
  readButtonSlot.setAttribute("id", "readbuttonslot");
  readButtonSlot.innerText = "Read?";
  let readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.name = "read";
  readCheckbox.checked = "false";
  if (myLibrary[index].read === true) {
    readCheckbox.checked = true;
  } else {
    readCheckbox.checked = false;
  }
  readCheckbox.onchange = () => {
    readCheckbox.checked === true
      ? (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = true)
      : (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = false);
    readButtonSlot.parentElement.classList.contains("read")
      ? readButtonSlot.parentElement.classList.remove("read")
      : readButtonSlot.parentElement.classList.add("read");
    localStorage.setItem("books", JSON.stringify(myLibrary));
    console.log(myLibrary);
  };
  readButtonSlot.appendChild(readCheckbox);

  newBookSlot.appendChild(newBookTitleSlot);
  newBookSlot.appendChild(newBookAuthorSlot);
  newBookSlot.appendChild(newBookPublisherSlot);
  newBookSlot.appendChild(pinButton);
  newBookSlot.appendChild(readButtonSlot);
  bookContainer.appendChild(newBookSlot);
}
/*
function deleteAllBooks() {
    let library = document.querySelector('#library')
    while (library.firstChild) {
        library.removeChild(library.firstChild)
    }
    localStorage.clear();
    
}
*/