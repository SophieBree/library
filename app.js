let myLibrary = [];

function Book(title, author) {
    this.title = title
    this.author = author
    this.info = function() {
        return `${title}, by ${author}`
    }
}

const book1 = new Book('The Deficit Myth', 'Stephanie Kelton')
myLibrary.push(book1.title, book1.author);



function addBookToLibrary() {
    myLibrary = [];
    let tempBook = Object.create(Book);
    tempBook.title = document.querySelector('input[name="title"]');
    tempBook.author = document.querySelector('input[name="author"]');
    myLibrary.push(tempBook.title.value, tempBook.author.value);
    const container = document.querySelector('#container');
    let newBookSlot = document.createElement('div');
    newBookSlot.classList.add('book');
    let newBookTitle = document.createElement('p');
    newBookTitle.innerText = myLibrary[0];
    let newBookAuthor = document.createElement('p');
    newBookAuthor.innerText = myLibrary[1];
    newBookSlot.appendChild(newBookTitle);
    newBookSlot.appendChild(newBookAuthor);
    container.appendChild(newBookSlot);
    console.log(myLibrary);
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}