

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var request = require('https').get;
var format = require('util').format;

var host = 'https://51degrees.com';
var path = '/Products/Downloads/Premium/LicenseKeys/%s/Download/True/Type/BinaryV3';

function update(key, filename, callback) {
  if (!key || typeof key !== 'string')
    throw new Error('invalid LicenseKey');
  if (!filename || typeof filename !== 'string')
    throw new Error('invalid filename');

  // load mtime
  fs.stat(filename, function getstat(err, stat) {
    var option = {
      host: '51degrees.com',
      method: 'GET',
      path: format(path, key),
      // set Last-Modified via before stat.mtime
      headers: {'Last-Modified': stat && stat.mtime}
    };
    request(option, function onresponse(response) {
      if (response.statusCode === 200) {
        //response.headers['Content-MD5']
        var ws = fs.createWriteStream(filename);
        // var hash = crypto.createHash('md5');
        ws.on('finish', function() {
          callback(true);
        });
        response.pipe(ws);
      } else {
        callback(false);
      }
    });
  });
}

module.exports = update;
