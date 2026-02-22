var AuthService = require("../services/AuthService");

function LightController(LightService,UsersCollection){
	this.lightService = LightService;
  this.usersCollection = UsersCollection;
};

LightController.prototype.BuildRouting = function(app,socket){
  var self = this;
  app.get('/lights', function(req, res) {
    self.lightService.getLights(function(statusCode,result){
      res.send(result);
    });
  });

  app.put('/lights/:id', function(req, res) {
    new AuthService(self.usersCollection).PromptForCredentials(req,res,function(){
      self.lightService.setLightState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
        res.send(result);
      });
     });
  });

  app.put('/groups/:id', function(req, res) {
     new AuthService(self.usersCollection).PromptForCredentials(req,res,function(){
      self.lightService.setGroupState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
        res.send(result);
       });
     });
  });

  /*Websockets lights listing */
  socket.on('ready', function() {
      self.lightService.getLights(function(statusCode,result){
        socket.emit('talk',
        {
            message: result
        })
      });
  });

}

module.exports = LightController;
