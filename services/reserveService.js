const db = require("../config/dbConfig");
const availableService = require("./availableService");

const reserve = async (user_id, book_id) => {
    try {
        // Check if the book is available
        const availability = await availableService.available(book_id);
        if (availability.message !== 'available') {
            return { success: false, message: "Book is not available for reservation." };
        }

        const date = new Date();
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        const reservation_date = new Date(date.getTime() - timezoneOffset);

        // Insert reservation
        const sql = `INSERT INTO reservations (user_id, 
            book_id, 
            reservation_date) VALUES (?, ?, ?)`;
        const result = await db.execute(sql, [
            user_id,
            book_id,
            reservation_date.toISOString().split('T')[0],
        ]);

        const reservationId = result[0].insertId;

        // Decrement book count
        const decrementSql = `UPDATE books SET count = count - 1 WHERE book_id = ? AND count > 0`;
        await db.execute(decrementSql, [book_id]);

        return { success: true, message: "Book reserved successfully", reservationId };
    } catch (error) {
        console.error("Reservation Error:", error);
        return { success: false, message: "Failed to reserve the book. Please try again." };
    }
};

const reserveDelete = async (reservation_id, book_id) => {
    try {
        // Delete reservation
        const sql = `DELETE FROM reservations WHERE reservation_id = ?`;
        await db.execute(sql, [reservation_id]);

        // Increment book count
        const incrementSql = `UPDATE books SET count = count + 1 WHERE book_id = ?`;
        await db.execute(incrementSql, [book_id]);

        return { success: true, message: "Reservation deleted successfully and book count updated." };
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return { success: false, message: "Failed to delete reservation.", error };
    }
};

module.exports = { reserve, reserveDelete };
