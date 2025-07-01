// pages/api/chat/[id].js
import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const [pengirim, penerima] = id.split('_');

const sql = `
  SELECT idchat, pengirim, penerima, pesan, tipe, waktu, replyTo 
  FROM chat 
  WHERE (pengirim = ? AND penerima = ?) 
     OR (pengirim = ? AND penerima = ?)
  ORDER BY waktu ASC
`;


    db.query(sql, [pengirim, penerima, penerima, pengirim], (err, results) => {
      if (err) {
        console.error('❌ DB Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
