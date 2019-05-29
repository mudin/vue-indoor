# vue-indoor

<img align="right" height="178" title="vue-indoor Limit logo" src="docs/logo.png">

<a href="https://travis-ci.org/mudin/vue-indoor">
  <img src="https://travis-ci.org/mudin/vue-indoor.svg?branch=master" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/vue-indoor">
  <img src="https://img.shields.io/npm/dt/vue-indoor.svg" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/vue-indoor">
  <img src="https://img.shields.io/npm/v/vue-indoor.svg" alt="Version">
</a>
<a href="https://www.npmjs.com/package/vue-indoor">
  <img src="https://img.shields.io/npm/l/vue-indoor.svg" alt="License">
</a>
<a href="https://gitter.im/vue-indoor/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
  <img src="https://badges.gitter.im/vue-indoor/Lobby.svg" alt="Gitter">
</a>

[![Coverage Status](https://coveralls.io/repos/github/mudin/vue-indoor/badge.svg?branch=master)](https://coveralls.io/github/mudin/vue-indoor?branch=master)

vue-indoor is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [IndoorJS](http://indoorjsjs.com/) making it easy to create reactive indoor maps.

## How to install

``` bash
npm install vue-indoor indoorjs --save
```

### Importing the library in Webpack / Rollup

Now the code of vue-indoor is split component by component (while using a bundler like Webpack/Rollup/Parcel) to do so the following syntax is not working anymore:

```javascript
import vue-indoor from 'vue-indoor' // INVALID
```

And has been replaced by

```javascript
import * as vue-indoor from 'vue-indoor' // VALID
```

Is highly suggested to import only the needed modules by doing so:

```javascript
import * as Indoor from 'indoorjs';
import {IMap, IFloor, IMap} from 'vue-indoor';
```

This will reduce the size of the bundle significantly

## Documentation

Coming soon

## Authors

Mudin Ibrahim

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these [wonderful people](https://github.com/mudin/vue-indoor/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
