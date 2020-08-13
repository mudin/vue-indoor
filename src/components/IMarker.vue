<script>
import forward from '../utils/forwardEvents';
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Layer from '../mixins/Layer.js';
import Options from '../mixins/Options.js';
import { Marker, point } from 'indoorjs';

export default {
  name: 'IMarker',
  mixins: [Layer, Options],
  props: {
    pane: {
      type: String,
      default: 'markerPane'
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false
    },
    clickable: {
      type: Boolean,
      default: true
    },
    position: {
      type: [point, Object, Array],
      custom: true,
      default: null
    },
    rotation: {
      type: Number,
      default() {
        return 0;
      }
    },
    yaw: {
      type: Number,
      default() {
        return 0;
      }
    },
    size: {
      type: Number,
      custom: true,
      default() {
        return 10;
      }
    },
    text: {
      type: [String, Number],
      custom: true,
      default: null
    },
    type: {
      type: String,
      default: 'marker'
    },
    stroke: {
      type: String,
      custom: true,
      default: null
    },
    color: {
      type: String,
      custom: true,
      default: null
    },
    textColor: {
      type: String,
      custom: true,
      default: null
    },
    icon: {
      type: Object,
      custom: false,
      default: null
    },
    id: {
      type: [String, Number],
      custom: true,
      default: null
    },
    zIndex: {
      type: Number,
      custom: false,
      default: null
    },
    fovPercentage: {
      type: Number,
      custom: true,
      default: 100
    },
    fov: {
      type: Number,
      custom: true,
      default: 90
    }
  },
  data() {
    return {
      ready: false
    };
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.layerOptions,
        type: this.type,
        id: this.id,
        icon: this.icon,
        text: this.text ? this.text + '' : this.text,
        zIndex: this.zIndex,
        fovPercentage: this.fovPercentage,
        fov: this.fov,
        rotation: this.rotation,
        yaw: this.yaw,
        size: this.size,
        draggable: this.draggable,
        clickable: this.clickable,
        stroke: this.stroke,
        color: this.color,
        textColor: this.textColor
      },
      this
    );
    this.mapObject = new Marker(this.position, options);
    // DomEvent.on(this.mapObject, this.$listeners);

    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);

    // forward all events
    forward(this.mapObject, this, (eventName, event) => {
      if (eventName === 'ready') {
        this.parentContainer.addLayer(this, !this.visible);
        this.ready = true;
      }
      return true;
    });
    console.log('mounted');
  },
  methods: {
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setPosition(newVal) {
      if (newVal == null || this.mapObject.inGroup) {
        return;
      }

      if (this.mapObject) {
        this.mapObject.setPosition(newVal);
      }
    },
    setStroke(newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setStroke(newVal);
      }
    },
    setTextColor(newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setTextColor(newVal);
      }
    },
    setText(newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setText(newVal);
      }
    },
    setColor(newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setColor(newVal);
      }
    },
    setId(newVal) {
      if (this.mapObject) {
        this.mapObject.setId(newVal);
      }
    },
    setSize(newVal) {
      if (this.mapObject) {
        this.mapObject.setSize(newVal);
      }
    },
    setFOVPercentage(newVal) {
      if (this.mapObject) {
        this.mapObject.setFOVPercentage(newVal);
      }
    },
    setFov(newVal) {
      if (this.mapObject) {
        this.mapObject.setFov(newVal);
      }
    }
  },
  render: function(h) {
    if (this.ready && this.$slots.default) {
      return h('div', { style: { display: 'none' } }, this.$slots.default);
    }
    return null;
  }
};
</script>
