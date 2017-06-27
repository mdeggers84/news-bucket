var request = require('request');
var cheerio = require('cheerio');
var News = require('../models/News');
var SavedNews = require('../models/SavedNews');
var Comments = require('../models/Comments');

module.exports = function (app) {
  // app.get('/api/scrape', function (req, res) {
  //   request('https://www.polygon.com/', function (error, response, html) {
  //     var $ = cheerio.load(html);
  //     var result = {};

  //     $('div.c-compact-river__entry ').each(function (i, element) {
  //       result.title = $(this).find('h2').find('a').text();
  //       result.link = $(this).find('h2').find('a').attr('href');

  //       var entry = new News(result);

  //       entry.save(function (err, doc) {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           console.log(doc);
  //         }
  //       });
  //     });
  //   });
  //   res.send('Scrape Complete!');
  // });

  app.get('/api/news', function (req, res) {
    News.find({}, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  app.get('/api/news/:id', function (req, res) {
    News.findOne({ _id: req.params.id }, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  app.get('/api/saved', function (req, res) {
    SavedNews.find({}, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  app.post('/api/saved/:id', function (req, res) {
    var newSavedNews = new SavedNews(req.body);

    newSavedNews.save(function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  app.post('/api/comments/:id', function (req, res) {
    var newComment = new Comments(req.body);

    newComment.save(function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        SavedNews.findOneAndUpdate({ _id: req.params.id }, { comments: doc._id })
        .exec(function (err, doc) {
          if (err) {
            console.log(err);
          } else {
            res.send(doc);
          }
        });
      }
    });
  });
};
