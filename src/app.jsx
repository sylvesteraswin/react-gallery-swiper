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

    _onArrowClick = (type, index, event) => {
        // console.log(this);
        console.log(type, index, event);
    };

    render = () => {
        const images = [{
            original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
            thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',originalClass: 'featured-slide',
            thumbnailClass: 'featured-thumb',
            originalAlt: 'I am a featured image',
            thumbnailAlt: 'I am the thumbnail for the featured image',
        }, {
            original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
            thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg'
        }, {
            original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
            thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg'
        }, {
            original: '//c3.staticflickr.com/1/498/18386236794_a481d7e3de_h.jpg',
            thumbnail: '//c3.staticflickr.com/1/498/18386236794_658c68e840_n.jpg',
        }, {
            thumbnail: '//c1.staticflickr.com/4/3843/18821118080_e747130e67_n.jpg',
            original: '//c1.staticflickr.com/4/3843/18821118080_2dbd75ed0d_h.jpg',
        }, {
            thumbnail: '//c4.staticflickr.com/1/291/19011882611_bb097a2e32_n.jpg',
            original: '//c4.staticflickr.com/1/291/19011882611_4d2d3ea6a6_h.jpg',
        }, {
            thumbnail: '//c3.staticflickr.com/1/372/18821162370_69ebf8fb48_n.jpg',
            original: '//c3.staticflickr.com/1/372/18821162370_6695093ded_h.jpg',
        }, {
            thumbnail: '//c4.staticflickr.com/1/289/19008921635_a84becdb0e_n.jpg',
            original: '//c4.staticflickr.com/1/289/19008921635_6cf3685e82_h.jpg',
        }, {
            thumbnail: '//c7.staticflickr.com/4/3845/18982702926_a377c961e0_n.jpg',
            original: '//c7.staticflickr.com/4/3845/18982702926_386605b0b3_h.jpg',
        }, {
            thumbnail: '//c6.staticflickr.com/1/270/19008961085_f6c5b698e9_n.jpg',
            original: '//c6.staticflickr.com/1/270/19008961085_511c4585bf_h.jpg',
        }, {
            thumbnail: '//c7.staticflickr.com/1/269/18386402574_4a1e035df3_n.jpg',
            original: '//c7.staticflickr.com/1/269/18386402574_dc420cc416_h.jpg',
        }, {
            thumbnail: '//c6.staticflickr.com/6/5835/21540682461_49a85a664b_n.jpg',
            original: '//c6.staticflickr.com/6/5835/21540682461_b6b11a929d_h.jpg',
        }, {
            thumbnail: '//c6.staticflickr.com/6/5832/21345886989_5d206ac727_n.jpg',
            original: '//c6.staticflickr.com/6/5832/21345886989_e851c48050_h.jpg',
        }];

        return (
            <section
                className="app">
                <GallerySwiper
                    ref={i => this._gallerySwiper = i}
                    images={images}
                    onClick={this._onImageClick}
                    onThumbnailHover={this._onThumbnailHover}
                    onArrowClick={this._onArrowClick}
                    thumbnailPosition='Y'
                    />
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
