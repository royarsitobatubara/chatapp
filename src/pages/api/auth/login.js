  import db from '@/lib/db';
  import  jwt from 'jsonwebtoken';

  export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required' });
    }
    const query = 'SELECT * FROM users WHERE phone = ? AND password = ?';
    db.query(query, [phone, password], (err, results) => {
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
          username: user.username,
          phone: user.phone
        },
        process.env.JWT_SECRET,
        {expiresIn: '5d'}
      )

      return res.status(200).json({ message: 'Login successful', token });
    });
  }
