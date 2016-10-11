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
                    keyDown,
                } = this.state.events

                if (keyDown) {
                    removeEvent(keyDown);
                }
            } else {
                addEvent(window, 'keydown', this._handleKeyDown, this);
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
    };

    componentWillUnMount = () => {

    };

    goTo = (index, event) => {

    };

    whereAmI = () => {

    };

    _setThumbsTranslate = (thumbsTranslate) => {
        const {
            thumbnailPosition,
        } = this.props;

        if (thumbnailPosition === 'Y') {
            this.setState({
                thumbsTranslateX: thumbsTranslate,
            });
        } else {
            this.setState({
                thumbsTranslateY: thumbsTranslate,
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
                const totalScrollY = this._thumbnails.scrollHeight - thumbnailWidth;

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
        this.goTo(this.state.currentIndex - 1, event);
    };

    _canSlideRight = () => {
        return this.props.infinite || this.state.currentIndex < this.props.images.length - 1
    };

    _slideRight = (event) => {
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
        const key = parseINt(event.keyCode || event.which || 0);

        const keyfnMap = {
            LEFT_ARROW: () => {
                console.log('LEFT ARROW');
                if (this._canSlideLeft()) {
                    this._slideLeft();
                }
            },
            RIGHT_ARROW: () => {
                console.log('RIGHT ARROW');
                if (this._canSlideRight()) {
                    this._slideRight();
                }
            },
        };

        if (keyfnMap[key]) {
            keyfnMap[key]();
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

        this.setState({
            hovering: true,
        });

        if (this._thumbnailTimer) {
            clearTimeout(this._thumbnailTimer);
        }
        this._thumbnailTimer = setTimeout(() => {
            this.goTo(index);
        }, thumbnailHoverSlideDelay);

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

    _handleSwiping = (index) => {
        const {
            currentIndex
        } = this.state;

        // if (this.)
    };

    _shouldSlideOnSwipe = () => {
        // const
    };

    _handleSwiping = (index, _, delta) => {
        const {
            galleryWidth
        } = this.state;
        const offsetPercentage = index * (delta / galleryWidth * 100);
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

    render = () => {
        const {
            currentIndex,
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
                ref={i => this._gallerySwiper = i}
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
                                    onSwiper={this._handleSwiping}
                                    onSwipedLeft={this._handleSwiping.bind(this, 1)}
                                    onSwipedRight={this._handleSwiping.bind(this, -1)}
                                    >
                                    <div
                                        className={`${BASE_CLASS}-slides`}>
                                        {slides}
                                    </div>
                                </Swipeable>
                            ]
                            :
                            <div
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
                            ref={i => this._gallerySwiperThumbnail = i}>
                            <div
                                ref={t => this._thumbnails = t}
                                className={`${BASE_CLASS}-thumbnails-wrapper`}>
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
