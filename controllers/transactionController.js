const transactionService = require("../services/transactionService");

const transaction = async (req, res) => {
    try {
        const { user_id, book_id } = req.params;
        const { borrow_date, loan_days, status } = req.body;

        // Call the service and capture the result
        const result = await transactionService.transaction(user_id, book_id, borrow_date, loan_days, status);

        if (result.success) {
            // If the transaction was successful, send success response
            res.status(200).json({ success: true, message: "Transaction completed successfully!" });
        } else {
            // If the transaction was unsuccessful, send error message from the service
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error("Error during book transaction: ", error);
        // Send an internal server error response
        res.status(500).json({ success: false, message: "An error occurred during the transaction process." });
    }
}

module.exports = { transaction };
