'use strict';

angular.module("light",["ng"]).directive("light",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{model:"=",toggleLight:"="},
	    templateUrl: 'templates/light.html'
	}
});

angular.module("wakeup",["ng"]).directive("wakeup",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{wakeAlert:"&"},
		templateUrl: 'templates/wakeup.html'
	}
});

angular.module("colorpicker",["ng"]).directive("colorpicker",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{ setColor : "=",lightid : "@" },
	    templateUrl: 'templates/colorpicker.html'
    }
});

