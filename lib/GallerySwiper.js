Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _addEventListener = require('./utils/add-event-listener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _removeEventListener = require('./utils/remove-event-listener');

var _removeEventListener2 = _interopRequireDefault(_removeEventListener);

var _debounceEventHandler = require('./utils/debounce-event-handler');

var _debounceEventHandler2 = _interopRequireDefault(_debounceEventHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable no-unused-vars*/

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
            setTimeout(function () {
                _this._handleResize();
            }, 500);

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
                offsetPercentage: 0
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
                onArrowClick.call(_this, 'left', event);
            }
            _this.goTo(_this.state.currentIndex - 1, event);
        }, _this._canSlideRight = function () {
            return _this.props.infinite || _this.state.currentIndex < _this.props.images.length - 1;
        }, _this._slideRight = function (event) {
            var onArrowClick = _this.props.onArrowClick;


            if (onArrowClick && typeof onArrowClick === 'function') {
                onArrowClick.call(_this, 'left', event);
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
                        thumbnailWidth: _this._gallerySwiperThumbnail.offsetWidth,
                        thumbnailHeight: _this._gallerySwiperThumbnail.offsetHeight
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


            return _react2.default.createElement(
                'div',
                {
                    className: BASE_CLASS + '-slide-image' },
                _react2.default.createElement('img', {
                    src: original,
                    alt: originalAlt,
                    srcSet: srcSet,
                    size: sizes,
                    onLoad: onImageLoad,
                    onError: onImageError
                })
            );
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
        }, _this._getTranslateXForTwoSlide = function () {
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
                var _img$renderItem2 = img.renderItem;
                var ImgRenderThumb = _img$renderItem2 === undefined ? null : _img$renderItem2;

                var renderItem = ImgRenderItem || customRenderItem || _this._renderItem;
                var renderThumb = ImgRenderThumb || customRenderThumb || _this._renderThumb;

                var slide = _react2.default.createElement(
                    'div',
                    {
                        key: index,
                        className: (0, _classnames2.default)(BASE_CLASS + '-slide', originalClass, {
                            // set first slide as right slide if were sliding right from last slide
                            left: index === currentIndex - 1 || images.length >= 3 && infinite && index === images.length - 1 && currentIndex === 0,
                            center: index === currentIndex,
                            // set last slide as left slide if were sliding left from first slide
                            right: index === currentIndex + 1 || images.length >= 3 && infinite && index === 0 && currentIndex === images.length - 1
                        }),
                        style: _this._getSlideStyle(index),
                        onClick: function onClick(event) {
                            return _onClick.call(_this, index, event);
                        }
                    },
                    renderItem(img)
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
                            className: (0, _classnames2.default)(BASE_CLASS + '-thumbnail', thumbnailClass, {
                                active: currentIndex === index
                            }),
                            onTouchStart: function onTouchStart(event) {
                                return _this._handleThumbnailClick.call(_this, index, event);
                            },
                            onClick: function onClick(event) {
                                return _this._handleThumbnailClick.call(_this, index, event);
                            }
                        },
                        renderThumb(img)
                    );
                    thumbnails.push(thumbnail);
                }

                if (showBullets) {
                    var bullet = _react2.default.createElement(
                        'li',
                        {
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

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(BASE_CLASS, 'align' + thumbnailPosition) },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)(BASE_CLASS + '-content') },
                    _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)(BASE_CLASS + '-slides-wrapper') },
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
                            className: (0, _classnames2.default)(BASE_CLASS + '-thumbnails'),
                            ref: function ref(i) {
                                return _this._gallerySwiperThumbnail = i;
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
    slideOnThumbnailsHover: false,
    disableThumbnailScroll: false,
    disableArrowKeys: false,
    disableSwipe: false,
    indexSeparator: ' : ',
    startIndex: 0,
    slideInterval: 3000,
    thumbnailPosition: 'X',
    thumbnailHoverSlideDelay: 300
};

exports.default = GallerySwiper;