const db = require("../config/dbConfig");

const announcementGet = async () => {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - timezoneOffset);
    const currentDate = localDate.toISOString().split('T')[0];

    const sql = `SELECT announcement FROM announcement WHERE date = ?`;
    const [rows] = await db.execute(sql, [currentDate]);
    
    if (rows.length > 0) {
        return rows[0].announcement;
    } else {
        return null;
    }
}

const feedback = async (feedback) => {
    const sql = `insert into feedback_suggestion (feedback) values (?)`;
    const result = await db.execute(sql, [feedback]);
    return result;
}

module.exports = { announcementGet, feedback };
