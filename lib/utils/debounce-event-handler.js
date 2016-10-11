Object.defineProperty(exports, "__esModule", {
    value: true
});
// This is to handle accessing event properties in an asynchronous way
// https://facebook.github.io/react/docs/events.html#syntheticevent
function throttle(func, wait) {
    var context = void 0;
    var args = void 0;
    var result = void 0;
    var timeout = null;
    var previous = 0;

    var later = function later() {
        previous = new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    return function () {
        var now = new Date().getTime();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

function debounceEventHandler() {
    var throttled = throttle.apply(undefined, arguments);
    return function (event) {
        if (event) {
            event.persist();
            return throttled(event);
        }

        return throttled();
    };
};

exports.default = debounceEventHandler;