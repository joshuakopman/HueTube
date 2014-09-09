var http = require("http");
var https = require("https");

function HueService(options){
	this.options = options;
};

HueService.prototype.getJSON = function(onResult,body)
{
    var self = this;
    var prot = self.options.port == 443 ? https : http;
    var req = prot.request(self.options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(statusCode,err) {
      	onResult(statusCode);
    });

    if(self.options.method=="PUT" || self.options.method=="POST") 
    {
        req.write(body);
    }
    req.end();
};

module.exports = HueService;
