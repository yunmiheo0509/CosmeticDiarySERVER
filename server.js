//express 로드, express모듈을 제어한다.
var express = require("express");
var app = express();

var login = require('./loginroutes');
var search = require('./search');
var writing = require('./writing');
var profile = require('./profile');
var bodyParser = require('body-parser');
//클라이언트에서 오는 응답이 json 일수도 있고, 아닐 수도 있으므로 urlencoded() 도 추가한다.
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//정적 파일 (Static files) 
app.use(express.static('./imagefs'));

var router = express.Router();
//클라이언트가 각 '/.....'경로에 post요청을 보내면 각 라우터가 처리하게함.
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/dupCheck',login.dupCheck);
router.post('/findId',login.findId);
router.post('/findPw', login.findPw);
router.post('/changePw', login.changePw);
router.post('/search_cosmetic',search.search_cosmetic);
router.post('/search_writing',search.search_writing);
router.post('/search_calender', search.search_calender);
router.post('/send_writing',writing.sendWriting);
router.post('/edit_writing',writing.editWriting);
router.post('/delete_writing',writing.deleteWriting);
router.post('/search_profile',profile.search_profile);
router.post('/edit_profile', profile.edit_profile);

app.use('', router);

//포트 지정
app.listen(4000);

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome~~~~' });
    console.log("welcome2~");
});
router.post('/', function(req, res) {
    res.send({ message: 'welcome~~~~' });
    console.log("welcome~");
});