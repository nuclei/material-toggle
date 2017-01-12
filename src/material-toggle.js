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
  current = current.parentElement
    // return form
  if (current.constructor === HTMLFormElement) return current // eslint-disable-line no-undef
    // return false on body
  if (current.constructor === HTMLBodyElement) return false // eslint-disable-line no-undef
    // dig one level deeper
  return _getParentForm(current)
}

const makeTemplate = function (strings, ...substs) {
  var html = ''
  for (let i = 0; i < substs.length; i++) {
    html += strings[i]
    html += substs[i]
  }
  html += strings[strings.length - 1]
  var template = document.createElement('template')
  template.innerHTML = html
  return template
}

var template = makeTemplate`<style>
    :host{
        display: inline-block;
        position: relative;
        --material-checkbox-highlight-color: var(--accent-color, rgba(54,79,199,1));
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
        linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),
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

ShadyCSS.prepareTemplate(template, 'material-toggle') // eslint-disable-line no-undef
/**
 * A simple (boolean) material toggle based on a checkbox, which works in a normal html form
 */
class MaterialToggle extends HTMLElement { // eslint-disable-line no-undef

  constructor () {
    super()
        // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'})
    ShadyCSS.applyStyle(this) // eslint-disable-line no-undef
    shadowRoot.appendChild(document.importNode(template.content, true))
  }

  connectedCallback () {
        // get elements
    this.$knob = this.shadowRoot.querySelector('.material-toggle__knob')
    this.$label = document.createElement('label')
    this.$label.innerHTML = `
            <input type="checkbox" tabindex="-1" style="position: absolute; opacity: 0; pointer-events: none;"/>
            <div class="material-toggle__label">${this.innerHTML}</div>
        `
        // remove potential label from slot as it is added above
    this.innerHTML = ''
    this.appendChild(this.$label)
    this.$checkbox = this.querySelector('input')

    _transferAttributes(this, this.$checkbox, [
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
    this.$checkbox.addEventListener('change', function (e) {
      this.checked = e.target.checked
    }.bind(this))
        // move focus to main element if checkbox is focused
    this.$checkbox.addEventListener('focus', function () {
      this.focus()
    }.bind(this))
        // toggle checkbox in space
    this.addEventListener('keydown', function (e) {
            // space
      if (e.keyCode === 32) {
        this.checked = !this.$checkbox.checked
      }
    }.bind(this))
        // submit form on return
    this.addEventListener('keydown', function (e) {
      var $form = _getParentForm(e.target)
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
    this.$label.addEventListener('mousedown', function () {
      this.$knob.classList.add('unfocused')
    }.bind(this))
        // add focus on mouse event
    this.$label.addEventListener('keydown', function () {
      this.$knob.classList.remove('unfocused')
    }.bind(this))
  }

  static get observedAttributes () {
    return [
            /** @type {boolean} When given the element is totally inactive */
      'disabled',
            /** @type {boolean} When given the element is set to active */
      'checked',
            /** @type {true|false} When given, sets the validity state */
      'validity'
    ]
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
      this.$checkbox.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
      this.$checkbox.removeAttribute('disabled')
    }
  }

  get checked () {
    return this.hasAttribute('checked')
  }

  set checked (val) {
    if (val) {
      this.setAttribute('checked', '')
      if (this.$checkbox !== undefined) {
        this.$checkbox.setAttribute('checked', '')
      }
    } else {
      this.removeAttribute('checked')
      if (this.$checkbox !== undefined) {
        this.$checkbox.removeAttribute('checked')
      }
    }
  }

  set validity (val) {
        // Reflect the value of `validity` as an attribute.
    if (val === true || val === false) {
      this.setAttribute('validity', val)
    } else {
      this.removeAttribute('validity')
    }
  }

  get validity () {
    return this.getAttribute('validity')
  }
}

customElements.define('material-toggle', MaterialToggle) // eslint-disable-line no-undef
