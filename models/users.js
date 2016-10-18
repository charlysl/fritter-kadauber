var mongoose = require("mongoose");

var isUniqueUsername = function(value) {
    return Users.count({ username: value }) <= 0;
}

var userSchema = mongoose.Schema({
  username: {type: String, validate: [isUniqueUsername, "Username is not unique"] },
  passwordHash: String,
});

userSchema.methods.getUsername = function(callback) {
  return this.username;
};

userSchema.methods.getPasswordHash = function(callback) {
    return this.passwordHash;
}

// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
module.exports = mongoose.model("Users", userSchema);

