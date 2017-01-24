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

var addClassFromArray = exports.addClassFromArray = function addClassFromArray(el, arr) {
    arr.forEach(function (cls) {
        el.classList.add(cls);
    });
};