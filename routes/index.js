var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
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

router.get('/mapcount', function(req, res, next){
	client.query("update count set total=total+1, map=map+1 where date='2020-03-03' returning date", (err, res)=>{
		if(err) throw err;
	});
		// client.end();
	});

// (async function(){
// 	try{ await 
// 	}
// 	catch(e){
// 		console.log("ERROR");
// 	}
// });



//Korea 1 Day
const axios = require("axios");
const cheerio = require("cheerio");


router.get('/getKoreaData', function(req, res, next){

	// console.log("Success GET "+req.query.data);

	async function getHTML() {
		try {
			await axios.get("https://m.blog.naver.com/haipina/221798969316");
			return await axios.get("http://ncov.mohw.go.kr/index_main.jsp");
		} catch (error) {
			console.error('getKoreaData '+error);
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
		// console.log(result);
 	// kor = copyObject(result);
 	res.send({result:result});
 });

});

//Korea Province
router.get('/getKoreaProvince', function(req, res, next){
	// var ids = {"서울":"KR-11", "부산":"KR-26","대구":"KR-27", "인천":"KR-28", 
	// 			"광주":"KR-29", "대전":"KR-30", "울산":"KR-31", "세종":"KR-36", 
	// 			"경기":"KR-41", "강원":"KR-42", "충북":"KR-43", "충남":"KR-44", 
	// 			"전북":"KR-45", "전남":"KR-46", "경북":"KR-47", "경남":"KR-48", 
	// 			"제주":"KR-50"};
	var result = { /*id:[], */name:[], infected:[], /*recovered:[], */died:[]};
	async function getHTML2(){
		try{
			return await axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=");
		}catch(error){
			console.log('getKoreaProvince '+error);
		}
	}

	getHTML2()
	.then((html) => {
		let numList = [];
		const $ = cheerio.load(html.data);
		var trs= $(".num tbody tr");
		// console.log(tr.length, typeof(tr), tr);

		trs.each((i)=>{
			var tr = trs.eq(i);
			// console.log(tr.children("th").text().trim());
			// console.log(parseInt(tr.children("td").eq(1).text().replace(/,/g,"")));
			// console.log(parseInt(tr.children("td").eq(2).text().replace(/,/g,"")));
			// console.log(parseInt(tr.children("td").eq(2).text().replace(/,/g,"")));
			result["name"].push(tr.children("th").text().trim());
			// result["id"].push(ids[result["name"][i]]);
			result["infected"].push(parseInt(tr.children("td").eq(1).text().replace(/,/g,"")));
			// result["recovered"].push(parseInt(tr.children("td").eq(2).text().replace(/,/g,"")));
			result["died"].push(parseInt(tr.children("td").eq(2).text().replace(/,/g,"")));
		});

		return result;
	}).then(result => {
		res.send(result);
		// console.log(result);
	});
});

//heroku pg:psql
//http://leechoong.com/posts/2018/mysql_basic/
//create database mydb2 encoding = 'utf8';
// CREATE ROLE user_name;
// ALTER ROLE user_name WITH LOGIN PASSWORD 'password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
// CREATE DATABASE database_name OWNER user_name;
// REVOKE ALL ON DATABASE database_name FROM PUBLIC;
// GRANT CONNECT ON DATABASE database_name TO user_name;
// GRANT ALL ON DATABASE database_name TO user_name;


// test
// client.query("select * from mydata;", (err, res)=>{
// 	if(err) throw err;
// 	for(let row of res.rows){
// 		console.log(JSON.stringify(row));
// 	}
// 	// client.end();
// });

router.get('/query', function(data){
	client.query(data, (err, res) => {
		if(err) throw err;
		console.log(data, "update");
		var result;
		for(let row of res.rows){
			result.push(JSON.stringify(row));
			// console.log(JSON.stringify(row));
		}
		return result;
		// client.end();
	});
}); 

// var cookieSession = require('cookie-session');
// var express = require('express');
// var app = express();
 
// app.set('trust proxy', 1); // trust first proxy
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }))
 
// app.use(function (req, res, next) {
//   // Update views
//   req.session.views = (req.session.views || 0) + 1;
 
//   // Write response
//   res.end(req.session.views + ' views');
// });

module.exports = router;
