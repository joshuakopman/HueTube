var AuthService = require("../services/AuthService");
var Config = require("../Config");

function WemoController(MyWemoService){
  this.wemoStereoService = MyWemoService;
};

WemoController.prototype.BuildRouting = function(app,socket){

app.put('/stereo/', function(req, res) {
  var self = this;
  new AuthService().PromptForCredentials(req,res,function(){
      self.wemoStereoService.changeState(function(result){
        res.send(result);
      });
   });
});


/*Websockets lights listing */
socket.on('ready', function() {
  var self = this;
    self.wemoStereoService.getState(function(result){
        socket.emit('wemostereotalk',
        {
            message: result
        })
    });
});

}

module.exports = WemoController;