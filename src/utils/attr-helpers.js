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

export const getClassAsArray = (el) => {
    if (!el) {
        return [];
    }
    const originalClass = el.className;
    const originalClassArray = originalClass.split(' ');
    return originalClassArray;
};

export const addClassFromArray = (el, arr) => {
    if (el) {
        el.className = arr.join(' ').trim();
    }
};

export const pushUniqueStringToArray = (arr, string) => {
    if (Array.isArray(arr) && !arr.includes(string)) {
        arr.push(string);
    }
};

export const removeStringFromArray = (arr, string) => {
    if (Array.isArray(arr) && arr.includes(string)) {
        arr.splice(arr.indexOf(string), 1);
    }
};
