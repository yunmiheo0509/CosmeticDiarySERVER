var express = require("express");
var login = require('./loginroutes');
var search = require('./search');
var writing = require('./writing');
var profile = require('./profile');
var bodyParser = require('body-parser');



var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome~~~~' });
    console.log("welcome2~");
});
router.post('/', function(req, res) {
    res.send({ message: 'welcome~~~~' });
    console.log("welcome~");
});

app.use(express.static('./imagefs'));


// route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/dupCheck',login.dupCheck);
router.post('/findId',login.findId);

router.post('/search_cosmetic',search.search_cosmetic);
router.post('/search_writing',search.search_writing);

router.post('/send_writing',writing.sendWriting);
router.post('/edit_writing',writing.editWriting);
router.post('/search_profile',profile.search_profile);

app.use('', router);
app.listen(4000);
