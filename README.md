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

vue-indoor is a JavaScript library for the [Vue](https://vuejs.org/) framework that wraps [Leaflet](http://leafletjs.com/) making it easy to create reactive maps.

![Image of Map](docs/vue2leaflet-example.png)

## How to install

``` bash
npm install vue-indoor leaflet --save
```

For more detailed information you can follow the [Quick Start Guide](https://korigan.github.io/vue-indoor/#/quickstart.md)

## Breaking change from 1.x.x to 2.x.x

A new major release 2.0,0 is available and come with one breaking change:

### Leaflet is not automatically installed anymore

Leaflet is now a peerDependency and need to be installed manually, we updated our docs to reflect this but please pay attention when migrating

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
import {LMap, LTileLayer, LMarker} from 'vue-indoor'
```

This will reduce the size of the bundle significantly

## Documentation

[Go here](https://korigan.github.io/vue-indoor/) to check out live examples and docs.

If you want to hack around, here is a [JS Fiddle](https://jsfiddle.net/Boumi/k04zpLx9/) to get started

## Leaflet Plugins

Leaflet plugins can easily work with vue-indoor, if you want to use one I would recommand to look at the awesome work made by the community in the list below.

### Vue2Leafet plugins

* [vue-indoor-markercluster](https://github.com/jperelli/vue-indoor-markercluster) wrapper for [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)
* [vue-indoor-polylinedecorator](https://github.com/jperelli/vue-indoor-polylinedecorator) wrapper for [PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator)
* [vue-indoor-googlemutant](https://github.com/jperelli/vue-indoor-googlemutant) wrapper for [GoogleMutant](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant)
* [vue-indoor-tracksymbol](https://github.com/ais-one/vue-indoor-tracksymbol) wrapper for [TrackSymbol](https://github.com/lethexa/leaflet-tracksymbol)
* [vue-choropleth](https://github.com/voluntadpear/vue-choropleth) to display a choropleth map given a certain GeoJSON
* [vue-indoor-geosearch](https://github.com/fega/vue-indoor-geosearch) wrapper for [GeoSearch](https://github.com/smeijer/leaflet-geosearch)
* [vue-indoor-vectorgrid](https://github.com/tesselo/vue-indoor-vectorgrid) wrapper for [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) to display gridded vector data
* [vue-indoor-rotatedmarker](https://github.com/imudin/vue-indoor-rotatedmarker) wrapper for [RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker)
* [vue-indoor-editablecirclemarker](https://github.com/cualbondi/vue-indoor-editablecirclemarker) wrapper for [leaflet-editablecirclemarker](https://github.com/cualbondi/leaflet-editablecirclemarker)
* [vue-indoor-hotline](https://github.com/ikmolbo/vue-indoor-hotline) wrapper for [hotline](https://github.com/iosphere/Leaflet.hotline)
* [vue-indoor-movingmarker](https://github.com/LouisMazel/vue-indoor-movingmarker) wrapper for [Leaflet.Marker.SlideTo](https://gitlab.com/IvanSanchez/Leaflet.Marker.SlideTo)
* [vue-indoor-path-transform](https://github.com/imudin/vue-indoor-path-transform) wrapper for [Leaflet.Path.Transform ](https://github.com/w8r/Leaflet.Path.Transform)
* [vue-indoor-gpx](https://github.com/tdcook/vue-indoor-gpx) wrapper for [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx)
* [vue-indoor-locatecontrol](https://github.com/vUdav/vue-indoor-locatecontrol) wrapper for [Leaflet.Locate](https://github.com/domoritz/leaflet-locatecontrol)
* [vue-indoor-polygonfillpattern](https://github.com/guillaumejounel/vue-indoor-polygonfillpattern) wrapper for [leaflet-polygon-fillPattern](https://github.com/lwsu/leaflet-polygon-fillPattern)
* [vue-indoor-axesgrid](https://github.com/imudin/vue-indoor-axesgrid) wrapper for [AxesGrid](https://github.com/mudin/Leaflet.AxesGrid)

If you have created a plugin and want it to be listed here, let me know :-).

vue-indoor is only a wrapper for Leaflet. I want to keep it as simple as possible so I don't want to add any plugin support into this repo.

## Authors

Mickaël Bouchaud

Inspired by many map wrapper (google and leaflet) for many framework (React, Angular and Vue 1.0)

## Contributors

Thanks goes to these [wonderful people](https://github.com/mudin/vue-indoor/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
