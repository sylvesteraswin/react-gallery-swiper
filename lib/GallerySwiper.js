Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

                var slide = _react2.default.createElement(
                    'div',
                    {
                        key: index,
                        className: (0, _classnames2.default)(BASE_CLASS + '-slide', originalClass, {
                            left: index === currentIndex - 1 || images.length >= 3 && infinite && index === images.length - 1 && currentIndex === 0, // set first slide as right slide if were sliding right from last slide
                            center: index === currentIndex,
                            right: index === currentIndex + 1 || images.length >= 3 && infinite && index === 0 && currentIndex === images.length - 1 }),
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
                        'renderThumb(img)'
                    );
                    thumbnails.push(thumbnail);
                }
            });

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(BASE_CLASS) },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)(BASE_CLASS + '-content') },
                    _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)(BASE_CLASS + '-wrapper') },
                        'Hello World!!',
                        _this._canNavigate() ? [showNav && _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-navigation',
                                key: 'navigation' },
                            _react2.default.createElement('button', {
                                className: BASE_CLASS + '-navigation-left',
                                disabled: _this._canSlideLeft(),
                                onTouchStart: _this._slideLeft,
                                onClick: _this._slideLeft
                            }),
                            _react2.default.createElement('button', {
                                className: BASE_CLASS + '-navigation-right',
                                disabled: _this._canSlideRight(),
                                onTouchStart: _this._slideRight,
                                onClick: _this._slideRight
                            })
                        ), disableSwipe ? _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-slides',
                                key: 'slides' },
                            slides
                        ) : _react2.default.createElement(
                            _reactSwipeable2.default,
                            {
                                className: BASE_CLASS + '-swipe',
                                key: 'swipeable'
                            },
                            _react2.default.createElement(
                                'div',
                                {
                                    className: BASE_CLASS + '-slides' },
                                slides
                            )
                        )] : _react2.default.createElement(
                            'div',
                            {
                                className: BASE_CLASS + '-slides' },
                            slides
                        )
                    ),
                    showThumbnails && _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)(BASE_CLASS + '-thumbnails') },
                        thumbnails
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