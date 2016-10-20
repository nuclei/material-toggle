'use strict';

class MaterialToggle extends HTMLElement {

    // Can define constructor arguments if you wish.
    constructor() {
      // If you define a ctor, always call super() first!
      // This is specific to CE and required by the spec.
      super();
      this.click(function(){
          this.querySelector('input').checked = 'checked';
      }.bind(this));
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
          <style>
            :host{
            }
            ::slotted(input){
                pointer-events: none;
                position: absolute;
                left: -100%;
            }
            label{
                display: block;
                position: relative;
                width: 20px;
                height: 30px;
                background: red;
            }
              ::slotted(input::before) {
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
              ::slotted(input)::slotted(:after) {
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
              ::slotted(input):active:after {
                  transform: scale(1.15, 0.85);
              }
              ::slotted(input):checked:before {
                  background-image: linear-gradient(var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)), var(--material-checkbox-highlight-color, rgba(54,79,199,0.5)));
              }
              ::slotted(input):checked:after {
                  left: 20px;
                  background: var(--material-checkbox-highlight-color, rgb(54,79,199));
              }
              ::slotted(input):disabled:before{
                  background: var(--material-checkbox-disabled-bg-color, rgb(241,243,245));
                  pointer-events: none;
              }
              ::slotted(input):disabled:after {
                  background: var(--material-checkbox-disabled-knob-color, rgb(206,212,218));
                  box-shadow: var(--material-checkbox-disabled-shadow, 0 .2rem .5rem rgba(0,0,0,.1));
              }
          </style>
          <label class="material-toggle__switch"><slot></slot></label>
      `;

      //
    //   this.$input = this.querySelector('input');
    }

    connectedCallback() {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        this.appendChild(checkbox);
        // shim shadowDOM styling
        // if(WebComponents !== undefined && WebComponents.flags.shadow === true){
        //     WebComponents.ShadowCSS.shimStyling( this.shadowRoot, 'material-toggle' )
        // }
        // this.attributesExceptions = [];
        // this._transferAttributes();
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
}
customElements.define('material-toggle', MaterialToggle);
