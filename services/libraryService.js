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

const addAdmin = async (user_id) => {
    const sql = `INSERT INTO admin (user_id) VALUES (?)`;
    const result = await db.execute(sql, [user_id]);
    return result;
}

const reservationLookup = async (reservation_id) => {
    // Get user_id and book_id from transactions table
    const [transactionRows] = await db.execute(
        `SELECT user_id, book_id FROM transactions WHERE reservation_id = ?`,
        [reservation_id]
    );
    if (!transactionRows.length) return null;
    const { user_id, book_id } = transactionRows[0];

    // Get book title from books table
    const [bookRows] = await db.execute(
        `SELECT title FROM books WHERE book_id = ?`,
        [book_id]
    );
    if (!bookRows.length) return null;
    const bookName = bookRows[0].title;

    return { bookName, userId: user_id };
}

const getFineRate = async () => {
    const [rows] = await db.execute('SELECT amount FROM fine_rate LIMIT 1');
    if (!rows.length) return null;
    return rows[0].amount;
}

const updateFineRate = async (fineRate) => {
    const sql = 'UPDATE fine_rate SET amount = ?';
    const result = await db.execute(sql, [fineRate]);
    return result;
}

const getBorrowedBooks = async (user_id) => {
    // Get all borrowed books for the user
    const [rows] = await db.execute(
        `SELECT t.book_id, b.title FROM transactions t JOIN books b ON t.book_id = b.book_id WHERE t.user_id = ? AND t.status = 'borrowed'`,
        [user_id]
    );
    return rows.map(row => ({ id: row.book_id, name: row.title }));
}

const returnBook = async (user_id, book_id, returnDate) => {
    // Get transaction for this user and book with status 'borrowed'
    const [transactions] = await db.execute(
        `SELECT transaction_id, due_date FROM transactions WHERE user_id = ? AND book_id = ? AND status = 'borrowed' LIMIT 1`,
        [user_id, book_id]
    );
    if (!transactions.length) return { error: 'No borrowed transaction found.' };
    const { transaction_id, due_date } = transactions[0];

    // Update transaction: set return_date and status
    await db.execute(
        `UPDATE transactions SET return_date = ?, status = 'returned' WHERE transaction_id = ?`,
        [returnDate, transaction_id]
    );

    // Increment book count
    await db.execute(
        `UPDATE books SET count = count + 1 WHERE book_id = ?`,
        [book_id]
    );

    // Check for overdue and calculate fine
    const returnDateObj = new Date(returnDate);
    const dueDateObj = new Date(due_date);
    let fineDue = 0;
    if (returnDateObj > dueDateObj) {
        const diffTime = Math.abs(returnDateObj - dueDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const fineRate = await getFineRate();
        fineDue = diffDays * fineRate;
    }
    return fineDue > 0 ? { fineDue } : {};
}

module.exports = { announcementWrite, deleteUser, addBookNew, addBookExist, announcementGet, feedbackWrite, addAdmin, reservationLookup, getFineRate, updateFineRate, getBorrowedBooks, returnBook };
