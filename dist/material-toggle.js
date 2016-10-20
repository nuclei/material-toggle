'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaterialToggle = function (_HTMLInputElement) {
    _inherits(MaterialToggle, _HTMLInputElement);

    function MaterialToggle() {
        _classCallCheck(this, MaterialToggle);

        return _possibleConstructorReturn(this, (MaterialToggle.__proto__ || Object.getPrototypeOf(MaterialToggle)).call(this)); // always call super() first in the ctor. This also calls the extended class' ctor.
    }

    _createClass(MaterialToggle, [{
        key: 'createdCallback',
        value: function createdCallback() {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            this.appendChild(checkbox);

            this.createShadowRoot().innerHTML = '\n            <style>\n                :host{\n                }\n                ::content input{\n                    position: relative;\n                    display: inline-block;\n                    border: 0;\n                    margin: 10px 35px 10px 3px;\n                }\n                ::content input:before {\n                    content: "";\n                    position: absolute;\n                    display: block;\n                    left: -3px;\n                    top: -3px;\n                    height: 16px;\n                    width: 44px;\n                    background: white;\n                    background-image: linear-gradient(var(--material-checkbox-bg-color, rgb(206,212,218)), var(--material-checkbox-bg-color, rgb(206,212,218)));\n                    border-radius: 100px;\n                    transition: all 0.3s ease;\n                }\n                ::content input:after {\n                    left: 20px;\n                    position: absolute;\n                    left: -5px;\n                    top: -8px;\n                    display: block;\n                    width: 26px;\n                    height: 26px;\n                    border-radius: 100px;\n                    background: var(--material-checkbox-knob-color, rgb(255,255,255));\n                    box-shadow: var(--material-checkbox-shadow, 0 .2rem .5rem rgba(0,0,0,.15));\n                    content: \'\';\n                    transition: all 0.3s ease;\n                }\n                ::content input:active:after {\n                    transform: scale(1.15, 0.85);\n                }\n                ::content input:checked:before {\n                    background-image: linear-gradient(var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)), var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)));\n                }\n                ::content input:checked:after {\n                    left: 20px;\n                    background: var(--material-checkbox-highlight-color, rgb(54,79,199));\n                }\n                ::content input:disabled:before{\n                    background: var(--material-checkbox-disabled-bg-color, rgb(241,243,245));\n                    pointer-events: none;\n                }\n                ::content input:disabled:after {\n                    background: var(--material-checkbox-disabled-knob-color, rgb(206,212,218));\n                    box-shadow: var(--material-checkbox-disabled-shadow, 0 .2rem .5rem rgba(0,0,0,.1));\n                }\n            </style>\n            <content></content>\n        ';
            this.$input = this.querySelector('input');
            // shim shadowDOM styling
            if (WebComponents !== undefined && WebComponents.flags.shadow === true) {
                WebComponents.ShadowCSS.shimStyling(this.shadowRoot, 'material-toggle');
            }
            this.attributesExceptions = [];
            this._transferAttributes();
        }

        /**
         * transfer attributes to input
         */

    }, {
        key: '_transferAttributes',
        value: function _transferAttributes() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (this.attributes.hasOwnProperty(key)) {
                        this._transferAttribute(this.attributes[key].name, this.attributes[key].value, this.attributesExceptions);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        /**
         * transfer attribute to input
         */

    }, {
        key: '_transferAttribute',
        value: function _transferAttribute(attrName, val, attributesExceptions) {
            if (attributesExceptions.indexOf(attrName) === -1) {
                this.$input.setAttribute(attrName, val);
                if (attrName === 'id') {
                    this.removeAttribute('id');
                }
            }
        }
    }]);

    return MaterialToggle;
}(HTMLInputElement);

document.registerElement('material-toggle', MaterialToggle);
//# sourceMappingURL=material-toggle.js.map
