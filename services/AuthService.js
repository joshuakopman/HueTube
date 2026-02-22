var crypto = require("crypto");

function AuthService(userCollection){
    this.users = userCollection;
};

function safeStringCompare(a, b) {
    var left = Buffer.from(a || "", "utf8");
    var right = Buffer.from(b || "", "utf8");
    if (left.length !== right.length) {
        return false;
    }
    return crypto.timingSafeEqual(left, right);
}

function parseBasicAuthHeader(headerValue) {
    if (!headerValue || headerValue.indexOf("Basic ") !== 0) {
        return null;
    }
    try {
        var decoded = Buffer.from(headerValue.substring(6), "base64").toString();
        var splitIndex = decoded.indexOf(":");
        if (splitIndex < 0) {
            return null;
        }
        return [decoded.substring(0, splitIndex), decoded.substring(splitIndex + 1)];
    } catch (e) {
        return null;
    }
}

AuthService.prototype.PromptForCredentials = function(req,res,next){
    this.users.find({_id:"adminuser"}).toArray(function(err,items){
        var auth = parseBasicAuthHeader(req.headers.authorization);
        var isAuthorized = !err &&
            items &&
            items[0] &&
            auth &&
            safeStringCompare(auth[0], items[0].name) &&
            safeStringCompare(auth[1], items[0].password);
        if (!isAuthorized) {
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
