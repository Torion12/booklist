//class book: to represent the books
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//class to handle the UI task

class UI {
    //display the UI
    static displayedBook (){
        const books = Stored.getBooks();
        books.forEach((book) => UI.addBookList(book));
    }

    //show Alert
    static alertMessage( message , classname ){
        const div = document.createElement('div');
        div.classList.add('alert', `alert-${classname}`);
        div.textContent = message;
        document.querySelector(".container").insertBefore(div, document.querySelector("#book-form"));
        setTimeout(() => {
            div.remove();
        },2000);

    }

    //delete
    static deleteList(el){
        el.classList.contains('delete') ? el.parentElement.parentElement.remove() : null; 
    }

    static clearfield(){
        const title = document.querySelector("#title").value = "";
        const author = document.querySelector("#author").value = "";
        const isbn = document.querySelector("#isbn").value = "";

    }

    //add
    static addBookList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X<a></td>
        `;
        
        list.appendChild(row)
    }
}

class Stored {
    static getBooks(){
        let books;
        localStorage.getItem('books') === null ? books = [] : books = JSON.parse(localStorage.getItem('books'));
        
        return books;
    }
    static addBooks(book){
        const books = Stored.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books = Stored.getBooks();

        books.forEach((book, index) =>{
            book.isbn === isbn ? book.splice(index, 1) : null ;
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}



//display in the fronend
addEventListener("DOMContentLoaded", UI.displayedBook)

//add the books when submitting
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Correct the query selectors
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    
    //validate
    if( title === "" || author === "" || isbn === ""){
        UI.alertMessage("Please Fill out All fields", "danger")
    }else{
        const book = new Book(title, author, isbn);
        UI.addBookList(book);
        Stored.addBooks(book);
        UI.alertMessage("Successfully Added", "success");
        UI.clearfield();
    }

    // Use the correct class name
});

//delete
document.querySelector("#book-list").addEventListener("click", e => {
    const userConfirm = window.confirm("Do you want to delete this Record?")
    userConfirm ? UI.deleteList(e.target) : null;
})
