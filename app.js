var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var LightController = require('./controllers/LightController');
var WemoStereoController = require('./controllers/WemoStereoController');
var WemoACController = require('./controllers/WemoACController');
var AmbianceController = require('./controllers/AmbianceController');
var LightService = require('./services/LightService');
var AuthService = require('./services/AuthService');
var WemoService = require('./services/WemoService');
var SpotifyService = require('./services/SpotifyService');
var Config = require("./Config")
var cors = require('cors')
var mongo = require("mongodb").MongoClient;

app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

var server = app.listen(Config.node.port, function() { });

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var dbUrl = 'mongodb://' + Config.mongodbhost + ':' + Config.mongodbport + '/' + Config.authdb;
mongo.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

	var admin = {_id:"adminuser" , name:"admin", password:"password"};
	var usersTable = db.collection('Users');
	usersTable.save(admin,function(err,result){
		var io = require('socket.io').listen(server);
		io.sockets.on('connection', function (newSocket){
			new LightController(new LightService(),usersTable).BuildRouting(app,newSocket);
			new WemoStereoController(new WemoService(Config.wemo.Stereo.port),usersTable).BuildRouting(app,newSocket);
			new AmbianceController(new LightService(),new WemoService(Config.wemo.Stereo.port),new SpotifyService(),usersTable).BuildRouting(app,newSocket);
			new WemoACController(new WemoService(Config.wemo.AC.port),usersTable).BuildRouting(app,newSocket);
		});
	});
  }
});


