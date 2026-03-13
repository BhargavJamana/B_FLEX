const { createPool } = require("mysql2");




const db = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
})



db.getConnection((error, connection) => {
    if (error) {
        console.log('connection failed', error.message);
    }
    console.log('db connected');
    connection.release();
})

module.exports = db.promise();

