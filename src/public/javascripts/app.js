'use strict';

var app = angular.module('lightApp', ['ngRoute','light','wakeup','colorpicker','group','ui.bootstrap','brightness']).
 
  config(['$routeProvider', function($routeProvider,LightController) {
 
    $routeProvider.when('/', { controller: 'LightController'});
 
    $routeProvider.otherwise({redirectTo: '/'});
 
  }]);
