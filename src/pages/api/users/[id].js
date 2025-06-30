import upload from '@/lib/upload';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper untuk menjalankan middleware upload
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => (err ? reject(err) : resolve()));
  });
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      await runMiddleware(req, res, upload.single('photo'));

      const { name, bio, password, phone } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      const fields = [];
      const values = [];

      if (name) {
        fields.push('name = ?');
        values.push(name);
      }
      if (bio) {
        fields.push('bio = ?');
        values.push(bio);
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }
      if (phone) {
        fields.push('phone = ?');
        values.push(phone);
      }
      if (photo) {
        fields.push('photo = ?');
        values.push(photo);
      }

      if (fields.length === 0) {
        return res.status(400).json({ message: 'Tidak ada data yang diubah' });
      }

      await db.promise().query(
        `UPDATE users SET ${fields.join(', ')} WHERE iduser = ?`,
        [...values, id]
      );

      const [updated] = await db.promise().query(
        `SELECT iduser, name, bio, phone, photo FROM users WHERE iduser = ?`,
        [id]
      );

      const user = updated[0];
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5d' });

      return res.status(200).json({ message: 'Berhasil diperbarui', token });
    } catch (error) {
      console.error('[ERROR PATCH USER]', error);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengubah data' });
    }
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await db.promise().query(
        `SELECT iduser, name, bio, phone, photo FROM users WHERE iduser = ?`,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error('[ERROR GET USER]', error);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
    }
  }

  // Jika method bukan PATCH atau GET
  return res.status(405).json({ message: 'Method Not Allowed' });
}
