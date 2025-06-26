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

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "No user found." });
        }
    } catch (error) {
        console.error("Error during user fetch: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await userService.updateUserById(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error during user update: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { user, getUser, updateUser };
