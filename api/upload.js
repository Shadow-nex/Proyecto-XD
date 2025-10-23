import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // desactiva bodyParser para usar formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const file = files.file[0];
    const fileName = path.basename(file.filepath);
    const fileUrl = `${req.headers.origin}/uploads/${fileName}`;

    return res.status(200).json({
      success: true,
      url: fileUrl,
    });
  });
}