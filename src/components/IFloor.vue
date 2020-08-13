<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import ImageOverlayMixin from '../mixins/ImageOverlay.js';
import { Floor } from 'indoorjs';

export default {
  name: 'IFloor',
  mixins: [ImageOverlayMixin],
  mounted() {
    const options = optionsMerger(this.imageOverlayOptions, this);
    console.log(this, options);
    this.mapObject = new Floor(options);
    // DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.on('load', () => {
      this.parentContainer.addLayer(this, !this.visible);
      this.$emit('ready', this.mapObject);
    });
  },
  render() {
    return null;
  }
};
</script>
