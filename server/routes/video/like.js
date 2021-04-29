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
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId }
  } else {
    variable = { commentId: req.body.commentId }
  }
  Like.find(variable)
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes })
    })
})


router.post("/files/dislikes", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId }
  } else {
    variable = { commentId: req.body.commentId }
  }
  Dislike.find(variable)
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes })
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
      .exec((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, likeResult, dislikeResult})
      })
  })
})


router.post("/add/dislike", (req, res) => {
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
        res.status(200).json({ success: true, likeResult, dislikeResult })
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
      res.status(200).json({ success: true, result })
    })
})


router.post("/delete/dislike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }
  Dislike.findOneAndDelete(variable)
  .exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true, result })
  })
})

module.exports = router;