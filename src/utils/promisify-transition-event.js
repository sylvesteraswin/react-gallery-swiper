/**
 * This helper sets a transition event on an html element. It returns a promise that resolves when
 * the event is fired. This is useful for cases when you wish to do something after transition
 * has ended.
 */


const EVENT_NAMES = ['webkitTransitionEnd', 'transitionend', 'msTransitionEnd', 'oTransitionEnd'];

/**
 *
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {Function} cb
 * @private
 */
const _removeEventListener = (element, eventName, cb) => {
    element.removeEventListener(eventName, cb);
};

/**
 * Adds an event listener and returns a (bound) function that removes the event listener
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {Function} cb
 * @returns {Function}
 * @private
 */
const _addEventListeners = (element, eventName, cb) => {
    element.addEventListener(eventName, cb);
    return _removeEventListener.bind(this, element, eventName, cb);
};

/**
 * @param {Function} resolve
 * @param {HTMLElement} element
 * @param {Event} event
 * @private
 */
const _transitionHandler = (resolve, element, event, ) => {
    resolve({
        element,
        event,
    });
};

/**
 * Iterates the cleanup list and invokes all the cleanups to remove all listeners
 * @param {Array<Function>} cleanupFnsList
 * @private
 */
const _cleanup = (cleanupFnsList) => {
    cleanupFnsList.forEach(cleanupFn => cleanupFn());
};

/**
 * Takes an html element and return a promise that resolves when a transition event is fired. When
 * timeLimit is provided, the promise will resolve after timeLimit ms regardless of the event.
 * @param {HTMLElement} element
 * @param {number?} timeLimit
 * @returns {Promise<{element: HTMLElement, event?: TransitionEvent}>}
 */
const promisifyTransitionEvent = (element, timeLimit) => {
    return new Promise((resolve, reject) => {

        // Test HTMLElement has addEventListener
        if (!element.addEventListener) {
            reject(new TypeError('element argument has no "addEventListener" method.'));
        }

        let removeEvents;

        // Setup timeout to resolve the promise regardless of the event
        let timeout;
        if (timeLimit) {
            timeout = setTimeout(() => {
                resolve({
                    element,
                });

                // Cleanup
                if (removeEvents) {
                    // Cleanup listeners
                    _cleanup(removeEvents);
                    // Cleanup list of remover functions.
                    removeEvents = null;
                }
                resolve = null;
                reject = null;
            }, timeLimit);
        }

        // Setup a list of remove events.
        removeEvents = EVENT_NAMES
            .map(transitionName => {

                // Create a localized handler
                let handler =  (e) => {
                    _transitionHandler(resolve, element, e);

                    // Cleanup timeout (if exists)
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }

                    // Cleanup listeners
                    _cleanup(removeEvents);
                    // Cleanup list of remover functions.
                    removeEvents = null;
                    handler = null;
                    resolve = null;
                    reject = null;
                };

                // _addEventListeners returns an event remover function, so return it.
                return _addEventListeners(element, transitionName, handler);
            });

    });
};

export {
    promisifyTransitionEvent,
};

