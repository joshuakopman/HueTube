var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var LightController = require('./controllers/LightController');
var WemoController = require('./controllers/WemoController');
var AmbianceController = require('./controllers/AmbianceController');
var LightService = require('./services/LightService');
var AuthService = require('./services/AuthService');
var WemoService = require('./services/WemoService');
var SpotifyService = require('./services/SpotifyService');
var Config = require("./Config")
var cors = require('cors')
var mongo = require("mongodb").MongoClient;
var EncryptionHelper = require('./helpers/EncryptionHelper');

// Optional runtime overrides so secrets stay out of source control.
Config.host = process.env.HUE_BRIDGE_HOST || Config.host;
Config.hue.uri = process.env.HUE_API_URI || Config.hue.uri; // e.g. /api/<username>
Config.hue.port = parseInt(process.env.HUE_PORT || Config.hue.port, 10);
Config.node.port = parseInt(process.env.PORT || process.env.NODE_PORT || Config.node.port, 10);
Config.mongodbhost = process.env.MONGO_HOST || Config.mongodbhost;
Config.authdb = process.env.MONGO_DB || Config.authdb;
Config.spotify.port = parseInt(process.env.SPOTIFY_PORT || Config.spotify.port, 10);
Config.spotify.uri = process.env.SPOTIFY_URI || Config.spotify.uri;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

var server = app.listen(Config.node.port, function() { });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

function createInMemoryUsersTable(adminUser) {
  var records = { adminuser: adminUser };
  return {
    find: function (query) {
      return {
        toArray: function (callback) {
          var row = records[query._id];
          callback(null, row ? [row] : []);
        }
      };
    },
    save: function (doc, callback) {
      records[doc._id] = doc;
      callback(null, doc);
    }
  };
}

function wireControllers(usersTable) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function (newSocket){
    new LightController(new LightService(),usersTable).BuildRouting(app,newSocket);
    new WemoController(new WemoService(Config.wemo.Stereo.port),usersTable).BuildRouting(app,newSocket,'stereo','wemostereotalk');
    new WemoController(new WemoService(Config.wemo.AC.port),usersTable).BuildRouting(app,newSocket,'ac','wemoactalk');
    new AmbianceController(new LightService(),new WemoService(Config.wemo.Stereo.port),new SpotifyService(),usersTable).BuildRouting(app,newSocket);
  });
}

var mongoHost = process.env.MONGO_HOST || Config.mongodbhost || '127.0.0.1:27017';
var dbName = process.env.MONGO_DB || Config.authdb || 'authentication';
var dbUrl = 'mongodb://' + mongoHost + '/' + dbName;

new EncryptionHelper().GetSeededAdminPassword(function(pwd){
  var admin = {_id:"adminuser" , name:"admin", password: pwd.trim()};

  mongo.connect(dbUrl, function (err, connection) {
    if (err) {
      console.log('Mongo unavailable. Starting with in-memory auth table. Error:', err.message || err);
      var fallbackUsersTable = createInMemoryUsersTable(admin);
      return wireControllers(fallbackUsersTable);
    }

    var db = typeof connection.db === 'function' ? connection.db(dbName) : connection;
    var usersTable = db.collection('Users');
    usersTable.save(admin,function(){
      wireControllers(usersTable);
    });
  });
});
