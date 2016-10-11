(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["GallerySwiper"] = factory(require("react"), require("react-dom"));
	else
		root["GallerySwiper"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactSwipeable = __webpack_require__(4);

	var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

	var _reactLazyload = __webpack_require__(5);

	var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) {
	        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var BASE_CLASS = 'zvui-gallery-swiper';

	var GallerySwiper = function (_Component) {
	    _inherits(GallerySwiper, _Component);

	    function GallerySwiper() {
	        var _ref;

	        var _temp, _this, _ret;

	        _classCallCheck(this, GallerySwiper);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GallerySwiper.__proto__ || Object.getPrototypeOf(GallerySwiper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            currentIndex: 0,
	            thumbsTranslateX: 0,
	            thumbsTranslateY: 0,
	            offsetPercentage: 0,
	            galleryWidth: 0,
	            thumbnailWidth: 0
	        }, _this.componentWillReceiveProps = function (nextProps) {}, _this.componentDidUpdate = function (prevProps, prevState) {}, _this.componentWillMount = function () {
	            _this.setState({
	                currentIndex: _this.props.startIndex
	            });
	        }, _this.componentDidMount = function () {}, _this.componentWillUnMount = function () {}, _this.goTo = function (index, event) {}, _this.whereAmI = function () {}, _this._canNavigate = function () {
	            return _this.props.images.length >= 2;
	        }, _this._canSlideLeft = function () {
	            return _this.props.infinite || _this.state.currentIndex > 0;
	        }, _this._slideLeft = function (event) {
	            _this.goTo(_this.state.currentIndex - 1, event);
	        }, _this._canSlideRight = function () {
	            return _this.props.infinite || _this.state.currentIndex < _this.props.images.length - 1;
	        }, _this._slideRight = function (event) {
	            _this.goTo(_this.state.currentIndex + 1, event);
	        }, _this._handleImageError = function (event) {
	            var defaultImage = _this.props.defaultImage;

	            if (defaultImage && event.target.src.indexOf(defaultImage) === -1) {
	                event.target.src = defaultImage;
	            }
	        }, _this._handleMouseOverThumbnail = function (index, event) {
	            var _this$props = _this.props;
	            var sliderOnThumbnailHover = _this$props.sliderOnThumbnailHover;
	            var thumbnailHoverSlideDelay = _this$props.thumbnailHoverSlideDelay;
	            var onThumbnailHover = _this$props.onThumbnailHover;

	            _this.setState({
	                hovering: true
	            });

	            if (_this._thumbnailTimer) {
	                clearTimeout(_this._thumbnailTimer);
	            }
	            _this._thumbnailTimer = setTimeout(function () {
	                _this.goTo(index);
	            }, thumbnailHoverSlideDelay);

	            if (onThumbnailHover) {
	                onThumbnailHover.call(_this, index, event);
	            }
	        }, _this._handleMouseLeaveThumbnails = function (index, event) {
	            if (_this._thumbnailTimer) {
	                clearTimeout(_this._thumbnailTimer);
	            }

	            _this.setState({
	                hovering: false
	            });
	        }, _this._handleThumbnailClick = function (index, event) {}, _this._renderItem = function (img) {
	            var _this$props2 = _this.props;
	            var _this$props2$onImageE = _this$props2.onImageError;
	            var onImageError = _this$props2$onImageE === undefined ? _this._handleImageError : _this$props2$onImageE;
	            var onImageLoad = _this$props2.onImageLoad;
	            var srcSet = img.srcSet;
	            var sizes = img.sizes;
	            var original = img.original;
	            var _img$originalAlt = img.originalAlt;
	            var originalAlt = _img$originalAlt === undefined ? '' : _img$originalAlt;

	            return _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slide-image' }, _react2.default.createElement('img', {
	                src: original,
	                alt: originalAlt,
	                srcSet: srcSet,
	                size: sizes,
	                onLoad: onImageLoad,
	                onError: onImageError
	            }));
	        }, _this._renderThumb = function (img, index) {
	            var _img$thumbnail = img.thumbnail;
	            var thumbnail = _img$thumbnail === undefined ? '' : _img$thumbnail;
	            var _img$thumbnailAlt = img.thumbnailAlt;
	            var thumbnailAlt = _img$thumbnailAlt === undefined ? '' : _img$thumbnailAlt;

	            return _react2.default.createElement('img', null);
	        }, _this.render = function () {
	            var currentIndex = _this.state.currentIndex;
	            var _this$props3 = _this.props;
	            var images = _this$props3.images;
	            var showThumbnails = _this$props3.showThumbnails;
	            var showNav = _this$props3.showNav;
	            var disableSwipe = _this$props3.disableSwipe;
	            var infinite = _this$props3.infinite;
	            var _onClick = _this$props3.onClick;
	            var customRenderItem = _this$props3.renderItem;
	            var customRenderThumb = _this$props3.renderThumb;

	            var slides = [];
	            var thumbnails = [];
	            var bullets = [];

	            images.forEach(function (img, index) {
	                var _img$originalClass = img.originalClass;
	                var originalClass = _img$originalClass === undefined ? '' : _img$originalClass;
	                var _img$thumbnailClass = img.thumbnailClass;
	                var thumbnailClass = _img$thumbnailClass === undefined ? '' : _img$thumbnailClass;
	                var _img$renderItem = img.renderItem;
	                var ImgRenderItem = _img$renderItem === undefined ? null : _img$renderItem;
	                var _img$renderItem2 = img.renderItem;
	                var ImgRenderThumb = _img$renderItem2 === undefined ? null : _img$renderItem2;

	                var renderItem = ImgRenderItem || customRenderItem || _this._renderItem;
	                var renderThumb = ImgRenderThumb || customRenderThumb || _this._renderThumb;

	                var slide = _react2.default.createElement('div', {
	                    key: index,
	                    className: (0, _classnames2.default)(BASE_CLASS + '-slide', originalClass, {
	                        left: index === currentIndex - 1 || images.length >= 3 && infinite && index === images.length - 1 && currentIndex === 0, // set first slide as right slide if were sliding right from last slide
	                        center: index === currentIndex,
	                        right: index === currentIndex + 1 || images.length >= 3 && infinite && index === 0 && currentIndex === images.length - 1 }),
	                    onClick: function onClick(event) {
	                        return _onClick.call(_this, index, event);
	                    }
	                }, renderItem(img));

	                slides.push(slide);

	                if (showThumbnails) {
	                    var thumbnail = _react2.default.createElement('a', {
	                        onMouseOver: function onMouseOver(event) {
	                            return _this._handleMouseOverThumbnail.call(_this, index, event);
	                        },
	                        onMouseLeave: function onMouseLeave(event) {
	                            return _this._handleMouseLeaveThumbnail.call(_this, index, event);
	                        },
	                        key: index,
	                        className: (0, _classnames2.default)(BASE_CLASS + '-thumbnail', thumbnailClass, {
	                            active: currentIndex === index
	                        }),
	                        onTouchStart: function onTouchStart(event) {
	                            return _this._handleThumbnailClick.call(_this, index, event);
	                        },
	                        onClick: function onClick(event) {
	                            return _this._handleThumbnailClick.call(_this, index, event);
	                        }
	                    }, 'renderThumb(img)');
	                    thumbnails.push(thumbnail);
	                }
	            });

	            return _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS) }, _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-content') }, _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-wrapper') }, 'Hello World!!', _this._canNavigate() ? [showNav && _react2.default.createElement('div', {
	                className: BASE_CLASS + '-navigation',
	                key: 'navigation' }, _react2.default.createElement('button', {
	                className: BASE_CLASS + '-navigation-left',
	                disabled: _this._canSlideLeft(),
	                onTouchStart: _this._slideLeft,
	                onClick: _this._slideLeft
	            }), _react2.default.createElement('button', {
	                className: BASE_CLASS + '-navigation-right',
	                disabled: _this._canSlideRight(),
	                onTouchStart: _this._slideRight,
	                onClick: _this._slideRight
	            })), disableSwipe ? _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slides',
	                key: 'slides' }, slides) : _react2.default.createElement(_reactSwipeable2.default, {
	                className: BASE_CLASS + '-swipe',
	                key: 'swipeable'
	            }, _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slides' }, slides))] : _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slides' }, slides)), showThumbnails && _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-thumbnails') }, thumbnails)));
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    return GallerySwiper;
	}(_react.Component);

	GallerySwiper.propTypes = {
	    images: _react.PropTypes.array.isRequired,
	    showNav: _react.PropTypes.bool,
	    lazyLoad: _react.PropTypes.bool,
	    infinite: _react.PropTypes.bool,
	    showIndex: _react.PropTypes.bool,
	    showBullets: _react.PropTypes.bool,
	    showThumbnails: _react.PropTypes.bool,
	    slideOnThumbnailsHover: _react.PropTypes.bool,
	    disableThumbnailScroll: _react.PropTypes.bool,
	    disableArrowKeys: _react.PropTypes.bool,
	    disableSwipe: _react.PropTypes.bool,
	    defaultImage: _react.PropTypes.string,
	    indexSeperate: _react.PropTypes.string,
	    startIndex: _react.PropTypes.number,
	    slideInterval: _react.PropTypes.number,
	    onSlide: _react.PropTypes.func,
	    onThumbnailHover: _react.PropTypes.func,
	    onThumbnailClick: _react.PropTypes.func,
	    onArrowClick: _react.PropTypes.func,
	    onImageLoad: _react.PropTypes.func,
	    onThumbnailError: _react.PropTypes.func,
	    renderItem: _react.PropTypes.func,
	    renderThumb: _react.PropTypes.func
	};

	GallerySwiper.defaultProps = {
	    images: [],
	    showNav: true,
	    lazyLoad: false,
	    infinite: true,
	    showIndex: false,
	    showBullets: false,
	    showThumbnails: true,
	    slideOnThumbnailsHover: false,
	    disableThumbnailScroll: false,
	    disableArrowKeys: false,
	    disableSwipe: false,
	    indexSeperate: ' : ',
	    startIndex: 0,
	    slideInterval: 3000,
	    thumbnailPosition: 'X',
	    thumbnailHoverSlideDelay: 300
	};

	exports.default = GallerySwiper;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	var Swipeable = React.createClass({
	  displayName: 'Swipeable',

	  propTypes: {
	    onSwiped: React.PropTypes.func,
	    onSwiping: React.PropTypes.func,
	    onSwipingUp: React.PropTypes.func,
	    onSwipingRight: React.PropTypes.func,
	    onSwipingDown: React.PropTypes.func,
	    onSwipingLeft: React.PropTypes.func,
	    onSwipedUp: React.PropTypes.func,
	    onSwipedRight: React.PropTypes.func,
	    onSwipedDown: React.PropTypes.func,
	    onSwipedLeft: React.PropTypes.func,
	    flickThreshold: React.PropTypes.number,
	    delta: React.PropTypes.number,
	    preventDefaultTouchmoveEvent: React.PropTypes.bool,
	    stopPropagation: React.PropTypes.bool,
	    nodeName: React.PropTypes.string
	  },

	  getInitialState: function getInitialState() {
	    return {
	      x: null,
	      y: null,
	      swiping: false,
	      start: 0
	    };
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      flickThreshold: 0.6,
	      delta: 10,
	      preventDefaultTouchmoveEvent: true,
	      stopPropagation: false,
	      nodeName: 'div'
	    };
	  },

	  calculatePos: function calculatePos(e) {
	    var x = e.changedTouches[0].clientX;
	    var y = e.changedTouches[0].clientY;

	    var xd = this.state.x - x;
	    var yd = this.state.y - y;

	    var axd = Math.abs(xd);
	    var ayd = Math.abs(yd);

	    var time = Date.now() - this.state.start;
	    var velocity = Math.sqrt(axd * axd + ayd * ayd) / time;

	    return {
	      deltaX: xd,
	      deltaY: yd,
	      absX: axd,
	      absY: ayd,
	      velocity: velocity
	    };
	  },

	  touchStart: function touchStart(e) {
	    if (e.touches.length > 1) {
	      return;
	    }

	    if (this.props.stopPropagation) e.stopPropagation();

	    this.setState({
	      start: Date.now(),
	      x: e.touches[0].clientX,
	      y: e.touches[0].clientY,
	      swiping: false
	    });
	  },

	  touchMove: function touchMove(e) {
	    if (!this.state.x || !this.state.y || e.touches.length > 1) {
	      return;
	    }

	    var cancelPageSwipe = false;
	    var pos = this.calculatePos(e);

	    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
	      return;
	    }

	    if (this.props.stopPropagation) e.stopPropagation();

	    if (this.props.onSwiping) {
	      this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
	    }

	    if (pos.absX > pos.absY) {
	      if (pos.deltaX > 0) {
	        if (this.props.onSwipingLeft || this.props.onSwipedLeft) {
	          this.props.onSwipingLeft && this.props.onSwipingLeft(e, pos.absX);
	          cancelPageSwipe = true;
	        }
	      } else {
	        if (this.props.onSwipingRight || this.props.onSwipedRight) {
	          this.props.onSwipingRight && this.props.onSwipingRight(e, pos.absX);
	          cancelPageSwipe = true;
	        }
	      }
	    } else {
	      if (pos.deltaY > 0) {
	        if (this.props.onSwipingUp || this.props.onSwipedUp) {
	          this.props.onSwipingUp && this.props.onSwipingUp(e, pos.absY);
	          cancelPageSwipe = true;
	        }
	      } else {
	        if (this.props.onSwipingDown || this.props.onSwipedDown) {
	          this.props.onSwipingDown && this.props.onSwipingDown(e, pos.absY);
	          cancelPageSwipe = true;
	        }
	      }
	    }

	    this.setState({ swiping: true });

	    if (cancelPageSwipe && this.props.preventDefaultTouchmoveEvent) {
	      e.preventDefault();
	    }
	  },

	  touchEnd: function touchEnd(e) {
	    if (this.state.swiping) {
	      var pos = this.calculatePos(e);

	      if (this.props.stopPropagation) e.stopPropagation();

	      var isFlick = pos.velocity > this.props.flickThreshold;

	      this.props.onSwiped && this.props.onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);

	      if (pos.absX > pos.absY) {
	        if (pos.deltaX > 0) {
	          this.props.onSwipedLeft && this.props.onSwipedLeft(e, pos.deltaX, isFlick);
	        } else {
	          this.props.onSwipedRight && this.props.onSwipedRight(e, pos.deltaX, isFlick);
	        }
	      } else {
	        if (pos.deltaY > 0) {
	          this.props.onSwipedUp && this.props.onSwipedUp(e, pos.deltaY, isFlick);
	        } else {
	          this.props.onSwipedDown && this.props.onSwipedDown(e, pos.deltaY, isFlick);
	        }
	      }
	    }

	    this.setState(this.getInitialState());
	  },

	  render: function render() {
	    var newProps = _extends({}, this.props, {
	      onTouchStart: this.touchStart,
	      onTouchMove: this.touchMove,
	      onTouchEnd: this.touchEnd
	    });

	    delete newProps.onSwiped;
	    delete newProps.onSwiping;
	    delete newProps.onSwipingUp;
	    delete newProps.onSwipingRight;
	    delete newProps.onSwipingDown;
	    delete newProps.onSwipingLeft;
	    delete newProps.onSwipedUp;
	    delete newProps.onSwipedRight;
	    delete newProps.onSwipedDown;
	    delete newProps.onSwipedLeft;
	    delete newProps.flickThreshold;
	    delete newProps.delta;
	    delete newProps.preventDefaultTouchmoveEvent;
	    delete newProps.stopPropagation;
	    delete newProps.nodeName;
	    delete newProps.children;

	    return React.createElement(this.props.nodeName, newProps, this.props.children);
	  }
	});

	module.exports = Swipeable;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.forceCheck = exports.lazyload = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(7);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _event = __webpack_require__(8);

	var _scrollParent = __webpack_require__(9);

	var _scrollParent2 = _interopRequireDefault(_scrollParent);

	var _debounce = __webpack_require__(10);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _throttle = __webpack_require__(11);

	var _throttle2 = _interopRequireDefault(_throttle);

	var _decorator = __webpack_require__(12);

	var _decorator2 = _interopRequireDefault(_decorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * react-lazyload
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var LISTEN_FLAG = 'data-lazyload-listened';
	var listeners = [];
	var pending = [];

	/**
	 * Check if `component` is visible in overflow container `parent`
	 * @param  {node} component React component
	 * @param  {node} parent    component's scroll parent
	 * @return {bool}
	 */
	var checkOverflowVisible = function checkOverflowVisible(component, parent) {
	  var node = _reactDom2.default.findDOMNode(component);

	  var _parent$getBoundingCl = parent.getBoundingClientRect();

	  var parentTop = _parent$getBoundingCl.top;
	  var parentHeight = _parent$getBoundingCl.height;

	  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

	  // calculate top and height of the intersection of the element's scrollParent and viewport
	  var intersectionTop = Math.max(parentTop, 0); // intersection's top relative to viewport
	  var intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height

	  // check whether the element is visible in the intersection

	  var _node$getBoundingClie = node.getBoundingClientRect();

	  var top = _node$getBoundingClie.top;
	  var height = _node$getBoundingClie.height;

	  var offsetTop = top - intersectionTop; // element's top relative to intersection

	  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API

	  return offsetTop - offsets[0] <= intersectionHeight && offsetTop + height + offsets[1] >= 0;
	};

	/**
	 * Check if `component` is visible in document
	 * @param  {node} component React component
	 * @return {bool}
	 */
	var checkNormalVisible = function checkNormalVisible(component) {
	  var node = _reactDom2.default.findDOMNode(component);

	  var _node$getBoundingClie2 = node.getBoundingClientRect();

	  var top = _node$getBoundingClie2.top;
	  var elementHeight = _node$getBoundingClie2.height;


	  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

	  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API

	  return top - offsets[0] <= windowInnerHeight && top + elementHeight + offsets[1] >= 0;
	};

	/**
	 * Detect if element is visible in viewport, if so, set `visible` state to true.
	 * If `once` prop is provided true, remove component as listener after checkVisible
	 *
	 * @param  {React} component   React component that respond to scroll and resize
	 */
	var checkVisible = function checkVisible(component) {
	  var node = _reactDom2.default.findDOMNode(component);
	  if (!node) {
	    return;
	  }

	  var parent = (0, _scrollParent2.default)(node);
	  var isOverflow = parent !== node.ownerDocument && parent !== document && parent !== document.documentElement;

	  var visible = isOverflow ? checkOverflowVisible(component, parent) : checkNormalVisible(component);

	  if (visible) {
	    // Avoid extra render if previously is visible, yeah I mean `render` call,
	    // not actual DOM render
	    if (!component.visible) {
	      if (component.props.once) {
	        pending.push(component);
	      }

	      component.visible = true;
	      component.forceUpdate();
	    }
	  } else if (!(component.props.once && component.visible)) {
	    component.visible = false;
	  }
	};

	var purgePending = function purgePending() {
	  pending.forEach(function (component) {
	    var index = listeners.indexOf(component);
	    if (index !== -1) {
	      listeners.splice(index, 1);
	    }
	  });

	  pending = [];
	};

	var lazyLoadHandler = function lazyLoadHandler() {
	  for (var i = 0; i < listeners.length; ++i) {
	    var listener = listeners[i];
	    checkVisible(listener);
	  }

	  // Remove `once` component in listeners
	  purgePending();
	};

	// Depending on component's props
	var delayType = void 0;
	var finalLazyLoadHandler = null;

	var LazyLoad = function (_Component) {
	  _inherits(LazyLoad, _Component);

	  function LazyLoad(props) {
	    _classCallCheck(this, LazyLoad);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LazyLoad).call(this, props));

	    _this.visible = false;

	    return _this;
	  }

	  _createClass(LazyLoad, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (typeof process !== 'undefined' && ("production") !== 'production') {
	        if (_react2.default.Children.count(this.props.children) > 1) {
	          console.warn('[react-lazyload] Only one child is allowed to be passed to `LazyLoad`.');
	        }

	        if (this.props.wheel) {
	          // eslint-disable-line
	          console.warn('[react-lazyload] Props `wheel` is not supported anymore, try set `overflow` for lazy loading in overflow containers.');
	        }

	        // Warn the user if placeholder and height is not specified and the rendered height is 0
	        if (!this.props.placeholder && this.props.height === undefined && _reactDom2.default.findDOMNode(this).offsetHeight === 0) {
	          console.warn('[react-lazyload] Please add `height` props to <LazyLoad> for better performance.');
	        }
	      }

	      // It's unlikely to change delay type on the fly, this is mainly
	      // designed for tests
	      var needResetFinalLazyLoadHandler = false;
	      if (this.props.debounce !== undefined && delayType === 'throttle') {
	        console.warn('[react-lazyload] Previous delay function is `throttle`, now switching to `debounce`, try setting them unanimously');
	        needResetFinalLazyLoadHandler = true;
	      } else if (delayType === 'debounce' && this.props.debounce === undefined) {
	        console.warn('[react-lazyload] Previous delay function is `debounce`, now switching to `throttle`, try setting them unanimously');
	        needResetFinalLazyLoadHandler = true;
	      }

	      if (needResetFinalLazyLoadHandler) {
	        (0, _event.off)(window, 'scroll', finalLazyLoadHandler);
	        (0, _event.off)(window, 'resize', finalLazyLoadHandler);
	        finalLazyLoadHandler = null;
	      }

	      if (!finalLazyLoadHandler) {
	        if (this.props.debounce !== undefined) {
	          finalLazyLoadHandler = (0, _debounce2.default)(lazyLoadHandler, typeof this.props.debounce === 'number' ? this.props.debounce : 300);
	          delayType = 'debounce';
	        } else {
	          finalLazyLoadHandler = (0, _throttle2.default)(lazyLoadHandler, typeof this.props.throttle === 'number' ? this.props.throttle : 300);
	          delayType = 'throttle';
	        }
	      }

	      if (this.props.overflow) {
	        var parent = (0, _scrollParent2.default)(_reactDom2.default.findDOMNode(this));
	        if (parent) {
	          var listenerCount = 1 + +parent.getAttribute(LISTEN_FLAG);
	          if (listenerCount === 1) {
	            parent.addEventListener('scroll', finalLazyLoadHandler);
	          }
	          parent.setAttribute(LISTEN_FLAG, listenerCount);
	        }
	      } else if (listeners.length === 0 || needResetFinalLazyLoadHandler) {
	        var _props = this.props;
	        var scroll = _props.scroll;
	        var resize = _props.resize;


	        if (scroll) {
	          (0, _event.on)(window, 'scroll', finalLazyLoadHandler);
	        }

	        if (resize) {
	          (0, _event.on)(window, 'resize', finalLazyLoadHandler);
	        }
	      }

	      listeners.push(this);
	      checkVisible(this);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return this.visible;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.props.overflow) {
	        var parent = (0, _scrollParent2.default)(_reactDom2.default.findDOMNode(this));
	        if (parent) {
	          var listenerCount = +parent.getAttribute(LISTEN_FLAG) - 1;
	          if (listenerCount === 0) {
	            parent.removeEventListener('scroll', finalLazyLoadHandler);
	            parent.removeAttribute(LISTEN_FLAG);
	          } else {
	            parent.setAttribute(LISTEN_FLAG, listenerCount);
	          }
	        }
	      }

	      var index = listeners.indexOf(this);
	      if (index !== -1) {
	        listeners.splice(index, 1);
	      }

	      if (listeners.length === 0) {
	        (0, _event.off)(window, 'resize', finalLazyLoadHandler);
	        (0, _event.off)(window, 'scroll', finalLazyLoadHandler);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.visible ? this.props.children : this.props.placeholder ? this.props.placeholder : _react2.default.createElement('div', { style: { height: this.props.height }, className: 'lazyload-placeholder' });
	    }
	  }]);

	  return LazyLoad;
	}(_react.Component);

	LazyLoad.propTypes = {
	  once: _react.PropTypes.bool,
	  height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	  offset: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
	  overflow: _react.PropTypes.bool,
	  resize: _react.PropTypes.bool,
	  scroll: _react.PropTypes.bool,
	  children: _react.PropTypes.node,
	  throttle: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.bool]),
	  debounce: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.bool]),
	  placeholder: _react.PropTypes.node
	};

	LazyLoad.defaultProps = {
	  once: false,
	  offset: 0,
	  overflow: false,
	  resize: false,
	  scroll: true
	};

	var lazyload = exports.lazyload = _decorator2.default;
	exports.default = LazyLoad;
	exports.forceCheck = lazyLoadHandler;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.on = on;
	exports.off = off;
	function on(el, eventName, callback) {
	  if (el.addEventListener) {
	    el.addEventListener(eventName, callback, false);
	  } else if (el.attachEvent) {
	    el.attachEvent("on" + eventName, function (e) {
	      callback.call(el, e || window.event);
	    });
	  }
	}

	function off(el, eventName, callback) {
	  if (el.removeEventListener) {
	    el.removeEventListener(eventName, callback);
	  } else if (el.detachEvent) {
	    el.detachEvent("on" + eventName, callback);
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @fileOverview Find scroll parent
	 */

	exports.default = function (node) {
	  if (!node) {
	    return document;
	  }

	  var excludeStaticParent = node.style.position === 'absolute';
	  var overflowRegex = /(scroll|auto)/;
	  var parent = node;

	  while (parent) {
	    if (!parent.parentNode) {
	      return node.ownerDocument || document;
	    }

	    var style = window.getComputedStyle(parent);
	    var position = style.position;
	    var overflow = style.overflow;
	    var overflowX = style['overflow-x'];
	    var overflowY = style['overflow-y'];

	    if (position === 'static' && excludeStaticParent) {
	      continue;
	    }

	    if (overflowRegex.test(overflow + overflowX + overflowY)) {
	      return parent;
	    }

	    parent = parent.parentNode;
	  }

	  return node.ownerDocument || node.documentElement || document;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = debounce;
	function debounce(func, wait, immediate) {
	  var timeout = void 0;
	  var args = void 0;
	  var context = void 0;
	  var timestamp = void 0;
	  var result = void 0;

	  var later = function later() {
	    var last = +new Date() - timestamp;

	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) {
	          context = args = null;
	        }
	      }
	    }
	  };

	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = +new Date();

	    var callNow = immediate && !timeout;
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }

	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = throttle;
	/*eslint-disable */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last, deferTimer;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(5);

	var _index2 = _interopRequireDefault(_index);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getDisplayName = function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	};

	exports.default = function () {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  return function lazyload(WrappedComponent) {
	    return function (_Component) {
	      _inherits(LazyLoadDecorated, _Component);

	      function LazyLoadDecorated() {
	        _classCallCheck(this, LazyLoadDecorated);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LazyLoadDecorated).call(this));

	        _this.displayName = 'LazyLoad' + getDisplayName(WrappedComponent);
	        return _this;
	      }

	      _createClass(LazyLoadDecorated, [{
	        key: 'render',
	        value: function render() {
	          return _react2.default.createElement(
	            _index2.default,
	            options,
	            _react2.default.createElement(WrappedComponent, this.props)
	          );
	        }
	      }]);

	      return LazyLoadDecorated;
	    }(_react.Component);
	  };
	};

/***/ }
/******/ ])
});
;