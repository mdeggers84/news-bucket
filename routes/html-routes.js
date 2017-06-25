module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { test: 'test' });
  });

  app.get('/saved', function (req, res) {
    res.render('saved', { test: 'saved' });
  });
};
