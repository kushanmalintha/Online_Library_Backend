const db = require("../config/dbConfig");
const Book = require("../models/book_model");

const book = async (name, type) => {
    let sql;
    if (type === 'book') {
        sql = `SELECT * FROM books WHERE title like ?`;
    } else if (type === 'author') {
        sql = `SELECT * FROM books WHERE author like ?`;
    } else if (type === 'genre') {
        sql = `SELECT * FROM books WHERE genre like ?`;
    } else {
        throw new Error('Invalid type provided');
    }

    const [result] = await db.execute(sql, [`%${name}%`]);

    return result.map(
        (row) => new Book(
            row.book_id,
            row.title,
            row.author,
            row.genre,
            row.isbn_10,
            row.isbn_13,
            row.summary,
            row.cover_image
        )
    );
};

module.exports = { book };
