'use strict';

angular.module("ambient",["ng"]).directive("ambient",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{model:"=",toggle:"="},
	    templateUrl: 'templates/ambient.html'
	}
});