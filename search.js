var connection = require('./connectDB');
var fs = require('fs');
//화장품 검색 부분
exports.search_cosmetic = async function (req, res) {
  var name = req.body.name;
  console.log(name);
  connection.query('SELECT name, make ,img,ingredient FROM item WHERE name Like ? OR make Like ?', ['%' + name + '%', '%' + name + '%'], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
      console.log(error);
    } else {
      if (results.length > 0) {
        res.send({
          "code": 200,
          "results": results
        })
        console.log(results);
      }
      else {
        res.send({
          "code": 40,
          "results": results
        })
        console.log("검색결과 없음");
      }
    }
  });
}

//글 검색 부분
exports.search_writing = async function (req, res) {
  var id = req.body.id;
  var title = req.body.title;

  connection.query('SELECT * FROM writing WHERE id = ? AND cosmetic Like ? OR content Like ?', [id,'%' + title + '%', '%' + title + '%'], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
      console.log(error);
    } else {
      if (results.length > 0) {
        res.send({
          "code": 200,
          "writing_results": results
        })
        console.log(results);
      }
      else {
        res.send({
          "code": 40,
          "writing_results": results
        })
        console.log("검색결과없음");
      }
    }
  });
}

//달력 글 검색 부분
exports.search_calender = async function (req, res) {
  var id = req.body.id;
  var date = req.body.date;
  // console.log(id, date);

  connection.query('SELECT * FROM writing WHERE id = ? AND DATE(date) = ?', [id, date], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
      console.log(error);
    } else {
      if (results.length > 0) {
        res.send({
          "code": 200,
          "calender_results": results
        })
        console.log(results);
      }
      else {
        res.send({
          "code": 40,
          "calender_results": results
        })
        console.log("달력 검색결과 없음");
      }
    }
  });
}