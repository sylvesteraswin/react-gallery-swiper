# React Gallery Swiper

Responsive react component for creating image carousels.

Features
* Mobile friendly
* Navigation with thumbnails
* Custom render your slides

## Getting started

```
npm install react-gallery-swiper
```

### Example
[`example/src/app.jsx`](https://github.com/sylvesteraswin/react-gallery-swiper/tree/master/example/src)
```js
import GallerySwiper from 'react-gallery-swiper';

class App extends React.Component {
    handleImageLoad = (event) => {
        console.log('Image loaded ', event.target);
    };

    render = () => {
        const images = [{
            original: 'http://c7.staticflickr.com/4/3868/18982735806_b80b024040_h.jpg',
            thumbnail: 'http://c7.staticflickr.com/4/3868/18982735806_cd60bcdb69_n.jpg',
            originalClass: 'featured-slide',
            thumbnailClass: 'featured-thumb',
            originalAlt: 'I am a featured image',
            thumbnailAlt: 'I am the thumbnail for the featured image',
        }, {
            original: 'http://c5.staticflickr.com/1/292/19003529492_214a7e3777_h.jpg',
            thumbnail: 'http://c5.staticflickr.com/1/292/19003529492_226031f2c1_n.jpg'
        }, {
            original: 'http://c6.staticflickr.com/4/3802/19009038565_c197845618_h.jpg',
            thumbnail: 'http://c6.staticflickr.com/4/3802/19009038565_17e2e21b22_n.jpg'
        }];

        return (
            <GallerySwiper
                ref={i => this._gallerySwiper = i}
                images={images}
                onImageLoad={this.handleImageLoad}
                />
        );
    };
}
```

# Props

* `images` (required) Array of objects.
* `infinite`: Boolean, default `true`.

#Functions
* `whereAmI()`: returns the current index.

# Mentions
Thanks to ['https://github.com/xiaolin'](@xialin), you were the inspiration behind this project.

# Build the example locally
```
git clone https://github.com/sylvesteraswin/react-gallery-swiper
npm install
npm start
```

Then open [`localhost:4000`](http://localhost:4000) in a browser.

# License

MIT

# Collaboration
Feel free to contribute and or provide feedback.
