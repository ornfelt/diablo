var express = require('express');
var jwt  = require('jsonwebtoken');
var crypto = require('crypto');
var User = require('../models/User');
var configSecret = require('./configSecret');
var jwtSecret = configSecret.jwtSecret;
var router = express.Router();

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var saltedPass = password + '#D2-BuilderApp';
  var saltedPassHash = crypto
    .createHash('sha256')
    .update(saltedPass)
    .digest('hex');
  var userStatementQuery = {
    $and: [
      { 'username': username },
      { 'password': saltedPassHash }
    ]
  }

  User.find(userStatementQuery, function(err, user) {
    if (err) throw err;
  }).then((result) => {
    if (result.length) {
      var _id = result[0]._id
      var role = result[0].role;
      var email = result[0].email;
      var userInfo = {
        _id: _id,
        username: username,
        email: email,
        role: role
      }
      var userDetailsAsHash = username + role;
      var token = jwt.sign(userInfo, jwtSecret.secret);
      userInfo.token = token;
      return res.send(userInfo);
    }

    return res.sendStatus(500);
  }).catch(err => res.send(err));
});

router.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var saltedPass = password + '#D2-BuilderApp';
  var saltedPassHash = crypto
    .createHash('sha256')
    .update(saltedPass)
    .digest('hex');
  var user = new User({
    username: username,
    password: saltedPassHash,
    email: email
  });
  user.save(function(err, user) {
    if (err) return handleErrors(err);
    return res.send(user._id);
  });
});

function handleErrors(err) {
  console.info("ERROR: " + err);
  return err;
}

module.exports = router;
