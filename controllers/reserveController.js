const reserveService = require("../services/reserveService");

const reserve = async (req, res) => {
    try {
        const { user_id, book_id } = req.params;
        const result = await reserveService.reserve(user_id, book_id);

        if (result.success) {
            const { reservationId } = result;
            res.status(200).json({ success: true, message: "Book reserve successfully!", reservationId });
        } else {
            res.status(400).json({ success: false, message: "Failed to reserve the book." });
        }
    } catch (error) {
        console.error("Error during book reservation: ", error);
        res.status(500).json({ success: false, message: "Error during book reservation. Please try again later." });
    }
};

const reserveDelete = async (req, res) => {
    try {
        const { reservation_id, book_id } = req.params;
        const result = await reserveService.reserveDelete(reservation_id, book_id);

        if (result.success) {
            res.status(200).json({ success: true, message: "Book reservation deleted successfully and book count updated." });
        } else {
            res.status(400).json({ success: false, message: result.message || "Failed to delete reservation." });
        }
    } catch (error) {
        console.error("Error during book reservation delete:", error);
        res.status(500).json({ success: false, message: "Error during book reservation delete. Please try again later."
        });
    }
};

module.exports = { reserve, reserveDelete };
