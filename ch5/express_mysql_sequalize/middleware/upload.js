import multer from "multer";

// const multer = require("multer");

// const imageFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("/^image/")
//   ) {
//     cb(null, true);
//   } else {
//     cb("Please upload only image file.", false);
//   }
// };

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let uploadFile = multer({ storage: storage });

export default uploadFile;