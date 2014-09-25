'use strict';

angular.module("light",["ng"]).directive("light",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{model:"=",toggleLight:"="},
	    template: '<div class="toggle-bg toggle-alternate {{model.State}}">'+
				      '<label class="{{model.State}}">{{model.State}}</label>'+
				      '<input type="radio" name="toggle_{{model.lightid}}" ng-click="toggleLight(model.lightid,model.State)" value="off" ng-model="model.State">'+
				      '<input type="radio" name="toggle_{{model.lightid}}" ng-click="toggleLight(model.lightid,model.State)" value="on" ng-model="model.State">'+
				     '<span class="switch {{model.State}}"></span>'+
				  '</div>'
		}
});

angular.module("wakeup",["ng"]).directive("wakeup",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{wakeAlert:"&"},
	    template: '<div class="wakeup">'+
				      '<input type="image" src=".\\images\\sonic.png" title="Send the batsignal" height="35" width="35" name="wakeup" ng-click="wakeAlert()" value="Bat Signal">'+
				  '</div>'
		}
});

angular.module("colorpicker",["ng"]).directive("colorpicker",function(){
	return{
		restrict:"EA",
		replace:!0,
		scope:{ setColor : "=",lightid : "@" },
	    template: 
        '   <div class="colorPanel">'+
	    	'	<div class="swatch red" ng-click="setColor(lightid,\'off\',0,255,255,\'\')"></div>'+
	    	'	<div class="swatch orange" ng-click="setColor(lightid,\'off\',9000,255,255,\'\')"></div>'+
	    	'	<div class="swatch yellow" ng-click="setColor(lightid,\'off\',17750,255,255,\'\')"></div>'+
	    	'	<div class="swatch green" ng-click="setColor(lightid,\'off\',25718,255,255,\'\')"></div>'+
	    	'	<div class="swatch blue" ng-click="setColor(lightid,\'off\',46920,255,255,\'\')"></div>'+
	    	'	<div class="swatch purple" ng-click="setColor(lightid,\'off\',50000,255,255,\'\')"></div>'+
	    	'	<div class="swatch white" ng-click="setColor(lightid,\'off\',0,255,0,\'\')"></div>'+
   		' 	</div> 	'

   				}

});

