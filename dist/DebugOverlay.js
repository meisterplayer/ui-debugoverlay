module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DebugOverlay = __webpack_require__(4);

var _DebugOverlay2 = _interopRequireDefault(_DebugOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DebugOverlay2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeartBeat = function () {
    function HeartBeat(beatsPerS) {
        var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, HeartBeat);

        this.intervalTime = Number.isFinite(beatsPerS) ? beatsPerS * 1000 : 5000;
        this.debug = debug;

        this.shouldCallCallback = true;

        this.lastBeat = 0;
        this.intervalId = 0;
    }

    _createClass(HeartBeat, [{
        key: 'beat',
        value: function beat() {
            var _this = this;

            var onBeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

            if (this.intervalId) {
                if (this.debug) {
                    console.log('Removing previous interval');
                }
                clearInterval(this.intervalId);
            }

            // Interval starts firing at the end of the interval, so previous beat would have been now
            this.lastBeat = Date.now();

            this.intervalId = setInterval(function () {
                var now = Date.now();
                var timeSinceLastBeat = now - _this.lastBeat;

                _this.lastBeat = now;

                if (_this.shouldCallCallback) {
                    onBeat(timeSinceLastBeat);
                }
            }, this.intervalTime);
        }
    }, {
        key: 'mute',
        value: function mute() {
            this.shouldCallCallback = false;
        }
    }, {
        key: 'unmute',
        value: function unmute() {
            this.shouldCallCallback = true;
        }
    }, {
        key: 'kill',
        value: function kill() {
            clearInterval(this.intervalId);
        }
    }]);

    return HeartBeat;
}();

exports.default = HeartBeat;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * dependencies
 */

var vkeys = __webpack_require__(3);

/**
 * Export `shortcut`
 */

module.exports = shortcut;

/**
 * Create keyboard shortcut sequence with the `keys` like e.g. 'ctrl s'.
 * The following options `o` are optional with the default values:
 *
 *  {
 *     ms: 500,                 // 500 milliseconds
 *     el: window,              // DOM Element the shortcut is added to.
 *     stopPropagation: true,   // no bubbling up the DOM Tree
 *     preventDefault: true,    // no default event for the given `keys`.
 *  };
 *
 * Example:
 *     var shortcut = require('keyboard-shortcut');
 *
 *     shortcut('a b c', function(e) {
 *       console.log('hit:', 'a b c');
 *     });
 *
 * @param {String} keys
 * @param {Object} o options
 * @param {Function} fn callback function with the keydown event.
 * @api public
 */
function shortcut(keys, o, fn) {
	var keys = keys.split(/ +/);
	var klen = keys.length;
	var seq = [];
	var i = 0;
	var prev;

	if (2 == arguments.length) {
		fn = o;
		o = {};
	}
	defaults();

	o.el.addEventListener('keydown', keydown);

	function keydown(e) {
		var key = keys[i++];
		var code = e.which || e.keyCode;
		var pressed = vkeys[code];
		procedure(pressed, e);
		if ('*' != key && key != pressed) return reset();
		if (o.ms && prev && new Date() - prev > o.ms) return reset();
		if (o.ms) prev = new Date();
		var len = seq.push(pressed);
		if (len != klen) return;
		reset();
		fn(e);
	}

	function defaults() {
		o.ms = o.ms || 1000;
		o.el = o.el || window;
	}

	function procedure(pressed, e) {
		var defined = keys.some(function (key) {
			return pressed == key;
		});
		if (!defined) return;
		if (o.preventDefault) e.preventDefault();
		if (o.stopPropagation) e.stopPropagation();
	}

	function reset() {
		prev = null;
		seq = [];
		i = 0;
	}
}

shortcut.vkeys = vkeys;
shortcut.getKey = vkeys.getKey;
shortcut.findCode = vkeys.findCode;
shortcut.findAllCodes = vkeys.findAllCodes;

shortcut.press = function press(k, el) {
	var code = vkeys.findCode(k);
	var el = el || window;
	var e = document.createEvent('Event');
	e.initEvent('keydown', true, true);
	e.keyCode = e.which = code;
	el.dispatchEvent(e);
	e = document.createEvent('Event');
	e.initEvent('keyup', true, true);
	e.keyCode = e.which = code;
	el.dispatchEvent(e);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vkeys = exports = module.exports = {
  0: 'unk',
  1: 'mouse1',
  2: 'mouse2',
  3: 'break',
  4: 'mouse3',
  5: 'mouse4',
  6: 'mouse5',
  8: 'backspace',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause',
  20: 'capslock',
  21: 'imehangul',
  23: 'imejunja',
  24: 'imefinal',
  25: 'imekanji',
  27: 'escape',
  28: 'imeconvert',
  29: 'imenonconvert',
  30: 'imeaccept',
  31: 'imemodechange',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  41: 'select',
  42: 'print',
  43: 'execute',
  44: 'snapshot',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: ';',
  60: '<',
  61: '=',
  62: '>',
  63: '?',
  64: '@',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'meta',
  92: 'meta',
  93: 'menu',
  95: 'sleep',
  96: 'num0',
  97: 'num1',
  98: 'num2',
  99: 'num3',
  100: 'num4',
  101: 'num5',
  102: 'num6',
  103: 'num7',
  104: 'num8',
  105: 'num9',
  106: 'num*',
  107: 'num+',
  108: 'numenter',
  109: 'num-',
  110: 'num.',
  111: 'num/',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'f13',
  125: 'f14',
  126: 'f15',
  127: 'f16',
  128: 'f17',
  129: 'f18',
  130: 'f19',
  131: 'f20',
  132: 'f21',
  133: 'f22',
  134: 'f23',
  135: 'f24',
  144: 'numlock',
  145: 'scrolllock',
  160: 'shiftleft',
  161: 'shiftright',
  162: 'ctrlleft',
  163: 'ctrlright',
  164: 'altleft',
  165: 'altright',
  166: 'browserback',
  167: 'browserforward',
  168: 'browserrefresh',
  169: 'browserstop',
  170: 'browsersearch',
  171: 'browserfavorites',
  172: 'browserhome',
  173: 'volumemute',
  174: 'volumedown',
  175: 'volumeup',
  176: 'nexttrack',
  177: 'prevtrack',
  178: 'stop',
  179: 'playpause',
  180: 'launchmail',
  181: 'launchmediaselect',
  182: 'launchapp1',
  183: 'launchapp2',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: '\'',
  223: 'meta',
  224: 'meta',
  226: 'altgr',
  229: 'imeprocess',
  231: 'unicode',
  246: 'attention',
  247: 'crsel',
  248: 'exsel',
  249: 'eraseeof',
  250: 'play',
  251: 'zoom',
  252: 'noname',
  253: 'pa1',
  254: 'clear'
};

exports.findCode = function findCode(key) {
  for (var k in vkeys) {
    if (vkeys.hasOwnProperty(k)) {
      if (key == vkeys[k]) return parseInt(k);
    }
  }
  return null;
};

exports.findAllCodes = function findAllCodes(key) {
  var codes = Object.keys(vkeys).filter(function (k) {
    return key == vkeys[k];
  });
  return codes.map(function (code) {
    return parseInt(code);
  });
};

exports.getKey = function getKey(code) {
  return vkeys[code];
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboardShortcut = __webpack_require__(2);

var _keyboardShortcut2 = _interopRequireDefault(_keyboardShortcut);

var _template = __webpack_require__(9);

var _template2 = _interopRequireDefault(_template);

var _heartbeat = __webpack_require__(1);

var _heartbeat2 = _interopRequireDefault(_heartbeat);

var _LineChart = __webpack_require__(6);

var _LineChart2 = _interopRequireDefault(_LineChart);

var _Hijax = __webpack_require__(8);

var _Hijax2 = _interopRequireDefault(_Hijax);

var _HijackAjax = __webpack_require__(5);

var _HijackAjax2 = _interopRequireDefault(_HijackAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugOverlay = function (_Meister$UiPlugin) {
    _inherits(DebugOverlay, _Meister$UiPlugin);

    function DebugOverlay(config, meister) {
        _classCallCheck(this, DebugOverlay);

        var _this = _possibleConstructorReturn(this, (DebugOverlay.__proto__ || Object.getPrototypeOf(DebugOverlay)).call(this, config, meister));

        _this.isActivated = false;

        (0, _keyboardShortcut2.default)('ctrl m j s', function () {
            if (!_this.isActivated) {
                _this.activate();
                _this.isActivated = true;
            } else {
                _this.deactivate();
                _this.isActivated = false;
            }
        });

        _this.positionEl = null;
        _this.totalTimeEl = null;
        _this.downloadSpeedChart = null;

        _this.averageBandwidth = 0;
        _this.qualitysEls = [];

        _this.hearbeat = new _heartbeat2.default(0.1);
        _this.hearbeat.beat(_this.onBeat.bind(_this));
        _this.hearbeat.mute();

        _this.hijackAjax = new _HijackAjax2.default();

        // this.hijackRequest();
        return _this;
    }

    _createClass(DebugOverlay, [{
        key: 'onBeat',
        value: function onBeat() {
            this.positionEl.innerHTML = this.meister.currentTime;
            this.totalTimeEl.innerHTML = this.meister.duration;
            this.decodedFramesEl.innerHTML = this.meister.playerPlugin.mediaElement.webkitDecodedFrameCount;
            this.droppedFramesEl.innerHTML = this.meister.playerPlugin.mediaElement.webkitDroppedFrameCount;
            this.activeRequestsEl.innerHTML = this.hijackAjax.activeXHRs.length;
            this.bandwidthEl.innerHTML = this.hijackAjax.averageBandwidthText;

            if (this.meister.playerPlugin.mediaElement.buffered.length) {
                this.videoBufferedEl.innerHTML = this.meister.playerPlugin.mediaElement.buffered.start(0) + ' - ' + this.meister.playerPlugin.mediaElement.buffered.end(0);
            }

            // Right panel
            this.downloadSpeedChart.appendValue(this.hijackAjax.averageBandwidth);
            this.downloadSpeedChart.draw();
        }
    }, {
        key: 'activate',
        value: function activate() {
            this.hearbeat.unmute();
            this.wrapperElement.style.display = 'block';
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            this.wrapperElement.style.display = 'none';
            this.hearbeat.mute();
        }
    }, {
        key: 'initializeRightPanel',
        value: function initializeRightPanel() {
            this.downloadSpeedChart = new _LineChart2.default(this.downloadSpeedChartEl, 600);
        }
    }, {
        key: 'setElements',
        value: function setElements() {
            var _this2 = this;

            this.positionEl = document.getElementById('pf-debug-overlay-text-position');
            this.totalTimeEl = document.getElementById('pf-debug-overlay-text-totalTime');
            this.decodedFramesEl = document.getElementById('pf-debug-overlay-text-decoded-frames');
            this.droppedFramesEl = document.getElementById('pf-debug-overlay-text-dropped-frames');
            this.downloadSpeedChartEl = document.getElementById('pf-debug-overlay-download-speed');
            this.activeRequestsEl = document.getElementById('pf-debug-overlay-text-active-requests');
            this.bandwidthEl = document.getElementById('pf-debug-overlay-text-average-bandwidth');
            this.videoBufferedEl = document.getElementById('pf-debug-overlay-text-video-buffered-range');
            this.theadSegmentTableEl = document.getElementById('pf-debug-overlay-segment-header');
            this.segmentTableActiveEl = document.getElementById('pf-debug-overlay-segment-active');
            this.playerStateEl = document.getElementById('pf-debug-overlay-state');
            this.nudgeAmountEl = document.getElementById('pf-debug-overlay-text-nudge-amount');

            this.meister.on('itemBitrates', function (event) {
                _this2.createSegmentInterface(event.bitrates);
            });

            this.meister.on('requestBitrate', function (event) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2.qualitysEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var qualityEl = _step.value;

                        qualityEl.innerHTML = ' ';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this2.qualitysEls[_this2.qualitysEls.length - (event.bitrateIndex + 2)].innerHTML = 'x';
            });

            this.meister.on('playerPlay', function () {
                _this2.playerStateEl.innerHTML = 'Playing';
            });

            this.meister.on('playerPause', function () {
                _this2.playerStateEl.innerHTML = 'Paused';
            });

            this.meister.on('playerSeek', function () {
                _this2.playerStateEl.innerHTML = 'Seeking';
            });

            this.meister.on('playerNudge', function (event) {
                _this2.nudgeAmountEl.parentElement.style.display = 'block';
                _this2.nudgeAmountEl.innerHTML = event.totalNudges;
            });

            this.meister.on('playerAutoSwitchBitrate', function (quality) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this2.qualitysEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var qualityEl = _step2.value;

                        qualityEl.innerHTML = ' ';
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this2.qualitysEls[_this2.qualitysEls.length - (quality.newBitrateIndex + 2)].innerHTML = 'x';
            });

            this.initializeRightPanel();
        }
    }, {
        key: 'createSegmentInterface',
        value: function createSegmentInterface(bitrates) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = bitrates[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var bitrate = _step3.value;

                    var th = document.createElement('th');
                    th.style.color = this.getRandomColor();
                    th.innerHTML = bitrate.bitrate;
                    this.theadSegmentTableEl.appendChild(th);

                    // Creating a cell for each bitrate.
                    var td = document.createElement('td');
                    td.innerHTML = bitrate.bitrate === 0 ? 'x' : ' ';
                    this.segmentTableActiveEl.appendChild(td);
                    this.qualitysEls.push(td);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'getRandomColor',
        value: function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';

            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
        }
    }, {
        key: 'onUiReady',
        value: function onUiReady() {
            var element = document.createElement('div');
            element.classList.add('pf-debug-overlay');
            element.innerHTML = _template2.default;
            this.wrapperElement = element;
            this.meister.defaultWrapper.appendChild(element);

            this.setElements();
        }
    }]);

    return DebugOverlay;
}(Meister.UiPlugin);

Meister.registerPlugin('debugOverlay', DebugOverlay);

exports.default = DebugOverlay;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proxied = window.XMLHttpRequest.prototype.open;
var activeXHRs = [];
var totalMillisecondsDeltaHistory = [];
var totalBytesDeltaHistory = [];
var maximumHistorySize = 32;
var totalMillisecondsDelta = 0;
var totalBytesDelta = 0;
var totalBytesDownloaded = 0;
var averageBandwidth = 0;

function findActiveXHRIndexByURL(url) {
    for (var i = 0; i < activeXHRs.length; i++) {
        if (activeXHRs[i].url === url) {
            return i;
        }
    }
}

function updateProgress(activeXHR, event) {
    if (event.loaded < activeXHR.bytesDownloaded) {
        activeXHR.bytesDownloaded = 0;
    }

    var bytesDelta = event.loaded - activeXHR.bytesDownloaded;
    var millisecondsDelta = Date.now() - activeXHR.timestamp;

    totalMillisecondsDelta += millisecondsDelta;
    totalBytesDelta += bytesDelta;
    totalBytesDownloaded += bytesDelta;

    activeXHR.bytesDownloaded += event.loaded;
    activeXHR.totalSizeInBytes += event.total;
    activeXHR.timestamp = Date.now();
    activeXHR.downloadProgress = activeXHR.bytesDownloaded / activeXHR.totalSizeInBytes;
}

function resetStatistics() {
    if (totalMillisecondsDelta > 0) {
        totalMillisecondsDeltaHistory.push(totalMillisecondsDelta);
        totalMillisecondsDelta = 0;

        if (totalMillisecondsDeltaHistory.length > maximumHistorySize) {
            totalMillisecondsDeltaHistory.shift();
        }
    }

    if (totalBytesDelta > 0) {
        totalBytesDeltaHistory.push(totalBytesDelta);
        totalBytesDelta = 0;

        if (totalBytesDeltaHistory.length > maximumHistorySize) {
            totalBytesDeltaHistory.shift();
        }
    }

    var milliseconds = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = totalMillisecondsDeltaHistory[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            milliseconds += value;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var bytes = 0.0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = totalBytesDeltaHistory[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _value = _step2.value;

            bytes += _value;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var avgBandwidth = null;
    if (milliseconds > 0) {
        avgBandwidth = bytes * 1000 / milliseconds;
    }

    averageBandwidth = averageBandwidth == 0 ? avgBandwidth : (averageBandwidth + avgBandwidth) / 2;

    totalMillisecondsDelta = 0;
    totalBytesDelta = 0;
}

function getBandwidthString(value) {
    if (isNaN(value) || value === 0) {
        return value + '';
    }

    var _bandwidthUnits = ['bits/s', 'kbit/s', 'Mbit/s', 'Gbit/s', 'Tbit/s', 'Pbit/s'];
    var bitsPerSecond = value;
    var e = Math.floor(Math.log(bitsPerSecond) / Math.log(1024));
    var ret = (bitsPerSecond / Math.pow(1024, Math.floor(e))).toString();

    return ret.substr(0, ret.indexOf('.') + 2) + ' ' + _bandwidthUnits[e];
}

window.XMLHttpRequest.prototype.open = function () {
    var _arguments = arguments;


    activeXHRs.push({
        url: arguments[1],
        bytesDownloaded: 0,
        timestamp: 0,
        timeOfRequest: Date.now(),
        timeOfResponse: 0,
        roundTripTime: 0,
        totalSizeInBytes: 0,
        downloadProgress: 0,
        bandwidth: 0
    });

    this.addEventListener('progress', function (event) {
        var activeXHR = activeXHRs[findActiveXHRIndexByURL(_arguments[1])];

        updateProgress(activeXHR, event);
    });

    this.addEventListener('loadstart', function (event) {
        var activeXHR = activeXHRs[findActiveXHRIndexByURL(_arguments[1])];

        activeXHR.timestamp = Date.now();
    });

    this.addEventListener('load', function (event) {
        var activeXHR = activeXHRs[findActiveXHRIndexByURL(_arguments[1])];

        updateProgress(activeXHR, event);
        resetStatistics();

        for (var i = 0; i < activeXHRs.length; i++) {
            if (activeXHRs[i].url == _arguments[1]) {
                activeXHRs.splice(i, 1);
            }
        }
    });

    return proxied.apply(this, [].slice.call(arguments));
};

var HijackAjax = function () {
    function HijackAjax() {
        _classCallCheck(this, HijackAjax);
    }

    _createClass(HijackAjax, [{
        key: 'activeXHRs',
        get: function get() {
            return activeXHRs;
        }
    }, {
        key: 'averageBandwidthText',
        get: function get() {
            return getBandwidthString(averageBandwidth);
        }
    }, {
        key: 'averageBandwidth',
        get: function get() {
            return averageBandwidth;
        }
    }]);

    return HijackAjax;
}();

exports.default = HijackAjax;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineChart = function () {
    function LineChart(canvas, dataPoints) {
        _classCallCheck(this, LineChart);

        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.maxValue = 0;

        this.data = [];

        for (var i = 0; i < dataPoints; i++) {
            this.data[i] = 0;
        }
    }

    _createClass(LineChart, [{
        key: 'draw',
        value: function draw() {
            // Resize the canvas if needed.
            if (this.canvas.clientWidth != this.canvas.width) {
                this.canvas.width = this.canvas.clientWidth;
            }

            // Calculate one over max.
            var oneOverMax = 0;
            if (this.maxValue > 0) {
                oneOverMax = 1 / this.maxValue;
            }

            // Clear the rectangle.
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Make sure we have data.
            if (this.data.length == 0) return;

            var width = this.canvas.width;
            var height = this.canvas.height;

            // Calculate the horizontal step.
            var horizontalDelta = width / (this.data.length - 1);

            // Begin the path.
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.lineWidth = 1;
            this.context.fillStyle = '#FFFFFF';

            // Start at left bottom and stroke to first element.
            this.context.moveTo(0, height);
            this.context.lineTo(0, height - this.data[0] * oneOverMax * height);

            // Define the new max value we will be looking for.
            var newMax = 0;

            for (var i = 0; i < this.data.length; i++) {
                var value = this.data[i];

                if (value > newMax) {
                    newMax = value;
                }

                // Draw a line.
                this.context.lineTo(i * horizontalDelta, height - value * oneOverMax * height);
            }

            // Store the new max value.
            this.maxValue = newMax * 1.1;

            this.context.lineTo(width, height);
            this.context.closePath();
            this.context.fill();
        }
    }, {
        key: 'appendValue',
        value: function appendValue(value) {
            this.data.shift();
            this.data.push(value);
        }
    }]);

    return LineChart;
}();

exports.default = LineChart;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Hijacker(name, condition, callbacks, options) {
    options = options || {};

    if (!name || !condition || !callbacks || (typeof callbacks === 'undefined' ? 'undefined' : _typeof(callbacks)) !== 'object') {
        throw 'Missing or invalid Hijacker proxy initialization options';
    }

    this.name = name;
    this.condition = typeof condition === 'function' ? condition : function (url) {
        return condition === url;
    };

    this.callbacks = {
        beforeSend: [],
        receive: [],
        complete: [],
        progress: []
    };

    var defaultParsers = {
        'text': String,
        'html': function html(_html) {
            return _html;
        },
        'xml': function xml(_xml) {
            return _xml;
        },
        'json': JSON.parse
    };

    // Custom parsers for data types
    var parsers = this.dataParsers = defaultParsers;
    var customParsers = options.dataParsers;

    if (customParsers) {
        for (var parser in customParsers) {
            if (customParsers.hasOwnProperty(parser)) {
                this.dataParsers[parser] = customParsers[parser];
            }
        }
    }

    // Set the callbacks that have been provided
    for (var event in callbacks) {
        if (callbacks.hasOwnProperty(event)) {
            this.callbacks[event].push(callbacks[event]);
        }
    }

    return this;
}

var states = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

// Get a particular response header value by key
// Extracted from jQuery 2.1.1
Hijacker.prototype.getResponseHeader = function (xhr, key) {
    var rHeaders = /^(.*?):[ \t]*([^\r\n]*)$/mg;
    var match;
    var responseHeadersString;

    if ([states.HEADERS_RECEIVED, states.LOADING, states.DONE].indexOf(xhr.readyState) > -1) {

        responseHeadersString = xhr.getAllResponseHeaders();

        if (!this.responseHeaders) {
            this.responseHeaders = {};
            while (match = rHeaders.exec(responseHeadersString)) {
                this.responseHeaders[match[1].toLowerCase()] = match[2];
            }
        }
        match = this.responseHeaders[key.toLowerCase()];
    }
    return match === null ? null : match;
};

// Data parse methods adapted from jQuery 2.1.1
function getResponses(xhr) {
    var responses = {};
    var responseFields = {
        'text': 'responseText',
        'json': 'responseJSON',
        'xml': 'responseXML'
    };

    // What responses are available?
    for (var rType in responseFields) {
        if (xhr.hasOwnProperty(responseFields[rType])) {
            responses[rType] = xhr[responseFields[rType]];
        }
    }

    return responses;
}

// Check which response types have been provided by the server
Hijacker.prototype.getResponseHeaderType = function (xhr) {
    var contentType = this.getResponseHeader(xhr, 'Content-Type') || 'text/html';
    var knownTypes = {
        'html': /html/,
        'json': /json/,
        'script': /(?:java|ecma)script/
    };

    // Check if this is a known data type, and add it to the stack
    for (var type in knownTypes) {
        if (knownTypes.hasOwnProperty(type) && knownTypes[type].test(contentType)) {
            return type;
        }
    }

    return 'text';
};

// Detect the type of response, and convert it to a usable type
Hijacker.prototype.parseResponse = function (xhr) {
    var parsers = this.dataParsers;
    var responseHeaderType = this.getResponseHeaderType(xhr);
    var responses = getResponses(xhr);

    if (responses[responseHeaderType]) {
        // A parsed response has been provided
        return responses[responseHeaderType];
    } else if (parsers[responseHeaderType]) {
        // We can convert this data type using a parser
        return parsers[responseHeaderType](xhr.response || xhr.responseText);
    }

    // TODO: Injecting scripts into DOM?

    // Response as string
    return xhr.responseText;
};

// Handles an XHR event, like beforeSend, receive or complete
Hijacker.prototype.fireEvent = function (event, xhr) {
    var eventCallbacks = this.callbacks[event];

    if (!this.condition(xhr.url, xhr)) {
        return;
    }

    for (var ctr = 0; ctr < eventCallbacks.length; ctr++) {
        if (event === 'complete' || event === 'receive') {
            // Include parsed data
            eventCallbacks[ctr].call(this, this.parseResponse(xhr), xhr);
        } else {
            eventCallbacks[ctr].call(this, xhr);
        }
    }
};

// Adds a listener to the given method queue of the current hijacker
Hijacker.prototype.addListener = function (method, cb) {
    this.callbacks[method].push(cb);
};

// Removes the callback specified, or all callbacks for the method if no callback is given
Hijacker.prototype.removeListener = function (method, cb) {
    var listeners;
    if (!(method in this.callbacks)) {
        throw method + ' listener does not exist!';
    }

    listeners = this.callbacks[method];

    if (cb) {
        var foundAt = listeners.indexOf(cb);
        if (foundAt < 0) {
            throw cb + ' callback does not exist!';
        }
        listeners = listeners.slice(0, foundAt).concat(listeners.slice(foundAt + 1));
    } else {
        listeners = [];
    }

    this.callbacks[method] = listeners;
};

exports.default = Hijacker;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Hijacker = __webpack_require__(7);

var _Hijacker2 = _interopRequireDefault(_Hijacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Proxy destFn, so that beforeFn runs before it, and afterFn runs after it
 *
 * @destFn {Function}:      Target
 * @beforeFn {Function}:    (optional) Runs before destFn
 * @afterFn {Function}:     (optional) Runs after destFn
 */
function proxyFunction(destFn, beforeFn, afterFn) {
    var proxied = function proxied() {
        var result;

        if (typeof destFn !== 'function') {
            throw destFn + ' is not a function, and cannot be proxied!';
        }
        if (typeof beforeFn === 'function') {
            beforeFn.apply(this, arguments);
        }
        result = destFn.apply(this, arguments);
        if (typeof afterFn === 'function') {
            afterFn.apply(this, arguments);
        }

        return result;
    };

    return proxied;
}

// XHR states
var states = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

function Hijax(adapter) {
    this.proxies = {};
    this.adapter = adapter;

    // Active connections
    this.active = 0;

    if (!adapter) {
        this.proxyXHREvents();
    } else {
        adapter.init.call(this);
    }
}

Hijax.prototype.getXHRMethod = function (method) {
    return window.XMLHttpRequest.prototype[method];
};

Hijax.prototype.setXHRMethod = function (method, value) {
    window.XMLHttpRequest.prototype[method] = value;
};

Hijax.prototype.proxyXhrMethod = function (method, before, after) {
    var proxy = proxyFunction(this.getXHRMethod(method), before, after);
    this.setXHRMethod(method, proxy);
};

Hijax.prototype.createProxy = function (name, condition, callbacks, options) {
    var proxy = new _Hijacker2.default(name, condition, callbacks, options);

    this.proxies[name] = proxy;

    return proxy;
};

Hijax.prototype.set = function (name, condition, callbacks, options) {
    // Setter
    return this.createProxy(name, condition, callbacks, options);
};

Hijax.prototype.addListener = function (name, method, callback) {
    // Getter
    if (!(name in this.proxies)) {
        throw name + ' proxy does not exist!';
    }
    this.proxies[name].addListener(method, callback);
};

Hijax.prototype.removeListener = function (name, method, callback) {
    // Getter
    if (!(name in this.proxies)) {
        throw name + ' proxy does not exist!';
    }

    this.proxies[name].removeListener(method, callback);
};

// Dispatch current event to all listeners
Hijax.prototype.dispatch = function (event, xhr, callback) {
    var proxies = this.proxies;
    for (var proxy in proxies) {
        if (proxies.hasOwnProperty(proxy)) {
            proxies[proxy].fireEvent(event, xhr);
        }
    }

    typeof callback === 'function' && callback();
};

// Can be overridden by an adapter
Hijax.prototype.proxyXHREvents = function () {
    var hijax = this;

    hijax.proxyXhrMethod('open', function (method, url) {
        // Store URL
        this.url = url;

        this.rscProxied = false;
        this.onLoadProxied = false;

        hijax.active++;
        hijax.dispatch('beforeSend', this);
    });

    hijax.proxyXhrMethod('send', function () {
        var xhr = this;

        // We can't just depend on the readyState being 4 (complete), as desktop
        // libraries sometimes set readyState to 0 after processing
        // (so receive will fire, complete won't). Instead, we just make sure
        // the data isn't incomplete (states 1, 2, 3)
        function isProcessing(xhr) {
            return xhr.readyState >= 1 && xhr.readyState <= 3;
        }

        function receiveHandler() {
            // In case we're coming through the RSCHandler
            if (isProcessing(xhr)) {
                return;
            }

            hijax.dispatch('receive', xhr);
        }

        function completeHandler() {
            // In case we're coming through the RSCHandler
            if (isProcessing(xhr)) {
                return;
            }

            hijax.dispatch('complete', xhr, function () {
                hijax.active--;
            });
        }

        /*
         * Ways to intercept AJAX responses:
         * 1. During send, proxy the desktop handler for load/RSC
         * 2. If no desktop handler is found, we just fire our handlers. In
         * this case, we lose the capability of proxying the desktop function.
         */
        if (typeof xhr.onload === 'function') {
            // Make original XHR handler available to subscribers
            xhr._originalOnLoadHandler = xhr.onload;
            xhr.onLoadProxied = true;

            xhr.onload = proxyFunction(xhr.onload, receiveHandler, completeHandler);
        } else if (typeof xhr.onreadystatechange === 'function') {
            xhr._originalRSCHandler = xhr.onreadystatechange;
            xhr.rscProxied = true;

            xhr.onreadystatechange = proxyFunction(xhr.onreadystatechange, receiveHandler, completeHandler);
        } else {
            // No handlers found
            if (window.console && console.warn) {
                console.warn('Couldn\'t find desktop handlers. ' + '`complete` might fire before desktop handler.');
            }
            xhr.onload = proxyFunction(completeHandler, receiveHandler);
        }
    });
};

exports.default = Hijax;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = "<div class=\"pf-debug-overlay-section\">\n    <div class=\"pf-debug-overlay-left\">\n        <div class=\"pf-debug-overlay-text\">\n            <div>Total time: <span id=\"pf-debug-overlay-text-totalTime\">0</span></div>\n            <div>Position: <span id=\"pf-debug-overlay-text-position\">0</span></div>\n            <div>State: <span id=\"pf-debug-overlay-state\">Playing</span></div>\n            <br>\n            <div>Decoded video frames: <span id=\"pf-debug-overlay-text-decoded-frames\">0</span></div>\n            <div>Dropped frames: <span id=\"pf-debug-overlay-text-dropped-frames\">11</span></div>\n            <div style=\"display:none\">Nudge count: <span id=\"pf-debug-overlay-text-nudge-amount\">0</span></div>\n            <br>\n            <div>Buffered: <span id=\"pf-debug-overlay-text-video-buffered-range\">0.32 - 23.23</span></div>\n            <div>Average Bandwidth: <span id=\"pf-debug-overlay-text-average-bandwidth\">5 Mbit/s</span></div>\n\n        </div>\n    </div>\n    <div class=\"pf-debug-overlay-right\">\n        <div class=\"pf-debug-overlay-text\">\n            <div>Active requests: <span id=\"pf-debug-overlay-text-active-requests\">0</span></div>\n            <div>&nbsp;</div>\n            <div>Bandwidth Graph: </div>\n            <canvas id=\"pf-debug-overlay-download-speed\"></canvas>\n            <div>Segments: </div>\n            <div id=\"pf-debug-overlay-segments-wrapper\">\n                <table>\n                    <thead>\n                        <tr id=\"pf-debug-overlay-segment-header\">\n\n                        </tr>\n                    </thead>\n                    <tbody id=\"pf-debug-overlay-segment-body\">\n                        <tr id=\"pf-debug-overlay-segment-active\"></tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n";
exports.default = template;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=DebugOverlay.js.map