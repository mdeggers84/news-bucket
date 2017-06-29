var request = require('request');
var cheerio = require('cheerio');

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

  // app.get('/', function (req, res) {
  //   request('https://www.polygon.com/', function (error, response, html) {
  //     var $ = cheerio.load(html);
  //     var hbsObject = {
  //       docArr: []
  //     };

  //     $('div.c-compact-river__entry ').each(function (i, element) {
  //       var doc = {};

  //       doc.title = $(this).find('h2').find('a').text();
  //       doc.link = $(this).find('h2').find('a').attr('href');

  //       hbsObject.docArr.push(doc);
  //     });
  //     res.render('index', hbsObject);
  //   });
  // });

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
