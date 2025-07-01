import next from 'next';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { parse } from 'url';
import db from '../src/lib/db.js'; // ⬅️ Sesuaikan path-nya

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: '/socket.io',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    socket.on('chat message', (data) => {
  const { pengirim, penerima, pesan, tipe, replyTo } = data;

  const sql = `
    INSERT INTO chat (pengirim, penerima, pesan, tipe, replyTo)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [pengirim, penerima, pesan, tipe, replyTo], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err);
      return;
    }

    console.log('✅ Chat saved to DB, ID:', result.insertId);

    io.emit('chat message', {
      ...data,
      idchat: result.insertId,
      waktu: new Date()
    });
  });
});

  socket.on('edit message', (data) => {
    const { idchat, pesan } = data;

    const sql = `UPDATE chat SET pesan = ? WHERE idchat = ?`;
    db.query(sql, [pesan, idchat], (err) => {
      if (err) {
        console.error('❌ DB Edit Error:', err);
        return;
      }

      console.log(`✏️ Chat ID ${idchat} updated`);
      io.emit('edit message', { idchat, pesan });
    });
  });

  socket.on('delete message', ({ idchat }) => {
    const sql = `DELETE FROM chat WHERE idchat = ?`;
    db.query(sql, [idchat], (err) => {
      if (err) {
        console.error('❌ DB Delete Error:', err);
        return;
      }

      console.log(`🗑️ Chat ID ${idchat} deleted`);
      io.emit('delete message', { idchat });
    });
  });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  });

  server.listen(PORT, () => {
    console.log(`🚀 Ready at http://localhost:${PORT}`);
  });
});
