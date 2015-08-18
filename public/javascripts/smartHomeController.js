app.controller('SmartHomeController',['$scope','socket','$http', function($scope,socket,$http){

$scope.lightCount = 0;
$scope.isCollapsed = true;
$scope.groupstate = "Lights";
var clicked = false; 

$scope.getLightsInfo = function(){
    socket.emit('ready');

    socket.on('talk', function (data) {
      if(angular.toJson($scope.lightResponse) !=  JSON.stringify(data.message) && clicked == false)
      {
         $scope.lightResponse = data.message;
         $scope.lightCount = data.message.length;
      } 

      socket.emit('ready'); 
      
    });
}

$scope.getWemoACInfo = function(){
    socket.on('wemoactalk', function (data) {
      if(angular.toJson($scope.wemoACResponse) !=  JSON.stringify(data.message) && clicked == false)
      {
          $scope.wemoACResponse = data.message; 
      }   
    });
}

$scope.getWemoStereoInfo = function(){
    socket.on('wemostereotalk', function (data) {
      if(angular.toJson($scope.wemoResponse) !=  JSON.stringify(data.message) && clicked == false)
      {
          $scope.wemoResponse = data.message; 
      }   
    });
}

$scope.toggle = function(id,state,hue,bri,sat,effect,isGroup,isAmbient,songURI){
  clicked = true;
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
      lightStateChange.bri =  parseInt(bri);
      lightStateChange.sat = sat;
      lightStateChange.effect = effect;

  var endPoint = (isGroup) ? 'groups/':'lights/';
  
  if(isAmbient){
    endPoint = "ambiance/";
  }

  if(songURI){
    lightStateChange.songURI = songURI;
  }

  console.log(endPoint);
  console.log(lightStateChange);
  $http.put('http://' + window.location.hostname + ':' + window.location.port + '/' + endPoint + id, JSON.stringify(lightStateChange)).
      success(function(data) {
          clicked = false;
          if(isGroup && !isAmbient){
            $scope.groupstate = state;
          }
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

$scope.switchState = function(type){
  clicked = true;
  $http.put('http://' + window.location.hostname + ':' + window.location.port + '/stereo/').
      success(function(data) {
          clicked = false;
      });
}

$scope.switchACState = function(type){
  clicked = true;
  $http.put('http://' + window.location.hostname + ':' + window.location.port + '/ac/').
      success(function(data) {
          clicked = false;
      });
}


}]);


