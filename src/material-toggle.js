'use strict';

class MaterialToggle extends HTMLElement {

    constructor() {
        super();
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                :host{
                    display: inline-block;
                    position: relative;
                }
                ::slotted(input){
                    pointer-events: none;
                    position: absolute;
                    left: -100%;
                }
                ::slotted(label){
                    display: block;
                    position: relative;
                    background: transparent;
                    padding-left: 54px;
                }
                .material-toggle__switch{
                    position: absolute;
                    display: block;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                    height: 16px;
                    width: 44px;
                    background: white;
                    background-image: linear-gradient(var(--material-checkbox-bg-color, rgb(206,212,218)), var(--material-checkbox-bg-color, rgb(206,212,218)));
                    border-radius: 100px;
                    transition: all 0.3s ease;
                    pointer-events: none;
                }
                .material-toggle__knob {
                    position: absolute;
                    left: -5px;
                    top: -5px;
                    display: block;
                    width: 26px;
                    height: 26px;
                    border-radius: 100px;
                    background: var(--material-checkbox-knob-color, rgb(255,255,255));
                    box-shadow: var(--material-checkbox-shadow, 0 .2em .5em rgba(0,0,0,.15));
                    content: '';
                    transition: all 0.3s ease;
                }
                :host([checked]) .material-toggle__switch{
                    background-image: linear-gradient(var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)), var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)));
                }
                :host([checked]) .material-toggle__knob {
                    left: 20px;
                    background: var(--material-checkbox-highlight-color, rgb(54,79,199));
                }
                :host([disabled]) .material-toggle__switch{
                    background: var(--material-checkbox-disabled-bg-color, rgb(241,243,245));
                    pointer-events: none;
                }
                :host([disabled]) .material-toggle__knob{
                    background: var(--material-checkbox-disabled-knob-color, rgb(206,212,218));
                    box-shadow: var(--material-checkbox-disabled-shadow, 0 .2em .5em rgba(0,0,0,.1));
                }
                :host(:focus){
                    outline: none;
                }
                :host(:focus) .material-toggle__knob:not(.unfocused){
                    box-shadow: var(--material-checkbox-shadow, 0 .2em .5em rgba(0,0,0,.15)), 0 0 0 .7em rgba(0,0,0,.15);
                }
                :host([checked]:focus) .material-toggle__knob:not(.unfocused){
                    box-shadow: var(--material-checkbox-shadow, 0 .2em .5em rgba(0,0,0,.15)), 0 0 0 .7em var(--material-checkbox-semi-highlight-color, rgba(54,79,199,.25));
                }
            </style>
            <slot></slot>
            <div class="material-toggle__switch">
                <div class="material-toggle__knob" draggable="true"></div>
            </div>
        `;
    }

    connectedCallback() {
        // get elements
        this.$knob = this.shadowRoot.querySelector('.material-toggle__knob');
        this.$label = document.createElement('label');
        this.$label.innerHTML = `
            <input type="checkbox" style="position: absolute; opacity: 0; pointer-events: none;" />
            <div class="material-toggle__label">${this.innerHTML}</div>
        `;
        // remove potential label from slot as it is added above
        this.innerHTML = '';
        this.appendChild(this.$label);
        this.$checkbox = this.querySelector('input');
        // reset disabled
        this.disabled = this.disabled;
        this.checked = this.checked;
        // add events
        this._addEvents();
    }

    _addEvents(){
        // add event
        this.$checkbox.addEventListener('change',function(e){
            this._toggleAttr(this, 'checked', e.target.checked);
        }.bind(this));
        // toggle checkbox in space
        this.addEventListener('keydown',function(e){
            // space
            if(e.keyCode === 32){
                this._toggleAttr(this, 'checked', !e.target.checked);
            }
        });
        // submit form on return
        this.addEventListener('keydown',function(e){
            // return
            if(e.keyCode === 13){

            }
        });
        // remove focus on click
        this.$label.addEventListener('mousedown', function(){
            this.$knob.classList.add('unfocused');
        }.bind(this));
        // add focus on mouse event
        this.$label.addEventListener('keydown', function(){
            this.$knob.classList.remove('unfocused');
        }.bind(this));
    }

    static get observedAttributes() {
        return ['disabled', 'checked', 'validity'];
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        if (this.disabled) {
            this.setAttribute('tabindex', '-1');
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.setAttribute('tabindex', '0');
            this.setAttribute('aria-disabled', 'false');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of `disabled` as an attribute.
        if (val) {
            this.setAttribute('disabled', '');
            this.$checkbox.setAttribute('disabled','');
        } else {
            this.removeAttribute('disabled');
            this.$checkbox.removeAttribute('disabled');
        }
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
            this.$checkbox.setAttribute('checked','');
        } else {
            this.removeAttribute('checked');
            this.$checkbox.removeAttribute('checked');
        }
    }

    set validity(val) {
        // Reflect the value of `validity` as an attribute.
        if (val === true || val === false) {
            this.setAttribute('validity', val);
        } else {
            this.removeAttribute('validity');
        }
    }

    get validity() {
        return this.getAttribute('validity');
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
            if(attrName === 'id'){
                this.removeAttribute('id');
            }
        }
    }
    /**
     * toggle attribute
     */
    _toggleAttr(el, attr, condition, value = ''){
        if(condition === true){
            return el.setAttribute(attr,value);
        }else{
            return el.removeAttribute(attr);
        }
    }
}

customElements.define('material-toggle', MaterialToggle);
