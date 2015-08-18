var Wemo = require('wemo')
var Config = require("../Config");

function WemoService(port){

	var wemoSwitch = new Wemo(Config.host, port);

	this.changeState = function(callback){
		var self = this;
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

	this.getState = function(callback){
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

	this.turnOnWemo = function(callback){
		wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
			return callback(result);
		});
	}

};
module.exports = WemoService;