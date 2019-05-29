export default {
  props: {
    pane: {
      type: String,
      default: 'overlayPane'
    },
    attribution: {
      type: String,
      default: null
    },
    id: {
      type: [Number, String],
      custom: true,
      default: null
    },
    name: {
      type: String,
      custom: true,
      default: undefined
    },
    layerType: {
      type: String,
      custom: true,
      default: undefined
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    }
  },
  mounted () {
    this.layerOptions = {
      attribution: this.attribution,
      pane: this.pane
    };
  },
  beforeDestroy () {
    if (this.parentContainer) {
      this.parentContainer.removeLayer(this);
    }
  },
  methods: {
    setAttribution (val, old) {
      let attributionControl = this.$parent.mapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setName (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    },
    setLayerType (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    unbindTooltip () {
      const tooltip = this.mapObject ? this.mapObject.getTooltip() : null;
      if (tooltip) {
        tooltip.unbindTooltip();
      }
    },
    unbindPopup () {
      const popup = this.mapObject ? this.mapObject.getPopup() : null;
      if (popup) {
        popup.unbindPopup();
      }
    }
  }
};
