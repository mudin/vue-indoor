import Layer from './Layer.js';
import InteractiveLayer from './InteractiveLayer';

export default {
  mixins: [Layer, InteractiveLayer],
  props: {
    url: {
      type: String,
      custom: true
    },
    width: {
      type: Number,
      custom: true,
      default: () => {
        return -1; // auto
      }
    },
    height: {
      type: Number,
      default: () => {
        return -1; // auto
      }
    },
    scale: {
      type: Number,
      default: () => {
        return 1;
      }
    },
    position: {
      type: [Object, Array],
      custom: true,
      default: () => {
        return [0, 0];
      }
    },
    bounds: {
      custom: true
    },
    opacity: {
      type: Number,
      custom: true,
      default: 1.0
    },
    alt: {
      type: String,
      default: ''
    },
    interactive: {
      type: Boolean,
      default: false
    },
    crossOrigin: {
      type: Boolean,
      default: false
    },
    errorOverlayUrl: {
      type: String,
      custom: true,
      default: ''
    },
    zIndex: {
      type: Number,
      custom: true,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.imageOverlayOptions = {
      ...this.layerOptions,
      ...this.interactiveLayerOptions,
      opacity: this.opacity,
      alt: this.alt,
      url: this.url,
      width: this.width,
      height: this.height,
      scale: this.scale,
      position: this.position,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin,
      errorOverlayUrl: this.errorOverlayUrl,
      zIndex: this.zIndex,
      className: this.className
    };
  },
  methods: {
    setOpacity(opacity) {
      return this.mapObject.setOpacity(opacity);
    },
    setUrl(url) {
      return this.mapObject.setUrl(url);
    },
    setWidth(width) {
      return this.mapObject.setWidth(width);
    },
    setPosition(position) {
      return this.mapObject.setPosition(position);
    },
    setBounds(bounds) {
      return this.mapObject.setBounds(bounds);
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
    getElement() {
      return this.mapObject.getElement();
    },
    bringToFront() {
      return this.mapObject.bringToFront();
    },
    bringToBack() {
      return this.mapObject.bringToBack();
    }
  },
  render() {
    return null;
  }
};
