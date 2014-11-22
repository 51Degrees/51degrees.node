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
  if (!res) return undefined;
  // set `method` that user set in constructor
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

exports.ALL_PREMIUM_PROPERTIES = [
  "AjaxRequestType",
  "AnimationTiming",
  "BitsPerPixel",
  "BlobBuilder",
  "BrowserName",
  "BrowserPropertySource",
  "BrowserVendor",
  "BrowserVersion",
  "CcppAccept",
  "CLDC",
  "ContrastRatio",
  "CookiesCapable",
  "CssBackground",
  "CssBorderImage",
  "CssCanvas",
  "CssColor",
  "CssColumn",
  "CssFlexbox",
  "CssFont",
  "CssImages",
  "CssMediaQueries",
  "CssMinMax",
  "CssOverflow",
  "CssPosition",
  "CssText",
  "CssTransforms",
  "CssTransitions",
  "CssUI",
  "DataSet",
  "DataUrl",
  "DetectionTime",
  "DeviceOrientation",
  "DeviceType",
  "Difference",
  "EnergyConsumptionPerYear",
  "FileReader",
  "FileSaver",
  "FileWriter",
  "FormData",
  "Fullscreen",
  "GeoLocation",
  "HardwareFamily",
  "HardwareImages",
  "HardwareModel",
  "HardwareName",
  "HardwareVendor",
  "Has3DCamera",
  "Has3DScreen",
  "HasCamera",
  "HasClickWheel",
  "HasKeypad",
  "HasNFC",
  "HasQwertyPad",
  "HasTouchScreen",
  "HasTrackPad",
  "HasVirtualQwerty",
  "History",
  "Html-Media-Capture",
  "HtmlVersion",
  "Id",
  "Iframe",
  "IndexedDB",
  "IsConsole",
  "IsCrawler",
  "IsEmailBrowser",
  "IsEReader",
  "IsMediaHub",
  "IsMobile",
  "IsSmallScreen",
  "IsSmartPhone",
  "IsTablet",
  "IsTv",
  "Javascript",
  "JavascriptCanManipulateCSS",
  "JavascriptCanManipulateDOM",
  "JavascriptGetElementById",
  "JavascriptImageOptimiser",
  "JavascriptPreferredGeoLocApi",
  "JavascriptSupportsEventListener",
  "JavascriptSupportsEvents",
  "JavascriptSupportsInnerHtml",
  "JavascriptVersion",
  "jQueryMobileSupport",
  "Json",
  "LayoutEngine",
  "Masking",
  "MIDP",
  "Nodes",
  "OEM",
  "OnPowerConsumption",
  "PlatformName",
  "PlatformVendor",
  "PlatformVersion",
  "Popularity",
  "PostMessage",
  "Progress",
  "Prompts",
  "RefreshRate",
  "ReleaseMonth",
  "ReleaseYear",
  "ScreenInchesDiagonal",
  "ScreenInchesDiagonalRounded",
  "ScreenInchesHeight",
  "ScreenInchesSquare",
  "ScreenInchesWidth",
  "ScreenMMDiagonal",
  "ScreenMMDiagonalRounded",
  "ScreenMMHeight",
  "ScreenMMSquare",
  "ScreenMMWidth",
  "ScreenPixelsHeight",
  "ScreenPixelsWidth",
  "ScreenType",
  "Selector",
  "StreamingAccept",
  "SuggestedImageButtonHeightMms",
  "SuggestedImageButtonHeightPixels",
  "SuggestedLinkSizePixels",
  "SuggestedLinkSizePoints",
  "SupportedBearers",
  "SupportedI/O",
  "Supports24p",
  "SupportsTls/Ssl",
  "SupportsWiDi",
  "Svg",
  "TouchEvents",
  "Track",
  "Video",
  "Viewport",
  "WebWorkers",
  "Xhr2"
];

exports.ALL_ENTERPRISE_PROPERTIES = [
  "AjaxRequestType",
  "AnimationTiming",
  "BackCameraMegaPixels",
  "BatteryCapacity",
  "BitsPerPixel",
  "BlobBuilder",
  "BrowserName",
  "BrowserPropertySource",
  "BrowserVendor",
  "BrowserVersion",
  "CameraTypes",
  "CcppAccept",
  "CLDC",
  "ContrastRatio",
  "CookiesCapable",
  "CPU",
  "CPUCores",
  "CPUDesigner",
  "CPUMaximumFrequency",
  "CssBackground",
  "CssBorderImage",
  "CssCanvas",
  "CssColor",
  "CssColumn",
  "CssFlexbox",
  "CssFont",
  "CssImages",
  "CssMediaQueries",
  "CssMinMax",
  "CssOverflow",
  "CssPosition",
  "CssText",
  "CssTransforms",
  "CssTransitions",
  "CssUI",
  "DataSet",
  "DataUrl",
  "DetectionTime",
  "DeviceOrientation",
  "DeviceRAM",
  "DeviceType",
  "Difference",
  "Durability",
  "EnergyConsumptionPerYear",
  "ExpansionSlotMaxSize",
  "ExpansionSlotType",
  "FileReader",
  "FileSaver",
  "FileWriter",
  "FormData",
  "FrontCameraMegaPixels",
  "Fullscreen",
  "GeoLocation",
  "GPU",
  "GPUDesigner",
  "HardwareFamily",
  "HardwareImages",
  "HardwareModel",
  "HardwareName",
  "HardwareVendor",
  "Has3DCamera",
  "Has3DScreen",
  "HasCamera",
  "HasClickWheel",
  "HasKeypad",
  "HasNFC",
  "HasQwertyPad",
  "HasRemovableBattery",
  "HasTouchScreen",
  "HasTrackPad",
  "HasVirtualQwerty",
  "History",
  "Html-Media-Capture",
  "HtmlVersion",
  "Id",
  "Iframe",
  "IndexedDB",
  "IsConsole",
  "IsCrawler",
  "IsEmailBrowser",
  "IsEReader",
  "IsMediaHub",
  "IsMobile",
  "IsSmallScreen",
  "IsSmartPhone",
  "IsTablet",
  "IsTv",
  "Javascript",
  "JavascriptBandwidth",
  "JavascriptCanManipulateCSS",
  "JavascriptCanManipulateDOM",
  "JavascriptGetElementById",
  "JavascriptHardwareProfile",
  "JavascriptImageOptimiser",
  "JavascriptPreferredGeoLocApi",
  "JavascriptSupportsEventListener",
  "JavascriptSupportsEvents",
  "JavascriptSupportsInnerHtml",
  "JavascriptVersion",
  "jQueryMobileSupport",
  "Json",
  "LayoutEngine",
  "Masking",
  "MaxInternalStorage",
  "MaxNumberOfSIMCards",
  "MaxStandbyTime",
  "MaxTalkTime",
  "MaxUsageTime",
  "MIDP",
  "Nodes",
  "OEM",
  "OnPowerConsumption",
  "PlatformName",
  "PlatformVendor",
  "PlatformVersion",
  "Popularity",
  "PostMessage",
  "PriceBand",
  "Progress",
  "Prompts",
  "RefreshRate",
  "ReleaseMonth",
  "ReleaseYear",
  "ScreenInchesDiagonal",
  "ScreenInchesDiagonalRounded",
  "ScreenInchesHeight",
  "ScreenInchesSquare",
  "ScreenInchesWidth",
  "ScreenMMDiagonal",
  "ScreenMMDiagonalRounded",
  "ScreenMMHeight",
  "ScreenMMSquare",
  "ScreenMMWidth",
  "ScreenPixelsHeight",
  "ScreenPixelsWidth",
  "ScreenType",
  "Selector",
  "SoC",
  "SoCDesigner",
  "SoCModel",
  "StreamingAccept",
  "SuggestedImageButtonHeightMms",
  "SuggestedImageButtonHeightPixels",
  "SuggestedLinkSizePixels",
  "SuggestedLinkSizePoints",
  "SupportedBearers",
  "SupportedBluetoothVersion",
  "SupportedCameraFeatures",
  "SupportedChargerTypes",
  "SupportedI/O",
  "SupportedSensorTypes",
  "SupportedSIMCardTypes",
  "Supports24p",
  "SupportsTls/Ssl",
  "SupportsWiDi",
  "Svg",
  "TouchEvents",
  "Track",
  "Video",
  "Viewport",
  "WebWorkers",
  "Xhr2"
];
