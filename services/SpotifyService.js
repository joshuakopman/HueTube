var Config = require("../Config");
var HueService = require("../services/HueService");

SpotifyService.prototype = new HueService();

function SpotifyService(options){
	this.options = options;
};

SpotifyService.prototype.startAirplay = function(callback){
	/*var requestOptions = {
	    host: Config.spotify.host,
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

SpotifyService.prototype.startSpotify = function(songURI,callback){
	var requestOptions = {
	    host: Config.spotify.host,
	    port: Config.spotify.port,
	    path: Config.spotify.uri,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json'
	    },
    };
    this.options = requestOptions;
    this.getJSON(function(statusCode,data){
    	callback(data);
    }, '{"event":"room_message","item":{"message":{"date":"2015-01-20T22:45:06.662545+00:00","from":{"id":"1661743","mention_name":"Blinky","name":"Blinky the Three Eyed Fish"},"id":"00a3eb7f-fac5-496a-8d64-a9050c712ca1","mentions":[],"message":"/spot '+songURI+'","type":"message"},"room":{"id":"1147567","name":"The Weather Channel"}},"webhook_id":"578829"}'
);
}

module.exports = SpotifyService;