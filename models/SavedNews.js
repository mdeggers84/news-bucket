var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var savedNewsSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]
});

var SavedNews = mongoose.model('SavedNews', savedNewsSchema);

module.exports = SavedNews;
