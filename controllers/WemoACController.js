var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoACController(MyWemoService,UsersCollection){
  this.wemoACService = MyWemoService;
  this.usersCollection = UsersCollection;
};

WemoACController.prototype.BuildRouting = function(app,socket){
  var self = this;

app.put('/ac/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      self.wemoACService.changeState(function(result){
        res.send(result);
      });
   });
});


/*Websockets lights listing */
socket.on('ready', function() {
    self.wemoACService.getState(function(result){
        socket.emit('wemoactalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoACController;