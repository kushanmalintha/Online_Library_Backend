const db = require("../config/dbConfig");
const User = require("../models/user_model");

const getUserById = async (user_id) => {
    const sql = `SELECT username, email, phone_no, membership_date FROM users WHERE user_id = ?`;
    const [result] = await db.execute(sql, [user_id]);
    return result[0] || null;
};

const updateUserById = async (user_id, { username, email, phone_no }) => {
    const sql = `UPDATE users SET username = ?, email = ?, phone_no = ? WHERE user_id = ?`;
    await db.execute(sql, [username, email, phone_no, user_id]);
    // Return updated user
    return getUserById(user_id);
};

module.exports = { getUserById, updateUserById };
