const express = require('express');
const router = express.Router();
const { Like } = require("../../models/Like");
const { Dislike } = require("../../models/Dislike");

//=================================
//         Likes DisLikes
//=================================

router.post("/files", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId }
  } else {
    variable = { commentId: req.body.commentId }
  }
  Like.find(variable)
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes, length: likes.length })
    })
})


router.post("/files/dislike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId }
  } else {
    variable = { commentId: req.body.commentId }
  }
  Dislike.find(variable)
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes , length: dislikes.length})
    })
})


router.post("/add", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }
  const like = new Like(variable);
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    Dislike.findOneAndDelete(variable)
      .exec((err, disLikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true })
      })
  })
})


router.post("/delete", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }
  Like.findOneAndDelete(variable)
    .exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true })
    })
})


router.post("add/dislike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }
  const disLike = new Dislike(variable)
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    Like.findOneAndDelete(variable)
      .exec((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true })
      })
  })
})


router.post("/unDislike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }
  Dislike.findOneAndDelete(variable)
  .exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true })
  })
})

module.exports = router;