import db from "@/lib/db";
import { v4 as uuidV4 } from "uuid";

export default function handler(req, res) {
  const { phone } = req.query;
  const { contact2, name } = req.body;

  if (req.method === "GET") {
    const sql = `
      SELECT 
        u.photo, u.phone, u.iduser,
        c.name 
      FROM contact c
      JOIN users u ON u.phone = c.contact2
      WHERE c.contact1 = ?
    `;

    db.query(sql, [phone], (err, results) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json(results);
    });

  } else if (req.method === "POST") {
    const { contact2, name } = req.body;
    const idcontact = uuidV4();
    if (!contact2 || !name) {
      return res.status(400).json({ error: "contact2 and name are required" });
    }

    const checkSql = `SELECT * FROM contact WHERE contact1=? AND contact2=?`;
    db.query(checkSql, [phone, contact2], (errCheck, resultsCheck) => {
      if (errCheck) {
        console.error("Check error:", errCheck);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (resultsCheck.length > 0) {
        return res.status(409).json({ message: "Contact already exists" });
      }

      const insertSql = `INSERT INTO contact (idcontact, contact1, contact2, name) VALUES (?, ?, ?, ?)`;
      db.query(insertSql, [idcontact, phone, contact2, name], (errInsert, resultInsert) => {
        if (errInsert) {
          console.error("Insert error:", errInsert); // LIHAT INI DI TERMINAL
          return res.status(500).json({ error: "Failed to add contact" });
        }

        return res.status(201).json({ message: "Contact added successfully" });
      });
    });
  }
else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
