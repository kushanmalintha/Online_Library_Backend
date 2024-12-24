require('dotenv').config();
const db = require("../config/dbConfig");

const adminCheckService = async (userId) => {
    try {
        const sql = `SELECT user_id FROM admin WHERE user_id = ?`;
        const [result] = await db.execute(sql, [userId]);

        return result.length !== 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { adminCheckService };
