const express = require('express');
const router = express.Router();
const { Subscribe } = require("../../models/Subscribe");
const { Video } = require("../../models/Video");

//=================================
//           Subscribe
//=================================

router.post('/', (req, res) => {
  console.log(req.body);
  const subscribe = new Subscribe(req.body)
  subscribe.save((err, result) => {
    console.log(result);
    if(err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  })
})

router.post('/delete', (req, res) => {
  Subscribe.findOneAndDelete({
    subscribeTo: req.body.subscribeTo,
    subscribeFrom: req.body.subscribeFrom
  })
    .exec((err, result) => {
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, result });
    })
})

router.post('/subscribed', (req, res) => {
  Subscribe.find({subscribeTo: req.body.subscribeTo, subscribeFrom: req.body.subscribeFrom})
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      let result= false;
      if(subscribe.length !== 0) { 
        result= true; 
      }
      return res.status(200).json({ success: true, result });
    })
})

router.post('/user', (req, res) => {
  Subscribe.find({subscribeFrom: req.body.subscribeFrom})
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      
      let subscribedUser = [];
      subscribe.map((subscribe, index) => {
        subscribedUser.push(subscribe.subscribeTo);
      })

      Video.find({writer: {$in: subscribedUser}})
        .populate('writer')
        .exec((err, result) => {
          let subscriber = [];
          result.map((users) => {
            subscriber.push(users.writer);
          })
          let subscribeTo = [...new Set(subscriber)];
          if(err) return res.status(400).send(err);
          return res.status(200).json({ success: true, result, subscribeTo });
        })
    })
})

router.post('/files', (req, res) => {
  Subscribe.find({subscribeTo: req.body.subscribeTo})
    .exec((err, result) => {
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, result});
    })
})


module.exports = router;