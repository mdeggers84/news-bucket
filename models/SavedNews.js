var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var savedNewsSchema = new Schema({
  _id: {
    type: String,
    require: true,
    unique: true
  },
  title: {
    type: String,
    require: true,
    unique: true
  },
  body: String,
  link: {
    type: String,
    required: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }

});

var SavedNews = mongoose.model('SavedNews', savedNewsSchema);

module.exports = SavedNews;
