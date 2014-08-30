
var trie_node = require('./build/Release/trie.node');
var pattern_node = require('./build/Release/pattern.node');
var defaultOptions = {
  filename: './51Degrees-Lite.dat',
  properties: ''
};

exports.parse = function parse(userAgent, method, options) {
  if (arguments.length === 2 && method !== 'string') {
    options = method;
    method = 'pattern';
  }
  options = options || {};
  for (var key in defaultOptions) {
    if (options[key] === undefined)
      options[key] = defaultOptions[key];
  }
  var res;
  if (method === 'pattern') {
    res = pattern_node.parseFile(options.filename, options.properties, userAgent);
    method = 'pattern';
  } else {
    res = trie_node.parseFile('51Degrees-Lite.trie', options.properties, userAgent);
    method = 'trie';
  }

  if (!res)
    return undefined;

  var ret = parseText(res.output);
  ret.method = method;
  ret.data = res;
  return ret;
}

function parseText(output) {
  if (!output || typeof output !== 'string')
    throw new Error('output must be string');
  var ret = {};
  output.split('\n').forEach(function(unitText) {
    var unit = unitText.split(',');
    if (unit.length === 2) {
      var key = capitaliseFirstLetter(unit[0]);
      var val = unit[1];
      var lowerVal = val.toLowerCase();
      if (lowerVal === 'true')
        val = true;
      else
        val = false;
      ret[key] = val;
    }
  });
  return ret;
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
