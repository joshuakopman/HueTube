var WeMo = require('wemo')
var Config = require("../Config");


function WemoService(options){
	this.options = options;
};

WemoService.prototype.changeState = function(callback){
	var wemoSwitch = new WeMo(Config.hue.host, Config.wemo.port);

	wemoSwitch.getBinaryState(function(err, result) {
		var onOff = 0;
		if(result == 0){
			onOff = 1;
		}
    	wemoSwitch.setBinaryState(onOff, function(err, result) { // switch on 
			return callback(result);
		});
	});
}

WemoService.prototype.getState = function(callback){
	var wemoSwitch = new WeMo(Config.hue.host, Config.wemo.port);

	wemoSwitch.getBinaryState(function(err, result) {
		var state = '';
		if(result == 0){
			state = "off";
		}else{
			state = "on";
		}
		callback(state);
	});
}

function printState(state){
	console.log('The light is '+state);
}

module.exports = WemoService;