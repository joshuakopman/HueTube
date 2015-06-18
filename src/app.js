var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var LightController = require('./controllers/LightController');
var LightService = require('./services/LightService');
var AuthService = require('./services/AuthService');
var WemoService = require('./services/WemoService');
var Config = require("./Config")
var cors = require('cors')

app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

var server = app.listen(Config.node.port, function() { });

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (newSocket){
	new LightController(new LightService(),new WemoService()).BuildRouting(app,newSocket);
});
