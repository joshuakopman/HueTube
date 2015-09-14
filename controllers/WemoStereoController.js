var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoStereoController(MyWemoService,UsersCollection){
  this.wemoStereoService = MyWemoService;
  this.usersCollection = UsersCollection;
};

WemoStereoController.prototype.BuildRouting = function(app,socket){
var self = this;

app.put('/stereo/', function(req, res) {
  new AuthService(self.usersCollection).PromptForCredentials(req,res,function(){
      self.wemoStereoService.changeState(function(result){
        res.send(result);
      });
   });
});


/*Websockets lights listing */
socket.on('ready', function() {
    self.wemoStereoService.getState(function(result){
        socket.emit('wemostereotalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoStereoController;