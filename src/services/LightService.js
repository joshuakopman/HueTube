var Light = require("../models/Light");
var HueService = require("../services/HueService");
var ColorHelper = require("../helpers/ColorHelper");
var Config = require("../Config");

LightService.prototype = new HueService();

function LightService(options){
	this.options = options;
};


LightService.prototype.BuildStateForLight = function(lightStateProperties,lightObject){
	for(var prop in lightStateProperties)
	{
		if(prop == "on")
		{
			if(lightStateProperties["on"])
				lightObject.State = "on";
			else
				lightObject.State = "off";
		}
		else if(prop == "hue")
		{
			lightObject.Hue = lightStateProperties["hue"];
		}
		else if(prop == "bri")
		{
			lightObject.Brightness = lightStateProperties["bri"];
		}
		else if(prop == "sat")
		{
			lightObject.Saturation = lightStateProperties["sat"];
		}
		else if(prop == "xy")
		{
			lightObject.x = lightStateProperties["xy"][0];
			lightObject.y = lightStateProperties["xy"][1];
		}
	}
}

LightService.prototype.BuildLightsResponse = function(BridgeLights){   
	
	console.log('Started BuildLightsResponse: ' + new Date().toTimeString());

	var lightsArray = new Array();

	if(BridgeLights == null)
		return lightsArray;
	

	var jsonLength = Object.keys(BridgeLights).length;
	var colorHelper = new ColorHelper();
	console.log('Lights ' + jsonLength);

	for(var x = 1;x <= jsonLength;x++)
	{
		var lightItem = BridgeLights[x.toString()];
		var lightObject = new Light();
	    lightObject.lightid = x;

	    this.BuildStateForLight(lightItem.state, lightObject);
	    
		lightObject.Name = lightItem["name"];

		var rgb = colorHelper.toRGB(lightObject.x,lightObject.y,lightObject.Brightness);
		var hex = colorHelper.rgbToHex(rgb.r,rgb.g,rgb.b);
		lightObject.Color = "#"+hex;
		lightsArray.push(lightObject);
	}


    console.log('Ended BuildLightsResponse: ' + new Date().toTimeString());

	return lightsArray;
}

LightService.prototype.getLights = function(callback){
	var requestOptions = {
	    host: Config.hue.host,
	    port: Config.hue.port,
	    path: Config.hue.uri + '/lights',
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json'
	    }
    };

    this.options = requestOptions;
    var self = this;
    this.getJSON(function(statusCode,obj){
		var lightsResp = self.BuildLightsResponse(obj);
		callback(statusCode,lightsResp);
    });
}

LightService.prototype.setLightState = function(state,lightid,colorHue,colorBri,colorSat,effect,callback){
	var requestOptions = {
	    host: Config.hue.host,
	    port: Config.hue.port,
	    path: Config.hue.uri + '/lights/'+lightid+'/state',
	    method: 'PUT',
	    headers: {
	        'Content-Type': 'application/json'
	    },
    };


    this.options = requestOptions;
    var boolState = state=="on" ;
    var lightSwitchObj = { on: boolState, hue: colorHue, bri: colorBri, sat: colorSat, effect: effect};
    var self = this;


    this.getJSON(function(statusCode){
		callback(statusCode);
    },JSON.stringify(lightSwitchObj));
}

LightService.prototype.setGroupState = function(state,groupid,colorHue,colorBri,colorSat,effect,callback){
	var requestOptions = {
	    host: Config.hue.host,
	    port: Config.hue.port,
	    path: Config.hue.uri + '/groups/'+groupid+'/action',
	    method: 'PUT',
	    headers: {
	        'Content-Type': 'application/json'
	    },
    };

    this.options = requestOptions;
    var boolState = state=="on" ;
    var lightSwitchObj = { on: boolState, hue: colorHue, bri: colorBri, sat: colorSat, effect: effect};
    var self = this;
    this.getJSON(function(statusCode){
		callback(statusCode);
    },JSON.stringify(lightSwitchObj));
}

module.exports = LightService;
