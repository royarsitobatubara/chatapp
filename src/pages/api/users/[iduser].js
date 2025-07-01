import upload from '@/lib/upload';
import db from '@/lib/db';
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => (err ? reject(err) : resolve()));
  });
}

export default async function handler(req, res) {
  const { iduser } = req.query;

  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM users WHERE iduser = ?';
      db.query(sql, [iduser], (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Terjadi kesalahan di database",
            error: err.message
          });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        return res.status(200).json({
          message: "Data ditemukan",
          datas: results[0]
        });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
    }
  } else if (req.method === 'PATCH') {
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

      values.push(iduser);
      let sql = `UPDATE users SET ${fields.join(', ')} WHERE iduser = ?`;
      db.query(sql, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Terjadi kesalahan pada server", error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User tidak ditemukan atau data tidak berubah' });
        }
        sql = 'SELECT * FROM users WHERE iduser=?';
        db.query(sql, [iduser], (err, results) => {
          if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid phone or password' });
          }
          const user = results[0];
          const token = jwt.sign(
            {
              id: user.iduser,
              name: user.name,
              phone: user.phone,
              role: user.role,
              photo: user.photo
            },
            process.env.JWT_SECRET,
            {expiresIn: '5d'}
          )

          return res.status(200).json({ message: 'Login successful', token });
        });
      });

    } catch (error) {
      return res.status(500).json({ message: 'Gagal mengubah data user', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
