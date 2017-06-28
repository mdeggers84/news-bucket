var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String,
    trim: true
  }
});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
