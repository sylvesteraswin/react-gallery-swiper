import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import GallerySwiper from '../../lib/GallerySwiper';

class App extends Component {
    _onImageClick = (index, event) => {
        console.log(this);
        console.log(index, event);
    };

    _onThumbnailHover = (index, event) => {
        console.log(this);
        console.log(index, event);
    };

    _onThumbnailClick = (index, event) => {
        console.log(this);
        console.log(index, event);
    };

    render = () => {
        const images = [{
            original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
            thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg'
        }, {
            original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
            thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg'
        }, {
            original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
            thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg'
        }];

        return (
            <section
                className="app">
                <GallerySwiper
                    ref={i => this._gallerySwiper = i}
                    images={images}
                    showBullets={true}
                    showIndex={true}
                    onClick={this._onImageClick}
                    onThumbnailHover={this._onThumbnailHover}
                    onThumbnailClick={this._onThumbnailClick}
                    thumbnailPosition={'Y'}
                    />
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
