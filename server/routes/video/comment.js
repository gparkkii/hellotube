const express = require('express');
const router = express.Router();
const { Comment } = require("../../models/Comment");

//=================================
//             Comment
//=================================

router.post('/files', (req, res) => {
  Comment.find({'videoId': req.body.videoId})
    .sort({createdAt: -1})
    .populate('writer')
    .exec((err, comments) => {
      if(err) return res.json({ success: false, error: err})
      res.status(200).json({ success: true, comments})
    })
});

router.post('/save', (req, res) => {
  console.log(req.body);
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if(err) return res.json({ success: false, error: err})
    Comment.find({'_id': comment._id})
      .populate('writer')
      .exec((err, result) => {
        if(err) return res.json({ success: false, error: err})
        res.status(200).json({ success: true, result})
      })
  });
})

router.post('/user', (req, res) => {
  Comment.find({'writer': req.body.writer})
    .populate('writer')
    .populate({path: 'videoId', populate: {path: 'writer'}})
    .sort({createdAt: -1})
    .exec((err, comments) => {
      console.log(comments);
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, comments })
    })
  })


module.exports = router;