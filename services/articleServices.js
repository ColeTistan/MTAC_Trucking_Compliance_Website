const multer = require("multer");

// Setup storage of PDF files being uploaded
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({storage: storage }).single("file");

module.exports = {
  upload
};
