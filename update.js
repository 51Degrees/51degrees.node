

var fs = require('fs');
var path = require('path');
var request = require('https').get;
var format = require('util').format;

var host = 'https://51degrees.com';
var path = '/Products/Downloads/Premium/LicenseKeys/%s/Download/True/Type/BinaryV3';

function update(key, filename, callback) {
  if (!key || typeof key !== 'string')
    throw new Error('invalid LicenseKey');
  if (!filename || typeof filename !== 'string')
    throw new Error('invalid filename');
  var endpoint = format(host + path, key);
  request(endpoint, function (response) {
    if (response.statusCode === 200) {
      console.log(filename);
      var ws = fs.createWriteStream(filename);
      ws.on('finish', function() {
        callback(true);
      });
      response.pipe(ws);
    } else {
      callback(false);
    }
  });
}

module.exports = update;
