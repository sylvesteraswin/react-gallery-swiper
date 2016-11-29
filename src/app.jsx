import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import GallerySwiper from '../../lib/GallerySwiper';

import BASE_IMAGES from './base.json';
import UPDATED_IMAGES from './update.json';

class App extends Component {
    state = {
        images: BASE_IMAGES,
        updated: false,
    };
    _onImageClick = (index, event) => {
        // console.log(this);
        // console.log(index, event);
    };

    _onThumbnailHover = (index, event) => {
        // console.log(this);
        // console.log(index, event);
    };

    _onArrowClick = (type, index, event) => {
        // console.log(this);
        // console.log(type, index, event);
    };

    _onChangeClick = () => {
        const {
            updated,
        } = this.state;

        if (!updated) {
            this.setState({
                images: UPDATED_IMAGES,
                updated: true,
            });
        } else {
            this.setState({
                images: BASE_IMAGES,
                updated: false,
            });
        }
    };


    render = () => {
        const images = this.state.images;

        return (
            <section
                className="app">
                <GallerySwiper
                    ref={i => this._gallerySwiper = i}
                    images={images}
                    onClick={this._onImageClick}
                    onThumbnailHover={this._onThumbnailHover}
                    onArrowClick={this._onArrowClick}
                    lazyLoad={true}
                    lazyLoadAnimation={true}
                    aspectRatio={'6x4'}
                    thumbnailPosition='Y'
                    />
                <a
                    onClick={this._onChangeClick}
                    className="f6 link dim br2 ba ph3 pv2 mv3 db black tc" href="#0">Change images on the fly</a>
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
