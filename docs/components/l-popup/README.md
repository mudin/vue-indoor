# l-popup

Display a popup on the map
Popup placed inside a marker will by default appear on marker click.

## Playground
Any of the props of `l-popup` or the classes that it extends can be used

<vuep template="#popup-example"></vuep>

<script v-pre type="text/x-template" id="popup-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng">
      <l-popup>Hello!</l-popup>
    </l-marker>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-popup', Vue2Leaflet.LPopup)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.413220, -1.319482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>
</script>

## Props

```js
{
  latLng: {
    type: [Object, Array],
    default: () => []
  }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-popup` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')

## Extends

<!-- tabs:start -->

## ** Popper **

[path.md](../../mixins/popper.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
