import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const iduser = uuidv4();
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'Cannot have null fields' });
  }
  const checkQuery = 'SELECT iduser FROM users WHERE phone = ?';
  db.query(checkQuery, [phone], (errCheck, resultCheck) => {
    if (errCheck) {
      console.error('Check error:', errCheck);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (resultCheck.length > 0) {
      return res.status(409).json({ message: 'Phone number already registered' });
    }
    const insertQuery = 'INSERT INTO users (iduser, name, phone, password) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [iduser, name, phone, password], (errInsert) => {
      if (errInsert) {
        console.error('Insert error:', errInsert);
        return res.status(500).json({ message: 'Failed to register user' });
      }
      return res.status(201).json({ message: 'Register successful' });
    });
  });
}
