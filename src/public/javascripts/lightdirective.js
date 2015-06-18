'use strict';

angular.module("light",["ng"]).directive("light",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{model:"=",toggleLight:"="},
	    templateUrl: 'templates/light.html'
	}
});

angular.module("group",["ng"]).directive("group",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{toggleLight:"=",viewgroupstate:"="},
	    templateUrl: 'templates/group.html'
	}
});

angular.module("colorpicker",["ng"]).directive("colorpicker",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{ model:"=", setColor : "=",lightid : "@" },
	    templateUrl: 'templates/colorpicker.html'
    }
});

angular.module("brightness",["ng"]).directive("brightness",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{ model:"=", setColor : "=",lightid : "@" },
	    templateUrl: 'templates/brightness.html'
    }
}); 
