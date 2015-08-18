var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoStereoController(WemoService){
  wemoService = WemoService;
};

WemoStereoController.prototype.BuildRouting = function(app,socket){

app.put('/stereo/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      wemoService.changeState(function(result){
        res.send(result);
      });
   });
});


/*Websockets lights listing */
socket.on('ready', function() {
    wemoService.getState(function(result){
        socket.emit('wemostereotalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoStereoController;