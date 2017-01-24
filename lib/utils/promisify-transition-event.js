Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * This helper sets a transition event on an html element. It returns a promise that resolves when
 * the event is fired. This is useful for cases when you wish to do something after transition
 * has ended.
 */

var EVENT_NAMES = ['webkitTransitionEnd', 'transitionend', 'msTransitionEnd', 'oTransitionEnd'];

/**
 *
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {Function} cb
 * @private
 */
var _removeEventListener = function _removeEventListener(element, eventName, cb) {
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
var _addEventListeners = function _addEventListeners(element, eventName, cb) {
    element.addEventListener(eventName, cb);
    return _removeEventListener.bind(undefined, element, eventName, cb);
};

/**
 * @param {Function} resolve
 * @param {HTMLElement} element
 * @param {Event} event
 * @private
 */
var _transitionHandler = function _transitionHandler(resolve, element, event) {
    resolve({
        element: element,
        event: event
    });
};

/**
 * Iterates the cleanup list and invokes all the cleanups to remove all listeners
 * @param {Array<Function>} cleanupFnsList
 * @private
 */
var _cleanup = function _cleanup(cleanupFnsList) {
    cleanupFnsList.forEach(function (cleanupFn) {
        return cleanupFn();
    });
};

/**
 * Takes an html element and return a promise that resolves when a transition event is fired. When
 * timeLimit is provided, the promise will resolve after timeLimit ms regardless of the event.
 * @param {HTMLElement} element
 * @param {number?} timeLimit
 * @returns {Promise<{element: HTMLElement, event?: TransitionEvent}>}
 */
var promisifyTransitionEvent = function promisifyTransitionEvent(element, timeLimit) {
    return new Promise(function (resolve, reject) {

        // Test HTMLElement has addEventListener
        if (!element.addEventListener) {
            reject(new TypeError('element argument has no "addEventListener" method.'));
        }

        var removeEvents = void 0;

        // Setup timeout to resolve the promise regardless of the event
        var timeout = void 0;
        if (timeLimit) {
            timeout = setTimeout(function () {
                resolve({
                    element: element
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
        removeEvents = EVENT_NAMES.map(function (transitionName) {

            // Create a localized handler
            var _handler = function handler(e) {
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
                _handler = null;
                resolve = null;
                reject = null;
            };

            // _addEventListeners returns an event remover function, so return it.
            return _addEventListeners(element, transitionName, _handler);
        });
    });
};

exports.promisifyTransitionEvent = promisifyTransitionEvent;