var AuthService = require("../services/AuthService");

function WemoController(WemoService){
  wemoService = WemoService;
};

WemoController.prototype.BuildRouting = function(app,socket){

app.put('/wemo/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      wemoService.changeState(function(result){
        res.send(result);
      });
   });
});

/*Websockets lights listing */
socket.on('ready', function() {
    wemoService.getState(function(result){
        socket.emit('wemotalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoController;