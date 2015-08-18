var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoACController(WemoService){
  wemoService = WemoService;
};

WemoACController.prototype.BuildRouting = function(app,socket){

app.put('/ac/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      wemoService.changeState(function(result){
        res.send(result);
      });
   });
});
/*Websockets lights listing */
socket.on('ready', function() {
    wemoService.getState(function(result){
        socket.emit('wemoactalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoACController;