var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'현재 위치', menuId:'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About', menuId:'about'});
});

router.get('/datas', function(req, res, next) {
  res.render('datas', {page:'Data', menuId:'datas'});
});

router.get('/test', function(req, res, next){
	res.render('test', {page:'Test', menuId:'test'});
});

module.exports = router;
