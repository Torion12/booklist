// Books Class: Represent a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: handle UI task
class UI {
    static displayedBooks () {
        const StoredBooks = [
            {
                title: "Book one",
                author: "dodo",
                isbn:"12345"
            },
            {
                title: "Book two",
                author: "Lowell",
                isbn:"12345"
            }
        ];

        const books = StoredBooks;
        books.forEach((book) => UI.addBookList(book))

    }
    static deleteList(el){
        el.classList.contains('delete') ? el.parentElement.parentElement.remove() : null; 
    }

    static addBookList (book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X<a></td>
        `;

        list.appendChild(row);
    }

}

//Event: Display
addEventListener("DOMContentLoaded", UI.displayedBooks)


//Event: Add 
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Correct the query selectors
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Use the correct class name
    const book = new Book(title, author, isbn);

   UI.addBookList(book);
});

//Event: Remove

document.querySelector("#book-list").addEventListener('click', (e) =>{
    UI.deleteList(e.target);
})
