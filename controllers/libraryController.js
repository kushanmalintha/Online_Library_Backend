const libraryService = require("../services/libraryService");

const announcementWrite = async (req, res) => {
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
    try {
        const { user_id } = req.params;
        await libraryService.deleteUser(user_id);
        res.status(200).json({ message: "user delete successfully!" });
    } catch (error) {
        console.error("Error during deleting user: ", error);
    }
}

const addBookNew = async (req, res) => {
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
    try {
        const { book_id } = req.params;
        const { count } = req.body;
        await libraryService.addBookExist(book_id, count);
        res.status(200).json({ message: "book count updated!" });
    } catch (error) {
        console.log("Error while updating count: ", error);
    }
}

module.exports = { announcementWrite, deleteUser, addBookNew, addBookExist, announcementGet, feedbackWrite }
