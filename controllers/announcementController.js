const announcementService = require("../services/announcementService");

const announcementGet = async (req, res) => {
    try {
        const announcementContent = await announcementService.announcementGet();
        res.status(200).json({announcementContent});
    } catch (error) {
        console.error("Error during fetch announcement: ", error);
    }
}

const feedback = async (req, res) => {
    try {
        const { feedback } = req.body;
        await announcementService.feedback(feedback);
        res.status(200).json({ message: "feedback write successfully!" });
    } catch (error) {
        console.error("Error during writting feedback: ", error);
    }
}

module.exports = { announcementGet, feedback };