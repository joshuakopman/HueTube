var AuthService = require("../services/AuthService");

function AmbianceController(LightService,WemoService,SpotifyService){
  lightService = LightService;
  wemoService = WemoService;
  spotifyService = SpotifyService;
};

AmbianceController.prototype.BuildRouting = function(app,socket){

app.put('/ambiance/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      wemoService.changeState(function(result){
          lightService.setLightState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
            res.send(result);
          });

          spotifyService.startAirplay();
          spotifyService.startSpotify();
     });
   });
});


}

module.exports = AmbianceController;