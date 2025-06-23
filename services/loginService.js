require('dotenv').config();
const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
    try {
        const sql = `SELECT user_id, username, email, password FROM users WHERE email = ?`;
        const [result] = await db.execute(sql, [email]);
    
        if (result.length === 0 || !(await bcrypt.compare(password, result[0].password))) {
            return { success: false, message: "Invalid email or password!" };
        }
    
        const user = { user_id: result[0].user_id, email: result[0].email };
        const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
        return { success: true, message:"Login successfully", user_id: result[0].user_id, username: result[0].username, accessToken }; 
    } catch (err) {
        return { success: false, message: err.message };
    }
};

module.exports = { login };
