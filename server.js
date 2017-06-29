var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();
var db;

var PORT = process.env.PORT || 3000;
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/newsbucket';

mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect(uristring);
db = mongoose.connection;

db.on('error', function (error) {
  console.log('Mongoose Error: ', error);
});

db.once('open', function () {
  console.log('Mongoose connection successful!');
});

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(PORT, function () {
  console.log('App running on port: ' + PORT);
});
