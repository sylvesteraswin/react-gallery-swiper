import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Swipeable from 'react-swipeable';
import LazyLoad from 'react-lazyload';

import addEvent from './utils/add-event-listener';
import removeEvent from './utils/remove-event-listener';
import debounce from './utils/debounce-event-handler';

const BASE_CLASS = 'zvui-gallery-swiper';
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DEBOUNCE_INTERVAL = 500;

class GallerySwiper extends Component {
    state = {
        currentIndex: 0,
        thumbsTranslateX: 0,
        thumbsTranslateY: 0,
        offsetPercentage: 0,
        galleryWidth: 0,
        galleryHeight: 0,
        thumbnailWidth: 0,
        thumbnailHeight: 0,
        events: {},
    };

    componentWillReceiveProps = (nextProps) => {
        const {
            disableArrowKeys,
        } = this.props;

        const {
            disableArrowKeys: newDisableArrowKeys,
        } = nextProps;

        if (disableArrowKeys !== newDisableArrowKeys) {
            if (newDisableArrowKeys) {
                const {
                    handleKeyDown,
                } = this.state.events

                if (keyDown) {
                    removeEvent(keyDown);
                }
            } else {
                this.setState({
                    events: {
                        handleKeyDown: addEvent(window, 'keydown', this._handleKeyDown, this),
                    }
                });
            }
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {
            showThumbnails,
        } = prevProps;

        const {
            thumbnailWidth,
            currentIndex,
        } = prevState;

        const {
            thumbnailWidth: stateThumbnailWidth,
            currentIndex: stateCurrentIndex,
        } = this.state;

        const {
            showThumbnails: propsShowthumbnailWidth,
            onSlide,
        } = this.props;

        if ((thumbnailWidth !== stateThumbnailWidth) || (showThumbnails !== propsShowthumbnailWidth)) {
            // Change thumbnail width container when thumbnail width id adjusted
            this._setThumbsTranslate(
                this._getThumbsTranslate(((stateCurrentIndex > 0) ? 1 : 0) * stateCurrentIndex)
            );
        }

        if (currentIndex !== stateCurrentIndex) {
            if (onSlide && typeof onSlide === 'function') {
                onSlide(stateCurrentIndex);
            }

            this._updateThumbnailTranslate(prevState);
        }
    };

    componentWillMount = () => {
        const {
            startIndex
        } = this.props;

        this.setState({
            currentIndex: startIndex,
        });

        this._slideLeft = debounce(this._slideLeft, DEBOUNCE_INTERVAL, true);
        this._slideRight = debounce(this._slideRight, DEBOUNCE_INTERVAL, true);
    };

    componentDidMount = () => {
        // delay the event handler to make sure we get the correct image offset width and height
        setTimeout(() => this._handleResize(), 500);

        const {
            disableArrowKeys
        } = this.props;

        if (!disableArrowKeys) {
            this.setState({
                events: Object.assign({}, this.state.events, {
                    handleKeyDown: addEvent(window, 'keydown', this._handleKeyDown, this),
                })
            }, () => {
                this.setState({
                    events: Object.assign({}, this.state.events, {
                        handleResize: addEvent(window, 'resize', this._handleResize, this),
                    })
                });
            });
        }


    };

    componentWillUnMount = () => {
        const {
            disableArrowKeys
        } = this.props;

        const {
            handleKeyDown,
            handleResize,
        } = this.state.events;

        if (!disableArrowKeys) {
            removeEvent(handleKeyDown);
        }

        removeEvent(handleResize);
    };

    goTo = (index, event) => {
        if (event) {
            event.preventDefault();
        }

        const {
            images
        } = this.props;

        const {
            currentIndex: previousIndex,
        } = this.state;

        const lastImage = images.length - 1;
        let currentIndex = index;

        if (index < 0) {
            currentIndex = lastImage;
        } else if (index > lastImage) {
            currentIndex = 0;
        }

        this.setState({
            previousIndex,
            currentIndex,
            offsetPercentage: 0,
        });
    };

    whereAmI = () => this.state.currentIndex;

    _setThumbsTranslate = (thumbsTranslate) => {
        const {
            thumbnailPosition,
        } = this.props;

        if (thumbnailPosition === 'Y') {
            this.setState({
                thumbsTranslateY: thumbsTranslate,
            });
        } else {
            this.setState({
                thumbsTranslateX: thumbsTranslate,
            });
        }
    };

    _getThumbsTranslate = (indexDifference) => {
        const {
            disableThumbnailScroll,
            thumbnailPosition,
        } = this.props;

        if (disableThumbnailScroll) {
            return 0;
        }

        const {
            thumbnailWidth,
            thumbnailHeight,
        } = this.state;

        if (this._thumbnails) {
            const totalThumbnails = this._thumbnails.children.length;

            if (thumbnailPosition === 'Y') {
                if (this._thumbnails.scrollHeight <= thumbnailHeight) {
                    return 0;
                }

                // total scroll-y required to see the last thumbnail
                const totalScrollY = this._thumbnails.scrollHeight - thumbnailHeight;

                // scroll-y required per index change
                const perIndexScrollY = totalScrollY / (totalThumbnails - 1);

                return (indexDifference * perIndexScrollY);
            } else {
                if (this._thumbnails.scrollWidth <= thumbnailWidth) {
                    return 0;
                }

                // total scroll-x required to see the last thumbnail
                const totalScrollX = this._thumbnails.scrollWidth - thumbnailWidth;

                // scroll-x required per index change
                const perIndexScrollX = totalScrollX / (totalThumbnails - 1);

                return (indexDifference * perIndexScrollX);
            }
        }
    };

    _updateThumbnailTranslate = (prevState) => {
        const {
            currentIndex: stateCurrentIndex,
            thumbsTranslateX,
            thumbsTranslateY,
        } = this.state;

        const {
            currentIndex
        } = prevState;

        const {
            thumbnailPosition,
        } = this.props;

        if (stateCurrentIndex === 0) {
            this._setThumbsTranslate(0);
        } else {
            const indexDifference = Math.abs(
                currentIndex - stateCurrentIndex
            );

            if (thumbnailPosition === 'Y') {
                const scrollY = this._getThumbsTranslate(indexDifference);
                if (scrollY > 0) {
                    if (currentIndex < stateCurrentIndex) {
                        this._setThumbsTranslate(
                            thumbsTranslateY - scrollY
                        );
                    } else if (currentIndex > stateCurrentIndex) {
                        this._setThumbsTranslate(
                            thumbsTranslateY + scrollY
                        );
                    }
                }
            } else {
                const scrollX = this._getThumbsTranslate(indexDifference);
                if (scrollX > 0) {
                    if (currentIndex < stateCurrentIndex) {
                        this._setThumbsTranslate(
                            thumbsTranslateX - scrollX
                        );
                    } else if (currentIndex > stateCurrentIndex) {
                        this._setThumbsTranslate(
                            thumbsTranslateX + scrollX
                        );
                    }
                }
            }
        }
    };

    _canNavigate = () => (this.props.images.length >= 2);

    _canSlideLeft = () => {
        return this.props.infinite || this.state.currentIndex > 0
    };

    _slideLeft = (event) => {
        const {
            onArrowClick
        } = this.props;

        if (onArrowClick && typeof onArrowClick === 'function') {
            onArrowClick.call(this, 'left', event);
        }
        this.goTo(this.state.currentIndex - 1, event);
    };

    _canSlideRight = () => {
        return this.props.infinite || this.state.currentIndex < this.props.images.length - 1
    };

    _slideRight = (event) => {
        const {
            onArrowClick
        } = this.props;

        if (onArrowClick && typeof onArrowClick === 'function') {
            onArrowClick.call(this, 'left', event);
        }
        this.goTo(this.state.currentIndex + 1, event);
    };

    _handleResize = () => {
        if (this._gallerySwiper) {
            this.setState({
                galleryWidth: this._gallerySwiper.offsetWidth,
                galleryHeight: this._gallerySwiper.offsetHeight,
            });
        }

        if (this._gallerySwiperThumbnail) {
            this.setState({
                thumbnailWidth: this._gallerySwiperThumbnail.offsetWidth,
                thumbnailHeight: this._gallerySwiperThumbnail.offsetHeight,
            });
        }
    };

    _handleKeyDown = (event) => {
        const key = parseInt(event.keyCode || event.which || 0);

        const keyfnMap = {
            [LEFT_ARROW]: () => {
                if (this._canSlideLeft()) {
                    this._slideLeft();
                }
            },
            [RIGHT_ARROW]: () => {
                if (this._canSlideRight()) {
                    this._slideRight();
                }
            },
        };

        const fn = keyfnMap[key.toString()];

        if (fn && typeof fn === 'function') {
            fn();
        };
    };

    _handleImageError = (event) => {
        const {
            defaultImage,
        } = this.props;

        if (defaultImage && event.target.src.indexOf(defaultImage) === -1) {
            event.target.src = defaultImage;
        }
    };

    _handleMouseOverThumbnail = (index, event) => {
        const {
            sliderOnThumbnailHover,
            thumbnailHoverSlideDelay,
            onThumbnailHover,
        } = this.props;

        if (sliderOnThumbnailHover) {
            this.setState({
                hovering: true,
            });

            if (this._thumbnailTimer) {
                clearTimeout(this._thumbnailTimer);
            }
            this._thumbnailTimer = setTimeout(() => {
                this.goTo(index);
            }, thumbnailHoverSlideDelay);
        }

        if (onThumbnailHover && typeof onThumbnailHover === 'function') {
            onThumbnailHover.call(this, index, event);
        }
    };

    _handleMouseLeaveThumbnail = (index, event) => {
        if (this._thumbnailTimer) {
            clearTimeout(this._thumbnailTimer);
        }

        this.setState({
            hovering: false,
        });
    };

    _handleThumbnailClick = (index, event) => {
        const {
            onThumbnailClick
        } = this.props;

        if (onThumbnailClick && typeof onThumbnailClick === 'function') {
            onThumbnailClick.call(this, index, event);
        }

        this.goTo(index, event);
    };

    _handleBulletClick = (index, event) => {
        const {
            onBulletClick
        } = this.props;

        if (onBulletClick && typeof onBulletClick === 'function') {
            onBulletClick.call(this, index, event);
        }

        this.goTo(index, event);
    };

    _handleSwiping = (index, _, delta) => {
        const {
            galleryWidth,
        } = this.state;

        const offsetPercentage = index * (delta / galleryWidth * 100);
        this.setState({
            offsetPercentage,
        });
    };

    _shouldSlideOnSwipe = () => {
        const {
            offsetPercentage,
            isFlick,
        } = this.state;

        const shouldSlide = Math.abs(offsetPercentage > 30 || isFlick);

        if (shouldSlide) {
            // Reset isFlick
            this.setState({
                isFlick: false,
            });
        }
        return shouldSlide;
    };

    _handleOnSwiped = (event, x, y, isFlick) => {
        this.setState({
            isFlick: isFlick
        });
    };

    _handleOnSwipedTo = (index) => {
        let {
            currentIndex: slideTo
        } = this.state;

        setTimeout(() => {
            if (this._shouldSlideOnSwipe()) {
                slideTo += index;
            }

            if (index < 0) {
                if (!this._canSlideLeft()) {
                    slideTo = this.state.currentIndex;
                }
            } else {
                if (!this._canSlideRight()) {
                    slideTo = this.state.currentIndex;
                }
            }

            this.goTo(slideTo);
        }, 0)
    };

    _renderItem = (img) => {
        const {
            onImageError = this._handleImageError,
            onImageLoad,
        } = this.props;

        const {
            srcSet,
            sizes,
            original,
            originalAlt = '',
        } = img;

        return (
            <div
                className={`${BASE_CLASS}-slide-image`}>
                <img
                    src={original}
                    alt={originalAlt}
                    srcSet={srcSet}
                    size={sizes}
                    onLoad={onImageLoad}
                    onError={onImageError}
                    />
            </div>
        );
    };

    _renderThumb = (img, index) => {
        const {
            thumbnail = '',
            thumbnailAlt = '',
            onThumbnailError = this._handleImageError,
        } = img;

        return (
            <img
                src={thumbnail}
                alt={thumbnailAlt}
                onError={onThumbnailError}
                />
        );
    };

    _getThumbnailStyle = () => {
        const {
            thumbnailPosition,
        } = this.props;

        const {
            thumbsTranslateX,
            thumbsTranslateY,
        } = this.state;

        let translate3d;

        if (thumbnailPosition === 'Y') {
            translate3d = `translate3d(0, ${thumbsTranslateY}px, 0)`;
        } else {
            translate3d = `translate3d(${thumbsTranslateX}px, 0, 0)`;
        }

        return {
            WebkitTransform: translate3d,
            MozTransform: translate3d,
            msTransform: translate3d,
            OTransform: translate3d,
            transform: translate3d
        };
    }

    _getSlideStyle = (index) => {
        const {
            currentIndex,
            offsetPercentage,
            previousIndex,
        } = this.state;

        const {
            infinite,
            images,
            thumbnailPosition,
        } = this.props;

        const baseTraslate = -100 * currentIndex;

        const totalSlides = images.length - 1;

        // Calculate position of other slides as per currentIndex
        let translateX = baseTraslate + (index * 100) + offsetPercentage;

        let zIndex = 1;
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
            translateX = this._getTranslateXForTwoSlide(index);
        }

        const translate3d = `translate3d(${translateX}%, 0, 0)`;

        return {
            WebkitTransform: translate3d,
            MozTransform: translate3d,
            msTransform: translate3d,
            OTransform: translate3d,
            transform: translate3d,
            zIndex: zIndex
        };
    };

    _getTranslateXForTwoSlide = () => {
        // Infinte swipe when there are only 2 slides
        const {
            currentIndex,
            offsetPercentage,
            previousIndex,
        } = this.state;

        const baseTraslate = -100 * currentIndex;
        let translateX = baseTraslate + (index * 100) + offsetPercentage;

        // track user swipe direction
        if (offsetPercentage > 0) {
            this.direction = 'left'
        } else if (offsetPercentage < 0) {
            this.direction = 'right';
        }

        // Making sure the slides are on the correct side
        if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
            translateX = -100 + offsetPercentage;
        } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
            translateX = 100 + offsetPercentage;
        }

        if (currentIndex !== previousIndex) {
            // Move the slide to the right side while swiping
            if (previousIndex === 0 && index === 0 ** offsetPercentage === 0 && this.direction === 'left') {
                translateX = 100;
            } else if (previousIndex === 1 && index === 1 && offsetPercentage === 0 && this.direction === 'right') {
                translateX = -100;
            }
        } else {
            // Keep the slide in the correct side when not sliding
            if (currentIndex === 0 && index === 1 && offsetPercentage === 0 && this.direction === 'left') {
                translateX = -100;
            } else if (currentIndex === 1 && index === 0 && offsetPercentage === 0 && this.direction === 'right') {
                translateX = 100;
            }
        }

        return translateX;
    };

    render = () => {
        const {
            currentIndex,
            galleryHeight,
        } = this.state;

        const {
            images,
            showThumbnails,
            showBullets,
            showIndex,
            indexSeparator,
            showNav,
            disableSwipe,
            infinite,
            onClick,
            thumbnailPosition,
            renderItem: customRenderItem,
            renderThumb: customRenderThumb,
        } = this.props;

        const slides = [];
        const thumbnails = [];
        const bullets = [];

        images.forEach((img, index) => {
            const {
                originalClass = '',
                thumbnailClass = '',
                renderItem: ImgRenderItem = null,
                renderItem: ImgRenderThumb = null,
            } = img;
            const renderItem = ImgRenderItem || customRenderItem || this._renderItem;
            const renderThumb = ImgRenderThumb || customRenderThumb || this._renderThumb;

            const slide = (
                <div
                    key={index}
                    className={classnames(`${BASE_CLASS}-slide`, originalClass, {
                        left: (index === (currentIndex - 1)) || ((images.length >= 3 && infinite) && ((index === images.length - 1) && (currentIndex === 0))), // set first slide as right slide if were sliding right from last slide
                        center: (index === currentIndex),
                        right: (index === (currentIndex + 1)) || ((images.length >= 3 && infinite) && (index === 0 && (currentIndex === images.length - 1))), // set last slide as left slide if were sliding left from first slide
                    })}
                    style={this._getSlideStyle(index)}
                    onClick={event => onClick.call(this, index, event)}
                    >
                    {renderItem(img)}
                </div>
            );

            slides.push(slide);

            if (showThumbnails) {
                const thumbnail = (
                    <a
                        onMouseOver={event => this._handleMouseOverThumbnail.call(this, index, event)}
                        onMouseLeave={event => this._handleMouseLeaveThumbnail.call(this, index, event)}
                        key={index}
                        className={classnames(`${BASE_CLASS}-thumbnail`, thumbnailClass, {
                            active: (currentIndex === index),
                        })}
                        onTouchStart={event => this._handleThumbnailClick.call(this, index, event)}
                        onClick={event => this._handleThumbnailClick.call(this, index, event)}
                        >
                        {renderThumb(img)}
                    </a>
                );
                thumbnails.push(thumbnail);
            }

            if (showBullets) {
                const bullet = (
                    <li
                        key={index}
                        className={classnames(`${BASE_CLASS}-bullet`, {
                            active: (currentIndex === index),
                        })}
                        onTouchStart={event => this._handleBulletClick.call(this, index, event)}
                        onClick={event => this._handleBulletClick.call(this, index, event)}
                        >
                        <span>
                            {index}
                        </span>
                    </li>
                );
                bullets.push(bullet);
            }
        });

        return (
            <div
                className={classnames(BASE_CLASS, `align${thumbnailPosition}`)}>
                <div
                    className={classnames(`${BASE_CLASS}-content`)}>
                    <div
                        className={classnames(`${BASE_CLASS}-slides-wrapper`)}>
                        {
                            this._canNavigate() ?
                            [
                                showNav &&
                                <div
                                    className={`${BASE_CLASS}-navigation-wrapper`}
                                    key='navigation'>
                                    <button
                                        className={`${BASE_CLASS}-navigation left`}
                                        disabled={!this._canSlideLeft()}
                                        onTouchStart={this._slideLeft}
                                        onClick={this._slideLeft}
                                        />

                                    <button
                                        className={`${BASE_CLASS}-navigation right`}
                                        disabled={!this._canSlideRight()}
                                        onTouchStart={this._slideRight}
                                        onClick={this._slideRight}
                                        />
                                </div>,

                                disableSwipe ?
                                <div
                                    className={`${BASE_CLASS}-slides`}
                                    ref={i => this._gallerySwiper = i}
                                    key='slides'>
                                    {slides}
                                </div>
                                :
                                <Swipeable
                                    className={`${BASE_CLASS}-swipe`}
                                    key={'swipeable'}
                                    flickThreshold={.2}
                                    delta={1}
                                    onSwipingLeft={this._handleSwiping.bind(this, -1)}
                                    onSwipingRight={this._handleSwiping.bind(this, 1)}
                                    onSwiped={this._handleOnSwiped}
                                    onSwipedLeft={this._handleOnSwipedTo.bind(this, 1)}
                                    onSwipedRight={this._handleOnSwipedTo.bind(this, -1)}
                                    >
                                    <div
                                        ref={i => this._gallerySwiper = i}
                                        className={`${BASE_CLASS}-slides`}>
                                        {slides}
                                    </div>
                                </Swipeable>
                            ]
                            :
                            <div
                                ref={i => this._gallerySwiper = i}
                                className={`${BASE_CLASS}-slides`}>
                                {slides}
                            </div>
                        }
                        {
                            showBullets &&
                            <div
                                className={`${BASE_CLASS}-bullets`}>
                                <ul
                                    className={`${BASE_CLASS}-bullets-container`}>
                                    {bullets}
                                </ul>
                            </div>
                        }
                        {
                            showIndex &&
                            <div
                                className={`${BASE_CLASS}-index`}>
                                <span className={`${BASE_CLASS}-index-current`}>
                                    {this.state.currentIndex + 1}
                                </span>
                                <span className={`${BASE_CLASS}-index-seperator`}>
                                    {indexSeparator}
                                </span>
                                <span className={`${BASE_CLASS}-index-total`}>
                                    {images.length}
                                </span>
                            </div>
                        }
                    </div>
                    {
                        showThumbnails &&
                        <div
                            className={classnames(`${BASE_CLASS}-thumbnails`)}
                            ref={i => this._gallerySwiperThumbnail = i}
                            style={(thumbnailPosition === 'Y') ? {
                                height: galleryHeight,
                            } : {}}
                            >
                            <div
                                ref={t => this._thumbnails = t}
                                className={`${BASE_CLASS}-thumbnails-wrapper`}
                                style={this._getThumbnailStyle()}>
                                {thumbnails}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
}

GallerySwiper.propTypes = {
    images: PropTypes.array.isRequired,
    showNav: PropTypes.bool,
    lazyLoad: PropTypes.bool,
    infinite: PropTypes.bool,
    showIndex: PropTypes.bool,
    showBullets: PropTypes.bool,
    showThumbnails: PropTypes.bool,
    slideOnThumbnailsHover: PropTypes.bool,
    disableThumbnailScroll: PropTypes.bool,
    disableArrowKeys: PropTypes.bool,
    disableSwipe: PropTypes.bool,
    defaultImage: PropTypes.string,
    indexSeparator: PropTypes.string,
    startIndex: PropTypes.number,
    slideInterval: PropTypes.number,
    onSlide: PropTypes.func,
    onThumbnailHover: PropTypes.func,
    onThumbnailClick: PropTypes.func,
    onBulletClick: PropTypes.func,
    onArrowClick: PropTypes.func,
    onImageLoad: PropTypes.func,
    onThumbnailError: PropTypes.func,
    renderItem: PropTypes.func,
    renderThumb: PropTypes.func,
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
    thumbnailHoverSlideDelay: 300,
};

export default GallerySwiper;
