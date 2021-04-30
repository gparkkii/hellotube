const express = require('express');
const router = express.Router();
const { Playlist } = require("../../models/Playlist");

//=================================
//            Playlist
//=================================

router.post('/save', (req, res) => {
  console.log(req.body);
  const playlist = new Playlist(req.body)
  playlist.save((err, result) => {
    console.log(result);
    if(err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  })
})

router.post("/delete", (req, res) => {
  Playlist.findOneAndDelete({ videoId: req.body.videoId, userId: req.body.userId })
    .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, result })
    })
})

router.post("/saved", (req, res) => {
  Playlist.find({ userId : req.body.userId , videoId : req.body.videoId })
    .exec((err, lists) => {
      if(err) return res.status(400).send(err);
      let result = false;
      if(lists.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, result });
    }) 
})

router.post("/user", (req, res) => {
  console.log(req.body);
  Playlist.find({ userId: req.body.userId })
    .populate('videoId')
    .populate({path: 'videoId', populate: {path: 'writer'}})
    .exec((err, result) => {
      console.log(result);
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, result })
    })
})


module.exports = router;