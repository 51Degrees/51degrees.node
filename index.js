
var pattern_node = require('./build/Release/pattern.node');
// var trie_node = require('./build/Release/trie.node');
var defaultOptions = {
  filename: './51Degrees-Lite.dat',
  properties: ''
};

exports.parse = function parse(userAgent, method, options) {
  options = options || {};
  for (var key in defaultOptions) {
    if (options[key] === undefined)
      options[key] = defaultOptions[key];
  }
  var ret;
  if (!method || method === 'pattern')
    ret = pattern_node.parseFile(options.filename, options.properties, userAgent);
  if (!ret)
    return undefined;

  var output = ret.output;
  ret.id = output.match(/\d{5}\-\d{5}\-\d{5}\-\d{5}/)[0];
  console.log(ret);
  return ret;
}

var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36';
exports.parse(userAgent);
