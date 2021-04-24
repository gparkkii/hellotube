const express = require('express');
const multer = require("multer");
const router = express.Router();

//=================================
//      Storage Multer Config
//=================================

let profileStorage = multer.diskStorage({
 destination: (req, file, callback) => {
   callback(null, "uploads/profile");
 },
 filename: (req, file, callback) => {
   callback(null, `${Date.now()}_${file.originalname}`);
 },
});

let videoStorage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, 'uploads/video');
  },
  filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      if (ext !== ".mp4") {
          return callback(res.status(400).end("mp4 파일만 업로드 가능합니다."), false);
      }
      callback(null, true);
  }
})

const uploadProfile = multer({ storage: profileStorage }).single('uploadImage');
const uploadVideo = multer({ storage: videoStorage }).single('file');

//=================================
//   	     uploadImage.js
//=================================

router.post('/', (req, res) => {
  console.log(req.body, req.file);
  uploadProfile(req, res, err => {
  console.log(req.body, req.file);
    if (err) {
      return res.status(404).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  })
})


module.exports = router;
