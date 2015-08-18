var WeMo = require('wemo')
var Config = require("../Config");

function WemoService(port){
	console.log('Port: '+port);
	this.wemoSwitch = new WeMo(Config.host, port);
};

WemoService.prototype.changeState = function(callback){
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
	this.wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
		return callback(result);
	});
}


module.exports = WemoService;