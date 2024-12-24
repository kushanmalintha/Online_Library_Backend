const loginService = require("../services/loginService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginService.login(email, password);

        // If login is successful, return the user id and token
        if (result.success) {
            const { user_id, accessToken, username } = result;
            res.status(200).json({ success: true, message: "User logged in successfully!", user_id: user_id, username: username, accessToken: accessToken });
        } else {
            // Send failure response with error message
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

module.exports = { login };
