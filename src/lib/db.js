import mysql2 from 'mysql2';

const db  = mysql2.createConnection({
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
});

export default db;