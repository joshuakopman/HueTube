'use strict';

var app = angular.module('lightApp', ['ngRoute','light','colorpicker','group','ui.bootstrap','brightness','wemo']).
 
  config(['$routeProvider', function($routeProvider,LightController) {
 
    $routeProvider.when('/', { controller: 'LightController'});
 
    $routeProvider.otherwise({redirectTo: '/'});
 
  }]);
