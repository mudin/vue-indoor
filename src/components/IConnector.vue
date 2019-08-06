<script>
import forward from '../utils/forwardEvents';
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Layer from '../mixins/Layer.js';
import Options from '../mixins/Options.js';
import { Connector } from 'indoorjs';

export default {
  name: 'IConnector',
  mixins: [Layer, Options],
  props: {
    pane: {
      type: String,
      default: 'markerPane'
    },
    start: {
      type: [String, Number],
      custom: true,
      default: null
    },
    end: {
      type: [String, Number],
      custom: true,
      default: null
    },
    color: {
      type: String,
      custom: true,
      default: () => {
        return 'green';
      }
    },
    strokeWidth: {
      type: Number,
      custom: true,
      default: () => 1
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
    this.parentContainer = findRealParent(this.$parent);

    let map = this.parentContainer.mapObject;
    let markers = map.getMarkers();
    let start, end;
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      if (marker.id === this.start) start = marker;
      if (marker.id === this.end) end = marker;
    }

    if (!start || !end) {
      console.error('start or end not found!');
      return;
    }

    const options = optionsMerger({
      ...this.layerOptions,
      id: this.id,
      start,
      end,
      color: this.color,
      strokeWidth: this.strokeWidth,
      zIndex: this.zIndex
    }, this);
    this.mapObject = new Connector(start, end, options);

    this.parentContainer.addLayer(this);

    propsBinder(this, this.mapObject, this.$options.props);

    // forward all events
    forward(this.mapObject, this, (eventName, event) => {
      if (eventName === 'ready') {
        this.parentContainer.addLayer(this, !this.visible);
        this.ready = true;
      }
      return true;
    });
  },
  methods: {
    setStart (id) {
      let start = null;
      let map = this.parentContainer.mapObject;
      let markers = map.getMarkers();

      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (marker.id === id) start = marker;
      }

      if (start) {
        this.mapObject.setStart(start);
      }
    },

    setEnd (id) {
      let end = null;
      let map = this.parentContainer.mapObject;
      let markers = map.getMarkers();

      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (marker.id === id) end = marker;
      }

      if (end) {
        this.mapObject.setEnd(end);
      }
    },
    setColor (color) {
      this.mapObject.setColor(color);
    },

    setStrokeWidth (strokeWidth) {
      this.mapObject.setStrokeWidth(strokeWidth);
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
