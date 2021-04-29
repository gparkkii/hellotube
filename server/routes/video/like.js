const express = require('express');
const router = express.Router();
const { Like } = require("../../models/Like");
const { Dislike } = require("../../models/Dislike");

//=================================
//         Likes DisLikes
//=================================

router.post("/liked", (req, res) => {
  Like.find({ userId : req.body.userId , videoId : req.body.videoId })
    .exec((err, likes) => {
      if(err) return res.status(400).send(err);
      let result = false;
      if(likes.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, liked: result });
    }) 
})

router.post("/disliked", (req, res) => {
  Dislike.find({ userId : req.body.userId , videoId : req.body.videoId })
    .exec((err, dislikes) => {
      if(err) return res.status(400).send(err);
      let result = false;
      if(dislikes.length !== 0) {
        result = true;
      }
      return res.status(200).json({ success: true, disliked: result });
    }) 
})

router.post("/files", (req, res) => {
  Like.find({ videoId: req.body.videoId })
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes })
    })
})


router.post("/files/dislikes", (req, res) => {
  Dislike.find({ videoId: req.body.videoId })
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes })
    })
})


router.post("/add", (req, res) => {
  const like = new Like({ videoId: req.body.videoId, userId: req.body.userId });
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    Dislike.findOneAndDelete({ videoId: req.body.videoId, userId: req.body.userId })
      .exec((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, likeResult, dislikeResult})
      })
  })
})


router.post("/add/dislike", (req, res) => {
  const disLike = new Dislike({ videoId: req.body.videoId, userId: req.body.userId })
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    Like.findOneAndDelete({ videoId: req.body.videoId, userId: req.body.userId })
      .exec((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, likeResult, dislikeResult })
      })
  })
})


router.post("/delete", (req, res) => {
  Like.findOneAndDelete({ videoId: req.body.videoId, userId: req.body.userId })
    .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, result })
    })
})


router.post("/delete/dislike", (req, res) => {
  Dislike.findOneAndDelete({ videoId: req.body.videoId, userId: req.body.userId })
  .exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true, result })
  })
})

module.exports = router;