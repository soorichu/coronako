const axios = require("axios");
const cheerio = require("cheerio");

// let kor;
// let infected, died;

// function copyObject(obj) {
//   if (obj === null || typeof obj !== 'object') {
//     return obj;
//   }

//   const copiedObject = obj.constructor();

//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       copiedObject[key] = copyObject(obj[key]);
//     }
//   }

//   return copiedObject;
// }


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
 	app.get('/api/get', function(req, res){
 		res.send({result:result});
 	});
  }
 );


// console.log(infected);
// console.log(kor);


// function copyArray(param){
//     var result = [];
        
//     param.forEach(function(idx, item){
//             result[idx] = param[idx];
//     });
 
//     return result;
// }

// async function getHTML2() {
//   try {
//     return await axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=");
//   } catch (error) {
//     console.error(error);
//   }
// }


// getHTML2()
//   .then(html => {
//     let liList = []; let retList = [];
//     const $ = cheerio.load(html.data);
//     const bodyList = $(".s_listin_dot").eq(1).children("li");

//     bodyList.each(function(i, elem) {
//       liList.push($(this).text().split("명,").map(e => e.split("),")));
//     });


//     for(var i in liList){
//       // console.log(liList[i]);
//       if(typeof(liList[i])=='string') retList.push(liList[i]);
//       else{
//         for(var j in liList[i]){
//           // console.log(liList[i][j]);
//           if(typeof(liList[i][j])=='string') retList.push(liList[i][j]);
//           else{
//             for(var k in liList[i][j]){
//               retList.push(liList[i][j][k]);
//             }
//           }
//         }
//       }
//     }
    
//     return retList;
//   }).then(rest => {
//  	//  console.log(rest);
//    var nation = [
//       '중국', 
//       '홍콩', '태국', '마카오', '대만',
//       '싱가포르', '일본', '베트남', '네팔',
//       '말레이시아', '캄보디아', '스리랑카', '아랍에미리트',
//       '인도', '필리핀', '이란', '레바논', '이스라엘',
//       '미국', '캐나다',
//       '프랑스', '독일', '핀란드', '이탈리아',
//       '영국', '러시아', '스웨덴', '스페인', 
//       '벨기에', '호주', '이집트'
//     ];


//     infected = new Array(nation.length);
//     died = ndw Array(nation.length);

//     function parsing(text){
//       for(var i in nation){
//         // console.log(nation[i]);
//         if(text.match(nation[i])){
//           // console.log(text)
//           var temp = text.split("사망");
//           // console.log(text)
//           if(temp.length==1){
//             return [temp[0].replace(/[^0-9]/g,""), 0];
//           }else{
//             return [temp[0].replace(/[^0-9]/g,""), temp[1].replace(/[^0-9]/g,"")];
//           }
//         }
//       }
//     }

//    var tempInfected = [], tempDied = [];
//     for(var i in rest){
//       var temp = parsing(rest[i]);
//       tempInfected.push(temp[0]);
//       tempDied.push(temp[1]);
//       infected[i] = copyObject(temp[0]);
//       died[i] = copyObject(temp[1]);
//     }

//     console.log(tempInfected);
//     console.log(tempDied);
//     // infected = JSON.parse(JSON.stringfy(tempInfected));
//     // died = JSON.parse(JSON.stringfy(tempDied));

//   }
//  );