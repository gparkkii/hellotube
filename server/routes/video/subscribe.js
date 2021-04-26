const express = require('express');
const router = express.Router();
const { Subscribe } = require("../../models/Subscribe");
const { Video } = require("../../models/Video");

//=================================
//           Subscribe
//=================================

router.post('/files', (req, res) => {
  Subscribe.find({subscribeFrom: req.body.subscribeFrom})
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      
      let subscribedUser = [];
      subscribe.map((subscribe, index) => {
        subscribedUser.push(subscribe.subscribeTo);
      })

      Video.find({writer: {$in: subscribedUser}})
        .populate('writer')
        .exec((err, subscribe) => {
          if(err) return res.status(400).send(err);
          return res.status(200).json({ success: true, subscribe });
        })
    })
})

router.post('/length', (req, res) => {
  Subscribe.find({subscribeTo: req.body.subscribeTo})
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, subscribedNumber: subscribe.length });
    })
})

router.post('/subscribed', (req, res) => {
  console.log(req.body)
  Subscribe.find({subscribeTo: req.body.subscribeTo, subscribeFrom: req.body.subscribeFrom})
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      let result= false;
      if(subscribe.length !== 0) { 
        result= true; 
      }
      return res.status(200).json({ success: true, subscribed: result });
    })
})

router.post('/subscribe', (req, res) => {
  console.log(req.body)
  const subscribe = new Subscribe(req.body)
  subscribe.save((err, doc) => {
    if(err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  })
})

router.post('/unSubscribe', (req, res) => {
  console.log(req.body)
  Subscribe.findOneAndDelete({
    subscribeTo: req.body.subscribeTo,
    subscribeFrom: req.body.subscribeFrom
  })
    .exec((err, doc) => {
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, doc });
    })
})

module.exports = router;