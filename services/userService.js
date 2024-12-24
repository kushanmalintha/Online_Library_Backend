const db = require("../config/dbConfig");
const User = require("../models/user_model");

const user = async (user_id) => {
    const sql = `select username from users where user_id = ?`;
    const [result] = await db.execute(sql, [user_id]);
    return result.map(
        (row) => new User(
            row.username,
        )
    );
};

module.exports = { user };
