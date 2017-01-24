/**
 * Apply styles to an element with an object.
 */
export const applyStyles = (styles, node, noValue = false) => {
    if (styles && node) {
        for (const s in styles) {
            if (styles.hasOwnProperty(s)) {
                node.style[s] = !noValue ? styles[s] : null;
            }
        }
    }
};

export const addClassFromArray = (el, arr) => {
    arr.forEach((cls) => {
        el.classList.add(cls);
    });
};
