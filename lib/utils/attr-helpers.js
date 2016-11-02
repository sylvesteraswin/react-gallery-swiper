Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Apply styles to an element with an object.
 */
var applyStyles = exports.applyStyles = function applyStyles(styles, node) {
    var noValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (styles && node) {
        for (var s in styles) {
            if (styles.hasOwnProperty(s)) {
                node.style[s] = !noValue ? styles[s] : null;
            }
        }
    }
};

var getClassAsArray = exports.getClassAsArray = function getClassAsArray(el) {
    if (!el) {
        return [];
    }
    var originalClass = el.className;
    var originalClassArray = originalClass.split(' ');
    return originalClassArray;
};

var addClassFromArray = exports.addClassFromArray = function addClassFromArray(el, arr) {
    if (el) {
        el.className = arr.join(' ').trim();
    }
};

var pushUniqueStringToArray = exports.pushUniqueStringToArray = function pushUniqueStringToArray(arr, string) {
    if (Array.isArray(arr) && !arr.includes(string)) {
        arr.push(string);
    }
};

var removeStringFromArray = exports.removeStringFromArray = function removeStringFromArray(arr, string) {
    if (Array.isArray(arr) && arr.includes(string)) {
        arr.splice(arr.indexOf(string), 1);
    }
};