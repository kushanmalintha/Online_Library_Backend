const bookService = require("../services/bookService");

const book = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            return res.status(400).json({ success: false, message: "Name and type are required." });
        }

        const bookDetails = await bookService.book(name, type);

        if (bookDetails.length > 0) {
            res.status(200).json({ success: true, bookDetails });
        } else {
            res.status(404).json({ success: false, message: "No books found." });
        }
    } catch (error) {
        console.error("Error during book fetch: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await bookService.getBookById(bookId);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { book, getBook };
