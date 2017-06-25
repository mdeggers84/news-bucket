var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: {
    type: String,
    require: true
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

var News = mongoose.model('News', newsSchema);

module.exports = News;
