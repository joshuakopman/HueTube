var fs = require('fs');
var crypto = require('crypto');

function EncryptionHelper(){

}

EncryptionHelper.prototype.GetSeededAdminPassword = function(callback) {
fs.readFile('salt.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  callback(data);
});
}

module.exports = EncryptionHelper;
