'use strict';

class MaterialToggle extends HTMLInputElement {

    constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
    }

    createdCallback() {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        this.appendChild(checkbox);

        this.createShadowRoot().innerHTML = `
            <style>
                :host{
                }
                ::content input{
                    position: relative;
                    display: inline-block;
                    border: 0;
                    width: 10px;
                    height: 10px;
                    margin: 10px 40px 10px 3px;
                }
                ::content input:before {
                    content: "";
                    position: absolute;
                    display: block;
                    left: -3px;
                    top: -3px;
                    height: 16px;
                    width: 44px;
                    background: white;
                    background-image: linear-gradient(var(--material-checkbox-bg-color, rgb(206,212,218)), var(--material-checkbox-bg-color, rgb(206,212,218)));
                    border-radius: 100px;
                    transition: all 0.3s ease;
                }
                ::content input:after {
                    left: 20px;
                    position: absolute;
                    left: -5px;
                    top: -8px;
                    display: block;
                    width: 26px;
                    height: 26px;
                    border-radius: 100px;
                    background: var(--material-checkbox-knob-color, rgb(255,255,255));
                    box-shadow: var(--material-checkbox-shadow, 0 .2rem .5rem rgba(0,0,0,.15));
                    content: '';
                    transition: all 0.3s ease;
                }
                ::content input:active:after {
                    transform: scale(1.15, 0.85);
                }
                ::content input:checked:before {
                    background-image: linear-gradient(var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)), var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)));
                }
                ::content input:checked:after {
                    left: 20px;
                    background: var(--material-checkbox-highlight-color, rgb(54,79,199));
                }
                ::content input:disabled:before{
                    background: var(--material-checkbox-disabled-bg-color, rgb(241,243,245));
                    pointer-events: none;
                }
                ::content input:disabled:after {
                    background: var(--material-checkbox-disabled-knob-color, rgb(206,212,218));
                    box-shadow: var(--material-checkbox-disabled-shadow, 0 .2rem .5rem rgba(0,0,0,.1));
                }
            </style>
            <div class="material-toggle__checkbox">
                <content></content>
            </div>
        `;
        this.$input = this.querySelector('input');
        // shim shadowDOM styling
        if(WebComponents !== undefined && WebComponents.flags.shadow === true){
            WebComponents.ShadowCSS.shimStyling( this.shadowRoot, 'material-toggle' )
        }
        this.attributesExceptions = [];
        this._transferAttributes();
    }

    /**
     * transfer attributes to input
     */
    _transferAttributes(){
        for(var key of Object.keys(this.attributes)){
            if (this.attributes.hasOwnProperty(key)) {
                this._transferAttribute(this.attributes[key].name, this.attributes[key].value, this.attributesExceptions);
            }
        }
    }
    /**
     * transfer attribute to input
     */
    _transferAttribute(attrName, val, attributesExceptions){
        if(attributesExceptions.indexOf(attrName) === -1){
            this.$input.setAttribute(attrName,val);
        }
    }
}

document.registerElement('material-toggle', MaterialToggle);
