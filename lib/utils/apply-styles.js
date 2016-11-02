Object.defineProperty(exports, "__esModule", {
    value: true
});
var applyStyles = function applyStyles(styles, node) {
    var noValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (styles && node) {
        for (var s in styles) {
            if (styles.hasOwnProperty(s)) {
                node.style[s] = !noValue ? styles[s] : null;
            }
        }
    }
};

exports.default = applyStyles;