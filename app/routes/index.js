var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Search Demo', description: 'Exploring Twitter data with Gnip Search API.'});
});

module.exports = router;
