const db = require("../config/dbConfig");
const { signupDetails } = require("../middlewares/signupMiddleware");
const bcrypt = require("bcryptjs");

const signup = async (username, password, email, phone_no, membership_date) => {
    try {
        const userValid = { username, password, email, phone_no, membership_date };
        const { error } = signupDetails.validate(userValid);
        if (error) {
            let errorMessage = "";

            // Check for specific validation errors
            error.details.forEach(detail => {
                if (detail.context.key === 'username') {
                    errorMessage = "Username must be at least 3 characters and contain only letters and numbers.";
                } else if (detail.context.key === 'password') {
                    errorMessage = "Your password must include: At least 8 characters, At least one uppercase letter (A-Z), least one lowercase letter (a-z), At least one number (0-9), At least one special symbol (like !, @, #, $, etc.)";
                } else if (detail.context.key === 'email') {
                    errorMessage = "Invalid email format. Please enter a valid email address.";
                } else if (detail.context.key === 'phone_no') {
                    errorMessage = "Phone number must be exactly 10 digits.";
                } else if (detail.context.key === 'membership_date') {
                    errorMessage = "Membership date must be in MM/DD/YYYY format.";
                } else {
                    errorMessage = error.details[0].message;
                }
            });

            return { success: false, message: errorMessage };
        }

        // Check if the email already exists in the database
        const emailCheckSql = "SELECT * FROM users WHERE email = ?";
        const [existingUser] = await db.execute(emailCheckSql, [email]);
        if (existingUser.length > 0) {
            return { success: false, message: "Email is already in use" };
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert user details into the database
        const sql = `
            INSERT INTO users 
            (username, password, email, phone_no, membership_date) 
            VALUES (?, ?, ?, ?, ?)
        `;

        await db.execute(sql, [
            username,
            hashedPassword,
            email,
            phone_no,
            membership_date
        ]);

        // Return success on user creation
        return { success: true, message: "Signup successful" };

    } catch (err) {
        return { success: false, message: err.message };
    }
};

module.exports = { signup };
