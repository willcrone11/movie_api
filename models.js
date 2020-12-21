const mongoose = require('mongoose');

//used to hash passwords
const bcrypt = require('bcrypt');

//movies collection schema
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean
});

//users collection schema
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//hashes user's password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

//creates movie and user models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//exports movie and user models 
module.exports.Movie = Movie;
module.exports.User = User;