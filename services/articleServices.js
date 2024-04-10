const multer = require("multer");

// Setup storage of PDF files being uploaded
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype != "application/pdf")
      cb(null, "./uploads/img")
    else
      cb(null, "./uploads/pdf");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const uploadFormFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
module.exports = {
  uploadFormFields,
};
