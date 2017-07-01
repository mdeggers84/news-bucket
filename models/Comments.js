var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// comment schema
var commentSchema = new Schema({
  body: {
    type: String,
    trim: true,
    required: true
  }
});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
