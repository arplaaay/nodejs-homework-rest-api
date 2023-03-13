const multer = require("multer");

const multerConfiguration = multer.diskStorage({
  destination: "../tmp",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfiguration,
});

module.exports = upload;
