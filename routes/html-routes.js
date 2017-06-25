var News = require('../models/News');
var Comments = require('../models/Comments');

module.exports = function (app) {
  app.get('/', function (req, res) {
    News.find({}, function (error, doc) {
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
    res.render('saved', { test: 'saved' });
  });
};
