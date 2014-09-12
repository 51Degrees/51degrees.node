
51degrees.node [![Build Status](https://travis-ci.org/yorkie/51degrees.node.svg?branch=master)](https://travis-ci.org/yorkie/51degrees.node)
==============

51degrees c-sdk native bindings for nodejs, it help you detect devices from `userAgent` in high performance.

[![NPM](https://nodei.co/npm/51degrees.png?stars&downloads)](https://nodei.co/npm/51degrees/)
[![NPM](https://nodei.co/npm-dl/51degrees.png)](https://nodei.co/npm/51degrees/)

### API

##### `.Parse([method, options])`

* `method` must be one of `pattern` and `trie`, default value is: `pattern`.

* `options` must be an object

* `options.filename`: your 51degrees data, lite or premium

* `options.properties`: required properties

for more information, you could move to [51degrees documentation](https://51degrees.com/Support/Documentation)

##### `parser.parse(userAgent)`

parse the `userAgent` given by you, and return result of that.

### Usage

```js
var Parser = require('51degrees').Parser;
var psr = new Parser('trie');
var userAgent = '...'; // your userAgent in any clients(browser/ios/android)
var ret = psr.parse(userAgent);
console.log(ret);
```

After the above program, you will get:

```js
{ Id: '17595-21721-21635-18092',
  Canvas: true,
  CssTransforms: true,
  CssTransitions: true,
  History: true,
  Html5: true,
  IndexedDB: true,
  IsMobile: false,
  Json: true,
  PostMessage: true,
  Svg: true,
  TouchEvents: true,
  WebWorkers: true,
  method: 'trie',
  data: {} }
```

##### `.ALL_PROPERTIES`

`51Degrees.node` exposure `ALL_PROPERTIES` to shortly fetch all propertites from `userAgent`, just using like this:

```js
var properties = require('51degrees').ALL_PROPERTIES;
var userAgent = '...' // your userAgent in any clients(browser/ios/android)
var psr = new Parser('trie', {properties: properties});
var ret = psr.parse(userAgent);
console.log(ret);
```

Then will prints the whole properties, it's super useful for overview of this module and 51Degrees product.

##### Properties

The following list shows all properties that 51degrees would export in json:

* `AnimationTiming`
* `BlobBuilder`
* `Canvas`
* `CssBackground`
* `CssBorderImage`
* `CssCanvas`
* `CssColor`
* `CssColumn`
* `CssFlexbox`
* `CssFont`
* `CssImages`
* `CssMediaQueries`
* `CssMinMax`
* `CssOverflow`
* `CssPosition`
* `CssText`
* `CssTransforms`
* `CssTransitions`
* `CssUI`
* `DataSet`
* `DataUrl`
* `DeviceOrientation`
* `FileReader`
* `FileSaver`
* `FileWriter`
* `FormData`
* `Fullscreen`
* `GeoLocation`
* `History`
* `Html5`
* `Html-Media-Capture`
* `Id`
* `Iframe`
* `IndexedDB`
* `IsMobile`
* `Json`
* `LayoutEngine`
* `Masking`
* `PostMessage`
* `Progress`
* `Prompts`
* `ScreenPixelsHeight`
* `ScreenPixelsWidth`
* `Selector`
* `Svg`
* `TouchEvents`
* `Track`
* `Video`
* `Viewport`
* `WebWorkers`
* `Xhr`

### Installation

```
$ npm install 51degrees --save
```

### License

[MPL](License.txt)

