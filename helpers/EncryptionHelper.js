var fs = require('fs');
var crypto = require('crypto');

function EncryptionHelper(){

}

EncryptionHelper.prototype.GetSeededAdminPassword = function() {
fs.readFile('salt.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("The password read in from the file is '"+data+"'");
  return data;
});
}

module.exports = EncryptionHelper;
