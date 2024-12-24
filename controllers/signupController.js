const signupService = require("../services/signupService");

const signup = async (req, res) => {
    try {
        const { username, password, email, phone_no, membership_date } = req.body;

        // Call the signupService to handle the signup logic
        const result = await signupService.signup(username, password, email, phone_no, membership_date);

        // Check if the signup was successful
        if (result.success) {
            // Send success response
            res.status(200).json({ success: true, message: "User created successfully!" });
        } else {
            // Send failure response with error message
            res.status(400).json({ success: false, message: result.message });
        }

    } catch (error) {
        console.error("Error during signup: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { signup };
