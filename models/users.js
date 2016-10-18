var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = mongoose.Schema({
  username: { 
    type: String, 
    index: true, 
    unique: true 
  },
  passwordHash: String,
});

// Apply the unique validator plugin
userSchema.plugin(uniqueValidator);

// userSchema.methods.getUsername = function(callback) {
//   return this.username;
// };

// userSchema.methods.getPasswordHash = function(callback) {
//     return this.passwordHash;
// }

// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
var Users = mongoose.model("Users", userSchema);
module.exports = Users;

