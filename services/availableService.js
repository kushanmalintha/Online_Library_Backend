const db = require("../config/dbConfig");

const available = async (book_id) => {
    const sql = `SELECT 
        b.count - IFNULL(COUNT(t.status), 0) AS available_books
        FROM 
            books b
        LEFT JOIN 
            transactions t ON b.book_id = t.book_id AND t.status = 'borrowed'
        WHERE 
            b.book_id = ?
        GROUP BY 
            b.book_id`;
    
    const [result] = await db.execute(sql, [book_id]);

    const availableBooks = result[0].available_books;

    if (availableBooks <= 0) {
        return { message: 'not available' };
    } else {
        return { message: 'available' };
    }
};

module.exports = { available };
