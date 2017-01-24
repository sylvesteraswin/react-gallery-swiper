/**
 *
 * Takes a source string and returns a promise which resolves on a loaded image.
 * @param {string} src
 * @returns {Promise<Image>}
 */
const createNewImage = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();

        let cleanup;

        let resolveHandler = () => {
            resolve(image);

            if (cleanup) {
                cleanup();
            }
        };

        let rejectHandler = (error) => {
            reject({
                error,
                image,
            });
            if (cleanup) {
                cleanup();
            }
        };

        cleanup = () => {
            image.removeEventListener('load', resolveHandler);
            image.removeEventListener('error', rejectHandler);
            image.removeEventListener('abort', rejectHandler);
            resolveHandler = null;
            rejectHandler = null;
            cleanup = null;
            resolve = null;
            reject = null;
        };

        image.addEventListener('load', resolveHandler, { once: true });
        image.addEventListener('error', rejectHandler, { once: true });
        image.addEventListener('abort', rejectHandler, { once: true });


        image.src = src;
    });
};

export {
    createNewImage,
};