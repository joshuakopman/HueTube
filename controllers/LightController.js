function LightController(LightService){
	lightService = LightService;
};

LightController.prototype.BuildRouting = function(){

app.get('/lights', function(req, res) {
  lightService.getLights(function(statusCode,result){
    res.send(result);
  });
});

app.post('/lights', function(req, res) {
  console.log(req.connection.remoteAddress+" "+new Date().toString());
 //  if(req.connection.remoteAddress.indexOf("35.187") < 0)
//{
    lightService.setLightState(req.body.state,req.body.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
      res.send(result);
    });
 //   }
});

app.post('/groups', function(req, res) {
  console.log(req.connection.remoteAddress+" "+new Date().toString());
  //if(req.connection.remoteAddress.indexOf("192") >= 0)
  //{
    lightService.setGroupState(req.body.state,req.body.id,req.body.hue,req.body.bri,req.body.sat,req.body.effect,function(statusCode,result){
      res.send(result);
    });
 // }
});

/*Websockets lights listing */
app.io.route('ready', function(req) {
      lightService.getLights(function(statusCode,result){
        req.io.emit('talk',{
        message: result
    })
  });
})


}

module.exports = LightController;