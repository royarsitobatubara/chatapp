import db from "@/lib/db";
import upload from "@/lib/upload";
import jwt from "jsonwebtoken";
import nc from "next-connect";

export const config = {
  api: {
    bodyParser: false, // ⛔ penting agar multer bisa bekerja
  },
};

const handler = nc();

handler.use(upload.single("profile")); // ⬅️ field name = "profile"

handler.patch(async (req, res) => {
  try {
    const { iduser, name, bio, password } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!iduser) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (bio) {
      fields.push("bio = ?");
      values.push(bio);
    }
    if (password) {
      fields.push("password = ?");
      values.push(password);
    }
    if (photo) {
      fields.push("photo = ?");
      values.push(`/uploads/${photo}`); // ⬅️ simpan path relatif ke `public/`
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE iduser = ?`;
    values.push(iduser);

    await db.query(sql, values);

    const [updated] = await db.query(
      "SELECT iduser, name, bio, photo FROM users WHERE iduser = ?",
      [iduser]
    );

    const user = updated[0];

    const token = jwt.sign(
      {
        id: user.iduser,
        name: user.name,
        bio: user.bio,
        profile: user.photo, // ⬅️ pakai photo dari DB
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    return res.status(200).json({
      message: "Profile updated successfully.",
      token, // ⬅️ ganti 'user' jadi 'token' agar lebih jelas
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

export default handler;
