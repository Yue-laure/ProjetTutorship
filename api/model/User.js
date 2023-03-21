/**
 * Description: User model
 * Author : Ons HAMDI 
 */
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  id: Number,
  username: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');