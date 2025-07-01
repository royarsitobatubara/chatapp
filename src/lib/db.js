import mysql2 from 'mysql2';

const db = mysql2.createConnection({
  host: 'localhost',      // ← ganti sesuai kebutuhan
  user: 'root',           // ← username MySQL kamu
  password: '',           // ← password MySQL kamu
  database: 'chatapp'     // ← nama database kamu
});

export default db;
