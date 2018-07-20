const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
=======
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
>>>>>>> master
  if (req.body.password !== req.body.passwordConfirm) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send('passwords dont match');
    return next(err);
  }

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
<<<<<<< HEAD
          message: 'Mail exists'
=======
          message: "Mail exists"
>>>>>>> master
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
<<<<<<< HEAD
                  message: 'User created'
=======
                  message: "User created"
>>>>>>> master
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

<<<<<<< HEAD
router.post('/login', (req, res, next) => {
=======
router.post("/login", (req, res, next) => {
>>>>>>> master
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
<<<<<<< HEAD
          message: 'Auth failed'
=======
          message: "Auth failed"
>>>>>>> master
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
<<<<<<< HEAD
            message: 'Auth failed'
=======
            message: "Auth failed"
>>>>>>> master
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
<<<<<<< HEAD
              expiresIn: '1h'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
=======
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
>>>>>>> master
            token: token
          });
        }
        res.status(401).json({
<<<<<<< HEAD
          message: 'Auth failed'
=======
          message: "Auth failed"
>>>>>>> master
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

<<<<<<< HEAD
router.delete('/:userId', (req, res, next) => {
=======
router.delete("/:userId", (req, res, next) => {
>>>>>>> master
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
<<<<<<< HEAD
        message: 'User deleted'
=======
        message: "User deleted"
>>>>>>> master
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;