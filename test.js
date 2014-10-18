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

var test = require('tape');
var Parser = require('./index').Parser;
var properties = require('./index').ALL_PROPERTIES;
var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36';

test('pattern', function(t) {
  var parser = new Parser('51Degrees-Lite.dat', properties);
  var ret = parser.parse(userAgent);
  properties.forEach(function(property) {
    t.ok(typeof ret[property] !== undefined, property + '> ok');
  });
  t.equal(ret.method, 'pattern');
  t.end();
});

test('pattern overflow', function(t) {
  var ua = new Buffer(1000);
  for (var i=0; i<1000; i++) {
    ua[i] = 50;
  }
  var parser = new Parser('51Degrees-Lite', properties);
  var throwed = false;
  try { parser.parse(ua); }
  catch (e) {
    throwed = true;
  }
  t.equal(throwed, true);
  t.end();
});

test('trie', function(t) {
  var parser = new Parser('51Degrees-Lite.trie', properties);
  var ret = parser.parse(userAgent);
  properties.forEach(function(property) {
    t.ok(typeof ret[property] !== undefined, property + '> ok');
  });
  t.equal(ret.method, 'trie');
  t.end();
});
