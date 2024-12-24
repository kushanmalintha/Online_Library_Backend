class Book {
    constructor (book_id, title, author, genre, isbn_10, isbn_13, summary, cover_image) {
        this.book_id = book_id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn_10 = isbn_10;
        this.isbn_13 = isbn_13;
        this.summary =summary;
        this.cover_image = cover_image;
    }
};

module.exports = Book;