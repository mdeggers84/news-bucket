var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: String,
  author: String,
  body: String,
  url: String
});

var Comments = mongoose.model('News', commentSchema);

module.exports = Comments;
