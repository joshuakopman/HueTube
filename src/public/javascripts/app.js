'use strict';

var app = angular.module('lightApp', ['ngRoute','light','wakeup','colorpicker','group','ui.bootstrap']).
 
  config(['$routeProvider', function($routeProvider,LightController) {
 
    $routeProvider.when('/', { controller: 'LightController'});
 
    $routeProvider.otherwise({redirectTo: '/'});
 
  }]);
