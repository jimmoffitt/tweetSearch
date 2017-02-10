var monk = require('monk');

var database = monk('localhost/tweets');

database
.then(function() {
  console.log('connected!');
})
.catch(function(err) {
  console.log('something went wrong!');
});

var tweets = database.get('tweets');

module.exports = tweets;
