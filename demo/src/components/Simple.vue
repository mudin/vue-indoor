<template>
  <i-map
    ref="map"
    :center="center"
    :zoom="zoom"
    :show-grid="true"
    :has-axis="false"
    :has-scale-ruler="true"
    :clustering-markers="true"
    @ready="onMapReady"
    :scaleRulerStringStyle="'border-color: blue'"
  >
    <i-floor :url="url" :opacity="0.8" :scale="1" />
    <i-marker
      v-for="marker in markers"
      :id="marker.id"
      :key="marker.id"
      :position="marker.position"
      :size="marker.size"
      :text="marker.text"
      :stroke="markerColor(marker)"
      :draggable="true"
      @click="handleMarkerClick(marker, $event)"
      @rotating="handleMarkerRotating(marker, $event)"
      @moving="handleMarkerMoving(marker, $event)"
      @moved="handleMarkerMoved(marker, $event)"
    />
    <i-radar
      v-if="radar"
      :id="radar.id"
      :key="'r' + radar.id"
      :position="radar.position"
      :rotation="radar.angle"
      :fov="radar.fov"
      :z-index="300"
      :size="150"
      :icon="icon"
    />
    <i-connector
      v-for="link in links"
      :key="radar.id + '-' + link"
      :start="radar.id"
      :color="'#008a00'"
      :end="link"
    />
    <i-marker-group
      :bounds="[
        [0, 0],
        [200, 200]
      ]"
      @moving="handleGroupMoving"
      @moved="handleGroupMoved"
      @scaling="handleGroupScaling"
      @rotating="handleGroupRotating"
    />
  </i-map>
</template>

<script>
import * as I from 'indoorjs';
import { iMap, iMarkerGroup, iMarker, iRadar, iFloor, iConnector } from 'vue-indoor';

export default {
  name: 'Example',
  components: {
    iMap,
    iFloor,
    iMarker,
    iConnector,
    iMarkerGroup,
    iRadar
  },
  data() {
    return {
      zoom: 1,
      url: '/assets/images/fp.jpeg',
      center: new I.Point(0, 0),
      markers: [],
      radar: null,
      icon: {
        url: '/assets/images/radar.png',
        size: 20
      },
      links: []
    };
  },
  created() {},
  methods: {
    onMapReady(e) {
      console.log('map ready', e);
      window.map = e;
      this.addMarkers();
    },
    handleMarkerMoving(marker, imarker) {
      console.log('moving');
      marker.position = imarker.position.clone();
      if (marker.id === this.radar.id) {
        this.radar.position = imarker.position.clone();
      }
    },
    handleMarkerRotating(marker, imarker) {
      // console.log('rotating', imarker);
      marker.rotation = imarker.rotation + 0;
      if (marker.id === this.radar.id) {
        this.radar.rotation = imarker.rotation + 0;
      }
    },
    handleMarkerMoved(marker, imarker) {
      console.log('moved');
      if (marker.id === this.radar.id) {
        this.radar.position = marker.position.clone();
      }
    },
    handleMarkerClick(marker, imarker) {
      this.radar = null;
      this.radar = Object.assign({}, marker);
      this.radar.angle = ~~(Math.random() * 360);
      this.radar.fov = ~~(Math.random() * 90 + 30);

      this.links = [];

      for (let i = 0; i < 5; i += 1) {
        let random;
        do {
          random = ~~(Math.random() * 19);
        } while (this.links.includes(random) || random === this.radar.id);
        this.links.push(random);
      }
    },

    handleGroupMoving(e) {
      console.log('mgmoving', e);
    },
    handleGroupScaling(e) {
      console.log('mgscaling', e);
    },
    handleGroupRotating(e) {
      console.log('mgrotating', e);
    },

    handleGroupMoved(e) {
      console.log('mgmoved', e);
    },

    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {},

    addMarkers() {
      this.markers = [];
      for (let i = 0; i < 20; i += 1) {
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 400 - 200;
        const marker = {
          position: [x, y],
          rotation: x % 360,
          text: `${i + 1}`,
          size: 10,
          draggable: true,
          zIndex: 100,
          id: i
        };
        // marker.addTo(map);
        this.markers.push(marker);
      }
      window.imarkers = this.markers;
      // eslint-disable-next-line no-use-before-define
      this.addRadar(this.markers[0]);

      setTimeout(() => {
        this.$refs.map.mapObject.fitBounds();
        // this.selectAll();
      }, 100);
    },
    addRadar(marker) {
      if (!this.radar) {
        this.radar = {
          position: marker.position,
          size: 30,
          id: marker.id,
          icon: {
            url: './radar.png'
          },
          rotation: Math.random() * 360,
          zIndex: 90
        };
        // this.radar.on("ready", () => {
        //   this.radar.addTo(map);
        // });
      } else {
        this.radar.setPosition(marker.position);
        this.radar.setRotation(Math.random() * 360);
        this.radar.id = marker.id;
      }
    },

    selectAll() {
      const canvas = this.$refs.map.mapObject.canvas;

      let objs = canvas.getObjects();

      objs = objs.filter(o => o.class === 'marker');

      canvas.discardActiveObject();

      const sel = new fabric.ActiveSelection(objs, {
        canvas
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();

      window.map2 = this.$refs.map.mapObject;
    },

    markerColor(marker) {
      if (marker.id === this.radar.id) return '#dc322f';

      for (let i = 0; i < this.links.length; i += 1) {
        const link = this.links[i];
        if (marker.id === link) return '#008a00';
      }

      return '#586e75';
    }
  }
};
</script>
