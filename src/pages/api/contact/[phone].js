import db from "@/lib/db";

export default function handler(req, res) {
  const { phone } = req.query; 

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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
