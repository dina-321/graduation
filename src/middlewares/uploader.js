import multer from "multer";

import path from "path";

// CONFIGURATION FOR MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "upload/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", "_"));
  },
});

export const upload = multer({ storage });
