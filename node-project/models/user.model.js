const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String
},
  numtel: {
    type: Number
},
email: {
  type: String,
  unique: true
},
  password: {
    type: String
},
  role: {
    type: String
}}, {
  collection: 'users'
})
 

UserSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
 var UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;