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
   /* make myLibrary empty at the start of the function */
    myLibrary = [];
    /* create the Book object and assign the book's title and author to the array */
    let tempBook = Object.create(Book);
    tempBook.title = document.querySelector('input[name="title"]');
    tempBook.author = document.querySelector('input[name="author"]');
    myLibrary.push(tempBook.title.value, tempBook.author.value);
    /* declare container variables */
    const titleContainer = document.querySelector('#titles');
    const authorContainer = document.querySelector('#authors');

    /* creating the divs that the books will go into */
    let newBookTitleSlot = document.createElement('div');
    let newBookAuthorSlot = document.createElement('div');
    newBookTitleSlot.classList.add('book');
    newBookAuthorSlot.classList.add('book');
    /* creating the element for displaying the name and author of the book */
    let newBookTitle = document.createElement('p');
    newBookTitle.innerText = myLibrary[0];
    let newBookAuthor = document.createElement('p');
    newBookAuthor.innerText = myLibrary[1];

    newBookTitleSlot.appendChild(newBookTitle);
    newBookAuthorSlot.appendChild(newBookAuthor);
    authorContainer.appendChild(newBookAuthorSlot);
    titleContainer.appendChild(newBookTitleSlot);
    
    console.log(myLibrary);
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}