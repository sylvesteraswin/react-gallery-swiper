// This is to handle accessing event properties in an asynchronous way
// https://facebook.github.io/react/docs/events.html#syntheticevent
function throttle(func, wait) {
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;

    const later = () => {
        previous = new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    return function() {
        const now = new Date().getTime();
        const remaining = wait - (now - previous);
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
}

function debounceEventHandler(...args) {
    const throttled = throttle(...args);
    return function(event){
        if (event) {
            event.persist();
            return throttled(event);
        }

        return throttled();
    };
}

export { debounceEventHandler as default };
