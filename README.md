# Material-toggle
An easy drop-in material design vanilla custom toggle element. HTML form ready, no framework dependencies, small footprint.

[![Spec Custom Elements V1](https://img.shields.io/badge/spec-custom%20elements%20v1-F52757.svg?style=flat-square)](https://www.w3.org/TR/custom-elements/)
[![Build Status](https://img.shields.io/travis/nuclei/material-toggle/master.svg?style=flat-square)](https://travis-ci.org/nuclei/material-toggle) [![npm](https://img.shields.io/npm/v/material-toggle.svg?style=flat-square)](https://www.npmjs.com/package/material-toggle) [![npm](https://img.shields.io/npm/dt/material-toggle.svg?style=flat-square)](https://www.npmjs.com/package/material-toggle) [![npm](https://img.shields.io/npm/l/material-toggle.svg?style=flat-square)](https://github.com/nuclei/material-toggle/blob/master/LICENSE)

## Demo
[Material toggle](https://nuclei.github.io/material-toggle/index.html)


<!---
```
<custom-element-demo>
  <template>
    <script src="docs/custom-elements.min.js"></script>
    <script src="docs/shadydom.min.js"></script>
    <script src="docs/shadycss.min.js"></script>
    <script src="docs/material-toggle.js"></script>
    <style>
      .test-elements{
        margin: 30px;
        font-family: sans-serif;
      }
      material-toggle{
        padding-right: 10px;
      }
    </style>
    <div class="test-elements">
      <material-toggle name="subscribe" id="subscribe">Subscribe</material-toggle>
      <label><material-toggle name="remind" id="remind" disabled=""></material-toggle>Remind</label>
    </div>
  </template>
</custom-element-demo>
```
-->

## Installation
```bash
npm install --save material-toggle
```

You need the [webcomponents-lite polyfill](https://github.com/webcomponents/webcomponentsjs).

Load the `polyfill` and the `material-toggle.js` in your html page or however you load you javascript dependencies:
```html
<script src="webcomponents-lite.js"></script>
<script src="./node_modules/material-toggle/dist/material-toggle.js"></script>
```

## Usage
Just drop an `<material-toggle></material-toggle>` element into you html `<form>` element and you are ready to go.

```html
<label><material-toggle name="subscribe" id="subscribe"></material-toggle>Subscribe</label>
<label><material-toggle name="remind" id="remind" disabled></material-toggle>Remind</label>
```
