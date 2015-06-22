var Config = require("../Config");

function AuthService(){

};

AuthService.prototype.PromptForCredentials = function(req,res,next){
    var auth;

    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    if (!auth || auth[0] !== 'testuser' || auth[1] !== 'testpassword') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Enter Valid Credentials To Access HueTube Dashboard"');
        res.end('You are not authorized to view the HueTube Light Dashboard.');
    } else {
        next();
    }
}

module.exports = AuthService;
