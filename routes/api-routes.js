var request = require('request');
var cheerio = require('cheerio');

var Comments = require('../models/Comments');
var SavedNews = require('../models/SavedNews');

module.exports = function (app) {
  // displays scraped articles
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

  // displays all saved news
  app.get('/api/savednews', function (req, res) {
    SavedNews.find({}, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  // gets article by _id and displays with comments
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

  // displays all articles with comments
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

  // saves new article to database
  app.post('/api/savednews/', function (req, res) {
    var newSavedNews = new SavedNews(req.body);

    newSavedNews.save(function (error) {
      if (error) {
        console.log(error);
        res.send(false);
      } else {
        res.send(true);
      }
    });
  });

  // saves comment and links to appropriate article
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

  // deletes saved article
  app.delete('/api/savednews/:id', function (req, res) {
    SavedNews.findByIdAndRemove({ _id: req.params.id }, function (error) {
      if (error) {
        console.log(error);
      } else {
        res.send('article deleted');
      }
    });
  });

  // deletes comment
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
