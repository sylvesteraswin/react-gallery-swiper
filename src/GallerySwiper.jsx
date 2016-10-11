import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Swipeable from 'react-swipeable';
import LazyLoad from 'react-lazyload';

const BASE_CLASS = 'zvui-gallery-swiper';

class GallerySwiper extends Component {
    state = {
        currentIndex: 0,
        thumbsTranslateX: 0,
        thumbsTranslateY: 0,
        offsetPercentage: 0,
        galleryWidth: 0,
        thumbnailWidth: 0,
    };

    componentWillReceiveProps = (nextProps) => {

    };

    componentDidUpdate = (prevProps, prevState) => {

    };

    componentWillMount = () => {
        this.setState({
            currentIndex: this.props.startIndex,
        });
    };

    componentDidMount = () => {

    };

    componentWillUnMount = () => {

    };

    goTo = (index, event) => {

    };

    whereAmI = () => {

    };

    _canNavigate = () => (this.props.images.length >= 2);

    _canSlideLeft = () => (this.props.infinite || this.state.currentIndex > 0);

    _slideLeft = (event) => {
        this.goTo(this.state.currentIndex - 1, event);
    };

    _canSlideRight = () => (this.props.infinite || this.state.currentIndex < this.props.images.length - 1);

    _slideRight = (event) => {
        this.goTo(this.state.currentIndex + 1, event);
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

        if (onThumbnailHover) {
            onThumbnailHover.call(this, index, event);
        }
    };

    _handleMouseLeaveThumbnails = (index, event) => {
        if (this._thumbnailTimer) {
            clearTimeout(this._thumbnailTimer);
        }

        this.setState({
            hovering: false,
        });
    };

    _handleThumbnailClick = (index, event) => {
        
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
        } = img;

        return (
            <img />
        );
    };

    render = () => {
        const {
            currentIndex,
        } = this.state;

        const {
            images,
            showThumbnails,
            showNav,
            disableSwipe,
            infinite,
            onClick,
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
                        renderThumb(img)
                    </a>
                );
                thumbnails.push(thumbnail);
            }
        });


        return (
            <div
                className={classnames(BASE_CLASS)}>
                <div
                    className={classnames(`${BASE_CLASS}-content`)}>
                    <div
                        className={classnames(`${BASE_CLASS}-wrapper`)}>
                        Hello World!!
                        {
                            this._canNavigate() ?
                            [
                                showNav &&
                                <div
                                    className={`${BASE_CLASS}-navigation`}
                                    key='navigation'>
                                    <button
                                        className={`${BASE_CLASS}-navigation-left`}
                                        disabled={this._canSlideLeft()}
                                        onTouchStart={this._slideLeft}
                                        onClick={this._slideLeft}
                                        />

                                    <button
                                        className={`${BASE_CLASS}-navigation-right`}
                                        disabled={this._canSlideRight()}
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
                    </div>
                    {
                        showThumbnails &&
                        <div
                            className={classnames(`${BASE_CLASS}-thumbnails`)}>
                            {thumbnails}
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
    indexSeperate: PropTypes.string,
    startIndex: PropTypes.number,
    slideInterval: PropTypes.number,
    onSlide: PropTypes.func,
    onThumbnailHover: PropTypes.func,
    onThumbnailClick: PropTypes.func,
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
    indexSeperate: ' : ',
    startIndex: 0,
    slideInterval: 3000,
    thumbnailPosition: 'X',
    thumbnailHoverSlideDelay: 300,
};

export default GallerySwiper;
