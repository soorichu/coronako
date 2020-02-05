var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About', menuId:'about'});
});

router.get('/graph', function(req, res, next) {
  res.render('graph', {page:'Graph', menuId:'graph'});
});

router.get('/test', function(req, res, next){
	res.render('test', {page:'Test', menuId:'test'});
});

module.exports = router;
