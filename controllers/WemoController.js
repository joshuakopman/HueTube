var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoController(MyWemoService,UsersCollection){
  this.wemoService = MyWemoService;
  usersCollection = UsersCollection;
};

WemoController.prototype.BuildRouting = function(app,socket,endpointName,socketevent){
  var self = this;

app.put('/' + endpointName + '/', function(req, res) {
  new AuthService(usersCollection).PromptForCredentials(req,res,function(){
      self.wemoService.changeState(function(result){
        res.send(result);
      });
   });
});

socket.on('ready', function() {
    self.wemoService.getState(function(result){
        socket.emit(socketevent,
        {
            message: result
        })
    });
});

}

module.exports = WemoController;