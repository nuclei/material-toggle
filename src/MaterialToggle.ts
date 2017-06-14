/* global HTMLElement HTMLFormElement HTMLBodyElement */
'use strict'

import { makeTemplate } from '../node_modules/make-template/dist/makeTemplate.js'
declare const ShadyCSS // eslint-disable-line no-unused-vars
/**
 * transfer attributes to input
 */
const _transferAttributes = function (ce, element, allowed) {
  allowed.forEach(function (attrName) {
    if (ce.hasAttribute(attrName)) {
      element.setAttribute(attrName, ce.getAttribute(attrName) || '')
      ce.removeAttribute(attrName)
    }
  })
}

/**
 * get parent form
 */
const _getParentForm = function (current) {
  if (current.parentElement === null) return
  current = current.parentElement
    // return form
  if (current.constructor === HTMLFormElement) return current // eslint-disable-line no-undef
    // return false on body
  if (current.constructor === HTMLBodyElement) return false // eslint-disable-line no-undef
    // dig one level deeper
  return _getParentForm(current)
}

var template = makeTemplate`<style>
    :host{
        display: inline-block;
        position: relative;
        --material-checkbox-highlight-color: var(--accent-color, rgba(54,79,199,1));
        --material-checkbox-highlight-overlay-color: var(--material-checkbox-highlight-overlay, rgba(255,255,255,0.75))
    }
    :host ::slotted(input){
        pointer-events: none;
        position: absolute;
        left: -100%;
    }
    :host ::slotted(label){
        display: block;
        min-width: 0px;
        min-height: 18px;
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
        background-image:
        linear-gradient(var(--material-checkbox-highlight-overlay-color), var(--material-checkbox-highlight-overlay-color)),
        linear-gradient(var(--material-checkbox-highlight-color), var(--material-checkbox-highlight-color));
    }
    :host([checked]) .material-toggle__knob {
        left: 20px;
        background: var(--material-checkbox-highlight-color);
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
`

/**
 * A simple (boolean) material toggle based on a checkbox, which works in a normal html form
 */
export class MaterialToggle extends HTMLElement { // eslint-disable-line no-undef
  /* Typescript: declare variables */
  private _knob: any = null // eslint-disable-line no-undef
  private _label: any = null // eslint-disable-line no-undef
  private _checkbox: any = null // eslint-disable-line no-undef

  constructor () {
    super()
        // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'})
    // check if polyfill is used
    if (typeof ShadyCSS !== 'undefined') {
      ShadyCSS.prepareTemplate(template, 'material-toggle') // eslint-disable-line no-undef
      ShadyCSS.styleElement(this) // eslint-disable-line no-undef
    }
    shadowRoot.appendChild(document.importNode(template.content, true))
  }

  connectedCallback () {
    // get elements
    this._knob = this.shadowRoot.querySelector('.material-toggle__knob')
    this._label = document.createElement('label')
    this._label.innerHTML = `
            <input type="checkbox" tabindex="-1" style="position: absolute; opacity: 0; pointer-events: none;"/>
            <div class="material-toggle__label">${this.innerHTML}</div>
        `
        // remove potential label from slot as it is added above
    this.innerHTML = ''
    this.appendChild(this._label)
    this._checkbox = this.querySelector('input')

    _transferAttributes(this, this._checkbox, [
      'name',
      'required',
      'autofocus'
    ])
        // reset values
    this.disabled = this.disabled
    this.checked = this.checked
        // add events
    this._addEvents()
  }

  _addEvents () {
        // add event
    this._checkbox.addEventListener('change', function (e) {
      this.checked = e.target.checked
    }.bind(this))
        // move focus to main element if checkbox is focused
    this._checkbox.addEventListener('focus', function () {
      this.focus()
    }.bind(this))
        // toggle checkbox in space
    this.addEventListener('keydown', function (e) {
            // space
      if (e.keyCode === 32) {
        this.checked = !this._checkbox.checked
      }
    }.bind(this))
        // submit form on return
    this.addEventListener('keydown', function (e) {
      var $form = _getParentForm(e.target)
      if ($form === undefined) return
            // return
      if (e.keyCode === 13) {
        if ($form.checkValidity()) {
          $form.submit()
        } else if ($form.querySelector('[type="submit"]') !== null) {
                    // needed to trigger validation
          $form.querySelector('[type="submit"]').click()
        }
        return
      }
    })
        // remove focus on click
    this._label.addEventListener('mousedown', function () {
      this._knob.classList.add('unfocused')
    }.bind(this))
        // add focus on mouse event
    this._label.addEventListener('keydown', function () {
      this._knob.classList.remove('unfocused')
    }.bind(this))
  }

  static get observedAttributes () {
    return ['disabled', 'checked', 'validity']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    if (this.disabled) {
      this.setAttribute('tabindex', '-1')
      this.setAttribute('aria-disabled', 'true')
    } else {
      this.setAttribute('tabindex', '0')
      this.setAttribute('aria-disabled', 'false')
    }
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  set disabled (val) {
    // Reflect the value of `disabled` as an attribute.
    if (val) {
      this.setAttribute('disabled', '')
      this._checkbox.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
      this._checkbox.removeAttribute('disabled')
    }
  }

  get checked () {
    return this.hasAttribute('checked')
  }

  set checked (val) {
    if (val) {
      this.setAttribute('checked', '')
      if (this._checkbox !== undefined) {
        this._checkbox.setAttribute('checked', '')
      }
    } else {
      this.removeAttribute('checked')
      if (this._checkbox !== undefined) {
        this._checkbox.removeAttribute('checked')
      }
    }
  }

  set active (val: boolean) {
    // Reflect the value of `validity` as an attribute.
    if (val === true) {
      this.setAttribute('validity', 'true')
    } else if (val === false) {
      this.removeAttribute('validity')
    }
  }

  get validity () {
    return this.getAttribute('validity') === 'true'
  }
}
