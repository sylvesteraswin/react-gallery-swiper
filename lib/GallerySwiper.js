Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _debounceEventHandler = require('./utils/debounce-event-handler');

var _debounceEventHandler2 = _interopRequireDefault(_debounceEventHandler);

var _imageUtils = require('./utils/image-utils');

var _reactAttachHandler = require('react-attach-handler');

var _reactAttachHandler2 = _interopRequireDefault(_reactAttachHandler);

var _attrHelpers = require('./utils/attr-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable no-unused-vars*/

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


            if (images !== newImages) {
                if (lazyLoad || newLazyload) {
                    _this.setState({
                        lazyLoad: {
                            thumbnails: false
                        }
                    }, function () {
                        _this._resetSwiper();
                    });
                }
            }
        }, _this._propsHaveChanged = function (nextProps) {
            var propKeys = Object.keys(nextProps);
            return !propKeys.every(function (key) {
                return _this.props[key] === nextProps[key];
            });
        }, _this._stateHasChanged = function (nextState) {
            var stateKeys = Object.keys(nextState);
            return !stateKeys.every(function (key) {
                return _this.state[key] === nextState[key];
            });
        }, _this.shouldComponentUpdate = function (nextProps, nextState) {
            return _this._propsHaveChanged(nextProps) || _this._stateHasChanged(nextState);
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
        }, _this._resetThumbImages = function () {
            // Reset all thumbnails to its original state so we can load new images
            var thumbnails = _this._getAllThumbsInArray();
            if (thumbnails.length) {
                thumbnails.forEach(function (img) {
                    img.src = NAN_IMG;
                    img.classList.add(NOT_LOADED_CLS);
                    img.classList.remove(LOADED_CLS);
                });

                // Once its reset, fire the loading function to lazy load all thumbnails
                _this._updateIfLazyLoad();
            }
        }, _this._resetMainImages = function () {

            // This is the hack to remove the loading main images from DOM so the new images can be loaded
            // Collect al gallery slides
            var keys = Object.keys(_this);
            var gallerySlides = keys.reduce(function (result, key) {
                if (key.indexOf('_gallerySlide') === 0) {
                    result.push(_this[key]);
                }
                return result;
            }, []);
            // Iterate slides and remove all nodes with the loaded class
            if (gallerySlides.length) {
                gallerySlides.forEach(function (slide) {
                    if (slide && slide.childNodes) {
                        Array.from(slide.childNodes).forEach(function (node) {
                            if (node.tagName.toLowerCase() === 'img' && node.classList.contains(LOADED_CLS)) {
                                slide.removeChild(node);
                            }
                        });
                    }
                });
            }
        }, _this._resetSwiper = function () {
            _this._resetThumbImages();
            _this._resetMainImages();
            // Once its reset, fire the loading function to lazy load all thumbnails
            _this._updateIfLazyLoad();
        }, _this._loadThumbnail = function (img, index, images) {
            var src = img.getAttribute('data-src');

            (0, _imageUtils.createNewImage)(src).then(function (image) {
                if (img) {
                    img.src = src;
                    img.classList.remove(NOT_LOADED_CLS);
                    img.classList.add(LOADED_CLS);
                }

                // Cleanup
                if (image) {
                    image = null;
                }
            }).catch(function (_ref2) {
                var error = _ref2.error,
                    image = _ref2.image;

                /*eslint-disable no-console*/
                console.error(error);
                console.error('Image Object:', image);
                /*eslint-enable no-console*/
            });

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
            }
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
            var _this$props6 = _this.props,
                lazyLoad = _this$props6.lazyLoad,
                progressiveLazyLoad = _this$props6.progressiveLazyLoad;


            if (!lazyLoad) {
                return false;
            }

            var index = _this.whereAmI();

            _this._loadImage(index).then(function (img) {
                if (progressiveLazyLoad) {
                    _this._progressiveLazyLoad();
                }

                if (!img) {
                    return null;
                }

                setTimeout(function () {
                    (0, _attrHelpers.addClassFromArray)(img, [LOADED_CLS, MAIN_IMAGE_IDENTIFIER]);
                }, 100);
            }).catch(_this._loadImageErrorHandler);
        }, _this._renderItem = function (img, index) {
            var _classnames;

            var _this$props7 = _this.props,
                _this$props7$onImageE = _this$props7.onImageError,
                onImageError = _this$props7$onImageE === undefined ? _this._handleImageError : _this$props7$onImageE,
                onImageLoad = _this$props7.onImageLoad,
                lazyLoad = _this$props7.lazyLoad,
                _this$props7$lazyLoad = _this$props7.lazyLoadAnimation,
                lazyLoadAnimation = _this$props7$lazyLoad === undefined ? false : _this$props7$lazyLoad,
                aspectRatio = _this$props7.aspectRatio,
                startIndex = _this$props7.startIndex,
                images = _this$props7.images;


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

            var classes = (0, _classnames4.default)((_classnames = {}, _defineProperty(_classnames, NOT_LOADED_CLS, lazyLoad && !(!lazyLoadAnimation && index === saneStartIndex)), _defineProperty(_classnames, ANIMATE_CLS, lazyLoadAnimation), _defineProperty(_classnames, LOADED_CLS, !lazyLoad || !lazyLoadAnimation && index === saneStartIndex), _defineProperty(_classnames, MAIN_IMAGE_IDENTIFIER, index === saneStartIndex), _classnames));

            var imgProps = {
                className: classes,
                src: lazyLoad && !(!lazyLoadAnimation && index === saneStartIndex) ? thumbnail : original,
                ref: function ref(i) {
                    return _this['_galleryImage-' + index] = i;
                },
                'data-src': original,
                alt: originalAlt,
                onLoad: onImageLoad,
                onError: onImageError,
                size: sizes
            };

            return _react2.default.createElement(
                'div',
                {
                    className: BASE_CLASS + '-slide-image',
                    ref: function ref(i) {
                        return _this['_gallerySlide-' + index] = i;
                    } },
                _react2.default.createElement('div', { className: (0, _classnames4.default)('aspectRatio', 'z--' + aspectRatio) }),
                _react2.default.createElement('img', imgProps)
            );
        }, _this._renderThumb = function (img) {
            var _classnames2;

            var _img$thumbnail = img.thumbnail,
                thumbnail = _img$thumbnail === undefined ? '' : _img$thumbnail,
                _img$thumbnailAlt = img.thumbnailAlt,
                thumbnailAlt = _img$thumbnailAlt === undefined ? '' : _img$thumbnailAlt,
                _img$onThumbnailError = img.onThumbnailError,
                onThumbnailError = _img$onThumbnailError === undefined ? _this._handleImageError : _img$onThumbnailError;
            var _this$props8 = _this.props,
                _this$props8$lazyLoad = _this$props8.lazyLoad,
                lazyLoad = _this$props8$lazyLoad === undefined ? false : _this$props8$lazyLoad,
                _this$props8$lazyLoad2 = _this$props8.lazyLoadAnimation,
                lazyLoadAnimation = _this$props8$lazyLoad2 === undefined ? false : _this$props8$lazyLoad2;


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
            var _this$props9 = _this.props,
                infinite = _this$props9.infinite,
                images = _this$props9.images;


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
            var _this$props10 = _this.props,
                images = _this$props10.images,
                showThumbnails = _this$props10.showThumbnails,
                showBullets = _this$props10.showBullets,
                showIndex = _this$props10.showIndex,
                indexSeparator = _this$props10.indexSeparator,
                showNav = _this$props10.showNav,
                disableSwipe = _this$props10.disableSwipe,
                infinite = _this$props10.infinite,
                _onClick = _this$props10.onClick,
                thumbnailPosition = _this$props10.thumbnailPosition,
                disableArrowKeys = _this$props10.disableArrowKeys,
                aspectRatio = _this$props10.aspectRatio,
                customRenderItem = _this$props10.renderItem,
                customRenderThumb = _this$props10.renderThumb;


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

                var slide = _react2.default.createElement(
                    'div',
                    {
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
                    },
                    renderItem.call(_this, img, index)
                );

                slides.push(slide);

                if (showThumbnails) {
                    var thumbnail = _react2.default.createElement(
                        'a',
                        {
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
                        },
                        _react2.default.createElement('div', { className: (0, _classnames4.default)('aspectRatio', 'z--' + aspectRatio) }),
                        renderThumb.call(_this, img)
                    );
                    thumbnails.push(thumbnail);
                }

                if (showBullets) {
                    var bullet = _react2.default.createElement(
                        'li',
                        {
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
                        },
                        _react2.default.createElement(
                            'span',
                            null,
                            index
                        )
                    );
                    bullets.push(bullet);
                }
            });

            var events = void 0;
            if (!disableArrowKeys) {
                events = _react2.default.createElement(_reactAttachHandler2.default, {
                    target: BASE_CLASS + '_' + _this.state.id,
                    events: {
                        keydown: _this._handleKeyDown,
                        resize: _this._handleResize
                    }
                });
            }

            return _react2.default.createElement(
                'div',
                {
                    id: BASE_CLASS + '_' + _this.state.id,
                    className: (0, _classnames4.default)(BASE_CLASS, 'align' + thumbnailPosition) },
                events,
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames4.default)(BASE_CLASS + '-content') },
                    _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames4.default)(BASE_CLASS + '-slides-wrapper') },
                        _this._canNavigate() ? [showNav && _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-navigation-wrapper',
                                key: 'navigation' },
                            _react2.default.createElement('button', {
                                className: BASE_CLASS + '-navigation left',
                                disabled: !_this._canSlideLeft(),
                                onTouchStart: _this._slideLeft,
                                onClick: _this._slideLeft
                            }),
                            _react2.default.createElement('button', {
                                className: BASE_CLASS + '-navigation right',
                                disabled: !_this._canSlideRight(),
                                onTouchStart: _this._slideRight,
                                onClick: _this._slideRight
                            })
                        ), disableSwipe ? _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-slides',
                                ref: function ref(i) {
                                    return _this._gallerySwiper = i;
                                },
                                key: 'slides' },
                            slides
                        ) : _react2.default.createElement(
                            _reactSwipeable2.default,
                            {
                                className: BASE_CLASS + '-swipe',
                                key: 'swipeable',
                                flickThreshold: .2,
                                delta: 1,
                                onSwipingLeft: _this._handleSwiping.bind(_this, -1),
                                onSwipingRight: _this._handleSwiping.bind(_this, 1),
                                onSwiped: _this._handleOnSwiped,
                                onSwipedLeft: _this._handleOnSwipedTo.bind(_this, 1),
                                onSwipedRight: _this._handleOnSwipedTo.bind(_this, -1)
                            },
                            _react2.default.createElement(
                                'div',
                                {
                                    ref: function ref(i) {
                                        return _this._gallerySwiper = i;
                                    },
                                    className: BASE_CLASS + '-slides' },
                                slides
                            )
                        )] : _react2.default.createElement(
                            'div',
                            {
                                ref: function ref(i) {
                                    return _this._gallerySwiper = i;
                                },
                                className: BASE_CLASS + '-slides' },
                            slides
                        ),
                        showBullets && _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-bullets' },
                            _react2.default.createElement(
                                'ul',
                                {
                                    className: BASE_CLASS + '-bullets-container' },
                                bullets
                            )
                        ),
                        showIndex && _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-index' },
                            _react2.default.createElement(
                                'span',
                                { className: BASE_CLASS + '-index-current' },
                                _this.state.currentIndex + 1
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: BASE_CLASS + '-index-seperator' },
                                indexSeparator
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: BASE_CLASS + '-index-total' },
                                images.length
                            )
                        )
                    ),
                    showThumbnails && _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames4.default)(BASE_CLASS + '-thumbnails'),
                            ref: function ref(i) {
                                return _this._gallerySwiperThumbnails = i;
                            },
                            style: thumbnailPosition === 'Y' ? {
                                height: galleryHeight
                            } : {}
                        },
                        _react2.default.createElement(
                            'div',
                            {
                                ref: function ref(t) {
                                    return _this._thumbnails = t;
                                },
                                className: BASE_CLASS + '-thumbnails-wrapper',
                                style: _this._getThumbnailStyle() },
                            thumbnails
                        )
                    )
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(GallerySwiper, [{
        key: '_loadImage',
        value: function _loadImage(index) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var elImg = _this2['_galleryImage-' + index];
                var elWrap = _this2['_gallerySlide-' + index];

                if (!elImg || !(elImg.nodeName.toLowerCase() === 'img')) {
                    return resolve(null);
                }

                var src = elImg.getAttribute('data-src');
                if (!src) {
                    return resolve(null);
                }
                var loadedImage = null;

                Array.from(elWrap.childNodes).some(function (node) {
                    // Test if node source equals to the given source then the image exists
                    // Last part of the condition is for cases where some of the url is missing
                    // for example 'http'
                    if (node.src && (node.src === src || new RegExp(src).test(node.src + '$'))) {
                        loadedImage = node;
                    }
                    return !!loadedImage;
                });
                if (loadedImage) {
                    return resolve(loadedImage);
                }

                return (0, _imageUtils.createNewImage)(src).then(function (img) {
                    elWrap.appendChild(img);
                    // img.classList.add(LOADED_CLS);
                    resolve(img);
                }).catch(reject);
            });
        }
    }, {
        key: '_loadImageErrorHandler',
        value: function _loadImageErrorHandler(_ref3) {
            var error = _ref3.error,
                image = _ref3.image;

            /*eslint-disable no-console*/
            if (arguments[0] instanceof Error) {
                return console.error(arguments[0]);
            }

            console.error(error);
            console.error('Image Object:', image);
            /*eslint-enable no-console*/
        }
    }, {
        key: '_addLoadedClassToImage',
        value: function _addLoadedClassToImage(img) {
            if (img) {
                (0, _attrHelpers.addClassFromArray)(img, [LOADED_CLS]);
            }
        }
    }, {
        key: '_progressiveLazyLoad',
        value: function _progressiveLazyLoad() {
            var images = this.props.images;


            var index = this.whereAmI();

            var prevIndex = index - 1 < 0 ? images.length - 1 : index - 1;
            var nextIndex = index + 1 > images.length - 1 ? 0 : index + 1;
            if (prevIndex !== index) {
                this._loadImage(prevIndex).then(this._addLoadedClassToImage).catch(this._loadImageErrorHandler);
            }
            if (nextIndex !== index) {
                this._loadImage(nextIndex).then(this._addLoadedClassToImage).catch(this._loadImageErrorHandler);
            }
        }
    }]);

    return GallerySwiper;
}(_react.Component);

GallerySwiper.propTypes = {
    images: _react.PropTypes.array.isRequired,
    showNav: _react.PropTypes.bool,
    aspectRatio: _react.PropTypes.oneOf(['square', '3x4', '4x6', '5x7', '8x10', '4x3', '6x4', '7x5', '10x8']),
    lazyLoad: _react.PropTypes.bool,
    progressiveLazyLoad: _react.PropTypes.bool,
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
    progressiveLazyLoad: false,
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