const db = require("../config/dbConfig");

const announcementWrite = async (announcement) => {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);
    const currentDate = localDate.toISOString().split('T')[0];

    const sql = `insert into announcement (date, announcement) values (?, ?)`;
    const result = await db.execute(sql, [currentDate, announcement]);
    
    return result;
}

const announcementGet = async () => {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);
    const currentDate = localDate.toISOString().split('T')[0];

    const sql = `SELECT * FROM announcement WHERE date = ?`;
    const result = await db.execute(sql, [currentDate]);

    return result;
}

const feedbackWrite = async (feedback) => {
    const sql = `insert into feedback_suggestion (feedback) values (?)`;
    const result = await db.execute(sql, [feedback]);
    return result;
}

const deleteUser = async (user_id) => {
    const sql = `delete from users where user_id = ?`;
    const result = await db.execute(sql, [user_id]);
    return result;
}

const addBookNew = async (title, 
    author, 
    genre, 
    isbn_10, 
    isbn_13, 
    summary, 
    cover_image,
    book_count) => {
        const sql = `insert into books (title,
        author,
        genre,
        isbn_10,
        isbn_13,
        summary,
        cover_image,
        count) values (?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await db.execute(sql, [title,
            author,
            genre,
            isbn_10,
            isbn_13,
            summary,
            cover_image,
            book_count
        ]);
        return result;
}

const addBookExist = async (book_id, count) => {
    const sql = `UPDATE books SET count = count + ? WHERE book_id = ?`;
    const result = await db.execute(sql, [count, book_id]);
    return result;
}

module.exports = { announcementWrite, deleteUser, addBookNew, addBookExist, announcementGet, feedbackWrite };
