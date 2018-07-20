const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const Project = require("../models/project");

// Bring in User Model
let User = require('../models/user');

// Register
router.get('/register', function(req, res) {
  res.render('register');
});

// Login
router.get('/login', function(req, res) {
  res.render('login');
});

// Register Proccess
router.post('/register', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (req.body.password !== password2) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send('passwords dont match');
    return next(err);
  }

  let newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return;
        } else {
          res.send('sucess');
          //res.redirect('http://localhost:3000');
        }
      });
    });
  });
});

// Login Process
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    success: res.status(400).json({
      success: true,
      message: 'You have successfully logged in!'
    }),
    failure: res.status(400).json({
      success: false,
      message: 'Could not process the form.'
    })
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/user/login');
});

module.exports = router;
