# Material-toggle
An easy drop-in material design vanilla custom toggle element. HTML form ready, no framework dependencies, small footprint.

[![Build Status](https://img.shields.io/travis/nuclei/material-toggle/master.svg?style=flat-square)](https://travis-ci.org/nuclei/material-toggle) [![npm](https://img.shields.io/npm/v/material-toggle.svg?style=flat-square)](https://www.npmjs.com/package/material-toggle) [![npm](https://img.shields.io/npm/dt/material-toggle.svg?style=flat-square)](https://www.npmjs.com/package/material-toggle) [![npm](https://img.shields.io/npm/l/material-toggle.svg?style=flat-square)](https://github.com/nuclei/material-toggle/blob/master/LICENSE)

## Demo
[![Material Inputs](https://cloud.githubusercontent.com/assets/813754/19432757/350079e4-945e-11e6-9593-e2174285c435.png)](https://nuclei.github.io/material-toggle/index.html)


<!---
```
<custom-element-demo>
  <template>
    <script src="docs/webcomponentsjs/webcomponents.js"></script>
    <script src="../src/material-toggle.js"></script>
    <material-toggle></material-toggle>
  </template>
</custom-element-demo>
```
-->
```html
<material-toggle></material-toggle>
```

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
Just drop an `<material-toggle></material-toggle>` element into you html `<form>` element and you are ready to go..
