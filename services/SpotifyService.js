var Config = require("../Config");
var HueService = require("../services/HueService");

SpotifyService.prototype = new HueService();

function SpotifyService(options){
	this.options = options;
};

SpotifyService.prototype.startAirplay = function(callback){
	/*var requestOptions = {
	    host: Config.host,
	    port: Config.hue.port,
	    path: Config.hue.uri + '/airplay/',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json'
	    },
    };
    this.options = requestOptions;
    this.getJSON(function(statusCode){
		callback(statusCode);
    });*/

	callback();
}

SpotifyService.prototype.startSpotify = function(callback){
	var requestOptions = {
	    host: Config.spotify.host,
	    port: Config.spotify.port,
	    path: Config.spotify.uri,
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json'
	    },
    };
    this.options = requestOptions;
    this.getJSON(function(statusCode,data){
    	callback(data);
    });
}

module.exports = SpotifyService;