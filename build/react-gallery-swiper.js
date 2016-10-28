(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["GallerySwiper"] = factory(require("react"), require("react-dom"));
	else
		root["GallerySwiper"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var _reactSwipeable = __webpack_require__(3);

	var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

	var _reactLazyload = __webpack_require__(4);

	var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _addEventListener = __webpack_require__(13);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _removeEventListener = __webpack_require__(14);

	var _removeEventListener2 = _interopRequireDefault(_removeEventListener);

	var _debounceEventHandler = __webpack_require__(15);

	var _debounceEventHandler2 = _interopRequireDefault(_debounceEventHandler);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _defineProperty(obj, key, value) {
	    if (key in obj) {
	        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	    } else {
	        obj[key] = value;
	    }return obj;
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
	} /*eslint-disable no-unused-vars*/

	/*eslint-enable no-unused-vars*/

	var BASE_CLASS = 'zvui-gallery-swiper';
	var LEFT_ARROW = 37;
	var RIGHT_ARROW = 39;
	var DEBOUNCE_INTERVAL = 500;

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
	            galleryHeight: 0,
	            thumbnailWidth: 0,
	            thumbnailHeight: 0,
	            events: {}
	        }, _this.componentWillReceiveProps = function (nextProps) {
	            var disableArrowKeys = _this.props.disableArrowKeys;
	            var newDisableArrowKeys = nextProps.disableArrowKeys;

	            if (disableArrowKeys !== newDisableArrowKeys) {
	                if (newDisableArrowKeys) {
	                    var handleKeyDown = _this.state.events.handleKeyDown;

	                    if (handleKeyDown) {
	                        (0, _removeEventListener2.default)(handleKeyDown);
	                    }
	                } else {
	                    _this.setState({
	                        events: {
	                            handleKeyDown: (0, _addEventListener2.default)(window, 'keydown', _this._handleKeyDown, _this)
	                        }
	                    });
	                }
	            }
	        }, _this.componentDidUpdate = function (prevProps, prevState) {
	            var showThumbnails = prevProps.showThumbnails;
	            var thumbnailWidth = prevState.thumbnailWidth;
	            var thumbnailHeight = prevState.thumbnailHeight;
	            var currentIndex = prevState.currentIndex;
	            var _this$state = _this.state;
	            var stateThumbnailWidth = _this$state.thumbnailWidth;
	            var stateThumbnailHeight = _this$state.thumbnailHeight;
	            var stateCurrentIndex = _this$state.currentIndex;
	            var _this$props = _this.props;
	            var propsShowthumbnailWidth = _this$props.showThumbnails;
	            var onSlide = _this$props.onSlide;

	            if (thumbnailWidth !== stateThumbnailWidth || thumbnailHeight !== stateThumbnailHeight || showThumbnails !== propsShowthumbnailWidth) {
	                // Change thumbnail width container when thumbnail width id adjusted
	                _this._setThumbsTranslate(-_this._getThumbsTranslate((stateCurrentIndex > 0 ? 1 : 0) * stateCurrentIndex));
	            }

	            if (currentIndex !== stateCurrentIndex) {
	                if (onSlide && typeof onSlide === 'function') {
	                    onSlide(stateCurrentIndex);
	                }

	                _this._updateThumbnailTranslate(prevState);
	            }
	        }, _this.componentWillMount = function () {
	            var startIndex = _this.props.startIndex;

	            _this.setState({
	                currentIndex: startIndex
	            });

	            _this._slideLeft = (0, _debounceEventHandler2.default)(_this._slideLeft, DEBOUNCE_INTERVAL, true);
	            _this._slideRight = (0, _debounceEventHandler2.default)(_this._slideRight, DEBOUNCE_INTERVAL, true);
	        }, _this.componentDidMount = function () {
	            // delay the event handler to make sure we get the correct image offset width and height
	            _this._handleResize();

	            var disableArrowKeys = _this.props.disableArrowKeys;

	            if (!disableArrowKeys) {
	                _this.setState({
	                    events: Object.assign({}, _this.state.events, {
	                        handleKeyDown: (0, _addEventListener2.default)(window, 'keydown', _this._handleKeyDown, _this)
	                    })
	                }, function () {
	                    _this.setState({
	                        events: Object.assign({}, _this.state.events, {
	                            handleResize: (0, _addEventListener2.default)(window, 'resize', _this._handleResize, _this)
	                        })
	                    });
	                });
	            }
	        }, _this.componentWillUnMount = function () {
	            var disableArrowKeys = _this.props.disableArrowKeys;
	            var _this$state$events = _this.state.events;
	            var handleKeyDown = _this$state$events.handleKeyDown;
	            var handleResize = _this$state$events.handleResize;

	            if (!disableArrowKeys) {
	                (0, _removeEventListener2.default)(handleKeyDown);
	            }

	            (0, _removeEventListener2.default)(handleResize);
	        }, _this.goTo = function (index, event) {
	            if (event) {
	                event.preventDefault();
	            }

	            var images = _this.props.images;
	            var previousIndex = _this.state.currentIndex;

	            var lastImage = images.length - 1;
	            var currentIndex = index;

	            if (index < 0) {
	                currentIndex = lastImage;
	            } else if (index > lastImage) {
	                currentIndex = 0;
	            }

	            _this.setState({
	                previousIndex: previousIndex,
	                currentIndex: currentIndex,
	                offsetPercentage: 0,
	                style: {
	                    transition: 'transform .3s ease-out'
	                }
	            });
	        }, _this.whereAmI = function () {
	            return _this.state.currentIndex;
	        }, _this._setThumbsTranslate = function (thumbsTranslate) {
	            var thumbnailPosition = _this.props.thumbnailPosition;

	            if (thumbnailPosition === 'Y') {
	                _this.setState({
	                    thumbsTranslateY: thumbsTranslate
	                });
	            } else {
	                _this.setState({
	                    thumbsTranslateX: thumbsTranslate
	                });
	            }
	        }, _this._getThumbsTranslate = function (indexDifference) {
	            var _this$props2 = _this.props;
	            var disableThumbnailScroll = _this$props2.disableThumbnailScroll;
	            var thumbnailPosition = _this$props2.thumbnailPosition;

	            if (disableThumbnailScroll) {
	                return 0;
	            }

	            var _this$state2 = _this.state;
	            var thumbnailWidth = _this$state2.thumbnailWidth;
	            var thumbnailHeight = _this$state2.thumbnailHeight;

	            if (_this._thumbnails) {
	                var totalThumbnails = _this._thumbnails.children.length;

	                if (thumbnailPosition === 'Y') {
	                    if (_this._thumbnails.scrollHeight <= thumbnailHeight) {
	                        return 0;
	                    }

	                    // total scroll-y required to see the last thumbnail
	                    var totalScrollY = _this._thumbnails.scrollHeight - thumbnailHeight;

	                    // scroll-y required per index change
	                    var perIndexScrollY = totalScrollY / (totalThumbnails - 1);

	                    return indexDifference * perIndexScrollY;
	                } else {
	                    if (_this._thumbnails.scrollWidth <= thumbnailWidth) {
	                        return 0;
	                    }

	                    // total scroll-x required to see the last thumbnail
	                    var totalScrollX = _this._thumbnails.scrollWidth - thumbnailWidth;

	                    // scroll-x required per index change
	                    var perIndexScrollX = totalScrollX / (totalThumbnails - 1);

	                    return indexDifference * perIndexScrollX;
	                }
	            }
	        }, _this._updateThumbnailTranslate = function (prevState) {
	            var _this$state3 = _this.state;
	            var stateCurrentIndex = _this$state3.currentIndex;
	            var thumbsTranslateX = _this$state3.thumbsTranslateX;
	            var thumbsTranslateY = _this$state3.thumbsTranslateY;
	            var currentIndex = prevState.currentIndex;
	            var thumbnailPosition = _this.props.thumbnailPosition;

	            if (stateCurrentIndex === 0) {
	                _this._setThumbsTranslate(0);
	            } else {
	                var indexDifference = Math.abs(currentIndex - stateCurrentIndex);

	                if (thumbnailPosition === 'Y') {
	                    var scrollY = _this._getThumbsTranslate(indexDifference);
	                    if (scrollY > 0) {
	                        if (currentIndex < stateCurrentIndex) {
	                            _this._setThumbsTranslate(thumbsTranslateY - scrollY);
	                        } else if (currentIndex > stateCurrentIndex) {
	                            _this._setThumbsTranslate(thumbsTranslateY + scrollY);
	                        }
	                    }
	                } else {
	                    var scrollX = _this._getThumbsTranslate(indexDifference);
	                    if (scrollX > 0) {
	                        if (currentIndex < stateCurrentIndex) {
	                            _this._setThumbsTranslate(thumbsTranslateX - scrollX);
	                        } else if (currentIndex > stateCurrentIndex) {
	                            _this._setThumbsTranslate(thumbsTranslateX + scrollX);
	                        }
	                    }
	                }
	            }
	        }, _this._canNavigate = function () {
	            return _this.props.images.length >= 2;
	        }, _this._canSlideLeft = function () {
	            return _this.props.infinite || _this.state.currentIndex > 0;
	        }, _this._slideLeft = function (event) {
	            var onArrowClick = _this.props.onArrowClick;

	            if (onArrowClick && typeof onArrowClick === 'function') {
	                onArrowClick.call(_this, 'left', _this.state.currentIndex - 1, event);
	            }

	            _this.goTo(_this.state.currentIndex - 1, event);
	        }, _this._canSlideRight = function () {
	            return _this.props.infinite || _this.state.currentIndex < _this.props.images.length - 1;
	        }, _this._slideRight = function (event) {
	            var onArrowClick = _this.props.onArrowClick;

	            if (onArrowClick && typeof onArrowClick === 'function') {
	                onArrowClick.call(_this, 'right', _this.state.currentIndex + 1, event);
	            }

	            _this.goTo(_this.state.currentIndex + 1, event);
	        }, _this._handleResize = function () {
	            clearTimeout(_this.handleResizeTimer);
	            _this.handleResizeTimer = setTimeout(function () {
	                if (_this._gallerySwiper) {
	                    _this.setState({
	                        galleryWidth: _this._gallerySwiper.offsetWidth,
	                        galleryHeight: _this._gallerySwiper.offsetHeight
	                    });
	                }

	                if (_this._gallerySwiperThumbnail) {
	                    _this.setState({
	                        thumbnailWidth: _this._gallerySwiper.offsetWidth,
	                        thumbnailHeight: _this._gallerySwiper.offsetHeight
	                    });
	                }
	            }, 500);
	        }, _this._handleKeyDown = function (event) {
	            var _keyfnMap;

	            var key = parseInt(event.keyCode || event.which || 0);

	            var keyfnMap = (_keyfnMap = {}, _defineProperty(_keyfnMap, LEFT_ARROW, function () {
	                if (_this._canSlideLeft()) {
	                    _this._slideLeft();
	                }
	            }), _defineProperty(_keyfnMap, RIGHT_ARROW, function () {
	                if (_this._canSlideRight()) {
	                    _this._slideRight();
	                }
	            }), _keyfnMap);

	            var fn = keyfnMap[key.toString()];

	            if (fn && typeof fn === 'function') {
	                fn();
	            };
	        }, _this._handleImageError = function (event) {
	            var defaultImage = _this.props.defaultImage;

	            if (defaultImage && event.target.src.indexOf(defaultImage) === -1) {
	                event.target.src = defaultImage;
	            }
	        }, _this._handleMouseOverThumbnail = function (index, event) {
	            var _this$props3 = _this.props;
	            var sliderOnThumbnailHover = _this$props3.sliderOnThumbnailHover;
	            var thumbnailHoverSlideDelay = _this$props3.thumbnailHoverSlideDelay;
	            var onThumbnailHover = _this$props3.onThumbnailHover;

	            if (sliderOnThumbnailHover) {
	                _this.setState({
	                    hovering: true
	                });

	                if (_this._thumbnailTimer) {
	                    clearTimeout(_this._thumbnailTimer);
	                }
	                _this._thumbnailTimer = setTimeout(function () {
	                    _this.goTo(index);
	                }, thumbnailHoverSlideDelay);
	            }

	            if (onThumbnailHover && typeof onThumbnailHover === 'function') {
	                onThumbnailHover.call(_this, index, event);
	            }
	        }, _this._handleMouseLeaveThumbnail = function () {
	            if (_this._thumbnailTimer) {
	                clearTimeout(_this._thumbnailTimer);
	            }

	            _this.setState({
	                hovering: false
	            });
	        }, _this._handleThumbnailClick = function (index, event) {
	            var onThumbnailClick = _this.props.onThumbnailClick;

	            if (onThumbnailClick && typeof onThumbnailClick === 'function') {
	                onThumbnailClick.call(_this, index, event);
	            }

	            _this.goTo(index, event);
	        }, _this._handleBulletClick = function (index, event) {
	            var onBulletClick = _this.props.onBulletClick;

	            if (onBulletClick && typeof onBulletClick === 'function') {
	                onBulletClick.call(_this, index, event);
	            }

	            _this.goTo(index, event);
	        }, _this._handleSwiping = function (index, _, delta) {
	            var galleryWidth = _this.state.galleryWidth;

	            var offsetPercentage = index * (delta / galleryWidth * 100);
	            _this.setState({
	                offsetPercentage: offsetPercentage
	            });
	        }, _this._shouldSlideOnSwipe = function () {
	            var _this$state4 = _this.state;
	            var offsetPercentage = _this$state4.offsetPercentage;
	            var isFlick = _this$state4.isFlick;

	            var shouldSlide = Math.abs(offsetPercentage > 30 || isFlick);

	            if (shouldSlide) {
	                // Reset isFlick
	                _this.setState({
	                    isFlick: false
	                });
	            }
	            return shouldSlide;
	        }, _this._handleOnSwiped = function (event, x, y, isFlick) {
	            _this.setState({
	                isFlick: isFlick
	            });
	        }, _this._handleOnSwipedTo = function (index) {
	            var slideTo = _this.state.currentIndex;

	            setTimeout(function () {
	                if (_this._shouldSlideOnSwipe()) {
	                    slideTo += index;
	                }

	                if (index < 0) {
	                    if (!_this._canSlideLeft()) {
	                        slideTo = _this.state.currentIndex;
	                    }
	                } else {
	                    if (!_this._canSlideRight()) {
	                        slideTo = _this.state.currentIndex;
	                    }
	                }

	                _this.goTo(slideTo);
	            }, 0);
	        }, _this._renderItem = function (img) {
	            var _this$props4 = _this.props;
	            var _this$props4$onImageE = _this$props4.onImageError;
	            var onImageError = _this$props4$onImageE === undefined ? _this._handleImageError : _this$props4$onImageE;
	            var onImageLoad = _this$props4.onImageLoad;
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
	        }, _this._renderThumb = function (img) {
	            var _img$thumbnail = img.thumbnail;
	            var thumbnail = _img$thumbnail === undefined ? '' : _img$thumbnail;
	            var _img$thumbnailAlt = img.thumbnailAlt;
	            var thumbnailAlt = _img$thumbnailAlt === undefined ? '' : _img$thumbnailAlt;
	            var _img$onThumbnailError = img.onThumbnailError;
	            var onThumbnailError = _img$onThumbnailError === undefined ? _this._handleImageError : _img$onThumbnailError;

	            return _react2.default.createElement('img', {
	                src: thumbnail,
	                alt: thumbnailAlt,
	                onError: onThumbnailError
	            });
	        }, _this._getThumbnailStyle = function () {
	            var thumbnailPosition = _this.props.thumbnailPosition;
	            var _this$state5 = _this.state;
	            var thumbsTranslateX = _this$state5.thumbsTranslateX;
	            var thumbsTranslateY = _this$state5.thumbsTranslateY;

	            var translate3d = void 0;

	            if (thumbnailPosition === 'Y') {
	                translate3d = 'translate3d(0, ' + thumbsTranslateY + 'px, 0)';
	            } else {
	                translate3d = 'translate3d(' + thumbsTranslateX + 'px, 0, 0)';
	            }

	            return {
	                WebkitTransform: translate3d,
	                MozTransform: translate3d,
	                msTransform: translate3d,
	                OTransform: translate3d,
	                transform: translate3d
	            };
	        }, _this._getSlideStyle = function (index) {
	            var _this$state6 = _this.state;
	            var currentIndex = _this$state6.currentIndex;
	            var offsetPercentage = _this$state6.offsetPercentage;
	            var previousIndex = _this$state6.previousIndex;
	            var _this$props5 = _this.props;
	            var infinite = _this$props5.infinite;
	            var images = _this$props5.images;

	            var baseTraslate = -100 * currentIndex;

	            var totalSlides = images.length - 1;

	            // Calculate position of other slides as per currentIndex
	            var translateX = baseTraslate + index * 100 + offsetPercentage;

	            var zIndex = 1;
	            if (index === currentIndex) {
	                zIndex = 3;
	            } else if (index === previousIndex) {
	                zIndex = 2;
	            }

	            if (infinite && images.length > 2) {
	                if (currentIndex === 0 && index === totalSlides) {
	                    // Make the last slide the slide before the first
	                    translateX = -100 + offsetPercentage;
	                } else if (currentIndex === totalSlides && index === 0) {
	                    // Make the first slide the slide after the last
	                    translateX = 100 + offsetPercentage;
	                }
	            }

	            // Only when there is 2 images with infinite turned on
	            if (infinite && images.length === 2) {
	                translateX = _this._getTranslateXForTwoSlide(index);
	            }

	            var translate3d = 'translate3d(' + translateX + '%, 0, 0)';

	            return {
	                WebkitTransform: translate3d,
	                MozTransform: translate3d,
	                msTransform: translate3d,
	                OTransform: translate3d,
	                transform: translate3d,
	                zIndex: zIndex
	            };
	        }, _this._getTranslateXForTwoSlide = function (index) {
	            // Infinte swipe when there are only 2 slides
	            var _this$state7 = _this.state;
	            var currentIndex = _this$state7.currentIndex;
	            var offsetPercentage = _this$state7.offsetPercentage;
	            var previousIndex = _this$state7.previousIndex;

	            var baseTraslate = -100 * currentIndex;
	            var translateX = baseTraslate + index * 100 + offsetPercentage;

	            // track user swipe direction
	            if (offsetPercentage > 0) {
	                _this.direction = 'left';
	            } else if (offsetPercentage < 0) {
	                _this.direction = 'right';
	            }

	            // Making sure the slides are on the correct side
	            if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
	                translateX = -100 + offsetPercentage;
	            } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
	                translateX = 100 + offsetPercentage;
	            }

	            if (currentIndex !== previousIndex) {
	                // Move the slide to the right side while swiping
	                if (previousIndex === 0 && index === Math.pow(0, offsetPercentage) === 0 && _this.direction === 'left') {
	                    translateX = 100;
	                } else if (previousIndex === 1 && index === 1 && offsetPercentage === 0 && _this.direction === 'right') {
	                    translateX = -100;
	                }
	            } else {
	                // Keep the slide in the correct side when not sliding
	                if (currentIndex === 0 && index === 1 && offsetPercentage === 0 && _this.direction === 'left') {
	                    translateX = -100;
	                } else if (currentIndex === 1 && index === 0 && offsetPercentage === 0 && _this.direction === 'right') {
	                    translateX = 100;
	                }
	            }

	            return translateX;
	        }, _this.render = function () {
	            var _this$state8 = _this.state;
	            var currentIndex = _this$state8.currentIndex;
	            var galleryHeight = _this$state8.galleryHeight;
	            var _this$state8$style = _this$state8.style;
	            var slideTransformStyle = _this$state8$style === undefined ? {} : _this$state8$style;
	            var _this$props6 = _this.props;
	            var images = _this$props6.images;
	            var showThumbnails = _this$props6.showThumbnails;
	            var showBullets = _this$props6.showBullets;
	            var showIndex = _this$props6.showIndex;
	            var indexSeparator = _this$props6.indexSeparator;
	            var showNav = _this$props6.showNav;
	            var disableSwipe = _this$props6.disableSwipe;
	            var infinite = _this$props6.infinite;
	            var _onClick = _this$props6.onClick;
	            var thumbnailPosition = _this$props6.thumbnailPosition;
	            var customRenderItem = _this$props6.renderItem;
	            var customRenderThumb = _this$props6.renderThumb;

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
	                var _img$renderThumb = img.renderThumb;
	                var ImgRenderThumb = _img$renderThumb === undefined ? null : _img$renderThumb;

	                var renderItem = ImgRenderItem || customRenderItem || _this._renderItem;
	                var renderThumb = ImgRenderThumb || customRenderThumb || _this._renderThumb;

	                var slide = _react2.default.createElement('div', {
	                    key: index,
	                    className: (0, _classnames2.default)(BASE_CLASS + '-slide', originalClass, {
	                        // set first slide as right slide if were sliding right from last slide
	                        left: index === currentIndex - 1 || images.length >= 3 && infinite && index === images.length - 1 && currentIndex === 0,
	                        center: index === currentIndex,
	                        // set last slide as left slide if were sliding left from first slide
	                        right: index === currentIndex + 1 || images.length >= 3 && infinite && index === 0 && currentIndex === images.length - 1
	                    }),
	                    style: Object.assign(_this._getSlideStyle(index), slideTransformStyle),
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
	                    }, renderThumb(img));
	                    thumbnails.push(thumbnail);
	                }

	                if (showBullets) {
	                    var bullet = _react2.default.createElement('li', {
	                        key: index,
	                        className: (0, _classnames2.default)(BASE_CLASS + '-bullet', {
	                            active: currentIndex === index
	                        }),
	                        onTouchStart: function onTouchStart(event) {
	                            return _this._handleBulletClick.call(_this, index, event);
	                        },
	                        onClick: function onClick(event) {
	                            return _this._handleBulletClick.call(_this, index, event);
	                        }
	                    }, _react2.default.createElement('span', null, index));
	                    bullets.push(bullet);
	                }
	            });

	            return _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS, 'align' + thumbnailPosition) }, _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-content') }, _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-slides-wrapper') }, _this._canNavigate() ? [showNav && _react2.default.createElement('div', {
	                className: BASE_CLASS + '-navigation-wrapper',
	                key: 'navigation' }, _react2.default.createElement('button', {
	                className: BASE_CLASS + '-navigation left',
	                disabled: !_this._canSlideLeft(),
	                onTouchStart: _this._slideLeft,
	                onClick: _this._slideLeft
	            }), _react2.default.createElement('button', {
	                className: BASE_CLASS + '-navigation right',
	                disabled: !_this._canSlideRight(),
	                onTouchStart: _this._slideRight,
	                onClick: _this._slideRight
	            })), disableSwipe ? _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slides',
	                ref: function ref(i) {
	                    return _this._gallerySwiper = i;
	                },
	                key: 'slides' }, slides) : _react2.default.createElement(_reactSwipeable2.default, {
	                className: BASE_CLASS + '-swipe',
	                key: 'swipeable',
	                flickThreshold: .2,
	                delta: 1,
	                onSwipingLeft: _this._handleSwiping.bind(_this, -1),
	                onSwipingRight: _this._handleSwiping.bind(_this, 1),
	                onSwiped: _this._handleOnSwiped,
	                onSwipedLeft: _this._handleOnSwipedTo.bind(_this, 1),
	                onSwipedRight: _this._handleOnSwipedTo.bind(_this, -1)
	            }, _react2.default.createElement('div', {
	                ref: function ref(i) {
	                    return _this._gallerySwiper = i;
	                },
	                className: BASE_CLASS + '-slides' }, slides))] : _react2.default.createElement('div', {
	                ref: function ref(i) {
	                    return _this._gallerySwiper = i;
	                },
	                className: BASE_CLASS + '-slides' }, slides), showBullets && _react2.default.createElement('div', {
	                className: BASE_CLASS + '-bullets' }, _react2.default.createElement('ul', {
	                className: BASE_CLASS + '-bullets-container' }, bullets)), showIndex && _react2.default.createElement('div', {
	                className: BASE_CLASS + '-index' }, _react2.default.createElement('span', { className: BASE_CLASS + '-index-current' }, _this.state.currentIndex + 1), _react2.default.createElement('span', { className: BASE_CLASS + '-index-seperator' }, indexSeparator), _react2.default.createElement('span', { className: BASE_CLASS + '-index-total' }, images.length))), showThumbnails && _react2.default.createElement('div', {
	                className: (0, _classnames2.default)(BASE_CLASS + '-thumbnails'),
	                ref: function ref(i) {
	                    return _this._gallerySwiperThumbnail = i;
	                },
	                style: thumbnailPosition === 'Y' ? {
	                    height: galleryHeight
	                } : {}
	            }, _react2.default.createElement('div', {
	                ref: function ref(t) {
	                    return _this._thumbnails = t;
	                },
	                className: BASE_CLASS + '-thumbnails-wrapper',
	                style: _this._getThumbnailStyle() }, thumbnails))));
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
	    sliderOnThumbnailHover: _react.PropTypes.bool,
	    disableThumbnailScroll: _react.PropTypes.bool,
	    disableArrowKeys: _react.PropTypes.bool,
	    disableSwipe: _react.PropTypes.bool,
	    defaultImage: _react.PropTypes.string,
	    indexSeparator: _react.PropTypes.string,
	    startIndex: _react.PropTypes.number,
	    slideInterval: _react.PropTypes.number,
	    onSlide: _react.PropTypes.func,
	    onThumbnailHover: _react.PropTypes.func,
	    onThumbnailClick: _react.PropTypes.func,
	    onBulletClick: _react.PropTypes.func,
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
	    sliderOnThumbnailHover: false,
	    disableThumbnailScroll: false,
	    disableArrowKeys: false,
	    disableSwipe: false,
	    indexSeparator: ' : ',
	    startIndex: 0,
	    slideInterval: 3000,
	    thumbnailPosition: 'X',
	    thumbnailHoverSlideDelay: 300,
	    onClick: function onClick() {}
	};

	exports.default = GallerySwiper;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.forceCheck = exports.lazyload = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _event = __webpack_require__(7);

	var _scrollParent = __webpack_require__(8);

	var _scrollParent2 = _interopRequireDefault(_scrollParent);

	var _debounce = __webpack_require__(9);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _throttle = __webpack_require__(10);

	var _throttle2 = _interopRequireDefault(_throttle);

	var _decorator = __webpack_require__(11);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(4);

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

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var addEvent = function addEvent(elem, event, fn, binder) {
	    // avoid memory overhead of new anonymous functions for every event handler that's installed
	    // by using local functions
	    function listenHandler(e) {
	        var ret = fn.apply(binder || this, arguments);
	        if (ret === false) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        return ret;
	    }

	    function attachHandler() {
	        // set the this pointer same as addEventListener when fn is called
	        // and make sure the event is passed to the fn also so that works the same too
	        var ret = fn.call(elem, window.event);
	        if (ret === false) {
	            window.event.returnValue = false;
	            window.event.cancelBubble = true;
	        }
	        return ret;
	    }

	    if (elem.addEventListener) {
	        elem.addEventListener(event, listenHandler, false);
	        return {
	            elem: elem,
	            handler: listenHandler,
	            event: event
	        };
	    } else {
	        elem.attachEvent('on' + event, attachHandler);
	        return {
	            elem: elem,
	            handler: attachHander,
	            event: event
	        };
	    }
	};

	exports.default = addEvent;

/***/ },
/* 14 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var removeEvent = function removeEvent(token) {
	    if (token.elem.removeEventListener) {
	        token.elem.removeEventListener(token.event, token.handler);
	    } else {
	        token.elem.detachEvent('on' + token.event, token.handler);
	    }
	};

	exports.default = removeEvent;

/***/ },
/* 15 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// This is to handle accessing event properties in an asynchronous way
	// https://facebook.github.io/react/docs/events.html#syntheticevent
	function throttle(func, wait) {
	    var context = void 0;
	    var args = void 0;
	    var result = void 0;
	    var timeout = null;
	    var previous = 0;

	    var later = function later() {
	        previous = new Date().getTime();
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout) {
	            context = args = null;
	        }
	    };

	    return function () {
	        var now = new Date().getTime();
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0 || remaining > wait) {
	            if (timeout) {
	                clearTimeout(timeout);
	            }
	            previous = now;
	            result = func.apply(context, args);
	            if (!timeout) {
	                context = args = null;
	            }
	        } else if (!timeout) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	};

	function debounceEventHandler() {
	    var throttled = throttle.apply(undefined, arguments);
	    return function (event) {
	        if (event) {
	            event.persist();
	            return throttled(event);
	        }

	        return throttled();
	    };
	};

	exports.default = debounceEventHandler;

/***/ }
/******/ ])
});
;