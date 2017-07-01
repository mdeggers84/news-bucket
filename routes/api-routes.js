var request = require('request');
var cheerio = require('cheerio');

var Comments = require('../models/Comments');
var SavedNews = require('../models/SavedNews');

module.exports = function (app) {
  app.get('/api/scrape', function (req, res) {
    request('https://www.polygon.com/', function (error, response, html) {
      var $ = cheerio.load(html);
      var result = [];

      $('div.c-compact-river__entry').each(function (i, element) {
        var doc = {};
        doc.title = $(this).find('h2').find('a').text();
        doc.link = $(this).find('h2').find('a').attr('href');

        result.push(doc);
      });
      res.send(result);
    });
  });

  app.get('/api/savednews', function (req, res) {
    SavedNews.find({}, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  app.get('/api/savednews/:id', function (req, res) {
    SavedNews.findOne({ _id: req.params.id })
      .populate('comments')
      .exec(function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          res.json(doc);
        }
      });
  });

  app.get('/api/comments', function (req, res) {
    SavedNews.find({})
      .populate('comments')
      .exec(function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          res.json(doc);
        }
      });
  });

  app.post('/api/savednews/', function (req, res) {
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
        SavedNews.findOneAndUpdate({ _id: req.params.id }, {
          $push: { comments: doc._id } }, { new: true })
        .exec(function (err, newdoc) {
          if (err) {
            console.log(err);
          } else {
            res.send(newdoc);
          }
        });
      }
    });
  });

  app.delete('/api/savednews/:id', function (req, res) {
    SavedNews.findByIdAndRemove({ _id: req.params.id }, function (error) {
      if (error) {
        console.log(error);
      } else {
        res.send('article deleted');
      }
    });
  });

  app.delete('/api/comments/:id', function (req, res) {
    Comments.findByIdAndRemove({ _id: req.params.id }, function (error) {
      if (error) {
        console.log(error);
      } else {
        res.send('comment deleted');
      }
    });
  });
};
