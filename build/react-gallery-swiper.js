(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["GallerySwiper"] = factory(require("react"));
	else
		root["GallerySwiper"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	var _classnames3 = __webpack_require__(4);

	var _classnames4 = _interopRequireDefault(_classnames3);

	var _debounceEventHandler = __webpack_require__(5);

	var _debounceEventHandler2 = _interopRequireDefault(_debounceEventHandler);

	var _reactAttachHandler = __webpack_require__(6);

	var _reactAttachHandler2 = _interopRequireDefault(_reactAttachHandler);

	var _attrHelpers = __webpack_require__(7);

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

	function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	            arr2[i] = arr[i];
	        }return arr2;
	    } else {
	        return Array.from(arr);
	    }
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

	var NAN_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	var LOADED_CLS = 'loaded';
	var MAIN_IMAGE_IDENTIFIER = 'gallery_image';
	var NOT_LOADED_CLS = 'notloaded';
	var ANIMATE_CLS = 'animate';

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
	            slides: [],
	            thumbsTranslateX: 0,
	            thumbsTranslateY: 0,
	            offsetPercentage: 0,
	            galleryWidth: 0,
	            galleryHeight: 0,
	            thumbnailWidth: 0,
	            thumbnailHeight: 0,
	            lazyLoad: {
	                thumbnails: false
	            }
	        }, _this.componentWillReceiveProps = function (nextProps) {
	            var _this$props = _this.props,
	                images = _this$props.images,
	                lazyLoad = _this$props.lazyLoad;
	            var newImages = nextProps.images,
	                newLazyload = nextProps.lazyLoad;

	            if (images.length !== newImages.length) {
	                if (lazyLoad || newLazyload) {
	                    _this.setState({
	                        lazyLoad: {
	                            thumbnails: false
	                        }
	                    }, function () {
	                        _this._resetImages();
	                    });
	                }
	            }
	        }, _this.componentDidUpdate = function (prevProps, prevState) {
	            var showThumbnails = prevProps.showThumbnails,
	                images = prevProps.images;
	            var thumbnailWidth = prevState.thumbnailWidth,
	                thumbnailHeight = prevState.thumbnailHeight,
	                currentIndex = prevState.currentIndex;
	            var _this$state = _this.state,
	                stateThumbnailWidth = _this$state.thumbnailWidth,
	                stateThumbnailHeight = _this$state.thumbnailHeight,
	                stateCurrentIndex = _this$state.currentIndex;
	            var _this$props2 = _this.props,
	                propsShowthumbnailWidth = _this$props2.showThumbnails,
	                onSlide = _this$props2.onSlide,
	                newImages = _this$props2.images;

	            // just to make sure we select a index below the image length

	            var saneStateCurrentIndex = stateCurrentIndex > newImages.length - 1 ? 0 : stateCurrentIndex;
	            if (saneStateCurrentIndex !== stateCurrentIndex) {
	                _this.setState({
	                    currentIndex: saneStateCurrentIndex
	                });
	            }

	            if (thumbnailWidth !== stateThumbnailWidth || thumbnailHeight !== stateThumbnailHeight || showThumbnails !== propsShowthumbnailWidth || images.length !== newImages.length) {
	                // Change thumbnail width container when thumbnail width id adjusted
	                _this._setThumbsTranslate(-_this._getThumbsTranslate((saneStateCurrentIndex > 0 ? 1 : 0) * saneStateCurrentIndex));
	            }

	            if (currentIndex !== saneStateCurrentIndex) {
	                if (onSlide && typeof onSlide === 'function') {
	                    onSlide(saneStateCurrentIndex);
	                }

	                _this._updateThumbnailTranslate(prevState);
	            }
	        }, _this.componentWillMount = function () {
	            var _this$props3 = _this.props,
	                startIndex = _this$props3.startIndex,
	                images = _this$props3.images;

	            _this.setState({
	                currentIndex: startIndex > images.length ? 0 : startIndex,
	                id: Math.floor(Math.random() * 1000)
	            });

	            _this._slideLeft = (0, _debounceEventHandler2.default)(_this._slideLeft, DEBOUNCE_INTERVAL, true);
	            _this._slideRight = (0, _debounceEventHandler2.default)(_this._slideRight, DEBOUNCE_INTERVAL, true);

	            _this._updateIfLazyLoad();
	        }, _this.componentDidMount = function () {
	            // delay the event handler to make sure we get the correct image offset width and height
	            _this._handleResize();
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
	            }, function () {
	                setTimeout(function () {
	                    _this._loadMainImage();
	                }, 100);
	            });
	        }, _this.whereAmI = function () {
	            return _this.state.currentIndex;
	        }, _this._updateIfLazyLoad = function () {
	            var lazyLoad = _this.props.lazyLoad;

	            if (lazyLoad) {
	                setTimeout(function () {
	                    _this._lazyLoadThumbnails();
	                }, 100);
	                setTimeout(function () {
	                    _this._loadMainImage();
	                }, 100);
	            }
	        }, _this._getAllThumbsInArray = function () {
	            var thumbs = _this._gallerySwiperThumbnails;
	            if (thumbs) {
	                var images = thumbs.querySelectorAll('img');
	                return [].concat(_toConsumableArray(images));
	            }
	            return [];
	        }, _this._resetImages = function () {
	            var images = _this.props.images;
	            // Reset all thumbnails to its original state so we can load new images

	            var thumbnails = _this._getAllThumbsInArray();
	            if (thumbnails.length) {
	                thumbnails.forEach(function (img) {
	                    var cls = (0, _attrHelpers.getClassAsArray)(img);
	                    img.src = NAN_IMG;
	                    (0, _attrHelpers.removeStringFromArray)(cls, LOADED_CLS);
	                    (0, _attrHelpers.pushUniqueStringToArray)(cls, NOT_LOADED_CLS);
	                    (0, _attrHelpers.addClassFromArray)(img, cls);
	                });

	                // Once its reset, fire the loading function to lazy load all thumbnails
	                _this._updateIfLazyLoad();
	            }

	            // This is the hack to remove the loading main images from DOM so the new images can be loaded
	            var imageWraps = images.reduce(function (result, value, index) {
	                result.push(_this['_gallerySlide-' + index]);
	                return result;
	            }, []);

	            if (imageWraps.length) {
	                imageWraps.forEach(function (img) {
	                    // This check is to make sure there is a loaded image in the container
	                    var loadedImage = img.lastChild.classList.contains(MAIN_IMAGE_IDENTIFIER);
	                    if (loadedImage) {
	                        img.removeChild(img.lastChild);
	                    }
	                });
	            }
	        }, _this._loadThumbnail = function (img, index, images) {
	            var image = new Image();
	            var src = img.getAttribute('data-src');

	            image.onload = function () {
	                img.src = src;
	                var cls = (0, _attrHelpers.getClassAsArray)(img);

	                (0, _attrHelpers.removeStringFromArray)(cls, NOT_LOADED_CLS);
	                (0, _attrHelpers.pushUniqueStringToArray)(cls, LOADED_CLS);
	                (0, _attrHelpers.addClassFromArray)(img, cls);
	            };
	            image.src = src;

	            if (index === images.length - 1) {
	                _this.setState({
	                    lazyLoad: {
	                        thumbnails: true
	                    }
	                });
	            }
	        }, _this._lazyLoadThumbnails = function () {
	            var _this$state$lazyLoad = _this.state.lazyLoad;
	            _this$state$lazyLoad = _this$state$lazyLoad === undefined ? {} : _this$state$lazyLoad;
	            var _this$state$lazyLoad$ = _this$state$lazyLoad.thumbnails,
	                thumbnails = _this$state$lazyLoad$ === undefined ? false : _this$state$lazyLoad$;

	            if (thumbnails) {
	                return false;
	            }

	            var images = _this._getAllThumbsInArray();
	            images.forEach(_this._loadThumbnail);
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
	            var _this$props4 = _this.props,
	                disableThumbnailScroll = _this$props4.disableThumbnailScroll,
	                thumbnailPosition = _this$props4.thumbnailPosition;

	            if (disableThumbnailScroll) {
	                return 0;
	            }

	            var _this$state2 = _this.state,
	                thumbnailWidth = _this$state2.thumbnailWidth,
	                thumbnailHeight = _this$state2.thumbnailHeight;

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
	            var _this$state3 = _this.state,
	                stateCurrentIndex = _this$state3.currentIndex,
	                thumbsTranslateX = _this$state3.thumbsTranslateX,
	                thumbsTranslateY = _this$state3.thumbsTranslateY;
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

	                if (_this._gallerySwiperThumbnails) {
	                    _this.setState({
	                        thumbnailWidth: _this._gallerySwiper.offsetWidth,
	                        thumbnailHeight: _this._gallerySwiper.offsetHeight
	                    });
	                }
	            }, 100);
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
	            var _this$props5 = _this.props,
	                sliderOnThumbnailHover = _this$props5.sliderOnThumbnailHover,
	                thumbnailHoverSlideDelay = _this$props5.thumbnailHoverSlideDelay,
	                onThumbnailHover = _this$props5.onThumbnailHover;

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
	            var _this$state4 = _this.state,
	                offsetPercentage = _this$state4.offsetPercentage,
	                isFlick = _this$state4.isFlick;

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
	        }, _this._loadMainImage = function () {
	            var lazyLoad = _this.props.lazyLoad;

	            if (!lazyLoad) {
	                return false;
	            }

	            var index = _this.whereAmI();

	            var elImg = _this['_galleryImage-' + index];
	            var elWrap = _this['_gallerySlide-' + index];

	            if (elImg && elImg.nodeName.toLowerCase() === 'img') {
	                var shouldLoad = elImg.className.indexOf(NOT_LOADED_CLS) >= 0;
	                var src = elImg.getAttribute('data-src');
	                if (shouldLoad && src) {
	                    (function () {
	                        var img = new Image();
	                        img.src = src;
	                        elWrap.appendChild(img);
	                        img.onload = function () {
	                            var cls = (0, _attrHelpers.getClassAsArray)(img);
	                            // img.className = LOADED_CLS;
	                            setTimeout(function () {
	                                (0, _attrHelpers.pushUniqueStringToArray)(cls, LOADED_CLS);
	                                (0, _attrHelpers.pushUniqueStringToArray)(cls, MAIN_IMAGE_IDENTIFIER);
	                                (0, _attrHelpers.addClassFromArray)(img, cls);
	                            }, 500);
	                        };
	                    })();
	                }
	            }
	        }, _this._renderItem = function (img, index) {
	            var _classnames;

	            var _this$props6 = _this.props,
	                _this$props6$onImageE = _this$props6.onImageError,
	                onImageError = _this$props6$onImageE === undefined ? _this._handleImageError : _this$props6$onImageE,
	                onImageLoad = _this$props6.onImageLoad,
	                lazyLoad = _this$props6.lazyLoad,
	                _this$props6$lazyLoad = _this$props6.lazyLoadAnimation,
	                lazyLoadAnimation = _this$props6$lazyLoad === undefined ? false : _this$props6$lazyLoad,
	                aspectRatio = _this$props6.aspectRatio,
	                startIndex = _this$props6.startIndex,
	                images = _this$props6.images;

	            var saneStartIndex = startIndex > images.length - 1 ? 0 : startIndex;

	            var sizes = img.sizes,
	                original = img.original,
	                _img$originalAlt = img.originalAlt,
	                originalAlt = _img$originalAlt === undefined ? '' : _img$originalAlt;
	            var thumbnail = img.thumbnail;

	            // This is make sure we should blank instead of blurred image

	            if (!lazyLoadAnimation) {
	                thumbnail = NAN_IMG;
	            }

	            var classes = (0, _classnames4.default)((_classnames = {}, _defineProperty(_classnames, NOT_LOADED_CLS, lazyLoad && !(!lazyLoadAnimation && index === saneStartIndex)), _defineProperty(_classnames, ANIMATE_CLS, lazyLoadAnimation), _defineProperty(_classnames, LOADED_CLS, !lazyLoad || !lazyLoadAnimation && index === saneStartIndex), _classnames));

	            var imgProps = {
	                className: classes,
	                src: lazyLoad && !(!lazyLoadAnimation && index === saneStartIndex) ? thumbnail : original,
	                ref: function ref(i) {
	                    return _this['_galleryImage-' + index] = i;
	                },
	                'data-src': lazyLoad && !(!lazyLoadAnimation && index === saneStartIndex) ? original : '',
	                alt: originalAlt,
	                onLoad: onImageLoad,
	                onError: onImageError,
	                size: sizes
	            };

	            return _react2.default.createElement('div', {
	                className: BASE_CLASS + '-slide-image',
	                ref: function ref(i) {
	                    return _this['_gallerySlide-' + index] = i;
	                } }, _react2.default.createElement('div', { className: (0, _classnames4.default)('aspectRatio', 'z--' + aspectRatio) }), _react2.default.createElement('img', imgProps));
	        }, _this._renderThumb = function (img) {
	            var _classnames2;

	            var _img$thumbnail = img.thumbnail,
	                thumbnail = _img$thumbnail === undefined ? '' : _img$thumbnail,
	                _img$thumbnailAlt = img.thumbnailAlt,
	                thumbnailAlt = _img$thumbnailAlt === undefined ? '' : _img$thumbnailAlt,
	                _img$onThumbnailError = img.onThumbnailError,
	                onThumbnailError = _img$onThumbnailError === undefined ? _this._handleImageError : _img$onThumbnailError;
	            var _this$props7 = _this.props,
	                _this$props7$lazyLoad = _this$props7.lazyLoad,
	                lazyLoad = _this$props7$lazyLoad === undefined ? false : _this$props7$lazyLoad,
	                _this$props7$lazyLoad2 = _this$props7.lazyLoadAnimation,
	                lazyLoadAnimation = _this$props7$lazyLoad2 === undefined ? false : _this$props7$lazyLoad2;

	            var classes = (0, _classnames4.default)((_classnames2 = {}, _defineProperty(_classnames2, NOT_LOADED_CLS, lazyLoad), _defineProperty(_classnames2, ANIMATE_CLS, lazyLoadAnimation), _defineProperty(_classnames2, LOADED_CLS, !lazyLoad), _classnames2));

	            var imgProps = {
	                className: classes,
	                src: lazyLoad ? NAN_IMG : thumbnail,
	                'data-src': lazyLoad ? thumbnail : '',
	                alt: thumbnailAlt,
	                onError: onThumbnailError
	            };

	            return _react2.default.createElement('img', imgProps);
	        }, _this._getThumbnailStyle = function () {
	            var thumbnailPosition = _this.props.thumbnailPosition;
	            var _this$state5 = _this.state,
	                thumbsTranslateX = _this$state5.thumbsTranslateX,
	                thumbsTranslateY = _this$state5.thumbsTranslateY;

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
	            var _this$state6 = _this.state,
	                currentIndex = _this$state6.currentIndex,
	                offsetPercentage = _this$state6.offsetPercentage,
	                previousIndex = _this$state6.previousIndex;
	            var _this$props8 = _this.props,
	                infinite = _this$props8.infinite,
	                images = _this$props8.images;

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
	            var _this$state7 = _this.state,
	                currentIndex = _this$state7.currentIndex,
	                offsetPercentage = _this$state7.offsetPercentage,
	                previousIndex = _this$state7.previousIndex;

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
	        }, _this.getDimensions = function () {
	            return {
	                width: _this.state.galleryWidth,
	                height: _this.state.galleryHeight
	            };
	        }, _this.render = function () {
	            var _this$state8 = _this.state,
	                currentIndex = _this$state8.currentIndex,
	                galleryHeight = _this$state8.galleryHeight,
	                _this$state8$style = _this$state8.style,
	                slideTransformStyle = _this$state8$style === undefined ? {} : _this$state8$style;
	            var _this$props9 = _this.props,
	                images = _this$props9.images,
	                showThumbnails = _this$props9.showThumbnails,
	                showBullets = _this$props9.showBullets,
	                showIndex = _this$props9.showIndex,
	                indexSeparator = _this$props9.indexSeparator,
	                showNav = _this$props9.showNav,
	                disableSwipe = _this$props9.disableSwipe,
	                infinite = _this$props9.infinite,
	                _onClick = _this$props9.onClick,
	                thumbnailPosition = _this$props9.thumbnailPosition,
	                disableArrowKeys = _this$props9.disableArrowKeys,
	                aspectRatio = _this$props9.aspectRatio,
	                customRenderItem = _this$props9.renderItem,
	                customRenderThumb = _this$props9.renderThumb;

	            var slides = [];
	            var thumbnails = [];
	            var bullets = [];

	            images.forEach(function (img, index) {
	                var _img$originalClass = img.originalClass,
	                    originalClass = _img$originalClass === undefined ? '' : _img$originalClass,
	                    _img$thumbnailClass = img.thumbnailClass,
	                    thumbnailClass = _img$thumbnailClass === undefined ? '' : _img$thumbnailClass,
	                    _img$renderItem = img.renderItem,
	                    ImgRenderItem = _img$renderItem === undefined ? null : _img$renderItem,
	                    _img$renderThumb = img.renderThumb,
	                    ImgRenderThumb = _img$renderThumb === undefined ? null : _img$renderThumb;

	                var renderItem = ImgRenderItem || customRenderItem || _this._renderItem;
	                var renderThumb = ImgRenderThumb || customRenderThumb || _this._renderThumb;

	                var slide = _react2.default.createElement('div', {
	                    key: index,
	                    className: (0, _classnames4.default)(BASE_CLASS + '-slide', originalClass, {
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
	                }, renderItem.call(_this, img, index));

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
	                        className: (0, _classnames4.default)(BASE_CLASS + '-thumbnail', thumbnailClass, {
	                            active: currentIndex === index
	                        }),
	                        onTouchStart: function onTouchStart(event) {
	                            return _this._handleThumbnailClick.call(_this, index, event);
	                        },
	                        onClick: function onClick(event) {
	                            return _this._handleThumbnailClick.call(_this, index, event);
	                        }
	                    }, _react2.default.createElement('div', { className: (0, _classnames4.default)('aspectRatio', 'z--' + aspectRatio) }), renderThumb.call(_this, img));
	                    thumbnails.push(thumbnail);
	                }

	                if (showBullets) {
	                    var bullet = _react2.default.createElement('li', {
	                        key: index,
	                        className: (0, _classnames4.default)(BASE_CLASS + '-bullet', {
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

	            var events = void 0;
	            if (!disableArrowKeys) {
	                events = _react2.default.createElement(_reactAttachHandler2.default, {
	                    target: BASE_CLASS + _this.state.id,
	                    events: {
	                        keydown: _this._handleKeyDown,
	                        resize: _this._handleResize
	                    }
	                });
	            }

	            return _react2.default.createElement('div', {
	                id: BASE_CLASS + _this.state.id,
	                className: (0, _classnames4.default)(BASE_CLASS, 'align' + thumbnailPosition) }, events, _react2.default.createElement('div', {
	                className: (0, _classnames4.default)(BASE_CLASS + '-content') }, _react2.default.createElement('div', {
	                className: (0, _classnames4.default)(BASE_CLASS + '-slides-wrapper') }, _this._canNavigate() ? [showNav && _react2.default.createElement('div', {
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
	                className: (0, _classnames4.default)(BASE_CLASS + '-thumbnails'),
	                ref: function ref(i) {
	                    return _this._gallerySwiperThumbnails = i;
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
	    aspectRatio: _react.PropTypes.oneOf(['square', '3x4', '4x6', '5x7', '8x10', '4x3', '6x4', '7x5', '10x8']),
	    lazyLoad: _react.PropTypes.bool,
	    lazyLoadAnimation: _react.PropTypes.bool,
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
	    aspectRatio: 'square',
	    lazyLoad: false,
	    lazyLoadAnimation: false,
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
	    nodeName: React.PropTypes.string,
	    trackMouse: React.PropTypes.bool
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
	    var x = void 0,
	        y = void 0;
	    // If not a touch, determine point from mouse coordinates
	    if (e.changedTouches) {
	      x = e.changedTouches[0].clientX;
	      y = e.changedTouches[0].clientY;
	    } else {
	      x = e.clientX;
	      y = e.clientY;
	    }

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

	  eventStart: function eventStart(e) {
	    if (e.touches && e.touches.length > 1) {
	      return;
	    }
	    // If not a touch, determine point from mouse coordinates
	    var touches = e.touches;
	    if (!touches) {
	      touches = [{ clientX: e.clientX, clientY: e.clientY }];
	    }
	    if (this.props.stopPropagation) e.stopPropagation();

	    this.setState({
	      start: Date.now(),
	      x: touches[0].clientX,
	      y: touches[0].clientY,
	      swiping: false
	    });
	  },

	  eventMove: function eventMove(e) {
	    if (!this.state.x || !this.state.y || e.touches && e.touches.length > 1) {
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

	  eventEnd: function eventEnd(e) {
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
	      onTouchStart: this.eventStart,
	      onTouchMove: this.eventMove,
	      onTouchEnd: this.eventEnd,
	      onMouseDown: this.props.trackMouse && this.eventStart,
	      onMouseMove: this.props.trackMouse && this.eventMove,
	      onMouseUp: this.props.trackMouse && this.eventEnd
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
	    delete newProps.trackMouse;

	    return React.createElement(this.props.nodeName, newProps, this.props.children);
	  }
	});

	module.exports = Swipeable;

/***/ },
/* 4 */
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
/* 5 */
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["AttachHandler"] = factory(require("react"));
		else
			root["AttachHandler"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

		var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

		Object.defineProperty(exports, "__esModule", {
		    value: true
		});

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
		    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};

		var _react = __webpack_require__(2);

		var _react2 = _interopRequireDefault(_react);

		var _reactAddonsShallowCompare = __webpack_require__(3);

		var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

		var _helpers = __webpack_require__(6);

		var helpers = _interopRequireWildcard(_helpers);

		function _interopRequireWildcard(obj) {
		    if (obj && obj.__esModule) {
		        return obj;
		    } else {
		        var newObj = {};if (obj != null) {
		            for (var key in obj) {
		                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
		            }
		        }newObj.default = obj;return newObj;
		    }
		}

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
		    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
		    if (typeof superClass !== "function" && superClass !== null) {
		        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
		    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		} //eslint-disable-line no-unused-vars


		var defaultEventOptions = {
		    capture: false,
		    passive: false,
		    debounce: false,
		    debounceDelay: 250
		};

		var addEventListener = helpers.addEventListener,
		    removeEventListener = helpers.removeEventListener,
		    passiveOptions = helpers.passiveOptions;

		var mergeOptionsWithDefault = function mergeOptionsWithDefault(obj) {
		    return Object.assign({}, defaultEventOptions, obj);
		};

		var getEventsArgs = function getEventsArgs(eventName, cb, opts) {
		    var args = [eventName, cb];
		    args.push(passiveOptions ? opts : opts.capture);
		    return args;
		};

		// Inspired from http://davidwalsh.name/javascript-debounce-function
		var debounceFn = function debounceFn(cb, delay) {
		    var timeout = void 0;

		    return function () {
		        var context = this;
		        var args = arguments;

		        clearTimeout(timeout);
		        timeout = setTimeout(function () {
		            cb.apply(context, args);
		        }, delay);
		    };
		};

		var switchOn = function switchOn(target, eventName, cb) {
		    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		    // Only supports modern browsers Sorry IE10- users
		    if (addEventListener) {
		        var _opts$debounce = opts.debounce,
		            debounce = _opts$debounce === undefined ? false : _opts$debounce,
		            debounceDelay = opts.debounceDelay;
		        // http://stackoverflow.com/questions/2891096/addeventlistener-using-apply

		        target.addEventListener.apply(target, getEventsArgs(eventName, debounce ? debounceFn(cb, debounceDelay) : cb, opts));
		    }
		};

		var switchOff = function switchOff(target, eventName, cb) {
		    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		    // Only supports modern browsers Sorry IE10- users
		    if (removeEventListener) {
		        // http://stackoverflow.com/questions/2891096/addeventlistener-using-apply
		        target.removeEventListener.apply(target, getEventsArgs(eventName, cb, opts));
		    }
		};

		var AttachHandler = function (_Component) {
		    _inherits(AttachHandler, _Component);

		    function AttachHandler() {
		        var _ref;

		        var _temp, _this, _ret;

		        _classCallCheck(this, AttachHandler);

		        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		            args[_key] = arguments[_key];
		        }

		        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AttachHandler.__proto__ || Object.getPrototypeOf(AttachHandler)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentDidMount = function () {
		            _this.addEventListener();
		        }, _this.shouldComponentUpdate = function (nextProps) {
		            return (0, _reactAddonsShallowCompare2.default)({
		                props: _this.props,
		                state: _this.state
		            }, nextProps, _this.state);
		        }, _this.componentWillUpdate = function () {
		            _this.addEventListener();
		        }, _this.componentDidUpdate = function () {
		            _this.addEventListener();
		        }, _this.componentWillUnMount = function () {
		            _this.removeEventListener();
		        }, _this.addEventListener = function () {
		            _this.setListeners(switchOn);
		        }, _this.removeEventListener = function () {
		            _this.setListeners(switchOff);
		        }, _this.setListeners = function (switchOnOff) {
		            var _this$props = _this.props,
		                target = _this$props.target,
		                events = _this$props.events;

		            if (target) {
		                (function () {
		                    var element = void 0;

		                    if (typeof target === 'string') {
		                        element = window[target];
		                    }

		                    Object.keys(events).forEach(function (event) {
		                        var value = events[event];
		                        var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
		                        var isObject = valueType === 'object';
		                        var isFunction = valueType === 'function';

		                        // This check is to make sure we have the right typeof value
		                        if (!isObject && !isFunction) {
		                            return;
		                        }
		                        var eventHandler = void 0,
		                            options = void 0;

		                        if (isObject) {
		                            var _value$handler = value.handler,
		                                handler = _value$handler === undefined ? null : _value$handler,
		                                _value$opts = value.opts,
		                                opts = _value$opts === undefined ? {} : _value$opts;

		                            if (handler) {
		                                eventHandler = handler;
		                            }
		                            if (opts) {
		                                options = mergeOptionsWithDefault(opts);
		                            }
		                        } else {
		                            eventHandler = value;
		                        }

		                        if (eventHandler) {
		                            switchOnOff(element, event, eventHandler, options);
		                        }
		                    });
		                })();
		            }
		        }, _this.render = function () {
		            return _this.props.children || null;
		        }, _temp), _possibleConstructorReturn(_this, _ret);
		    }

		    return AttachHandler;
		}(_react.Component);

		AttachHandler.propTypes = {
		    // The Component will take one child
		    children: _react.PropTypes.element,
		    // DOM target to listen to
		    target: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]).isRequired,
		    events: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired
		};
		exports.default = AttachHandler;

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(4);

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */

		'use strict';

		var shallowEqual = __webpack_require__(5);

		/**
		 * Does a shallow comparison for props and state.
		 * See ReactComponentWithPureRenderMixin
		 * See also https://facebook.github.io/react/docs/shallow-compare.html
		 */
		function shallowCompare(instance, nextProps, nextState) {
		  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
		}

		module.exports = shallowCompare;

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @typechecks
		 * 
		 */

		/*eslint-disable no-self-compare */

		'use strict';

		var hasOwnProperty = Object.prototype.hasOwnProperty;

		/**
		 * inlined Object.is polyfill to avoid requiring consumers ship their own
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
		 */
		function is(x, y) {
		  // SameValue algorithm
		  if (x === y) {
		    // Steps 1-5, 7-10
		    // Steps 6.b-6.e: +0 != -0
		    // Added the nonzero y check to make Flow happy, but it is redundant
		    return x !== 0 || y !== 0 || 1 / x === 1 / y;
		  } else {
		    // Step 6.a: NaN == NaN
		    return x !== x && y !== y;
		  }
		}

		/**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */
		function shallowEqual(objA, objB) {
		  if (is(objA, objB)) {
		    return true;
		  }

		  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		    return false;
		  }

		  var keysA = Object.keys(objA);
		  var keysB = Object.keys(objB);

		  if (keysA.length !== keysB.length) {
		    return false;
		  }

		  // Test for A's keys different from B.
		  for (var i = 0; i < keysA.length; i++) {
		    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
		      return false;
		    }
		  }

		  return true;
		}

		module.exports = shallowEqual;

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
		var canUseDom = exports.canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

		var addEventListener = exports.addEventListener = canUseDom && 'addEventListener' in window;
		var removeEventListener = exports.removeEventListener = canUseDom && 'removeEventListener' in window;

		var defineProperty = function defineProperty(o, p, attr) {
		    return Object.defineProperty(o, p, attr);
		};

		// Passive events
		// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js
		var passiveOptions = exports.passiveOptions = function () {
		    var cache = null;
		    return function () {
		        if (cache !== null) {
		            return cache;
		        }
		        var passiveOptionsSupport = false;
		        try {
		            window.addEventListener('test', null, defineProperty({}, 'passive', {
		                get: function get() {
		                    passiveOptionsSupport = true;
		                }
		            }));
		        } catch (e) {} //eslint-disable-line no-empty

		        cache = passiveOptionsSupport;
		        return passiveOptionsSupport;
		    }();
		}();

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 7 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Apply styles to an element with an object.
	 */
	var applyStyles = exports.applyStyles = function applyStyles(styles, node) {
	    var noValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    if (styles && node) {
	        for (var s in styles) {
	            if (styles.hasOwnProperty(s)) {
	                node.style[s] = !noValue ? styles[s] : null;
	            }
	        }
	    }
	};

	var getClassAsArray = exports.getClassAsArray = function getClassAsArray(el) {
	    if (!el) {
	        return [];
	    }
	    var originalClass = el.className;
	    var originalClassArray = originalClass.split(' ');
	    return originalClassArray;
	};

	var addClassFromArray = exports.addClassFromArray = function addClassFromArray(el, arr) {
	    if (el) {
	        el.className = arr.join(' ').trim();
	    }
	};

	var pushUniqueStringToArray = exports.pushUniqueStringToArray = function pushUniqueStringToArray(arr, string) {
	    if (Array.isArray(arr) && !arr.includes(string)) {
	        arr.push(string);
	    }
	};

	var removeStringFromArray = exports.removeStringFromArray = function removeStringFromArray(arr, string) {
	    if (Array.isArray(arr) && arr.includes(string)) {
	        arr.splice(arr.indexOf(string), 1);
	    }
	};

/***/ }
/******/ ])
});
;