var Config = require("../Config");

function AuthService(userCollection){
    users = userCollection;
};

AuthService.prototype.PromptForCredentials = function(req,res,next){
    var auth;
    users.find({_id:"adminuser"}).toArray(function(err,items){
        if (req.headers.authorization) {
          auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
        }
        console.log('The password entered is: '+auth[1]);
        if (!auth || auth[0] !== items[0].name || auth[1] !== items[0].password) {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Enter Valid Credentials To Access HueTube Dashboard"');
            res.end('You are not authorized to view the HueTube Light Dashboard.');
        } else {
            next();
        }
    });

}
function encrypt(plaintextpwd){
    var salt = ''
    return plaintextpwd * salt;
}

module.exports = AuthService;
