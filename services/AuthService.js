var Config = require("../Config");

function AuthService(userCollection){
    this.users = userCollection;
};

AuthService.prototype.PromptForCredentials = function(req,res,next){
    var auth;
    this.users.find({_id:"adminuser"}).toArray(function(err,items){
        if (req.headers.authorization) {
          auth = Buffer.from(req.headers.authorization.substring(6), 'base64').toString().split(':');
        }
        if (err || !items || !items[0] || !auth || auth[0] !== items[0].name || auth[1] !== items[0].password) {
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
