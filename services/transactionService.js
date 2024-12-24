const db = require("../config/dbConfig");

const transaction = async (user_id, book_id, borrow_date, loan_days, status) => {
    // Query to get the closest reservation_id and reservation_date
    const getReservationIdSql = `
        SELECT reservation_id, reservation_date
        FROM reservations
        WHERE user_id = ? AND book_id = ?
        ORDER BY reservation_date DESC
        LIMIT 1
    `;

    const [reservationResult] = await db.execute(getReservationIdSql, [user_id, book_id]);

    if (reservationResult.length === 0) {
        return { success: false, message: "No reservation found." };
    }

    const { reservation_id, reservation_date } = reservationResult[0];

    // Convert the reservation_date string (assuming YYYY-MM-DD format) to a Date object
    const reservationDateObj = new Date(reservation_date);

    // Adjust to local time by applying timezone offset
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const adjustedReservationDateObj = new Date(reservationDateObj.getTime() - timezoneOffset);

    // Max borrow date is 7 days from the reservation date
    const maxBorrowDate = new Date(adjustedReservationDateObj.getTime());
    maxBorrowDate.setDate(maxBorrowDate.getDate() + 7);

    // Convert user-entered borrow_date to Date object
    const [year, month, day] = borrow_date.split('-'); // Assuming YYYY-MM-DD format from the user
    const borrowDateObj = new Date(`${year}-${month}-${day}`);
    const adjustedBorrowDateObj = new Date(borrowDateObj.getTime() - timezoneOffset);

    // Check if the user-entered borrow_date is within the allowed range
    if (adjustedBorrowDateObj < adjustedReservationDateObj || adjustedBorrowDateObj > maxBorrowDate) {
        return { success: false, message: `Borrow date must be between ${adjustedReservationDateObj.toISOString().split('T')[0]} and ${maxBorrowDate.toISOString().split('T')[0]}.` };
    }

    // Validate that loan_days is between 7 and 30
    if (loan_days < 7 || loan_days > 30) {
        return { success: false, message: "Loan days must be between 7 and 30 days." };
    }

    // Calculate the due date based on loan_days
    const dueDate = new Date(adjustedBorrowDateObj);
    dueDate.setDate(dueDate.getDate() + loan_days);
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    // Insert into the transactions table
    const insertTransactionSql = `
        INSERT INTO transactions (user_id, book_id, borrow_date, due_date, status, reservation_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute(insertTransactionSql, [
        user_id,
        book_id,
        adjustedBorrowDateObj.toISOString().split('T')[0],
        formattedDueDate,
        status,
        reservation_id
    ]);

    return { success: true, result };
};

module.exports = { transaction };
