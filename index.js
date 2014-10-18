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
  
  if (typeof filename !== 'string')
    throw new Error('data filename required');

  if (!properties || properties.length === 0)
    properties = properties || defaultProperties;

  if (!util.isArray(properties))
    throw new Error('properties must be an array');

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
    throw new Error('could not find data file: ' + filename);
  }
}

Parser.prototype.parse = function(userAgent) {
  var res = this._parser.parse(userAgent);
  if (!res) return undefined;
  res.method = this.method;
  return res;
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

exports.Parser = Parser;
exports.ALL_PROPERTIES = [
  'AnimationTiming',
  'BlobBuilder',
  'Canvas',
  'CssBackground',
  'CssBorderImage',
  'CssCanvas',
  'CssColor',
  'CssColumn',
  'CssFlexbox',
  'CssFont',
  'CssImages',
  'CssMediaQueries',
  'CssMinMax',
  'CssOverflow',
  'CssPosition',
  'CssText',
  'CssTransforms',
  'CssTransitions',
  'CssUI',
  'DataSet',
  'DataUrl',
  'DeviceOrientation',
  'FileReader',
  'FileSaver',
  'FileWriter',
  'FormData',
  'Fullscreen',
  'GeoLocation',
  'History',
  'Html5',
  'Html-Media-Capture',
  'Id',
  'Iframe',
  'IndexedDB',
  'IsMobile',
  'Json',
  'LayoutEngine',
  'Masking',
  'PostMessage',
  'Progress',
  'Prompts',
  'ScreenPixelsHeight',
  'ScreenPixelsWidth',
  'Selector',
  'Svg',
  'TouchEvents',
  'Track',
  'Video',
  'Viewport',
  'WebWorkers',
  'Xhr2'
];
