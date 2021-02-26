let myLibrary = localStorage.getItem("books")
  ? JSON.parse(localStorage.getItem("books"))
  : [];
console.log(myLibrary);

const bookContainer = document.querySelector("#library");

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
let bookid;
let bookTitle;
let bookAuthor;
let bookPublisher;
let bookRead;
let bookPinned;
pullFromStorage();

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
      alert("You already have a book with this title and author.");
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
  document.querySelector(".form-container").reset();
  console.log(myLibrary);
  showBook();
}

function showBook(index) {
  let newBookSlot = document.createElement("div");
  newBookSlot.classList.add("book");
  let books = document.querySelectorAll(".book");
  myLibrary[index] === undefined
    ? (newBookSlot.dataset.id = myLibrary.length)
    : (newBookSlot.dataset.id = myLibrary[index].id);

  //row 1
  let idNumber = document.createElement("div");
  idNumber.classList.add("id-number");
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delete");
  myLibrary[index] === undefined
    ? ((idNumber.innerText = myLibrary.length),
      (idNumber.dataset.id = myLibrary.length))
    : ((idNumber.innerText = myLibrary[index].id),
      (idNumber.dataset.id = myLibrary[index].id));

  deleteButton.innerText = "X";
  myLibrary[index] === undefined
    ? (deleteButton.dataset.id = myLibrary.length)
    : (deleteButton.dataset.id = myLibrary[index].id);

  deleteButton.onclick = () => {
    myLibrary.splice(deleteButton.dataset.id - 1, 1);
    newBookSlot.remove();

    myLibrary.forEach((value, index) => {
      myLibrary[index].id = index + 1;
      console.log(myLibrary)
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
    localStorage.setItem("books", JSON.stringify(myLibrary));
  };

  newBookSlot.appendChild(idNumber);
  newBookSlot.appendChild(deleteButton);

  //row 2
  let newBookTitleSlot = document.createElement("div");
  newBookTitleSlot.classList.add("bookinfo", "title");
  let newBookTitle = document.createElement("p");
  myLibrary[index] === undefined
    ? (newBookTitle.innerText = myLibrary[myLibrary.length - 1].title)
    : (newBookTitle.innerText = myLibrary[index].title);
  newBookTitleSlot.appendChild(newBookTitle);

  //row 3
  let newBookAuthorSlot = document.createElement("div");
  newBookAuthorSlot.classList.add("bookinfo", "author");
  let newBookAuthor = document.createElement("p");
  myLibrary[index] === undefined
    ? (newBookAuthor.innerText = myLibrary[myLibrary.length - 1].author)
    : (newBookAuthor.innerText = myLibrary[index].author);
  newBookAuthorSlot.appendChild(newBookAuthor);

  //row 4
  let newBookPublisherSlot = document.createElement("div");
  newBookPublisherSlot.classList.add("bookinfo", "publisher");
  let newBookPublisher = document.createElement("p");
  myLibrary[index] === undefined
    ? (newBookPublisher.innerText = myLibrary[myLibrary.length - 1].publisher)
    : (newBookPublisher.innerText = myLibrary[index].publisher);
  newBookPublisherSlot.appendChild(newBookPublisher);

  //row 5
  let pinButton = document.createElement("div");
  pinButton.classList.add("pinbutton");
  let pinImg = document.createElement("img");
  pinImg.src = "pin.png";
  pinButton.appendChild(pinImg);
  
  pinButton.onclick = () => {
    if (myLibrary[index] === undefined) {
      if (newBook.pinned === false) {
        newBook.pinned = true;
        pinButton.parentElement.classList.add("pinned");
        pinButton.style.backgroundColor = "green";
        localStorage.setItem("books", JSON.stringify(myLibrary));
        console.log(myLibrary);
      } else {
        newBook.pinned = false;
        pinButton.parentElement.classList.remove("pinned");
        pinButton.style.backgroundColor = "";
        localStorage.setItem("books", JSON.stringify(myLibrary));
        console.log(myLibrary);
      }
  } else {
    if (myLibrary[index].pinned === false) {
      myLibrary[index].pinned = true;
      pinButton.parentElement.classList.add("pinned");
      pinButton.style.backgroundColor = "green";
      localStorage.setItem("books", JSON.stringify(myLibrary));
      console.log(myLibrary);
    } else {
      myLibrary[index].pinned = false;
      pinButton.parentElement.classList.remove("pinned");
      pinButton.style.backgroundColor = "";
      localStorage.setItem("books", JSON.stringify(myLibrary));
      console.log(myLibrary);
    }
  }
}

  let readButtonSlot = document.createElement("div");
  readButtonSlot.classList.add("read-button-slot");
  readButtonSlot.innerText = "Read?";
  let readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.name = "read";


  readCheckbox.onchange = () => {
    readCheckbox.checked === true
      ? (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = true)
      : (myLibrary[readButtonSlot.parentElement.dataset.id - 1].read = false);

    readButtonSlot.parentElement.classList.contains("read")
      ? readButtonSlot.parentElement.classList.remove("read")
      : readButtonSlot.parentElement.classList.add("read");
    localStorage.setItem("books", JSON.stringify(myLibrary));
  };

  readButtonSlot.appendChild(readCheckbox);

  newBookSlot.appendChild(newBookTitleSlot);
  newBookSlot.appendChild(newBookAuthorSlot);
  newBookSlot.appendChild(newBookPublisherSlot);
  newBookSlot.appendChild(pinButton);
  newBookSlot.appendChild(readButtonSlot);
  bookContainer.appendChild(newBookSlot);

  myLibrary.forEach((value, index) => {
    let books = document.querySelectorAll('.book');
      books.forEach((value, index) => {
        if (myLibrary[index].pinned === true) {
          books[index].classList.add('pinned');
          books[index].childNodes[5].style.backgroundColor = 'green'
      } else {
          books[index].classList.remove('pinned');
          books[index].childNodes[5].style.backgroundColor = ''
        }

        if (myLibrary[index].read === true) {
          
          books[index].classList.add('read');
        } else {
          books[index].classList.remove('read');
        }

        if (books[index].classList.contains('read')) {
          books[index].childNodes[6].childNodes[1].checked = true;
        }
      })
  })
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

function pullFromStorage() {
  myLibrary.forEach((value, index) => {
    showBook(index);
  });
}
