var connection = require('./connectDB');

//유저정보 검색 부분
exports.search_profile = async function(req,res){
    var id= req.body.id;
    connection.query('SELECT id, name, gender ,age, image, skintype, allergy, alarm FROM members WHERE id = ?',[id], async function (error, results, fields) {
        if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
        console.log(error);
        } else if(results.length >0){
            res.send({
                "id": results[0].id,
                "name": results[0].name,
                "gender": results[0].gender,
                "age": results[0].age,
                "image": results[0].image,
                "skintype": results[0].skintype,
                "allergy": results[0].allergy,
                "alarm": results[0].alarm,
        })
   
        }
    });
}

//프로필 수정
exports.edit_profile = async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    // var image = req.body.image;
    var gender = req.body.gender;
    var age = req.body.age;
    var skintype = req.body.skintype;
    var allergy = req.body.allergy;
    console.log(id, name, gender, age, skintype, allergy);
    
    var sql = 'UPDATE members SET id=?,name=?,gender=?,age=?,skintype=?,allergy=? where id = ?';
    var params = [id, name, gender, age, skintype, allergy, id];
    connection.query(sql, params, function (error, results, fields) {
        if (error) {
            res.send({
            "code":206,
            "success":"faild"});
            
            console.log(error);
        } else {
            res.send({
                "code": 200,
                "success": "success writing"
            });
        }
    });
}

