var request = require('request');
var express = require('express');
var router = express.Router();

var config = require('../config/config.js');
/* Counts are not stored in database. 
var data = require('../data/db.js');
*/

//api authentication (one set on server side).
var username = config.username;
var password = config.password;
var accountName = config.accountName;
var label = config.label;

router.get('/', function(req, res, next) {
  // search the gnip api
  console.log('Get / called.')
  var keyword = req.query.search || 'No Rule Specified';
  getData(keyword, function(err, results) {
    if (err) return res.json('Something went horribly wrong!');
    var renderObject = {title: 'Gnip Chart', data: results, search: keyword};
    return res.render('chart.ejs', renderObject);
  });
});

// router.post('/', function(req, res, next) {
//   res.redirect('/api?search=' + req.body.search); // api?search=test
// });

router.post('/', function(req, res, next) {
  console.log('POST / called.')
  var query = req.body.searchTerm || 'No Rule Specified';
  getCounts(query, function(err, results) {
    if (err) return res.json('Something went horribly wrong!');
    var renderObject = {data: results, search: query};
    return res.json(renderObject);
  });
});

// *** helpers *** //

function getCounts(query, callback) {
  // search the gnip api
  var base = `https://gnip-api.twitter.com/search/30day/accounts/${accountName}/${label}/counts.json?query=${query}&bucket=day`;
  var requestObject = {
    method: 'GET',
    uri: base,
    auth: { username: username, password: password }
  };
  request(requestObject, function(err, response, body) {
    if (err) callback(err);
    var data = JSON.parse(body).results;
    transform(data, query, function(error, tweets) {
      //addDataToDatabase(tweets);
      console.log(tweets.days);
      callback(null, tweets.days);
    });
  });
}

function addDataToDatabase(data) {

  data.counts.insert(data);
  data.counts.find()
  .then(function(docs) {
    console.log(docs);
  });
}

function transform(data, query, callback) {
  var days = [];
  for (var i = 1; i < data.length; i++) {
    days.push({
      number: i,
      count: data[i].count
    });
  }
  var obj = {
    term: query,
    days: days
  };
  callback(null, obj);
}

module.exports = router;
