var fs = require('fs');
var crypto = require('crypto');

function EncryptionHelper(){

}

EncryptionHelper.prototype.GetSeededAdminPassword = function() {
fs.readFile('salt.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  return data;
});
}

module.exports = EncryptionHelper;
