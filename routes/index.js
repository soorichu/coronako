var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'지도-내 주변 확진자 동선', menuId:'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:'소개 및 유용한 사이트', menuId:'about'});
});

router.get('/datas', function(req, res, next) {
  res.render('datas', {page:'데이터-전세계 코로나 바이러스 추이', menuId:'datas'});
});

router.get('/test', function(req, res, next){
	res.render('test', {page:'Test', menuId:'test'});
});

module.exports = router;
