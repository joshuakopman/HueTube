var AuthService = require("../services/AuthService");

function AmbianceController(LightService,WemoService,SpotifyService, UsersCollection){
  this.lightService = LightService;
  this.wemoService = WemoService;
  this.spotifyService = SpotifyService;
  this.usersCollection = UsersCollection;
};

AmbianceController.prototype.BuildRouting = function(app,socket){
var self = this;

app.put('/ambiance/:id', function(req, res) {
  new AuthService(self.usersCollection).PromptForCredentials(req,res,function(){
      self.wemoService.getState(function(state){
          if(state == "off"){
              self.wemoService.turnOnWemo(function(result){
                self.turnOnLightsAndMusic(req,res);
             });
          }else{
              self.turnOnLightsAndMusic(req,res);
          }
      });

  });

});

}

AmbianceController.prototype.turnOnLightsAndMusic = function(req,res){
    var self = this;
    self.spotifyService.startAirplay(function(){
      setTimeout(function(){
        self.spotifyService.startSpotify(req.body.songURI,function(){
              self.lightService.setGroupState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
                res.send(result);
              });
          });
      },1000);
    });
}


module.exports = AmbianceController;
