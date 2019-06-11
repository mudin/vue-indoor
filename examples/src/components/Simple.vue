<template>
  <i-map
    ref="map"
    :center="center" :zoom="zoom"
    @ready="onMapReady">
    <i-floor :url="url" :width="800" :opacity="0.8"/>
    <i-marker
      v-for="marker in markers"
      :key="marker.id"
      :id="marker.id"
      :position="marker.position"
      :text="marker.text"
      :zIndex="20"
      :stroke="markerColor(marker)"
      @click="handleMarkerClick(marker,$event)"
      @rotating="handleMarkerRotating(marker,$event)"
      @moving="handleMarkerMoving(marker,$event)"
      @moved="handleMarkerMoved(marker,$event)"
      :draggable="true"
    ></i-marker>
    <i-marker
      v-if="radar"
      :draggable="false"
      :position="radar.position"
      :rotation="radar.rotation"
      :zIndex="10"
      :icon="icon"
    ></i-marker>
    <i-connector v-for="link in links"
      :key="radar.id+'-'+link"
      :start="radar.id"
      :color="'#008a00'"
      :end="link">
      </i-connector>
  </i-map>
</template>

<script>
import * as I from "indoorjs";
import { iMap, iMarker, iFloor, iConnector } from "vue-indoor";

export default {
  name: "Example",
  components: {
    iMap,
    iFloor,
    iMarker,
    iConnector
  },
  data() {
    return {
      zoom: 1,
      url: "/static/images/fp.jpeg",
      center: new I.Point(0, 0),
      markers: [],
      radar: null,
      icon: {
        url: "/static/images/radar.png",
        size:20
      },
      links:[]
    };
  },
  created() {},
  methods: {
    onMapReady(e) {
      console.log("map ready", e);
      this.addMarkers();
    },
    handleMarkerMoving(marker, imarker) {
      marker.position = imarker.position.clone();
      if(marker.id===this.radar.id) {
        this.radar.position = imarker.position.clone();
      }
    },
    handleMarkerRotating(marker, imarker) {
      //console.log('rotating', imarker);
      marker.rotation = imarker.rotation + 0;
      if(marker.id===this.radar.id) {
        this.radar.rotation = imarker.rotation + 0;
      }
    },
    handleMarkerMoved(marker, imarker) {
      console.log('moved');
      if(marker.id===this.radar.id) {
        this.radar.position = marker.position.clone();
      }
    },
    handleMarkerClick(marker, imarker) {
      this.radar = null;
      this.radar = Object.assign({},marker);
      
      this.links = [];

      for (var i = 0; i < 5; i++) {
      let random;
        do {
          random = ~~(Math.random()*19);
        }
        while(this.links.includes(random) || random===this.radar.id);
        this.links.push(random);
      }
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
    innerClick() {
      alert("Click!");
    },

    addMarkers() {
      this.markers = [];
      for (let i = 0; i < 20; i += 1) {
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 400 - 200;
        const marker = {
          position: [x, y],
          rotation: x % 360,
          text: `${i + 1}`,
          draggable: true,
          zIndex: 100,
          id: i
        };
        // marker.addTo(map);
        this.markers.push(marker);
      }
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
            url: "./radar.png"
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

      var objs = canvas.getObjects();

      objs = objs.filter(o => o.class === "marker");

      canvas.discardActiveObject();

      var sel = new fabric.ActiveSelection(objs, {
        canvas: canvas
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();

      window.map2 = this.$refs.map.mapObject;
    },

    markerColor(marker) {
      if(marker.id===this.radar.id) return '#dc322f';

      for (let i = 0; i < this.links.length; i++) {
        const link = this.links[i];
        if(marker.id===link) return '#008a00';
      }

      return '#586e75';
    }
  }
};
</script>
