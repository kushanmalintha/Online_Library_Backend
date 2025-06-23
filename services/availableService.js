const db = require("../config/dbConfig");

const available = async (book_id) => {
    const sql = `SELECT 
        b.count AS available_books
        FROM 
            books b
        WHERE 
            b.book_id = ?`;
    
    const [result] = await db.execute(sql, [book_id]);

    const availableBooks = result[0].available_books;

    if (availableBooks <= 0) {
        return { message: 'not available' };
    } else {
        return { message: 'available' };
    }
};

module.exports = { available };
