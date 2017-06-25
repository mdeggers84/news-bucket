var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: {
    type: String
  },
  body: String
});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
