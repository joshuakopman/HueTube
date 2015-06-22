var AuthService = require("../services/AuthService");

function AmbianceController(LightService,WemoService,SpotifyService){
  lightService = LightService;
  wemoService = WemoService;
  spotifyService = SpotifyService;
};

AmbianceController.prototype.BuildRouting = function(app,socket){
var self = this;

app.put('/ambiance/', function(req, res) {
  new AuthService().PromptForCredentials(req,res,function(){
      wemoService.getState(function(state){
          if(state == "off"){
              wemoService.turnOnWemo(function(result){
                self.turnOnLightsAndMusic();
             });
          }else{
              self.turnOnLightsAndMusic();
          }
      });

  });

});

}

AmbianceController.prototype.turnOnLightsAndMusic = function(req,res){
    spotifyService.startAirplay(function(){
      spotifyService.startSpotify(function(){
            lightService.setLightState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
              res.send(result);
            });
        });
    });
}


module.exports = AmbianceController;