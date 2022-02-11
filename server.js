/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Amanda Sinha
 * Email: sinhaam@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var postData = require('./postData.json');
const { dirname } = require('path');
const { stringify } = require('querystring');
console.log(postData);

var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.engine('.handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', '.handlebars');

app.use(express.static('public'));

app.get('/', function(req, res, next){
  res.status(200).render('index', {
    onepost: false,
    oftheseposts: postData,
  });
});

app.get('/posts/:n', function(req, res, next){
  var n = req.params.n;
  var nthpost = postData[n];
  console.log(nthpost);

  if (nthpost) {
    console.log("RENDERING...");
    res.status(200).render('index', {
      onepost: true,
      posttitle: nthpost.description,
      image: nthpost.photoURL,
      postprice: nthpost.price,
      postcity: nthpost.city,
      postcondition: nthpost.condition,
    });
  }
  else {
    console.log("NOT FOUND");
    next();
  }
});

//app.get('/')

app.get('*', function (req, res) {
  //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
