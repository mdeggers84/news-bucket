var request = require('request');
var cheerio = require('cheerio');

module.exports = function (app) {
  app.get('/scrapePoly', function (req, res) {
    request('https://www.polygon.com/', function (error, response, html) {
      var $ = cheerio.load(html);
      var result = [];

      $('div.c-compact-river__entry ').each(function (i, element) {
        var title = $(this).find('h2').find('a').text();
        var link = $(this).find('h2').find('a').attr('href');

        result.push({
          title: title,
          link: link
        });
      });
      console.log(result);
      res.json(result);
    });
  });

  app.get('/scrapeIGN', function (req, res) {
    request('http://www.ign.com/', function (error, response, html) {
      var $ = cheerio.load(html);
      var result = [];

      $('.listElmnt').each(function (i, element) {
        // var title = $(element).text();
        // var link = $(element).find('a').attr('href');

        var title = 'test';
        var link = 'test';

        result.push({
          title: title,
          link: link
        });
      });
      console.log(result);
      res.send(result);
    });
  });
};
