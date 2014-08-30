
51degrees.node [![Build Status](https://travis-ci.org/yorkie/51degrees.node.svg?branch=master)](https://travis-ci.org/yorkie/51degrees.node)
==============

51degrees c-sdk native bindings for nodejs, it help you detect devices from `userAgent` in high performance.

[![NPM](https://nodei.co/npm/51degrees.node.png?stars&downloads)](https://nodei.co/npm/51degrees.node/)
[![NPM](https://nodei.co/npm-dl/51degrees.node.png)](https://nodei.co/npm/51degrees.node/)

### API

##### `.parse(userAgent[, method, options])`

* `method` must be one of `pattern` and `trie`, default value is: `pattern`.

* `options` must be an object

* `options.filename`: your 51degrees data, lite or premium

* `options.properties`: required properties

for more information, you could move to [51degrees documentation](https://51degrees.com/Support/Documentation)

### Usage

```js
var parse = require('51degrees.node').parse;
var userAgent = '...' // your userAgent in any clients(browser/ios/android)
var ret = parse(userAgent, 'trie');
console.log(ret);
```

After the above program, you will get:

```js
{ animationTiming: true,
  blobBuilder: false,
  canvas: true,
  cssBackground: true,
  cssBorderImage: true,
  cssCanvas: false,
  cssColor: true,
  cssColumn: false,
  cssFlexbox: true,
  cssFont: true,
  cssImages: true,
  cssMediaQueries: true,
  cssMinMax: true,
  cssOverflow: true,
  cssPosition: true,
  cssText: true,
  cssTransforms: true,
  cssTransitions: true,
  cssUI: true,
  dataSet: true,
  dataUrl: true,
  deviceOrientation: true,
  fileReader: true,
  fileSaver: false,
  fileWriter: false,
  formData: true,
  fullscreen: true,
  geoLocation: true,
  history: true,
  html5: true,
  'html-Media-Capture': true,
  id: false,
  iframe: true,
  indexedDB: true,
  isMobile: false,
  json: true,
  layoutEngine: false,
  masking: true,
  postMessage: true,
  progress: true,
  prompts: true,
  screenPixelsHeight: false,
  screenPixelsWidth: false,
  selector: true,
  svg: true,
  touchEvents: true,
  track: true,
  video: true,
  viewport: true,
  webWorkers: true,
  xhr2: true,
  method: 'trie',
  data: { output: 'AnimationTiming,True\nBlobBuilder,Unknown\nCanvas,True\nCssBackground,True\nCssBorderImage,True\nCssCanvas,Unknown\nCssColor,True\nCssColumn,Unknown\nCssFlexbox,True\nCssFont,True\nCssImages,True\nCssMediaQueries,True\nCssMinMax,True\nCssOverflow,True\nCssPosition,True\nCssText,True\nCssTransforms,True\nCssTransitions,True\nCssUI,True\nDataSet,True\nDataUrl,True\nDeviceOrientation,True\nFileReader,True\nFileSaver,Unknown\nFileWriter,Unknown\nFormData,True\nFullscreen,True\nGeoLocation,True\nHistory,True\nHtml5,True\nHtml-Media-Capture,True\nId,17595-21721-21635-18092\nIframe,True\nIndexedDB,True\nIsMobile,False\nJson,True\nLayoutEngine,Webkit\nMasking,True\nPostMessage,True\nProgress,True\nPrompts,True\nScreenPixelsHeight,Unknown\nScreenPixelsWidth,Unknown\nSelector,True\nSvg,True\nTouchEvents,True\nTrack,True\nVideo,True\nViewport,True\nWebWorkers,True\nXhr2,True\n' } }
```

### Installation

```
$ npm install 51degrees --save
```

### License

[MPL](License.txt)

