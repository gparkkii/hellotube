const express = require('express');
const router = express.Router();
const { Video } = require("../../models/Video");

//=================================
//          Video Infos
//=================================

router.get('/files', (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos })
    })
})

//=================================
//             Detail
//=================================

router.post('/detail', (req, res) => {
  Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, video })
    })
})

module.exports = router;
