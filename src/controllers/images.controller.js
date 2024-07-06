import path from "path";
import fs from "fs";

export const getImage = async (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const imagePath = path.join(process.cwd(), "upload", filename);

  if (fs.existsSync(imagePath)) {
    const imageUrl = `${req.protocol}://${req.get("host")}/upload/${filename}`;
    res.json({ imageUrl });
  } else {
    res.json({ message: "Image not found.", error: 1 });
  }
};
