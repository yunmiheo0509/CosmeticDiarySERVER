var connection = require('./connectDB');
const bcrypt = require('bcrypt');
const { Server } = require('node:http');
const saltRounds = 10;

//로그인 부분
exports.login = async function (req, res) {

  var id = req.body.id;
  var password = req.body.password;
  console.log(id, password);

  connection.query('SELECT * FROM members WHERE id = ?', [id], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        const comparision = await bcrypt.compare(password, results[0].password)
        if (comparision) {
          res.send({
            "code": 200,
            "success": "login sucessfull"
          })
          console.log("로그인 성공");
        }
        else {
          res.send({
            "code": 204,
            "success": "password does not match"
          })
          console.log(" 패스워드가 일치하지 않음");
        }
      }
      else {
        res.send({
          "code": 206,
          "success": "id does not exits"
        });
        console.log("아이디가 존재하지 않음");
      }
    }
  });
}

//회원가입 부분
exports.register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  var id = req.body.id;
  var name = req.body.name;
  var email = req.body.email;

  var sql = 'INSERT INTO members (id, password, name, email) VALUES(?, ?, ?, ?)';
  var params = [id, encryptedPassword, name, email];

  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "duplicate error"
      })
      console.log(error);
      console.log("기존에 있음");
    } else {
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
      console.log("새로 유저등록 성공");
    }
  }
  );
}

//회원가입할때 중복체크
exports.dupCheck = async function (req, res) {
  var id = req.body.id;
  connection.query('SELECT * FROM members WHERE id = ?', [id], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error occured"
      })
    } else {
      if (results.length > 0) {
        res.send({
          "code": 100,
          "failed": "중복발생"
        })
      }
      else {
        res.send({
          "code": 300,
          "failed": "회원가입 가능"
        })
      }
    }
  });
}

//아이디 찾기
exports.findId = async function (req, res) {

  var name = req.body.name;
  var email = req.body.email;
  console.log(name, email);

  connection.query('SELECT id FROM members WHERE name = ? and email = ?', [name, email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        res.send({
          "code": 200,
          "success": results[0].id
        })
        console.log(results[0].id);
        console.log("아이디 찾기 성공");
      }
      else {
        res.send({
          "code": 204,
          "success": "존재하지 않는 회원입니다."
        })
        console.log("존재하지 않는 회원입니다");
      }
    }

  });
}

//비밀번호 찾기
exports.findPw = async function (req, res) {
  var id = req.body.id;
  var email = req.body.email;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  console.log(id, password);

  var sql = 'UPDATE members SET password = ? WHERE id = ? AND email = ?';
  var sql1 = 'SELECT * FROM members WHERE id = ? AND email = ?';
  var params = [encryptedPassword, id, email];
  var params1 = [id, email];

  connection.query(sql1, params1, function (error, results, fields) {
    if (results.length > 0) {
      connection.query(sql, params, function (error, results, fields) {
        console.log(results);
        res.send({
          "code": 200,
          "success": "비밀번호 변경 완료"
        });
        console.log("비밀번호 변경 완료");
      });
    } else {
      res.send({
        "code": 206,
        "success": "회원정보 존재하지 않음"
      });
      console.log(error);
    }
  });
}

//비밀번호 변경
exports.changePw = async function (req, res) {
  var id = req.body.id;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  console.log(id, password);

  var sql = 'UPDATE members SET password = ? WHERE id = ?';
  var params = [encryptedPassword, id];

  connection.query(sql, params, function (error, results, fields) {
    console.log(results);
    res.send({
      "code": 200,
      "success": "비밀번호 변경 완료"
    });
    console.log("비밀번호 변경 완료 : ", id, password);
  });
}