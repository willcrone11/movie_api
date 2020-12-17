const jwtSecret = 'your_jwt_secret'; // Corresponds to JWTStrategy key in passport.js

const jwt = require('jsonwebtoken'),
      passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //the username being encoded in the JWT
    expiresIn: '7d', //specifies that the token will expire in 7 days
    algorithm: 'HS256' //the algorithm used to encode the values of the JWT
  });
}

