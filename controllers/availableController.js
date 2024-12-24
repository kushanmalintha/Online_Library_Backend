const availableService = require("../services/availableService");

const available = async (req, res) => {
    try {
        const { book_id } = req.params;
        const avalability = await availableService.available(book_id);

        res.status(200).json(avalability);
    } catch (error) {
        console.error("Error during checking avalability: ", error);
    }
};

module.exports = { available };
