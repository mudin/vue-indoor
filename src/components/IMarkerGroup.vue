<script>
import forward from '../utils/forwardEvents';
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Layer from '../mixins/Layer.js';
import Options from '../mixins/Options.js';
import { MarkerGroup } from 'indoorjs';

export default {
  name: 'IMarkerGroup',
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
    bounds: {
      type: Array,
      custom: true,
      default: null
    },
    rotation: {
      type: Number,
      default () {
        return 0;
      }
    },
    yaw: {
      type: Number,
      default () {
        return 0;
      }
    },
    size: {
      type: Number,
      default () {
        return 10;
      }
    },
    text: {
      type: [String, Number],
      custom: true,
      default: null
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
    zIndex: {
      type: Number,
      custom: false,
      default: null
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = optionsMerger({
      ...this.layerOptions,
      id: this.id,
      icon: this.icon,
      text: this.text ? this.text + '' : this.text,
      zIndex: this.zIndex,
      rotation: this.rotation,
      yaw: this.yaw,
      size: this.size,
      draggable: this.draggable,
      stroke: this.stroke,
      color: this.color,
      textColor: this.textColor
    }, this);
    this.mapObject = new MarkerGroup(this.bounds, options);
    // DomEvent.on(this.mapObject, this.$listeners);

    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);

    // forward all events
    forward(this.mapObject, this, (eventName, event) => {
      console.log(eventName);
      return true;
    });

    this.parentContainer.addLayer(this, !this.visible);
    this.ready = true;
  },
  methods: {
    setDraggable (newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setBounds (newVal) {
      if (newVal == null || this.mapObject.inGroup) {
        return;
      }

      if (this.mapObject) {
        this.mapObject.setBounds(newVal);
      }
    },
    setStroke (newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setStroke(newVal);
      }
    },
    setTextColor (newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setTextColor(newVal);
      }
    },
    setText (newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setText(newVal);
      }
    },
    setColor (newVal, oldVal) {
      if (this.mapObject) {
        this.mapObject.setColor(newVal);
      }
    }
  },
  render: function (h) {
    if (this.ready && this.$slots.default) {
      return h('div', { style: { display: 'none' } }, this.$slots.default);
    }
    return null;
  }
};
</script>
