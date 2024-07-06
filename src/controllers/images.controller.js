import path from "path";
import fs from "fs";

export const getImage = async (req, res) => {
  const imagePath = path.join(process.cwd(), `/upload/${req.params.filename}`);
  console.log(imagePath);
  return fs.existsSync(imagePath)
    ? res.sendFile(imagePath)
    : res.json({ message: "Image not found.", error: 1 });
};
