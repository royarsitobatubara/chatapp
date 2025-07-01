import upload from '@/lib/upload';
import runMiddleware from '@/lib/runMiddleware';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await runMiddleware(req, res, upload.single('file'));
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl: fileUrl });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
