'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (el, attr, condition) {
    var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    if (condition === true) {
        return el.setAttribute(attr, value);
    } else {
        return el.removeAttribute(attr);
    }
};
//# sourceMappingURL=toggle-attribute.js.map
