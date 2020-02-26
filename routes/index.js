var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'지도-내 주변 확진자 동선', menuId:'home'});
});

 router.get('/about', function(req, res, next) {
 res.render('about', {page:'소개 및 유용한 사이트', menuId:'about'});
});


router.get('/test', function(req, res, next){
	res.render('test', {page:'Test', menuId:'test'});
});

router.get('/datas', function(req, res, next) {
	res.render('datas', {page:'데이터-전세계 코로나 바이러스 추이', menuId:'datas'
	});
});

//크롤링
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/getKoreaData', function(req, res, next){

	console.log("Success GET "+req.query.data);

	async function getHTML() {
		try {
			return await axios.get("http://ncov.mohw.go.kr/index_main.jsp");
		} catch (error) {
			console.error(error);
		}
	}

	getHTML()
	.then(html => {
		let numList = [];
		const $ = cheerio.load(html.data);
		const bodyList = $(".co_cur .num")
		bodyList.each(function(i, elem) {
			numList[i] = $(this).text().replace(/[^0-9]/g,"");
		});
		return numList;
	}).then(result => {
		console.log(result);
 	// kor = copyObject(result);
 	res.send({result:result});
 });

});


module.exports = router;
