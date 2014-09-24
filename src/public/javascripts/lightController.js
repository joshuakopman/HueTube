app.controller('LightController',['$scope','socket','$http', function($scope,socket,$http){

$scope.lightCount = 0;
$scope.isCollapsed = true;
globalTimeout = '';

$scope.getLightsInfo = function(){
	socket.emit('ready');

    socket.on('talk', function (data) {

      if(angular.toJson($scope.lightResponse) !=  JSON.stringify(data.message))
      {
  	     $scope.lightResponse = data.message;
         $scope.lightCount = data.message.length;
      }  
      globalTimeout = window.setTimeout(function(){ 
                        socket.emit('ready');
                      },1000);
    });
}

$scope.toggle = function(id,state,hue,bri,sat,effect,isGroup){
  window.clearTimeout(globalTimeout);
  var switchedToState = 'on';
  if(state=='on')
  { 
    state = 'off';
    switchedToState = 'off';
  }
  else
  {
    state = 'on';
  }
  var lightStateChange = {};
      lightStateChange.state = switchedToState;
      lightStateChange.hue = hue;
      lightStateChange.bri = bri;
      lightStateChange.sat = sat;
      lightStateChange.effect = effect;

  var endPoint = (isGroup) ? 'groups/':'lights/';
  
  $http.put('http://www.huetube.info/' + endPoint + "/" +id, JSON.stringify(lightStateChange)).
      success(function(data) {
          socket.emit('ready');
      });
}

$scope.wakeUp = function(){
  var y=0;

  while(y < 10)
  {
    setTimeout(function()
    {
      for(var x=1;x<=$scope.lightCount;x++)
      {
        $scope.toggle(x,'off',0,255,255,'');
        $scope.toggle(x,'on');
      }
    },100);

    y++;
  }
}


}]);


