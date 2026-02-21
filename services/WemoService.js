var Config = require("../Config");

function WemoService(port){
	this.wemoSwitch = null;
	try {
		var Wemo = require('wemo');
		this.wemoSwitch = new Wemo(Config.host, port);
	} catch (e) {
		console.warn('Wemo disabled: optional dependency failed to load.');
	}
};

WemoService.prototype.changeState = function(callback){
	if (!this.wemoSwitch) {
		return callback("wemo-unavailable");
	}
	var self = this;
	this.wemoSwitch.getBinaryState(function(err, result) {

		var onOff = 0;
		if(result == 0){
			onOff = 1;
		}
    	self.wemoSwitch.setBinaryState(onOff, function(err, result) { // switch on 
			return callback(result);
		});
	});
}

WemoService.prototype.getState = function(callback){
	if (!this.wemoSwitch) {
		return callback("unavailable");
	}
	this.wemoSwitch.getBinaryState(function(err, result) {
			var state = '';
			if(result == 0){
				state = "off";
			}else{
				state = "on";
			}
			callback(state);
		});
	}

WemoService.prototype.turnOnWemo = function(callback){
	if (!this.wemoSwitch) {
		return callback("wemo-unavailable");
	}
	this.wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
			return callback(result);
		});
}


module.exports = WemoService;
