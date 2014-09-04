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

var trie_node = require('./build/Release/trie.node');
var pattern_node = require('./build/Release/pattern.node');
var defaultOptions = {
  filename: './51Degrees-Lite',
  properties: [
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
  ]
};
var extensions = {
  'pattern': '.dat',
  'trie': '.trie'
};

exports.parse = function parse(userAgent, method, options) {
  if (arguments.length === 2 && typeof method !== 'string') {
    options = method;
    method = 'pattern';
  }
  options = options || {};
  options.filename = options.filename || defaultOptions.filename;
  options.properties = defaultOptions.properties.concat(options.properties || []);

  for (var key in defaultOptions) {
    if (options[key] === undefined)
      options[key] = defaultOptions[key];
  }
  var res;
  console.log(options.filename);
  if (method === 'pattern') {
    res = pattern_node.parseFile(options.filename + extensions.pattern, options.properties.join(','), userAgent);
    method = 'pattern';
  } else {
    res = trie_node.parseFile(options.filename + extensions.trie, options.properties.join(','), userAgent);
    method = 'trie';
  }

  if (!res)
    return undefined;

  var ret = JSON.parse(res.output);
  delete res.output;
  ret.method = method;
  ret.data = res;

  for (var k in ret) {
    if (ret[k] === 'True')
      ret[k] = true;
    else if (ret[k] === 'False')
      ret[k] = false;
  }
  return ret;
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}


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
]
