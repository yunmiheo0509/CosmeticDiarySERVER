var connection = require('./connectDB');
var fs = require('fs');
var i = Math.random();
//글 최초작성시
exports.sendWriting = async function (req, res) {
  var date = new Date().toLocaleDateString();//날짜
  var hours = new Date().getHours(); // 시
  var minutes = new Date().getMinutes();  // 분
  var seconds = new Date().getSeconds();  // 초
  var milliseconds = new Date().getMilliseconds();

  var id = req.body.id;
  var cosmetic = req.body.cosmetic;
  var image = req.body.image;
  var satisfy = req.body.satisfy;
  var content = req.body.content;
  var date = req.body.date;
  var ingredient = req.body.ingredient;
  var jopssal = req.body.jopssal;
  var dry = req.body.dry;
  var hwanongsung = req.body.hwanongsung;
  var good = req.body.good;
  var trouble = req.body.trouble;
  var etc = req.body.etc;

  //디코드
  var imageBuffer = Buffer.from(image, 'base64');
  var imagename = "/"+ hours + minutes + seconds +milliseconds+ ".jpg";
  fs.writeFileSync("./imagefs"+imagename, imageBuffer, function (err) {
    //... 
  });
  console.log("이미지 서버저장");

  //db에 글쓰기 내용 저장부분.insert하기
  var sql = 'INSERT INTO writing VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
  var params = [id, cosmetic, imagename, satisfy, content, date
    , ingredient, jopssal, dry, hwanongsung, good, trouble, etc];

  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send({
        "code": 200,
        "success": "success writing"
      });
      console.log("새로 글쓰기 성공");
    }
  }
  );

}
//글 수정시
exports.editWriting = async function (req, res) {
  var date = new Date().toLocaleDateString();//날짜
  var hours = new Date().getHours(); // 시
  var minutes = new Date().getMinutes();  // 분
  var seconds = new Date().getSeconds();  // 초
  var milliseconds = new Date().getMilliseconds();

  var id = req.body.id;
  var cosmetic = req.body.cosmetic;
  var image = req.body.image;
  var satisfy = req.body.satisfy;
  var content = req.body.content;
  var date = req.body.date;
  var ingredient = req.body.ingredient;
  var jopssal = req.body.jopssal;
  var dry = req.body.dry;
  var hwanongsung = req.body.hwanongsung;
  var good = req.body.good;
  var trouble = req.body.trouble;
  var etc = req.body.etc;
  var cosmeticNameDB = req.body.cosmeticNameDB;

  if(image!=null){
    //디코드
  var imageBuffer = Buffer.from(image, 'base64');
  var imagename = "/"+ hours + minutes + seconds +milliseconds+ ".jpg";
  fs.writeFileSync("./imagefs"+imagename, imageBuffer, function (err) {
  });
  console.log("이미지 널아님");
    var sql = 'UPDATE writing SET cosmetic=?,photo=?,satisfy=?,content=?,ingredient=?,jopssal=?,dry=?,hwanongsung=?,good=?,trouble=?,etc=? where id = ? AND date=? AND cosmetic =?';
    var params = [cosmetic, imagename, satisfy, content
      , ingredient, jopssal, dry, hwanongsung, good, trouble, etc,id, date,cosmeticNameDB];
  }else {
    console.log("이미지 널임");
    var sql = 'UPDATE writing SET cosmetic=?,satisfy=?,content=?,ingredient=?,jopssal=?,dry=?,hwanongsung=?,good=?,trouble=?,etc=? where id = ? AND date=? AND cosmetic =?';
    var params = [cosmetic, satisfy, content
      , ingredient, jopssal, dry, hwanongsung, good, trouble, etc,id, date,cosmeticNameDB];
  }
  console.log(id,date,cosmetic);
  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send({
        "code": 200,
        "success": "success writing"
      });
      
    }
  }
  );

}

