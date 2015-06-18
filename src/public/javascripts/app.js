'use strict';

var app = angular.module('lightApp', ['ngRoute','light','colorpicker','group','ui.bootstrap','brightness','wemo']).
 
  config(['$routeProvider', function($routeProvider,SmartHomeController) {
 
    $routeProvider.when('/', { controller: 'SmartHomeController'});
 
    $routeProvider.otherwise({redirectTo: '/'});
 
  }]);
