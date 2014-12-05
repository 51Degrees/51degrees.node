/*

This Source Code Form is copyright of Yorkshire, Inc.
Copyright © 2014 Yorkshire, Inc,
Guiyang, Guizhou, China

This Source Code Form is copyright of 51Degrees Mobile Experts Limited.
Copyright © 2014 51Degrees Mobile Experts Limited, 5 Charlotte Close,
Caversham, Reading, Berkshire, United Kingdom RG4 7BY

This Source Code Form is the subject of the following patent
applications, owned by 51Degrees Mobile Experts Limited of 5 Charlotte
Close, Caversham, Reading, Berkshire, United Kingdom RG4 7BY:
European Patent Application No. 13192291.6; and
United States Patent Application Nos. 14/085,223 and 14/085,301.

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0.

If a copy of the MPL was not distributed with this file, You can obtain
one at http://mozilla.org/MPL/2.0/.

This Source Code Form is “Incompatible With Secondary Licenses”, as
defined by the Mozilla Public License, v. 2.0.

*/

var util = require('util');
var path = require('path');
var debug = require('debug')('51degrees');
var TrieParser = require('./build/Release/trie.node').TrieParser;
var PatternParser = require('./build/Release/pattern.node').PatternParser;
var defaultProperties = [
  'Id',
  'Canvas',
  'CssTransforms',
  'CssTransitions',
  'History',
  'Html5',
  'IndexedDB',
  'IsMobile',
  'Json',
  'PostMessage',
  'Svg',
  'TouchEvents',
  'WebWorkers'
];
var extensions = {
  'pattern': '.dat',
  'trie': '.trie'
};

function Parser(filename, properties) {
  if (!(this instanceof Parser))
    return new Parser(name, options);
  
  if (typeof filename !== 'string') {
    var err = new Error('failed to read file: ' + filename);
    err.code = 'DB_NOT_FOUND';
    throw err;
  }

  if (filename === 'pattern' || filename === 'trie')
    throw new Error('please use 1.2.x, if you want to use >= 1.3.x, check api at https://github.com/yorkie/51degrees.node');

  if (!properties || properties.length === 0)
    properties = properties || defaultProperties;

  if (!util.isArray(properties))
    throw new Error('properties must be an array');

  // parse database type by extname
  //  .trie -> trie
  //  .dat  -> pattern
  //
  // but we support shortcut for pattern database file like:
  // new Parser('51degrees-lite')
  // will be parsed to '51degrees-lite.data' and treated as
  // pattern database.
  //
  // if anyother extname, will throw error
  //
  var extname = path.extname(filename);
  if (extname === '.trie') {
    this.method = 'trie';
    this._parser = new TrieParser(filename, properties.join(','));
  } else if (extname === '.dat') {
    this.method = 'pattern';
    this._parser = new PatternParser(filename, properties.join(','));
  } else if (extname === '') {
    this.method = 'pattern';
    this._parser = new PatternParser(filename + '.dat', properties.join(','));
  } else {
    var err = new Error('failed to read file: ' + filename);
    err.code = 'DB_NOT_FOUND';
    throw err;
  }
}

Parser.prototype.parse = function(userAgent) {
  var res = this._parser.parse(userAgent);
  if (!res)
    throw new Error('Critical error. Number of profiles for this match is 0. Please notify support');
  // set `method` that user set in constructor
  res.method = this.method;
  return res;
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

module.exports = {
  'Parser'                    : Parser,
  'ALL_PROPERTIES'            : require('./properties/lite.json'),
  'ALL_PREMIUM_PROPERTIES'    : require('./properties/premium.json'),
  'ALL_ENTERPRISE_PROPERTIES' : require('./properties/enterprise.json')
};
