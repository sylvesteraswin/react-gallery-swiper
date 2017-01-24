Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Takes a source string and returns a promise which resolves on a loaded image.
 * @param {string} src
 * @returns {Promise<Image>}
 */
var createNewImage = function createNewImage(src) {
    return new Promise(function (resolve, reject) {
        var image = new Image();

        var _cleanup = void 0;

        var resolveHandler = function resolveHandler() {
            resolve(image);

            if (_cleanup) {
                _cleanup();
            }
        };

        var rejectHandler = function rejectHandler(error) {
            reject({
                error: error,
                image: image
            });
            if (_cleanup) {
                _cleanup();
            }
        };

        _cleanup = function cleanup() {
            image.removeEventListener('load', resolveHandler);
            image.removeEventListener('error', rejectHandler);
            image.removeEventListener('abort', rejectHandler);
            resolveHandler = null;
            rejectHandler = null;
            _cleanup = null;
            resolve = null;
            reject = null;
        };

        image.addEventListener('load', resolveHandler, { once: true });
        image.addEventListener('error', rejectHandler, { once: true });
        image.addEventListener('abort', rejectHandler, { once: true });

        image.src = src;
    });
};

exports.createNewImage = createNewImage;