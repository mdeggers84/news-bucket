var News = require('../models/News');
var Comments = require('../models/Comments');
var SavedNews = require('../models/SavedNews');

module.exports = function (app) {
  app.get('/', function (req, res) {
    News.find().sort({ _id: -1 }).exec(function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        var hbsObject = {
          doc: doc
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
      }
    });
  });

  app.get('/saved', function (req, res) {
    SavedNews.find({}).sort({ _id: 1 }).exec(function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        var hbsObject = {
          doc: doc
        };
        res.render('saved', hbsObject);
      }
    });
  });
};
