var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");
var Users = require('./users.js');

var freetSchema = mongoose.Schema({
  _id: {
    type: Number,
    index: true,
    unique: true
  },
  author: { 
    type: ObjectId, 
    ref: 'Users'
  },
  content: {
    isRefreet: Boolean,
    refreetId: {
      type: ObjectId,
      ref: 'Freet'
    },
    text: String
  }
});

// Apply the unique validator plugin
freetSchema.plugin(uniqueValidator);

var Freets = mongoose.model("Freets", freetSchema);
module.exports = Freets;

