const userService = require("../services/userService");

const user = async (req, res) => {
    try {
        const { user_id } = req.params;
        const userDetails = await userService.user(user_id);

        if (userDetails.length > 0) {
            res.status(200).json(userDetails);
        } else {
            res.status(404).json({ message: "No user found." });

        }
    } catch (error) {
        console.error("Error during user fetch: ", error);
        res.status(500).json({ message: "Internal server error" });       
    }
};

module.exports = { user };
