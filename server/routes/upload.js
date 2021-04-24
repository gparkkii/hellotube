const express = require('express');
const multer = require("multer");
const ffmpeg = require('fluent-ffmpeg');
const { Video } = require('../models/Video');
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
const uploadVideo = multer({ storage: videoStorage }).single('video');

//=================================
//   	      uploadImage
//=================================

router.post('/', (req, res) => {
  uploadProfile(req, res, err => {
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

//=================================
//   	      uploadVideo
//=================================

router.post('/video', (req, res) => {
  uploadVideo(req, res, err => {
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

router.post('/video/files', (req, res) => {
  const video = new Video(req.body);
    video.save((err, doc) => {
      if(err) return res.json({ success: false, err })
      res.status(200).json({ success: true, doc })
    })
})

//=================================
//   	       Thumbnail
//=================================

router.post('/thumbnail', (req, res) => {
  let filePath = "";
  let fileDuration = "";
  console.log(req.body);
  ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  })
  ffmpeg(req.body.filePath)
    .on('filenames', function(filenames) {
      console.log("will generate" + filenames.join(','));
      console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function() {
      console.log("Screenshots taken");
      return res.json({ 
        success: true, 
        filePath: filePath, 
        fileDuration: fileDuration,
      })
    })
    .on('error', function(err) {
      console.log(err);
      return res.json({ success: false, err});
    })
    .screenshots({
      count: 1,
      folder: 'uploads/thumbnails',
      size: '320x180',
      filename: 'thumbnail-%b.png'
    })
})



module.exports = router;
