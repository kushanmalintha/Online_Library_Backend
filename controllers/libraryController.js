const libraryService = require("../services/libraryService");
const adminService = require("../services/adminService");

// Helper to check admin
async function checkAdmin(performedBy) {
    if (!performedBy) return false;
    return await adminService.adminCheckService(performedBy);
}

const announcementWrite = async (req, res) => {
    const performedBy = req.body.performedBy || req.query.performedBy;
    if (!(await checkAdmin(performedBy))) {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    try {
        const { announcement } = req.body;
        await libraryService.announcementWrite(announcement);
        res.status(200).json({ message: "announcement write successfully!" });
    } catch (error) {
        console.error("Error during writting announcement: ", error);
    }
}

const announcementGet = async (req, res) => {
    try {
        const result = await libraryService.announcementGet();
        if (result.length === 0) {
            return res.status(404).json({ message: "No announcement found for today" });
        }
        const announcements = result[0].map(row => row.announcement);
        res.status(200).json(announcements);
    } catch (error) {
        console.error("Error during retrieving announcement: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const feedbackWrite = async (req, res) => {
    try {
        const { feedback } = req.body;
        await libraryService.feedbackWrite(feedback);
        res.status(200).json({ message: "feedback write successfully!" });
    } catch (error) {
        console.error("Error during writting feedback: ", error);
    }
}

const deleteUser = async (req, res) => {
    const performedBy = req.body.performedBy || req.query.performedBy;
    if (!(await checkAdmin(performedBy))) {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    try {
        const { user_id } = req.params;
        await libraryService.deleteUser(user_id);
        res.status(200).json({ message: "user delete successfully!" });
    } catch (error) {
        console.error("Error during deleting user: ", error);
    }
}

const addBookNew = async (req, res) => {
    const performedBy = req.body.performedBy || req.query.performedBy;
    if (!(await checkAdmin(performedBy))) {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    try {
        const {title,
            author,
            genre,
            isbn_10,
            isbn_13,
            summary,
            cover_image,
            book_count} = req.body;
        await libraryService.addBookNew(title,
            author,
            genre,
            isbn_10,
            isbn_13,
            summary,
            cover_image,
            book_count);
            res.status(200).json({ message: "book added successfully!" });
    } catch (error) {
        console.error("Error during adding book: ", error);
    }
}

const addBookExist  =async (req, res) => {
    const performedBy = req.body.performedBy || req.query.performedBy;
    if (!(await checkAdmin(performedBy))) {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    try {
        const { book_id } = req.params;
        const { count } = req.body;
        await libraryService.addBookExist(book_id, count);
        res.status(200).json({ message: "book count updated!" });
    } catch (error) {
        console.log("Error while updating count: ", error);
    }
}

const makeAdmin = async (req, res) => {
    try {
        const { user_id } = req.params;
        await libraryService.addAdmin(user_id);
        res.status(200).json({ message: "User promoted to admin!" });
    } catch (error) {
        console.error("Error promoting user to admin: ", error);
        res.status(500).json({ message: "Failed to promote user to admin" });
    }
}

const reservationLookup = async (req, res) => {
    try {
        const { reservation_id } = req.params;
        const result = await libraryService.reservationLookup(reservation_id);
        if (!result) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error during reservation lookup: ", error);
        res.status(500).json({ message: "Error fetching reservation details" });
    }
}

const getFineRate = async (req, res) => {
    try {
        const fineRate = await libraryService.getFineRate();
        res.status(200).json({ fineRate });
    } catch (error) {
        console.error("Error fetching fine rate: ", error);
        res.status(500).json({ message: "Error fetching fine rate" });
    }
}

const updateFineRate = async (req, res) => {
    const performedBy = req.body.performedBy || req.query.performedBy;
    if (!(await checkAdmin(performedBy))) {
        return res.status(403).json({ success: false, message: "Forbidden: Admins only." });
    }
    try {
        const { fineRate } = req.body;
        await libraryService.updateFineRate(fineRate);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error updating fine rate: ", error);
        res.status(500).json({ success: false, message: "Error updating fine rate" });
    }
}

const getBorrowedBooks = async (req, res) => {
    try {
        const { user_id } = req.params;
        const books = await libraryService.getBorrowedBooks(user_id);
        res.status(200).json({ books });
    } catch (error) {
        console.error("Error fetching borrowed books: ", error);
        res.status(500).json({ message: "Error fetching borrowed books" });
    }
}

const returnBook = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { bookId, returnDate } = req.body;
        const result = await libraryService.returnBook(user_id, bookId, returnDate);
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        if (result.fineDue !== undefined) {
            res.status(200).json({ fineDue: result.fineDue });
        } else {
            res.status(200).json({ message: "Book returned successfully!" });
        }
    } catch (error) {
        console.error("Error processing return: ", error);
        res.status(500).json({ message: "Error processing return" });
    }
}

module.exports = { announcementWrite, deleteUser, addBookNew, addBookExist, announcementGet, feedbackWrite, makeAdmin, reservationLookup, getFineRate, updateFineRate, getBorrowedBooks, returnBook };
