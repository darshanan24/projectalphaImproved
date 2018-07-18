const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
<<<<<<< HEAD
const Project = require("../models/project");
=======
//const Project = require("../models/project");
>>>>>>> master

// Bring in User Model
let User = require('../models/user');

<<<<<<< HEAD
=======
// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});


>>>>>>> master
// Register Proccess
router.post('/register', function(req, res, next){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (req.body.password !== password2) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            res.redirect('/user/login');
          }
        });
      });
    });
  }
);


// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/projects',
    failureRedirect:'/user/login'
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/user/login');
});

module.exports = router;
