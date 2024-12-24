const adminService = require("../services/adminService");

const adminCheckController = async (req, res) => {
    try {
        const { userId } = req.body;
        const isAdmin = await adminService.adminCheckService(userId);
        res.status(200).json({ isAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { adminCheckController };
