var express = require('express');
let app = express();

var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../model/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    console.log("here");
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});
/**
 * Logout a user by deleting the token
 */
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
/**
 * Register a new user
 */
router.post('/register', function(req, res) {
  console.log("Registering user: " + req.body.username);
  var { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Bad parameters");
  }
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    if (user) {
      console.log("User with this email already exists");
      return res.status(409).send("User with this email already exists");
    }
   
    User.findOne({ username: username }, function(err, userWithUsername) {
      if (err) {
        return res.status(500).send("Internal server error");
      }
      if (userWithUsername) {
        console.log("User with this username already exists");
        return res.status(409).send("User with this username already exists");
      }

  var hashedPassword = bcrypt.hashSync(password, 8);
  console.log("Creating user: " + req.body.name );

  User.create({
    username : username,
    email : email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret , {
      expiresIn: 172800 // expires in 48 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});
});
});
/** 
 * returns the current user
 */
router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});
/**returns the user's username */
router.get('/username', VerifyToken, function(req, res, next) {
  
  console.log("USERNAME FETCHING userId = " + req.userId);
 User.findOne({ _id: req.userId }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    console.log("USERNAME FETCHED = " + user.username);

    console.log("usename type : " + typeof(user.username));
    res.status(200).send(JSON.stringify(user.username));
  });
});

/** 
 * returns all the users in the database
 */
router.get('/all', function (req, res, next) {
  User.find().exec().then(items => {
    res.status(200).json(items);
  })  
})

router.delete("/delete", function(req, res, next) {

  console.log("Deleting user: " + req.query.username);
  this.username = req.query.username;
  if (!this.username) {
    return res.status(400).send("Bad parameters");
  }
  else {
    User.findOneAndDelete({ username: this.username }, function(err, user) {
      if(err) {
        return res.status(500).send("Internal server error");
      }
      if(!user) return res.status(404).send("No user found");
      else {
        console.log("User deleted successfully");
      res.status(200).send("User deleted successfully");
      }
  }
  )
}
}) 
module.exports = router;