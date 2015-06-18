var AuthService = require("../services/AuthService");

function LightController(LightService){
	lightService = LightService;
};

LightController.prototype.BuildRouting = function(app,socket){
  app.get('/lights', function(req, res) {
    lightService.getLights(function(statusCode,result){
      res.send(result);
    });
  });

  app.put('/lights/:id', function(req, res) {
    new AuthService().PromptForCredentials(req,res,function(){
      lightService.setLightState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
        res.send(result);
      });
     });
  });

  app.put('/groups/:id', function(req, res) {
     new AuthService().PromptForCredentials(req,res,function(){
      lightService.setGroupState(req.body.state,req.params.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
        res.send(result);
       });
     });
  });

  /*Websockets lights listing */
  socket.on('ready', function() {
      lightService.getLights(function(statusCode,result){
        socket.emit('talk',
        {
            message: result
        })
      });
  });

}

module.exports = LightController;