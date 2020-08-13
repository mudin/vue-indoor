<script>
import IMarker from './IMarker.vue';

export default {
  name: 'IRadar',
  extends: IMarker,
  props: {
    fov: {
      type: Number,
      custom: true,
      default: 90
    },
    clickable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'radar'
    },
    id: {
      type: [String, Number],
      custom: true,
      default: null
    }
  },
  beforeMount() {
    Object.assign(this.layerOptions, {
      draggable: false,
      clickable: false,
      type: 'radar',
      fov: this.fov
    });
    console.log('mounted');
  },
  methods: {
    setFov(newVal, oldVal) {
      if (this.mapObject && this.mapObject.setFov) {
        this.mapObject.setFov(newVal);
      }
    }
  }
};
</script>
